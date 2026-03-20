// GENERATED CODE - DO NOT MODIFY
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});

import { db } from '@/lib/core/db';
import type { APIContext } from 'astro';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { onRequest } from '../../src/middleware';

vi.mock('@/lib/core/db', () => {
  const mockModelProps = { id: '1', status: 'ACTIVE', email: 'test@example.com' };
  const mockModel = {
    findUnique: vi.fn().mockResolvedValue(mockModelProps),
    findFirst: vi.fn().mockResolvedValue(mockModelProps),
    update: vi.fn().mockResolvedValue(mockModelProps),
  };
  return {
    db: new Proxy(
      {},
      {
        get: (target: Record<string, unknown>, prop: string): unknown => {
          if (typeof prop === 'string' && !prop.startsWith('$')) {
            return mockModel;
          }
          return target[prop];
        },
      },
    ),
  };
});

describe('Middleware: user-api', () => {
  let mockContext: Record<string, unknown>;
  let mockNext: vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNext = vi.fn().mockResolvedValue(new Response());
    mockContext = {
      url: new URL('http://localhost/api/test'),
      request: {
        headers: new Headers(),
      },
      locals: {
        session: {
          get: vi.fn(),
        },
      },

      cookies: {
        get: vi.fn(),
      },
    };
  });

  it('should be defined', () => {
    expect(onRequest).toBeDefined();
  });

  it('should call next() for public routes', async () => {
    mockContext.url = new URL('http://localhost/api/health');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from session when valid session exists', async () => {
    (mockContext.locals as Record<string, unknown>).session.get.mockResolvedValue({
      id: 'user-1',
      type: 'user',
      email: 'test@example.com',
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('user-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should map actor from API Key with prefix ne_pat_ when valid key exists', async () => {
    const tokenModel = 'PersonalAccessToken';
    const actorModel = 'user';

    mockContext.request.headers.set('Authorization', 'Bearer ne_pat_valid-key');

    // Mock the token lookup
    vi.mocked((db as unknown as Record<string, unknown>)[tokenModel].findFirst).mockResolvedValue({
      id: 'token-1',
      [actorModel]: {
        id: 'actor-1',
        type: 'user',
        name: 'Test Actor',
        status: 'ACTIVE',
      },
    });

    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockContext.locals.actor).toBeDefined();
    expect(mockContext.locals.actor.id).toBe('actor-1');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should proceed even if unauthorized (Bouncer logic)', async () => {
    mockContext.request.headers.set('Authorization', 'Bearer invalid');
    await onRequest(
      mockContext as unknown as APIContext,
      mockNext as unknown as (context: APIContext) => Promise<Response>,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
