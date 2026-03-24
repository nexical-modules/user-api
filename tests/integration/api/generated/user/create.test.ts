// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('User API - Create', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // POST /api/user
  describe('POST /api/user', () => {
    it('should allow USER_ADMIN to create user', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const payload = {
        passwordUpdatedAt: new Date().toISOString(),
      };

      const res = await client.post('/api/user', payload);

      expect(res.status).toBe(201);
      expect(res.body.data).toBeDefined();

      expect(res.body.data.passwordUpdatedAt).toBe(payload.passwordUpdatedAt); // API returns ISO string

      const created = await Factory.prisma.user.findUnique({
        where: { id: res.body.data.id },
      });
      expect(created).toBeDefined();
    });

    it('should forbid non-admin/unauthorized users', async () => {
      client.useToken('invalid-token');
      const _actor = undefined as unknown;

      const payload = {
        passwordUpdatedAt: new Date().toISOString(),
      };
      const res = await client.post('/api/user', payload);
      expect([401, 403, 404]).toContain(res.status);
    });
  });
});
