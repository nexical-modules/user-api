// GENERATED CODE - DO NOT MODIFY
import { UserModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { ValidateResetTokenAuthAction } from '@modules/user-api/src/actions/validate-reset-token-auth';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      token: z.string(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as UserModuleTypes.ValidateResetTokenDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.ValidateResetTokenDTO = await HookSystem.filter(
      'auth.validateResetToken.input',
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
    const result = await ValidateResetTokenAuthAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('auth.validateResetToken.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Validate reset token',
    tags: ['Auth'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
            required: ['token'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                valid: { type: 'boolean' },
                email: { type: 'string' },
              },
              required: ['valid'],
            },
          },
        },
      },
    },
    protected: false,
  },
);
