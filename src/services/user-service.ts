// GENERATED CODE - DO NOT MODIFY
import type { ApiActor } from '@/lib/api/api-docs';
import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';
import type { ServiceResponse } from '@/types/service';
import type { Prisma, User } from '@prisma/client';

/** Service class for User-related business logic. */
export class UserService {
  public static async list(
    params?: Prisma.UserFindManyArgs,
    actor?: ApiActor,
  ): Promise<ServiceResponse<User[]>> {
    try {
      let { where, take, skip, orderBy, select } = params || {};

      // Allow hooks to modify the query parameters (e.g. for scoping)
      // Pass actor context if available
      const filteredParams = await HookSystem.filter('user.beforeList', {
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
        db.user.findMany({ where, take, skip, orderBy, select }),
        db.user.count({ where }),
      ]);

      const filteredData = await HookSystem.filter('user.list', data);

      return { success: true, data: filteredData, total };
    } catch (error) {
      Logger.error('User list Error', error);
      return { success: false, error: 'user.service.error.list_failed' };
    }
  }

  public static async get(
    id: string,
    select?: Prisma.UserSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<User | null>> {
    try {
      const data = await db.user.findUnique({ where: { id }, select });
      if (!data) return { success: false, error: 'user.service.error.not_found' };

      const filtered = await HookSystem.filter('user.read', data, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('User get Error', error);
      return { success: false, error: 'user.service.error.get_failed' };
    }
  }

  public static async create(
    data: Prisma.UserCreateInput,
    select?: Prisma.UserSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<User>> {
    try {
      // Pass actor context to hooks for security/authorship validation
      const input = await HookSystem.filter('user.beforeCreate', data, { actor });

      const newItem = await db.$transaction(async (tx) => {
        const created = await tx.user.create({ data: input as Prisma.UserCreateInput, select });
        await HookSystem.dispatch('user.created', {
          id: created.id,
          actorId: actor?.id || 'system',
        });
        return created;
      });

      const filtered = await HookSystem.filter('user.read', newItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('User create Error', error);
      return { success: false, error: 'user.service.error.create_failed' };
    }
  }

  public static async update(
    id: string,
    data: Prisma.UserUpdateInput,
    select?: Prisma.UserSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<User>> {
    try {
      const input = await HookSystem.filter('user.beforeUpdate', data, { actor, id });

      const updatedItem = await db.$transaction(async (tx) => {
        const updated = await tx.user.update({
          where: { id },
          data: input as Prisma.UserUpdateInput,
          select,
        });
        await HookSystem.dispatch('user.updated', {
          id,
          changes: Object.keys(input),
          actorId: actor?.id,
        });
        return updated;
      });

      const filtered = await HookSystem.filter('user.read', updatedItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('User update Error', error);
      return { success: false, error: 'user.service.error.update_failed' };
    }
  }

  public static async delete(id: string, actor?: ApiActor): Promise<ServiceResponse<void>> {
    try {
      await db.$transaction(async (tx) => {
        await tx.user.delete({ where: { id } });
        await HookSystem.dispatch('user.deleted', { id, actorId: actor?.id });
      });
      return { success: true };
    } catch (error) {
      Logger.error('User delete Error', error);
      return { success: false, error: 'user.service.error.delete_failed' };
    }
  }
}
