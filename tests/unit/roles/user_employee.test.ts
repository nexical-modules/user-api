// GENERATED CODE - DO NOT MODIFY
import { db } from '@/lib/core/db';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserEmployeeRole } from '../../../src/roles/user_employee';

vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
    teamMember: { findUnique: vi.fn() },
  },
}));

describe('UserEmployeeRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (db.teamMember) {
      vi.mocked(db.teamMember.findUnique).mockResolvedValue({ id: 'test-membership' } as any);
    }
  });
  it('should be correctly defined', () => {
    const role = new UserEmployeeRole();
    expect(role.name).toBe('USER_EMPLOYEE');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserEmployeeRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_EMPLOYEE', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(
      role.check(mockContext, mockContext.params as Record<string, unknown>, {}),
    ).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserEmployeeRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(
      role.check(mockContext, mockContext.params as Record<string, unknown>, {}),
    ).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserEmployeeRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(
      role.check(mockContext, mockContext.params as Record<string, unknown>, {}),
    ).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserEmployeeRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
