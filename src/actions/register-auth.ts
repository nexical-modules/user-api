// GENERATED CODE - DO NOT MODIFY
import type { ServiceResponse } from '@/types/service';
import { UserModuleTypes } from '@/lib/api';
import { AuthService } from '../services/auth-service';
import type { APIContext } from 'astro';

export class RegisterAuthAction {
  public static async run(
    input: UserModuleTypes.CreateUserDTO,
    context: APIContext,
  ): Promise<ServiceResponse<UserModuleTypes.User>> {
    return AuthService.register(input);
  }
}
