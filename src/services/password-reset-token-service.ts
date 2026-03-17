// GENERATED CODE - DO NOT MODIFY
import type { ApiActor } from '@/lib/api/api-docs';
import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';
import type { ServiceResponse } from '@/types/service';
import type { PasswordResetToken, Prisma } from '@prisma/client';

/** Service class for PasswordResetToken-related business logic. */
export class PasswordResetTokenService {
  public static async list(
    params?: Prisma.PasswordResetTokenFindManyArgs,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PasswordResetToken[]>> {
    try {
      let { where, take, skip, orderBy, select } = params || {};

      // Allow hooks to modify the query parameters (e.g. for scoping)
      // Pass actor context if available
      const filteredParams = await HookSystem.filter('passwordResetToken.beforeList', {
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
        db.passwordResetToken.findMany({ where, take, skip, orderBy, select }),
        db.passwordResetToken.count({ where }),
      ]);

      const filteredData = await HookSystem.filter('passwordResetToken.list', data);

      return { success: true, data: filteredData, total };
    } catch (error) {
      Logger.error('PasswordResetToken list Error', error);
      return { success: false, error: 'passwordResetToken.service.error.list_failed' };
    }
  }

  public static async get(
    id: string,
    select?: Prisma.PasswordResetTokenSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PasswordResetToken | null>> {
    try {
      const data = await db.passwordResetToken.findUnique({ where: { id }, select });
      if (!data) return { success: false, error: 'passwordResetToken.service.error.not_found' };

      const filtered = await HookSystem.filter('passwordResetToken.read', data, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('PasswordResetToken get Error', error);
      return { success: false, error: 'passwordResetToken.service.error.get_failed' };
    }
  }

  public static async create(
    data: Prisma.PasswordResetTokenCreateInput,
    select?: Prisma.PasswordResetTokenSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PasswordResetToken>> {
    try {
      // Pass actor context to hooks for security/authorship validation
      const input = await HookSystem.filter('passwordResetToken.beforeCreate', data, { actor });

      const newItem = await db.$transaction(async (tx) => {
        const created = await tx.passwordResetToken.create({
          data: input as Prisma.PasswordResetTokenCreateInput,
          select,
        });
        await HookSystem.dispatch('passwordResetToken.created', {
          id: created.id,
          actorId: actor?.id || 'system',
        });
        return created;
      });

      const filtered = await HookSystem.filter('passwordResetToken.read', newItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('PasswordResetToken create Error', error);
      return { success: false, error: 'passwordResetToken.service.error.create_failed' };
    }
  }

  public static async update(
    id: string,
    data: Prisma.PasswordResetTokenUpdateInput,
    select?: Prisma.PasswordResetTokenSelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<PasswordResetToken>> {
    try {
      const input = await HookSystem.filter('passwordResetToken.beforeUpdate', data, { actor, id });

      const updatedItem = await db.$transaction(async (tx) => {
        const updated = await tx.passwordResetToken.update({
          where: { id },
          data: input as Prisma.PasswordResetTokenUpdateInput,
          select,
        });
        await HookSystem.dispatch('passwordResetToken.updated', {
          id,
          changes: Object.keys(input),
          actorId: actor?.id,
        });
        return updated;
      });

      const filtered = await HookSystem.filter('passwordResetToken.read', updatedItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('PasswordResetToken update Error', error);
      return { success: false, error: 'passwordResetToken.service.error.update_failed' };
    }
  }

  public static async delete(id: string, actor?: ApiActor): Promise<ServiceResponse<void>> {
    try {
      await db.$transaction(async (tx) => {
        await tx.passwordResetToken.delete({ where: { id } });
        await HookSystem.dispatch('passwordResetToken.deleted', { id, actorId: actor?.id });
      });
      return { success: true };
    } catch (error) {
      Logger.error('PasswordResetToken delete Error', error);
      return { success: false, error: 'passwordResetToken.service.error.delete_failed' };
    }
  }
}
