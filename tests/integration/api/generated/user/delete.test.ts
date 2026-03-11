// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('User API - Delete', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // DELETE /api/user/[id]
  describe('DELETE /api/user/[id]', () => {
    it('should delete user', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });

      const target = actor;

      const res = await client.delete(`/api/user/${target.id}`);

      expect(res.status).toBe(200);

      const check = await Factory.prisma.user.findUnique({ where: { id: target.id } });
      expect(check).toBeNull();
    });
  });
});
