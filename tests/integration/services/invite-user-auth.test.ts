// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { InviteUserAuthAction } from '../../../src/actions/invite-user-auth';
import { init } from '../../../src/server-init';

describe('InviteUserAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow inviting a new user', async () => {
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await InviteUserAuthAction.run(
      {
        email: 'invite@example.com',
        role: SiteRole.USER_EMPLOYEE,
      },
      ctx,
    );

    if (!result.success) {
      console.error('[DEBUG] InviteUserAuthAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data?.email).toBe('invite@example.com');
    expect(result.data?.role).toBe('USER_EMPLOYEE');

    const invitation = await Factory.prisma.invitation.findUnique({
      where: { email: 'invite@example.com' },
    });

    expect(invitation).toBeDefined();
    expect(invitation?.token).toBeDefined();
  });

  it('should fail if user already exists', async () => {
    await Factory.create('user', { email: 'existing@example.com' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await InviteUserAuthAction.run(
      {
        email: 'existing@example.com',
      },
      ctx,
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('user.service.error.user_exists');
  });
});
