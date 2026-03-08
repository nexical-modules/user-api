// GENERATED CODE - DO NOT MODIFY
import { describe, it, expect, beforeEach } from 'vitest';
import { ApiClient } from '@tests/integration/lib/client';
import { TestServer } from '@tests/integration/lib/server';
import { Factory } from '@tests/integration/lib/factory';
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
describe('User API - List', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/user
  describe('GET /api/user', () => {
    const baseData = { passwordUpdatedAt: new Date().toISOString() };
    it('should allow USER_ADMIN to list users', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup first to ensure clean state
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('user', {
        ...baseData,
        email: 'list_1_' + _listSuffix + '@example.com',
        username: 'list_1_' + _listSuffix + '',
      });
      await Factory.create('user', {
        ...baseData,
        email: 'list_2_' + _listSuffix + '@example.com',
        username: 'list_2_' + _listSuffix + '',
      });
      const res = await client.get('/api/user');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });
    it('should verify pagination metadata', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Cleanup and seed specific count
      await Factory.prisma.user.deleteMany({ where: { id: { not: actor.id } } });
      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;
      // Check current count
      const _listSuffix = Date.now();
      let currentCount = 0;
      currentCount = await Factory.prisma.user.count({ where: { id: actor.id } });
      const toCreate = totalTarget - currentCount;
      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('user', {
          ...baseData,
          email: `page_${i}_${_listSuffix}@example.com`,
          username: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }
      // Page 1
      const res1 = await client.get('/api/user?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);
      // Page 2
      const res2 = await client.get('/api/user?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });
    it('should filter by username', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'username_' + Date.now() + '_A';
      const val2 = 'username_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        username: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
      };
      const data2 = {
        ...baseData,
        username: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?username=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].username).toBe(val1);
    });
    it('should filter by email', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'email_' + Date.now() + '_A@example.com';
      const val2 = 'email_' + Date.now() + '_B@example.com';
      const data1 = { ...baseData, email: val1, username: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, email: val2, username: 'filter_b_' + Date.now() + '' };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?email=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].email).toBe(val1);
    });
    it('should filter by passwordUpdatedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        passwordUpdatedAt: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        passwordUpdatedAt: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?passwordUpdatedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].passwordUpdatedAt).toBe(val1);
    });
    it('should filter by emailVerified', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();
      const data1 = {
        ...baseData,
        emailVerified: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        emailVerified: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?emailVerified=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].emailVerified).toBe(val1);
    });
    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        name: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        name: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });
    it('should filter by image', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));
      // Reuse getActorStatement to ensure correct actor context
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      // Note: Ensure role allows filtering if restricted
      const val1 = 'image_' + Date.now() + '_A';
      const val2 = 'image_' + Date.now() + '_B';
      const data1 = {
        ...baseData,
        image: val1,
        email: 'filter_a_' + Date.now() + '@example.com',
        username: 'filter_a_' + Date.now() + '',
      };
      const data2 = {
        ...baseData,
        image: val2,
        email: 'filter_b_' + Date.now() + '@example.com',
        username: 'filter_b_' + Date.now() + '',
      };
      await Factory.create('user', { ...data1 });
      await Factory.create('user', { ...data2 });
      const res = await client.get('/api/user?image=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].image).toBe(val1);
    });
  });
});
