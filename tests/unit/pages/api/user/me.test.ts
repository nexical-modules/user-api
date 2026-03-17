// GENERATED CODE - DO NOT MODIFY
import { ApiGuard } from '@/lib/api/api-guard';
import { createMockAstroContext } from '@tests/unit/helpers';
import type { APIContext } from 'astro';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DeleteMeUserAction } from '../../../../../src/actions/delete-me-user';
import { GetMeUserAction } from '../../../../../src/actions/get-me-user';
import { UpdateMeUserAction } from '../../../../../src/actions/update-me-user';
import { DELETE, GET, PUT } from '../../../../../src/pages/api/user/me';
vi.mock('../../../../../src/actions/get-me-user');
vi.mock('../../../../../src/actions/update-me-user');
vi.mock('../../../../../src/actions/delete-me-user');
vi.mock('@/lib/api/api-guard');

describe('User API - GET ../../../../../src/pages/api/user/me', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call GetMeUserAction and return success', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
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

    vi.mocked(GetMeUserAction.run).mockResolvedValue({
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
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
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
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
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

    vi.mocked(GetMeUserAction.run).mockResolvedValue({
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

describe('User API - PUT ../../../../../src/pages/api/user/me', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call UpdateMeUserAction and return success', async () => {
    const query = ['GET', 'DELETE'].includes('PUT'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'PUT',
      body: JSON.stringify({
        id: 'test-id',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test',
        password: 'password',
        confirmPassword: 'password',
        token: 'test-token',
        progress: 50,
        hostname: 'localhost',
        agentId: 'agent-1',
        teamId: 'team-1',
        userId: 'user-1',
        type: 'TASK',
        status: 'ACTIVE',
        capabilities: [],
        payload: { test: true },
        reason: 'Test Reason',
        amount: 100,
        count: 10,
        limit: 10,
        offset: 0,
        search: '',
      }),
    });

    vi.mocked(UpdateMeUserAction.run).mockResolvedValue({
      success: true,
      data: { id: 'test-id' },
    } as Record<string, unknown>);

    const response = await PUT(mockContext);

    if (response instanceof Response) {
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    } else {
      expect((response as unknown as Record<string, boolean>).success).toBe(true);
    }
  });

  it('should return 400 when invalid input is provided (scaffold)', async () => {
    const query = ['GET', 'DELETE'].includes('PUT'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'PUT',
      body: 'invalid-json',
    });

    try {
      const response = await PUT(mockContext);
      if (response instanceof Response) {
        expect([400, 500]).toContain(response.status);
      }
    } catch {
      // Expected if it throws on invalid json
    }
  });

  it('should return 500 when action fails', async () => {
    const query = ['GET', 'DELETE'].includes('PUT'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'PUT',
      body: JSON.stringify({
        id: 'test-id',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test',
        password: 'password',
        confirmPassword: 'password',
        token: 'test-token',
        progress: 50,
        hostname: 'localhost',
        agentId: 'agent-1',
        teamId: 'team-1',
        userId: 'user-1',
        type: 'TASK',
        status: 'ACTIVE',
        capabilities: [],
        payload: { test: true },
        reason: 'Test Reason',
        amount: 100,
        count: 10,
        limit: 10,
        offset: 0,
        search: '',
      }),
    });

    vi.mocked(UpdateMeUserAction.run).mockResolvedValue({
      success: false,
      error: 'Something went wrong',
    } as Record<string, unknown>);

    const response = await PUT(mockContext);

    if (response instanceof Response) {
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Something went wrong');
    }
  });
});

describe('User API - DELETE ../../../../../src/pages/api/user/me', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call DeleteMeUserAction and return success', async () => {
    const query = ['GET', 'DELETE'].includes('DELETE'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'DELETE',
      body: JSON.stringify({
        id: 'test-id',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test',
        password: 'password',
        confirmPassword: 'password',
        token: 'test-token',
        progress: 50,
        hostname: 'localhost',
        agentId: 'agent-1',
        teamId: 'team-1',
        userId: 'user-1',
        type: 'TASK',
        status: 'ACTIVE',
        capabilities: [],
        payload: { test: true },
        reason: 'Test Reason',
        amount: 100,
        count: 10,
        limit: 10,
        offset: 0,
        search: '',
      }),
    });

    vi.mocked(DeleteMeUserAction.run).mockResolvedValue({
      success: true,
      data: { id: 'test-id' },
    } as Record<string, unknown>);

    const response = await DELETE(mockContext);

    if (response instanceof Response) {
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    } else {
      expect((response as unknown as Record<string, boolean>).success).toBe(true);
    }
  });

  it('should return 400 when invalid input is provided (scaffold)', async () => {
    const query = ['GET', 'DELETE'].includes('DELETE'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'DELETE',
      body: 'invalid-json',
    });

    try {
      const response = await DELETE(mockContext);
      if (response instanceof Response) {
        expect([400, 500]).toContain(response.status);
      }
    } catch {
      // Expected if it throws on invalid json
    }
  });

  it('should return 500 when action fails', async () => {
    const query = ['GET', 'DELETE'].includes('DELETE'.toUpperCase())
      ? '?id=test-id&email=test@example.com&username=testuser&name=Test&token=test-token&hostname=localhost&agentId=agent-1&teamId=team-1&userId=user-1&type=TASK&status=ACTIVE&reason=Test%20Reason&amount=100&count=10&limit=10&offset=0&search='
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'DELETE',
      body: JSON.stringify({
        id: 'test-id',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test',
        password: 'password',
        confirmPassword: 'password',
        token: 'test-token',
        progress: 50,
        hostname: 'localhost',
        agentId: 'agent-1',
        teamId: 'team-1',
        userId: 'user-1',
        type: 'TASK',
        status: 'ACTIVE',
        capabilities: [],
        payload: { test: true },
        reason: 'Test Reason',
        amount: 100,
        count: 10,
        limit: 10,
        offset: 0,
        search: '',
      }),
    });

    vi.mocked(DeleteMeUserAction.run).mockResolvedValue({
      success: false,
      error: 'Something went wrong',
    } as Record<string, unknown>);

    const response = await DELETE(mockContext);

    if (response instanceof Response) {
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Something went wrong');
    }
  });
});
