// GENERATED CODE - DO NOT MODIFY
import { db } from '@/lib/core/db';
import type { ServiceResponse } from '@/types/service';
import { HookSystem } from '@/lib/modules/hooks';
import type { Session, Prisma } from '@prisma/client';
import type { ApiActor } from '@/lib/api/api-docs';
import { Logger } from '@/lib/core/logger';

/** Service class for Session-related business logic. */
export class SessionService {
  public static async list(
    params?: Prisma.SessionFindManyArgs,
    actor?: ApiActor,
  ): Promise<ServiceResponse<Session[]>> {
    try {
      let { where, take, skip, orderBy, select } = params || {};

      // Allow hooks to modify the query parameters (e.g. for scoping)
      // Pass actor context if available
      const filteredParams = await HookSystem.filter('session.beforeList', {
        where,
        take,
        skip,
        orderBy,
        select,
        actor,
      });
      where = filteredParams.where;
      take = filteredParams.take;
      skip = filteredParams.skip;
      orderBy = filteredParams.orderBy;
      select = filteredParams.select;

      const [data, total] = await db.$transaction([
        db.session.findMany({ where, take, skip, orderBy, select }),
        db.session.count({ where }),
      ]);

      const filteredData = await HookSystem.filter('session.list', data);

      return { success: true, data: filteredData, total };
    } catch (error) {
      Logger.error('Session list Error', error);
      return { success: false, error: 'session.service.error.list_failed' };
    }
  }

  public static async get(
    id: string,
    select?: Prisma.SessionSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<Session | null>> {
    try {
      const data = await db.session.findUnique({ where: { id }, select });
      if (!data) return { success: false, error: 'session.service.error.not_found' };

      const filtered = await HookSystem.filter('session.read', data, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('Session get Error', error);
      return { success: false, error: 'session.service.error.get_failed' };
    }
  }

  public static async create(
    data: Prisma.SessionCreateInput,
    select?: Prisma.SessionSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<Session>> {
    try {
      // Pass actor context to hooks for security/authorship validation
      const input = await HookSystem.filter('session.beforeCreate', data, { actor });

      const newItem = await db.$transaction(async (tx) => {
        const created = await tx.session.create({
          data: input as Prisma.SessionCreateInput,
          select,
        });
        await HookSystem.dispatch('session.created', {
          id: created.id,
          actorId: actor?.id || 'system',
        });
        return created;
      });

      const filtered = await HookSystem.filter('session.read', newItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('Session create Error', error);
      return { success: false, error: 'session.service.error.create_failed' };
    }
  }

  public static async update(
    id: string,
    data: Prisma.SessionUpdateInput,
    select?: Prisma.SessionSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<Session>> {
    try {
      const input = await HookSystem.filter('session.beforeUpdate', data, { actor, id });

      const updatedItem = await db.$transaction(async (tx) => {
        const updated = await tx.session.update({
          where: { id },
          data: input as Prisma.SessionUpdateInput,
          select,
        });
        await HookSystem.dispatch('session.updated', {
          id,
          changes: Object.keys(input),
          actorId: actor?.id,
        });
        return updated;
      });

      const filtered = await HookSystem.filter('session.read', updatedItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('Session update Error', error);
      return { success: false, error: 'session.service.error.update_failed' };
    }
  }

  public static async delete(id: string, actor?: ApiActor): Promise<ServiceResponse<void>> {
    try {
      await db.$transaction(async (tx) => {
        await tx.session.delete({ where: { id } });
        await HookSystem.dispatch('session.deleted', { id, actorId: actor?.id });
      });
      return { success: true };
    } catch (error) {
      Logger.error('Session delete Error', error);
      return { success: false, error: 'session.service.error.delete_failed' };
    }
  }
}
