import { defineConfig } from 'auth-astro';
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/core/db';
import { config } from '@/lib/core/config';
import bcrypt from 'bcryptjs';

export const authConfig = defineConfig({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const identifier = credentials.email as string;
        const password = credentials.password as string;

        if (!identifier || !password) return null;

        const user = await db.user.findFirst({
          where: {
            OR: [
              { email: { equals: identifier, mode: 'insensitive' } },
              { username: { equals: identifier, mode: 'insensitive' } },
            ],
          },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        domain:
          config.PUBLIC_PRIMARY_DOMAIN === 'localhost'
            ? undefined
            : `.${config.PUBLIC_PRIMARY_DOMAIN}`,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      if (
        (process.env.NODE_ENV !== 'production' && url.startsWith('http://localhost:')) ||
        (process.env.ALLOWED_HOSTS &&
          process.env.ALLOWED_HOSTS.split(',').some((host) => url.includes(host)))
      ) {
        return url;
      }
      return baseUrl;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
