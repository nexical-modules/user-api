// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { LogoutDTO } from '../sdk/types';

export class LogoutAuthAction {
  public static async run(input: LogoutDTO, context: APIContext): Promise<ServiceResponse<void>> {
    return { success: true, data: {} };
  }
}
