import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { DeleteMeUserAction } from '../../../src/actions/delete-me-user';
import { init } from '../../../src/server-init';

describe('DeleteMeUserAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow a user to delete their own account', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = ctx.locals.actor as { id: string };

    const result = await DeleteMeUserAction.run({ userId: user.id }, ctx);

    if (!result.success) {
      console.error('[DEBUG] DeleteMeUserAction error:', result.error);
    }

    expect(result.success).toBe(true);

    const deletedUser = await Factory.prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(deletedUser).toBeNull();
  });
});
