// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { ListTokensDTO, PersonalAccessToken } from '../sdk/types';
import { PersonalAccessTokenService } from '../services/personal-access-token-service';

export class ListTokensUserAction {
  public static async run(
    input: ListTokensDTO,
    context: APIContext,
  ): Promise<ServiceResponse<PersonalAccessToken[]>> {
    const { userId, skip, take } = input;

    return PersonalAccessTokenService.list({
      where: { userId },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        prefix: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
        // hashedKey: false, // Service might allow it, but we can exclude it via select
        userId: true,
      },
    });
  }
}
