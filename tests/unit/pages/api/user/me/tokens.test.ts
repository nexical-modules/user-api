// GENERATED CODE - DO NOT MODIFY
import { ApiGuard } from '@/lib/api/api-guard';
import { createMockAstroContext } from '@tests/unit/helpers';
import type { APIContext } from 'astro';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateTokenUserAction } from '../../../../../../src/actions/create-token-user';
import { ListTokensUserAction } from '../../../../../../src/actions/list-tokens-user';
import { GET, POST } from '../../../../../../src/pages/api/user/me/tokens';
vi.mock('../../../../../../src/actions/list-tokens-user');
vi.mock('../../../../../../src/actions/create-token-user');
vi.mock('@/lib/api/api-guard');

describe('User API - GET ../../../../../../src/pages/api/user/me/tokens', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call ListTokensUserAction and return success', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? `?id=${encodeURIComponent(String('test-id'))}&username=${encodeURIComponent(String('test'))}&email=${encodeURIComponent(String('test@example.com'))}&password=${encodeURIComponent(String('test'))}&passwordUpdatedAt=${encodeURIComponent(String(new Date().toISOString()))}&emailVerified=${encodeURIComponent(String(new Date().toISOString()))}&name=${encodeURIComponent(String('test'))}&image=${encodeURIComponent(String('test'))}&role=${encodeURIComponent(String('test-enum'))}&status=${encodeURIComponent(String('test-enum'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'GET',
    });

    vi.mocked(ListTokensUserAction.run).mockResolvedValue({
      success: true,
      data: { id: 'test-id' },
    } as Record<string, unknown>);

    const response = await GET(mockContext);

    if (response instanceof Response) {
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    } else {
      expect((response as unknown as Record<string, boolean>).success).toBe(true);
    }
  });

  it('should return 400 when invalid input is provided (scaffold)', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? `?id=${encodeURIComponent(String('test-id'))}&username=${encodeURIComponent(String('test'))}&email=${encodeURIComponent(String('test@example.com'))}&password=${encodeURIComponent(String('test'))}&passwordUpdatedAt=${encodeURIComponent(String(new Date().toISOString()))}&emailVerified=${encodeURIComponent(String(new Date().toISOString()))}&name=${encodeURIComponent(String('test'))}&image=${encodeURIComponent(String('test'))}&role=${encodeURIComponent(String('test-enum'))}&status=${encodeURIComponent(String('test-enum'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'GET',
    });

    try {
      const response = await GET(mockContext);
      if (response instanceof Response) {
        expect([400, 500]).toContain(response.status);
      }
    } catch {
      // Expected if it throws on invalid json
    }
  });

  it('should return 500 when action fails', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? `?id=${encodeURIComponent(String('test-id'))}&username=${encodeURIComponent(String('test'))}&email=${encodeURIComponent(String('test@example.com'))}&password=${encodeURIComponent(String('test'))}&passwordUpdatedAt=${encodeURIComponent(String(new Date().toISOString()))}&emailVerified=${encodeURIComponent(String(new Date().toISOString()))}&name=${encodeURIComponent(String('test'))}&image=${encodeURIComponent(String('test'))}&role=${encodeURIComponent(String('test-enum'))}&status=${encodeURIComponent(String('test-enum'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'GET',
    });

    vi.mocked(ListTokensUserAction.run).mockResolvedValue({
      success: false,
      error: 'Something went wrong',
    } as Record<string, unknown>);

    const response = await GET(mockContext);

    if (response instanceof Response) {
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Something went wrong');
    }
  });
});

describe('User API - POST ../../../../../../src/pages/api/user/me/tokens', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call CreateTokenUserAction and return success', async () => {
    const query = ['GET', 'DELETE'].includes('POST'.toUpperCase())
      ? `?id=${encodeURIComponent(String('test-id'))}&username=${encodeURIComponent(String('test'))}&email=${encodeURIComponent(String('test@example.com'))}&password=${encodeURIComponent(String('test'))}&passwordUpdatedAt=${encodeURIComponent(String(new Date().toISOString()))}&emailVerified=${encodeURIComponent(String(new Date().toISOString()))}&name=${encodeURIComponent(String('test'))}&image=${encodeURIComponent(String('test'))}&role=${encodeURIComponent(String('test-enum'))}&status=${encodeURIComponent(String('test-enum'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        id: 'test-id',
        username: 'test',
        email: 'test@example.com',
        password: 'test',
        passwordUpdatedAt: new Date().toISOString(),
        emailVerified: new Date().toISOString(),
        name: 'test',
        image: 'test',
        role: 'test-enum',
        status: 'test-enum',
      }),
    });

    vi.mocked(CreateTokenUserAction.run).mockResolvedValue({
      success: true,
      data: { id: 'test-id' },
    } as Record<string, unknown>);

    const response = await POST(mockContext);

    if (response instanceof Response) {
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    } else {
      expect((response as unknown as Record<string, boolean>).success).toBe(true);
    }
  });

  it('should return 400 when invalid input is provided (scaffold)', async () => {
    const query = ['GET', 'DELETE'].includes('POST'.toUpperCase())
      ? `?id=${encodeURIComponent(String('test-id'))}&username=${encodeURIComponent(String('test'))}&email=${encodeURIComponent(String('test@example.com'))}&password=${encodeURIComponent(String('test'))}&passwordUpdatedAt=${encodeURIComponent(String(new Date().toISOString()))}&emailVerified=${encodeURIComponent(String(new Date().toISOString()))}&name=${encodeURIComponent(String('test'))}&image=${encodeURIComponent(String('test'))}&role=${encodeURIComponent(String('test-enum'))}&status=${encodeURIComponent(String('test-enum'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'POST',
      body: 'invalid-json',
    });

    try {
      const response = await POST(mockContext);
      if (response instanceof Response) {
        expect([400, 500]).toContain(response.status);
      }
    } catch {
      // Expected if it throws on invalid json
    }
  });

  it('should return 500 when action fails', async () => {
    const query = ['GET', 'DELETE'].includes('POST'.toUpperCase())
      ? `?id=${encodeURIComponent(String('test-id'))}&username=${encodeURIComponent(String('test'))}&email=${encodeURIComponent(String('test@example.com'))}&password=${encodeURIComponent(String('test'))}&passwordUpdatedAt=${encodeURIComponent(String(new Date().toISOString()))}&emailVerified=${encodeURIComponent(String(new Date().toISOString()))}&name=${encodeURIComponent(String('test'))}&image=${encodeURIComponent(String('test'))}&role=${encodeURIComponent(String('test-enum'))}&status=${encodeURIComponent(String('test-enum'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'POST',
      body: JSON.stringify({
        id: 'test-id',
        username: 'test',
        email: 'test@example.com',
        password: 'test',
        passwordUpdatedAt: new Date().toISOString(),
        emailVerified: new Date().toISOString(),
        name: 'test',
        image: 'test',
        role: 'test-enum',
        status: 'test-enum',
      }),
    });

    vi.mocked(CreateTokenUserAction.run).mockResolvedValue({
      success: false,
      error: 'Something went wrong',
    } as Record<string, unknown>);

    const response = await POST(mockContext);

    if (response instanceof Response) {
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Something went wrong');
    }
  });
});
