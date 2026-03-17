// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { beforeAll, describe, expect, it } from 'vitest';
import { LogoutAuthAction } from '../../../src/actions/logout-auth';
import { init } from '../../../src/server-init';

describe('LogoutAuthAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should execute successfully', async () => {
    const ctx = await createMockContext('USER_EMPLOYEE', 'user');
    const result = await LogoutAuthAction.run({}, ctx);

    expect(result.success).toBe(true);
  });
});
