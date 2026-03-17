import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { DeleteTokenUserAction } from '../../../src/actions/delete-token-user';
import { init } from '../../../src/server-init';

describe('DeleteTokenUserAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow a user to delete their personal access token', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = ctx.locals.actor as { id: string };

    const token = await Factory.create('personalAccessToken', {
      userId: user.id,
      name: 'Token to Delete',
      user: undefined,
    });

    const result = await DeleteTokenUserAction.run({ id: token.id, userId: user.id }, ctx);

    if (!result.success) {
      console.error('[DEBUG] DeleteTokenUserAction error:', result.error);
    }

    expect(result.success).toBe(true);

    const deletedToken = await Factory.prisma.personalAccessToken.findUnique({
      where: { id: token.id },
    });
    expect(deletedToken).toBeNull();
  });
});
