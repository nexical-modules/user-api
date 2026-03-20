// GENERATED CODE - DO NOT MODIFY
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserContractorRole } from '../../../src/roles/user_contractor';

vi.mock('@/lib/core/db', () => ({
  db: {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn() },
    agent: { findUnique: vi.fn() },
    team: { findUnique: vi.fn() },
  },
}));

describe('UserContractorRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should be correctly defined', () => {
    const role = new UserContractorRole();
    expect(role.name).toBe('USER_CONTRACTOR');
    expect(role.permissions).toBeDefined();
    expect(Array.isArray(role.permissions)).toBe(true);
  });

  it('should pass check for exactly matching role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_CONTRACTOR', id: 'test-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test?foo=bar'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should pass check for USER_ADMIN', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'USER_ADMIN', id: 'admin-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).resolves.not.toThrow();
  });

  it('should throw error for unauthorized role', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {
        actor: { role: 'WRONG_ROLE', id: 'wrong-user' },
      },
      params: { id: 'test-id' },
      url: new URL('http://localhost/api/test'),
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Forbidden');
  });

  it('should throw error if no actor found', async () => {
    const role = new UserContractorRole();
    const mockContext = {
      locals: {},
    } as Record<string, unknown>;

    await expect(role.check(mockContext, {}, {})).rejects.toThrow('Unauthorized: No actor found');
  });
});
