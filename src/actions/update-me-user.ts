// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { UpdateUserDTO, User } from '../sdk/types';
import type { APIContext } from 'astro';
import type { ApiActor } from '@/lib/api/api-docs';

export class UpdateMeUserAction {
  public static async run(
    input: UpdateUserDTO,
    context: APIContext,
  ): Promise<ServiceResponse<User>> {
    const userId = input.id || context.locals.actor?.id;

    if (!userId) return { success: false, error: 'user.service.error.missing_user_id' };

    return UserService.update(userId, input);
  }
}
