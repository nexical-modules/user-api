// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('User API - Get', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // GET /api/user/[id]
  describe('GET /api/user/[id]', () => {
    it('should retrieve a specific user', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });

      const target = actor;

      const res = await client.get(`/api/user/${target.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });

    it('should return 404 for missing id', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/user/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
