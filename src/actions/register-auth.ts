// GENERATED CODE - DO NOT MODIFY
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { CreateUserDTO, User } from '../sdk/types';

export class RegisterAuthAction {
  public static async run(
    input: CreateUserDTO,
    context: APIContext,
  ): Promise<ServiceResponse<User>> {
    return AuthService.register(input);
  }
}
