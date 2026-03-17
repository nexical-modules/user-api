import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { RegisterAuthAction } from '../../../src/actions/register-auth';
import { init } from '../../../src/server-init';

describe('RegisterAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow a new user to register', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');

    const input = {
      email: 'newuser@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      username: 'newuser',
      name: 'New User',
    };

    const result = await RegisterAuthAction.run(input, ctx);

    if (!result.success) {
      console.error('[DEBUG] RegisterAuthAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data?.email).toBe('newuser@example.com');
    expect(result.data?.username).toBe('newuser');

    const user = await Factory.prisma.user.findUnique({
      where: { email: 'newuser@example.com' },
    });

    expect(user).toBeDefined();
    expect(user?.password).toBeDefined();
    expect(user?.password).not.toBe('password123'); // Should be hashed
  });
});
