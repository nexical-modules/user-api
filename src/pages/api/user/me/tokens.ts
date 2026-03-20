// GENERATED CODE - DO NOT MODIFY
import { UserModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { CreateTokenUserAction } from '@modules/user-api/src/actions/create-token-user';
import { ListTokensUserAction } from '@modules/user-api/src/actions/list-tokens-user';
import { z } from 'zod';

export const GET = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = {};
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      userId: z.string().optional(),
      skip: z.coerce.number().int().optional(),
      take: z.coerce.number().int().optional(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as UserModuleTypes.ListTokensDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.ListTokensDTO = await HookSystem.filter(
      'user.listTokens.input',
      body,
    );

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'USER_EMPLOYEE', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await ListTokensUserAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('user.listTokens.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'List personal access tokens',
    tags: ['User'],

    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  hashedKey: { type: 'string' },
                  prefix: { type: 'string' },
                  lastUsedAt: { type: 'string', format: 'date-time' },
                  expiresAt: { type: 'string', format: 'date-time' },
                  createdAt: { type: 'string', format: 'date-time' },
                  userId: { type: 'string' },
                  user: { type: 'string' },
                },
                required: ['name', 'hashedKey', 'prefix', 'userId', 'user'],
              },
            },
          },
        },
      },
    },
  },
);
export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      userId: z.string().optional(),
      name: z.string(),
      expiresAt: z.string().datetime().optional(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as UserModuleTypes.CreateTokenDTO;

    // 2. Hook: Filter Input
    const input: UserModuleTypes.CreateTokenDTO = await HookSystem.filter(
      'user.createToken.input',
      body,
    );

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'USER_EMPLOYEE', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await CreateTokenUserAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('user.createToken.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Create personal access token',
    tags: ['User'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userId: { type: 'string' },
              name: { type: 'string' },
              expiresAt: { type: 'string', format: 'date-time' },
            },
            required: ['name'],
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
                token: { type: 'string' },
                rawKey: { type: 'string' },
              },
              required: ['token', 'rawKey'],
            },
          },
        },
      },
    },
  },
);
