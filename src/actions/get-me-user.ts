// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { User } from '../sdk/types';
import type { APIContext } from 'astro';
import { UserService } from '../services/user-service';

export class GetMeUserAction {
  public static async run(_input: void, context: APIContext): Promise<ServiceResponse<User>> {
    const userId = context.locals.actor?.id;
    if (!userId) return { success: false, error: 'user.service.error.missing_user_id' };

    const result = await UserService.get(userId);
    if (!result.success || !result.data) {
      return { success: false, error: result.error || 'user.service.error.not_found' };
    }

    return { success: true, data: result.data };
  }
}
