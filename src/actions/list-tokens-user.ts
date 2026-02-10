// GENERATED CODE - DO NOT MODIFY
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { ListTokensDTO, PersonalAccessToken } from '../sdk/types';

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
