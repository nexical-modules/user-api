import { createMockContext } from '@tests/integration/helpers/context';
import { describe, expect, it, beforeAll } from 'vitest';
import { GetMeUserAction } from '../../../src/actions/get-me-user';
import { init } from '../../../src/server-init';

describe('GetMeUserAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should return the current user profile', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = ctx.locals.actor as { id: string; email: string };

    const result = await GetMeUserAction.run(undefined as unknown as void, ctx);

    if (!result.success) {
      console.error('[DEBUG] GetMeUserAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data?.id).toBe(user.id);
    expect(result.data?.email).toBe(user.email);
  });
});
