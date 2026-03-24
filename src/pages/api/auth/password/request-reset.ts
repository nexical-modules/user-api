// GENERATED CODE - DO NOT MODIFY
import { UserModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { RequestPasswordResetAuthAction } from '@modules/user-api/src/actions/request-password-reset-auth';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      email: z.string(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as UserModuleTypes.RequestPasswordResetDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.RequestPasswordResetDTO = await HookSystem.filter(
      'auth.requestPasswordReset.input',
      body,
    );

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'ANONYMOUS', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await RequestPasswordResetAuthAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('auth.requestPasswordReset.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Request password reset',
    tags: ['Auth'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            },
            required: ['email'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: { type: 'object' },
          },
        },
      },
    },
    protected: false,
  },
);
