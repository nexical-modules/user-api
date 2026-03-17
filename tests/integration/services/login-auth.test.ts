import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import bcrypt from 'bcryptjs';
import { LoginAuthAction } from '../../../src/actions/login-auth';
import { init } from '../../../src/server-init';

describe('LoginAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow a user to login with valid credentials', async () => {
    const password = 'password123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Factory.create('user', {
      email: 'loginuser@example.com',
      password: hashedPassword,
    });

    const ctx = await createMockContext('USER_EMPLOYEE', 'user');

    const result = await LoginAuthAction.run({ email: user.email!, password }, ctx);

    if (!result.success) {
      console.error('[DEBUG] LoginAuthAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data?.id).toBe(user.id);
  });

  it('should fail to login with invalid password', async () => {
    const user = await Factory.create('user', {
      email: 'wrongpass@example.com',
      password: await bcrypt.hash('correctpassword', 10),
    });

    const ctx = await createMockContext('USER_EMPLOYEE', 'user');

    const result = await LoginAuthAction.run(
      { email: user.email!, password: 'wrongpassword' },
      ctx,
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('user.action.login.invalid_credentials');
  });
});
