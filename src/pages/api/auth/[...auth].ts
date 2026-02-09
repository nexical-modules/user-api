import { AstroAuth } from 'auth-astro/server';
import { authConfig } from '../../../config/auth.config';

export const { GET, POST } = AstroAuth(authConfig);
