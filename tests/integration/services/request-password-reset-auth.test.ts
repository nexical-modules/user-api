import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll, vi } from 'vitest';
import { RequestPasswordResetAuthAction } from '../../../src/actions/request-password-reset-auth';
import { init } from '../../../src/server-init';
import { HookSystem } from '@/lib/modules/hooks';

describe('RequestPasswordResetAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should create a reset token when a valid email is provided', async () => {
    await Factory.create('user', { email: 'reset@example.com' });
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');

    const dispatchSpy = vi.spyOn(HookSystem, 'dispatch');

    const result = await RequestPasswordResetAuthAction.run({ email: 'reset@example.com' }, ctx);

    expect(result.success).toBe(true);

    const token = await Factory.prisma.passwordResetToken.findFirst({
      where: { email: 'reset@example.com' },
    });

    expect(token).toBeDefined();
    expect(token?.token).toBeDefined();
    expect(dispatchSpy).toHaveBeenCalledWith(
      'auth.password_reset_requested',
      expect.objectContaining({
        email: 'reset@example.com',
        token: token?.token,
      }),
    );
  });

  it('should return success even if email does not exist (enumeration protection)', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await RequestPasswordResetAuthAction.run(
      { email: 'nonexistent@example.com' },
      ctx,
    );

    expect(result.success).toBe(true);
    const token = await Factory.prisma.passwordResetToken.findFirst({
      where: { email: 'nonexistent@example.com' },
    });
    expect(token).toBeNull();
  });
});
