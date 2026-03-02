// GENERATED CODE - DO NOT MODIFY
import type { APIRoute } from 'astro';
import { HookSystem } from '@/lib/modules/hooks';
import { ApiGuard } from '@/lib/api/api-guard';
import type { UserModuleTypes } from '@/lib/api';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/core/db';

export const POST: APIRoute = async (context) => {
  const body = (await context.request.json()) as UserModuleTypes.LoginDTO;
  const query = Object.fromEntries(new URL(context.request.url).searchParams);

  // 1. Filter input
  const input: UserModuleTypes.LoginDTO = await HookSystem.filter('auth.login.input', body);
  const combinedInput = { ...context.params, ...query, ...input };

  // 2. Security check (only anonymous users can login)
  await ApiGuard.protect(context, 'anonymous', combinedInput);

  const { email, password } = input;
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'user.action.login.missing_credentials' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Validate credentials against DB
  const normalizedEmail = email.toLowerCase();
  const user = await db.user.findFirst({
    where: {
      OR: [
        { email: { equals: normalizedEmail, mode: 'insensitive' } },
        { username: { equals: normalizedEmail, mode: 'insensitive' } },
      ],
    },
  });

  if (!user || user.status === 'INACTIVE' || user.status === 'BANNED' || !user.password) {
    return new Response(JSON.stringify({ error: 'user.action.login.invalid_credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Response(JSON.stringify({ error: 'user.action.login.invalid_credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 4. Call Auth.js standard sign-in endpoint via HTTP to create the session cookie
  const baseUrl = new URL(context.request.url);
  const authBase = `${baseUrl.protocol}//${baseUrl.host}`;

  // Step A: Get CSRF token
  const csrfResp = await fetch(`${authBase}/api/auth/csrf`);
  const csrfData = (await csrfResp.json()) as { csrfToken?: string };
  const csrfToken = csrfData?.csrfToken || '';
  const csrfCookies = csrfResp.headers.get('set-cookie') || '';
  const csrfCookieNameValue = csrfCookies.split(';')[0] || '';

  // Step B: Post credentials to Auth.js callback
  const signInBody = new URLSearchParams({
    email,
    password,
    csrfToken,
    callbackUrl: '/',
    json: 'true',
  });

  const signInResp = await fetch(`${authBase}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: csrfCookieNameValue,
    },
    body: signInBody.toString(),
    redirect: 'manual',
  });

  const location = signInResp.headers.get('location') || '';
  if (location.includes('error=')) {
    const errorParam = new URL(location, authBase).searchParams.get('error');
    return new Response(
      JSON.stringify({ error: errorParam || 'user.action.login.invalid_credentials' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Success: pass through all Set-Cookie headers from Auth.js
  const successHeaders = new Headers({ 'Content-Type': 'application/json' });
  signInResp.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      successHeaders.append('set-cookie', value);
    }
  });

  await HookSystem.dispatch('auth.login.success', { email });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: successHeaders,
  });
};
