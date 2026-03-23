import type { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import crypto from 'node:crypto';

export const actors = {
  user: async (client: ApiClient, params: Record<string, unknown> = {}) => {
    let actor;
    if (params.id) {
      actor = await Factory.prisma.user.findUnique({ where: { id: params.id as string } });
    } else if (params.email) {
      actor = await Factory.prisma.user.findFirst({ where: { email: params.email } });
    }

    if (!actor) {
      const factoryParams = { ...params };
      if (factoryParams.strategy) delete factoryParams.strategy;

      actor = await Factory.create('user', factoryParams);
    }

    const rawKey = `ne_pat_${crypto.randomUUID().replace(/-/g, '')}`;
    let dbKey = rawKey;

    dbKey = crypto.createHash('sha256').update(rawKey).digest('hex');

    // Verify user exists to avoid Prisma connect errors
    const check = await Factory.prisma.user.findUnique({ where: { id: actor.id } });
    if (!check) {
      throw new Error(
        `[Actor] User ${actor.id} was "created" but not found in DB before PAT creation.`,
      );
    }

    await Factory.create('personalAccessToken', {
      userId: actor.id,
      user: undefined,
      name: 'Test Token',
      hashedKey: dbKey,
      prefix: 'ne_pat_',
    });

    client.useToken(rawKey);

    return { ...actor, token: { rawKey } };
  },
};
