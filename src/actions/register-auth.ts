// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { CreateUserDTO, User } from '../sdk/types';
import { AuthService } from '../services/auth-service';

export class RegisterAuthAction {
  public static async run(
    input: CreateUserDTO,
    context: APIContext,
  ): Promise<ServiceResponse<User>> {
    return AuthService.register(input);
  }
}
