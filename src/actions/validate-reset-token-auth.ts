// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { ValidateResetTokenDTO, ValidateResetTokenResponseDTO } from '../sdk/types';
import type { APIContext } from 'astro';

export class ValidateResetTokenAuthAction {
  public static async run(
    input: ValidateResetTokenDTO,
    context: APIContext,
  ): Promise<ServiceResponse<ValidateResetTokenResponseDTO>> {
    const data = await validateResetToken(input);
    return { success: true, data };
  }
}
