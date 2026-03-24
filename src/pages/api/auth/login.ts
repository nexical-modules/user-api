// GENERATED CODE - DO NOT MODIFY
import { UserModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { LoginAuthAction } from '@modules/user-api/src/actions/login-auth';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      email: z.string(),
      password: z.string(),
    });
    const body = (zodSchema ? zodSchema.parse(rawInput) : rawInput) as UserModuleTypes.LoginDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.LoginDTO = await HookSystem.filter('auth.login.input', body);

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'ANONYMOUS', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await LoginAuthAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('auth.login.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Login user',
    tags: ['Auth'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              password: { type: 'string' },
            },
            required: ['email', 'password'],
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
                id: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                passwordUpdatedAt: { type: 'string', format: 'date-time' },
                emailVerified: { type: 'string', format: 'date-time' },
                name: { type: 'string' },
                image: { type: 'string' },
                role: { type: 'string' },
                status: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
              required: ['updatedAt'],
            },
          },
        },
      },
    },
    protected: false,
  },
);
