// GENERATED CODE - DO NOT MODIFY
import { UserModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { RegisterAuthAction } from '@modules/user-api/src/actions/register-auth';
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
      confirmPassword: z.string(),
      name: z.string().optional(),
      username: z.string().optional(),
      token: z.string().optional(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as UserModuleTypes.CreateUserDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.CreateUserDTO = await HookSystem.filter(
      'auth.register.input',
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
    const result = await RegisterAuthAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('auth.register.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Register a new user',
    tags: ['Auth'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              password: { type: 'string' },
              confirmPassword: { type: 'string' },
              name: { type: 'string' },
              username: { type: 'string' },
              token: { type: 'string' },
            },
            required: ['email', 'password', 'confirmPassword'],
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
