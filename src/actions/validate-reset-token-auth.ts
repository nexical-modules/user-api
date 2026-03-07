// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { db } from '@/lib/core/db';
import type { ServiceResponse } from '@/types/service';
import type { ValidateResetTokenDTO, ValidateResetTokenResponseDTO } from '../sdk/types';
import type { APIContext } from 'astro';

export class ValidateResetTokenAuthAction {
  public static async run(
    input: ValidateResetTokenDTO,
    context: APIContext,
  ): Promise<ServiceResponse<ValidateResetTokenResponseDTO>> {
    try {
      const token = await db.passwordResetToken.findUnique({
        where: { token: input.token },
      });

      if (!token || new Date() > token.expires) {
        return { success: true, data: { valid: false } };
      }

      return { success: true, data: { valid: true, email: token.email } };
    } catch {
      return { success: false, error: 'user.service.error.validate_token_failed' };
    }
  }
}
