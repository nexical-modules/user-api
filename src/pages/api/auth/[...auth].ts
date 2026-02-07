import { Auth } from 'auth-astro/server';
import { authConfig } from '../../../config/auth.config';

export const GET = Auth(authConfig);
export const POST = Auth(authConfig);
