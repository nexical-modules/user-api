// GENERATED CODE - DO NOT MODIFY
import { UserModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { ResetPasswordAuthAction } from '@modules/user-api/src/actions/reset-password-auth';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      token: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as UserModuleTypes.ResetPasswordDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.ResetPasswordDTO = await HookSystem.filter(
      'auth.resetPassword.input',
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
    const result = await ResetPasswordAuthAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('auth.resetPassword.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Reset password',
    tags: ['Auth'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: { type: 'string' },
              password: { type: 'string' },
              confirmPassword: { type: 'string' },
            },
            required: ['token', 'password', 'confirmPassword'],
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
                userId: { type: 'string' },
              },
              required: ['userId'],
            },
          },
        },
      },
    },
    protected: false,
  },
);
