// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { ValidateResetTokenAuthAction } from '../../../src/actions/validate-reset-token-auth';
import { init } from '../../../src/server-init';

describe('ValidateResetTokenAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should return valid true for a valid token', async () => {
    await Factory.prisma.passwordResetToken.create({
      data: {
        email: 'test@example.com',
        token: 'valid-token',
        expires: new Date(Date.now() + 3600000),
      },
    });

    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await ValidateResetTokenAuthAction.run({ token: 'valid-token' }, ctx);

    expect(result.success).toBe(true);
    expect(result.data?.valid).toBe(true);
    expect(result.data?.email).toBe('test@example.com');
  });

  it('should return valid false for an invalid token', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await ValidateResetTokenAuthAction.run({ token: 'invalid-token' }, ctx);

    expect(result.success).toBe(true);
    expect(result.data?.valid).toBe(false);
  });

  it('should return valid false for an expired token', async () => {
    await Factory.prisma.passwordResetToken.create({
      data: {
        email: 'expired@example.com',
        token: 'expired-token',
        expires: new Date(Date.now() - 3600000),
      },
    });

    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await ValidateResetTokenAuthAction.run({ token: 'expired-token' }, ctx);

    expect(result.success).toBe(true);
    expect(result.data?.valid).toBe(false);
  });
});
