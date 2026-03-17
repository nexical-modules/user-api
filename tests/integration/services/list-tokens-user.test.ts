import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { ListTokensUserAction } from '../../../src/actions/list-tokens-user';
import { init } from '../../../src/server-init';

describe('ListTokensUserAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });
  it('should list personal access tokens for a user', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = ctx.locals.actor as { id: string };

    await Factory.create('personalAccessToken', {
      userId: user.id,
      name: 'Token 1',
      user: undefined,
    });
    await Factory.create('personalAccessToken', {
      userId: user.id,
      name: 'Token 2',
      user: undefined,
    });

    const result = await ListTokensUserAction.run({ userId: user.id }, ctx);

    if (!result.success) {
      console.error('[DEBUG] ListTokensUserAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(result.data?.map((t: { name: string }) => t.name)).toContain('Token 1');
    expect(result.data?.map((t: { name: string }) => t.name)).toContain('Token 2');
  });
});
