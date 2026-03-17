import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { UpdateMeUserAction } from '../../../src/actions/update-me-user';
import { init } from '../../../src/server-init';

describe('UpdateMeUserAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow a user to update their own profile', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = ctx.locals.actor as { id: string };

    const result = await UpdateMeUserAction.run(
      {
        id: user.id,
        name: 'Updated Name',
        username: 'updated_username',
      },
      ctx,
    );

    if (!result.success) {
      console.error('[DEBUG] UpdateMeUserAction error:', result.error);
    }

    expect(result.success).toBe(true);

    const updatedUser = await Factory.prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(updatedUser?.name).toBe('Updated Name');
    expect(updatedUser?.username).toBe('updated_username');
  });
});
