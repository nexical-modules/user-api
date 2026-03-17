// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { VerifyEmailAuthAction } from '../../../src/actions/verify-email-auth';
import { init } from '../../../src/server-init';

describe('VerifyEmailAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should verify email when a valid token is provided', async () => {
    const user = await Factory.create('user', {
      email: 'verify@example.com',
      emailVerified: null,
    });

    await Factory.prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token: 'valid-verify-token',
        expires: new Date(Date.now() + 3600000),
      },
    });

    const ctx = await createMockContext('USER_EMPLOYEE', 'user');

    const result = await VerifyEmailAuthAction.run(
      {
        token: 'valid-verify-token',
      },
      ctx,
    );

    if (!result.success) {
      console.error('[DEBUG] VerifyEmailAuthAction error:', result.error);
    }

    expect(result.success).toBe(true);

    const updatedUser = await Factory.prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.emailVerified).not.toBeNull();

    const deletedToken = await Factory.prisma.verificationToken.findFirst({
      where: { token: 'valid-verify-token' },
    });
    expect(deletedToken).toBeNull();
  });

  it('should fail when an invalid token is provided', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await VerifyEmailAuthAction.run(
      {
        token: 'invalid-token',
      },
      ctx,
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('user.service.error.invalid_token');
  });
});
