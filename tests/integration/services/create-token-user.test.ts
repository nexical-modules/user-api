// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { CreateTokenUserAction } from '../../../src/actions/create-token-user';
import { init } from '../../../src/server-init';

describe('CreateTokenUserAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow a user to create a personal access token', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = ctx.locals.actor as { id: string };

    const input = {
      name: 'Test Token',
      userId: user.id,
    };

    const result = await CreateTokenUserAction.run(input, ctx);

    if (!result.success) {
      console.error('[DEBUG] CreateTokenUserAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data?.token.name).toBe('Test Token');
    expect(result.data?.rawKey).toBeDefined();
    expect(result.data?.rawKey.startsWith('nx_')).toBe(true);

    const token = await Factory.prisma.personalAccessToken.findUnique({
      where: { id: result.data?.token.id },
    });

    expect(token).toBeDefined();
    expect(token?.userId).toBe(user.id);
  });
});
