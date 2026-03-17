// GENERATED CODE - DO NOT MODIFY
import type { ApiActor } from '@/lib/api/api-docs';
import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';
import type { ServiceResponse } from '@/types/service';
import type { PersonalAccessToken, Prisma } from '@prisma/client';

/** Service class for PersonalAccessToken-related business logic. */
export class PersonalAccessTokenService {
  public static async list(
    params?: Prisma.PersonalAccessTokenFindManyArgs,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PersonalAccessToken[]>> {
    try {
      let { where, take, skip, orderBy, select } = params || {};

      // Allow hooks to modify the query parameters (e.g. for scoping)
      // Pass actor context if available
      const filteredParams = await HookSystem.filter('personalAccessToken.beforeList', {
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
        db.personalAccessToken.findMany({ where, take, skip, orderBy, select }),
        db.personalAccessToken.count({ where }),
      ]);

      const filteredData = await HookSystem.filter('personalAccessToken.list', data);

      return { success: true, data: filteredData, total };
    } catch (error) {
      Logger.error('PersonalAccessToken list Error', error);
      return { success: false, error: 'personalAccessToken.service.error.list_failed' };
    }
  }

  public static async get(
    id: string,
    select?: Prisma.PersonalAccessTokenSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PersonalAccessToken | null>> {
    try {
      const data = await db.personalAccessToken.findUnique({ where: { id }, select });
      if (!data) return { success: false, error: 'personalAccessToken.service.error.not_found' };

      const filtered = await HookSystem.filter('personalAccessToken.read', data, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('PersonalAccessToken get Error', error);
      return { success: false, error: 'personalAccessToken.service.error.get_failed' };
    }
  }

  public static async create(
    data: Prisma.PersonalAccessTokenCreateInput,
    select?: Prisma.PersonalAccessTokenSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PersonalAccessToken>> {
    try {
      // Pass actor context to hooks for security/authorship validation
      const input = await HookSystem.filter('personalAccessToken.beforeCreate', data, { actor });

      const newItem = await db.$transaction(async (tx) => {
        const created = await tx.personalAccessToken.create({
          data: input as Prisma.PersonalAccessTokenCreateInput,
          select,
        });
        await HookSystem.dispatch('personalAccessToken.created', {
          id: created.id,
          actorId: actor?.id || 'system',
        });
        return created;
      });

      const filtered = await HookSystem.filter('personalAccessToken.read', newItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('PersonalAccessToken create Error', error);
      return { success: false, error: 'personalAccessToken.service.error.create_failed' };
    }
  }

  public static async update(
    id: string,
    data: Prisma.PersonalAccessTokenUpdateInput,
    select?: Prisma.PersonalAccessTokenSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PersonalAccessToken>> {
    try {
      const input = await HookSystem.filter('personalAccessToken.beforeUpdate', data, {
        actor,
        id,
      });

      const updatedItem = await db.$transaction(async (tx) => {
        const updated = await tx.personalAccessToken.update({
          where: { id },
          data: input as Prisma.PersonalAccessTokenUpdateInput,
          select,
        });
        await HookSystem.dispatch('personalAccessToken.updated', {
          id,
          changes: Object.keys(input),
          actorId: actor?.id,
        });
        return updated;
      });

      const filtered = await HookSystem.filter('personalAccessToken.read', updatedItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('PersonalAccessToken update Error', error);
      return { success: false, error: 'personalAccessToken.service.error.update_failed' };
    }
  }

  public static async delete(id: string, actor?: ApiActor): Promise<ServiceResponse<void>> {
    try {
      await db.$transaction(async (tx) => {
        await tx.personalAccessToken.delete({ where: { id } });
        await HookSystem.dispatch('personalAccessToken.deleted', { id, actorId: actor?.id });
      });
      return { success: true };
    } catch (error) {
      Logger.error('PersonalAccessToken delete Error', error);
      return { success: false, error: 'personalAccessToken.service.error.delete_failed' };
    }
  }
}
