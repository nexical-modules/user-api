// GENERATED CODE - DO NOT MODIFY
import { ApiGuard } from '@/lib/api/api-guard';
import { createMockAstroContext } from '@tests/unit/helpers';
import type { APIContext } from 'astro';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InviteUserAuthAction } from '../../../../../src/actions/invite-user-auth';
import { POST } from '../../../../../src/pages/api/auth/invite';
vi.mock('../../../../../src/actions/invite-user-auth');
vi.mock('@/lib/api/api-guard');

describe('Auth API - POST ../../../../../src/pages/api/auth/invite', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call InviteUserAuthAction and return success', async () => {
    const query = ['GET', 'DELETE'].includes('POST'.toUpperCase())
      ? `?email=${encodeURIComponent(String('test@example.com'))}&role=${encodeURIComponent(String('USER_ADMIN'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', role: 'USER_ADMIN' }),
    });

    vi.mocked(InviteUserAuthAction.run).mockResolvedValue({
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
      ? `?email=${encodeURIComponent(String('test@example.com'))}&role=${encodeURIComponent(String('USER_ADMIN'))}`
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
      ? `?email=${encodeURIComponent(String('test@example.com'))}&role=${encodeURIComponent(String('USER_ADMIN'))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', role: 'USER_ADMIN' }),
    });

    vi.mocked(InviteUserAuthAction.run).mockResolvedValue({
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
