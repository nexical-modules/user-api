import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import bcrypt from 'bcryptjs';
import { ResetPasswordAuthAction } from '../../../src/actions/reset-password-auth';
import { init } from '../../../src/server-init';

describe('ResetPasswordAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should reset password when a valid token is provided', async () => {
    const user = await Factory.create('user', {
      email: 'resetme@example.com',
      password: await bcrypt.hash('oldpassword', 10),
    });

    const resetToken = await Factory.prisma.passwordResetToken.create({
      data: {
        email: user.email!,
        token: 'valid-token',
        expires: new Date(Date.now() + 3600000),
      },
    });

    const ctx = await createMockContext('USER_EMPLOYEE', 'user');

    const result = await ResetPasswordAuthAction.run(
      {
        token: resetToken.token,
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      },
      ctx,
    );

    if (!result.success) {
      console.error('[DEBUG] ResetPasswordAuthAction error:', result.error);
    }

    expect(result.success).toBe(true);

    const updatedUser = await Factory.prisma.user.findUnique({ where: { id: user.id } });
    expect(await bcrypt.compare('newpassword123', updatedUser!.password!)).toBe(true);

    const deletedToken = await Factory.prisma.passwordResetToken.findUnique({
      where: { id: resetToken.id },
    });
    expect(deletedToken).toBeNull();
  });

  it('should fail when an invalid token is provided', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await ResetPasswordAuthAction.run(
      {
        token: 'invalid-token',
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      },
      ctx,
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('user.service.error.invalid_token');
  });
});
