// GENERATED CODE - DO NOT MODIFY
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthSDK } from '../../../src/sdk/auth-sdk';

describe('AuthSDK', () => {
  let sdk: AuthSDK;
  let mockClient: { request: vi.Mock };

  beforeEach(() => {
    vi.clearAllMocks();
    mockClient = {
      request: vi.fn().mockResolvedValue({ success: true, data: { id: 'test-id' } }),
    };
    sdk = new AuthSDK(mockClient as unknown as Record<string, unknown>);
  });

  it('should initialize', () => {
    expect(sdk).toBeDefined();
  });

  it('should call POST /register on register()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/register'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).register(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'register';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on register()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/register'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).register(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /login on login()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/login'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).login(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'login';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on login()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/login'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).login(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /logout on logout()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/logout'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).logout(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'logout';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on logout()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/logout'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).logout(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /invite on inviteUser()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/invite'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).inviteUser(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'invite';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on inviteUser()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/invite'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).inviteUser(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /verify-email on verifyEmail()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/verify-email'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).verifyEmail(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'verify-email';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on verifyEmail()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/verify-email'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).verifyEmail(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /password/request-reset on requestPasswordReset()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/password/request-reset'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).requestPasswordReset(...args);

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'password/request-reset';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on requestPasswordReset()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/password/request-reset'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).requestPasswordReset(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /password/reset on resetPassword()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/password/reset'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).resetPassword(...args);

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'password/reset';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on resetPassword()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/password/reset'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).resetPassword(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /password/validate-token on validateResetToken()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/password/validate-token'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).validateResetToken(...args);

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'password/validate-token';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on validateResetToken()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/password/validate-token'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).validateResetToken(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });
});
