// GENERATED CODE - DO NOT MODIFY
import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VerificationTokenService } from '../../../src/services/verification-token-service';

vi.mock('@/lib/core/config', () => ({
  config: {
    PUBLIC_API_URL: 'http://localhost:3000',
    NODE_ENV: 'test',
  },
  createConfig: vi.fn().mockImplementation((schema) => ({
    parse: vi.fn().mockImplementation((d) => d),
    ...schema,
  })),
  getProcessEnv: vi.fn().mockImplementation((k) => k),
}));

vi.mock('@/lib/core/db', () => {
  const mockModelProps = {
    id: '1',
    email: 'test@example.com',
    name: 'test',
    status: 'PENDING',
    role: 'TEAM_MEMBER',
    token: 'test',
    expires: new Date(),
    actorId: 'ne_pat_test',
    lockedBy: 'ne_pat_test',
    createdAt: new Date(),
    updatedAt: new Date(),
    identifier: 'test',
  };

  const isExistenceCheck = (where: Record<string, unknown>): boolean => {
    if (!where) return false;
    if (where.id) return false; // If searching by ID, assume we want the record to exist
    const fields = [
      'email',
      'username',
      'teamId_userId',
      'userId_teamId',
      'teamId_email',
      'email_teamId',
      // 'token', // Removed token from existence check as it's often used to fetch existing invitations
    ];
    const whereKeys = Object.keys(where);
    if (whereKeys.some((k) => fields.includes(k))) return true;
    if (whereKeys.some((k) => k.includes('_'))) return true;
    if (where.OR && Array.isArray(where.OR))
      return (where.OR as Record<string, unknown>[]).some((c) => isExistenceCheck(c));
    if (where.AND && Array.isArray(where.AND))
      return (where.AND as Record<string, unknown>[]).some((c) => isExistenceCheck(c));
    if (where.userId && where.teamId) return true;
    return false;
  };

  const baseMockModel = {
    findMany: () => Promise.resolve([mockModelProps]),
    findUnique: (args: { where: Record<string, unknown> }) => {
      if (isExistenceCheck(args?.where) && !args?.where?.id) return null;
      return {
        ...(mockModelProps as Record<string, unknown>),
        ...args?.where,
      };
    },
    findFirst: (args: { where: Record<string, unknown> }) => {
      if (isExistenceCheck(args?.where) && !args?.where?.id) return null;
      return {
        ...(mockModelProps as Record<string, unknown>),
        ...args?.where,
      };
    },
    create: () => Promise.resolve(mockModelProps),
    update: () => Promise.resolve(mockModelProps),
    delete: () => Promise.resolve(mockModelProps),
    count: () => Promise.resolve(1),
    upsert: () => Promise.resolve(mockModelProps),
    updateMany: () => Promise.resolve({ count: 1 }),
    deleteMany: () => Promise.resolve({ count: 1 }),
    groupBy: () => Promise.resolve([{ _count: { id: 1 }, status: 'ACTIVE' }]),
    aggregate: () => Promise.resolve({ _count: { id: 1 }, _avg: { value: 0 } }),
  };

  const mockModel = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
    upsert: vi.fn(),
    updateMany: vi.fn(),
    deleteMany: vi.fn(),
    groupBy: vi.fn(),
    aggregate: vi.fn(),
    ...(mockModelProps as Record<string, unknown>),
  };

  const handler = {
    get: (target: Record<string, unknown>, prop: string): unknown => {
      if (prop === '$transaction') {
        return vi.fn().mockImplementation(async (input) => {
          if (Array.isArray(input)) return Promise.all(input);
          return typeof input === 'function'
            ? input(new Proxy({}, handler as ProxyHandler<object>))
            : input;
        });
      }
      if (typeof prop === 'string' && !prop.startsWith('$')) {
        return mockModel;
      }
      return target[prop];
    },
  };

  const resetImplementations = () => {
    Object.keys(baseMockModel).forEach((key) => {
      (mockModel as Record<string, import('vitest').Mock>)[key].mockImplementation(
        (baseMockModel as Record<string, unknown>)[key] as (...args: unknown[]) => unknown,
      );
    });
  };

  resetImplementations();

  (globalThis as unknown as Record<string, () => void>)._resetVerificationTokenServiceMocks =
    resetImplementations;
  return {
    db: new Proxy({}, handler),
  };
});

vi.mock('@/lib/core/logger', () => ({
  Logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock('@/lib/modules/hooks', () => ({
  HookSystem: {
    dispatch: vi.fn(),
    filter: vi.fn(),
    on: vi.fn(),
  },
}));

describe('VerificationTokenService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    const globalAny = globalThis as unknown as Record<string, () => void>;
    if (globalAny._resetVerificationTokenServiceMocks) {
      globalAny._resetVerificationTokenServiceMocks();
    }

    // Restore HookSystem implementations
    vi.mocked(HookSystem.dispatch).mockResolvedValue(undefined);
    vi.mocked(HookSystem.filter).mockImplementation((_name, data) => Promise.resolve(data));

    // Restore Logger implementations
    vi.mocked(Logger.error).mockImplementation(() => {});
    vi.mocked(Logger.info).mockImplementation(() => {});
    vi.mocked(Logger.warn).mockImplementation(() => {});
    vi.mocked(Logger.debug).mockImplementation(() => {});
  });

  describe('list', () => {
    it('should return a list of VerificationTokens', async () => {
      const mockData = [{ id: '1' }];
      vi.mocked(db.verificationToken.findMany).mockResolvedValue(
        mockData as unknown as Record<string, unknown>[],
      );

      const result = await VerificationTokenService.list();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(db.verificationToken.findMany).toHaveBeenCalled();
    });

    it('should handle errors when listing', async () => {
      vi.mocked(db.verificationToken.findMany).mockRejectedValue(new Error('DB Error'));

      const result = await VerificationTokenService.list();

      expect(result.success).toBe(false);
      expect(result.error).toBe('verificationToken.service.error.list_failed');
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should return a single VerificationToken', async () => {
      const mockData = { id: '1' };
      vi.mocked(db.verificationToken.findUnique).mockResolvedValue(
        mockData as unknown as Record<string, unknown>,
      );

      const result = await VerificationTokenService.get('1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(db.verificationToken.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: '1' },
        }),
      );
    });

    it('should handle not found', async () => {
      vi.mocked(db.verificationToken.findUnique).mockResolvedValue(null);

      const result = await VerificationTokenService.get('1');

      expect(result.success).toBe(false);
      expect(result.error).toBe('verificationToken.service.error.not_found');
    });

    it('should handle errors when getting', async () => {
      vi.mocked(db.verificationToken.findUnique).mockRejectedValue(new Error('DB Error'));

      const result = await VerificationTokenService.get('1');

      expect(result.success).toBe(false);
      expect(result.error).toBe('verificationToken.service.error.get_failed');
    });
  });

  describe('create', () => {
    it('should create a new VerificationToken', async () => {
      const mockData = { id: '1', name: 'test' };
      vi.mocked(db.verificationToken.create).mockResolvedValue(
        mockData as unknown as Record<string, unknown>,
      );

      const result = await VerificationTokenService.create({ name: 'test' } as Record<
        string,
        unknown
      >);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(db.verificationToken.create).toHaveBeenCalled();
    });

    it('should handle errors when creating', async () => {
      vi.mocked(db.verificationToken.create).mockRejectedValue(new Error('DB Error'));

      const result = await VerificationTokenService.create({} as Record<string, unknown>);

      expect(result.success).toBe(false);
      expect(result.error).toBe('verificationToken.service.error.create_failed');
    });
  });

  describe('update', () => {
    it('should update an existing VerificationToken', async () => {
      const mockData = { id: '1', name: 'updated' };
      vi.mocked(db.verificationToken.update).mockResolvedValue(
        mockData as unknown as Record<string, unknown>,
      );

      const result = await VerificationTokenService.update('1', { name: 'updated' } as Record<
        string,
        unknown
      >);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(db.verificationToken.update).toHaveBeenCalled();
    });

    it('should handle errors when updating', async () => {
      vi.mocked(db.verificationToken.update).mockRejectedValue(new Error('DB Error'));

      const result = await VerificationTokenService.update('1', {} as Record<string, unknown>);

      expect(result.success).toBe(false);
      expect(result.error).toBe('verificationToken.service.error.update_failed');
    });
  });

  describe('delete', () => {
    it('should delete an VerificationToken', async () => {
      vi.mocked(db.verificationToken.delete).mockResolvedValue(
        {} as unknown as Record<string, unknown>,
      );

      const result = await VerificationTokenService.delete('1');

      expect(result.success).toBe(true);
      expect(db.verificationToken.delete).toHaveBeenCalled();
    });

    it('should handle errors when deleting', async () => {
      vi.mocked(db.verificationToken.delete).mockRejectedValue(new Error('DB Error'));

      const result = await VerificationTokenService.delete('1');

      expect(result.success).toBe(false);
      expect(result.error).toBe('verificationToken.service.error.delete_failed');
    });
  });
});
