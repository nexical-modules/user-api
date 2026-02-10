import auth from 'auth-astro';

export default {
  type: 'feature',
  order: 50,
  integrations: [auth({ configFile: './modules/user-api/auth.config', injectEndpoints: false })],
  vite: {
    optimizeDeps: {
      include: ['bcryptjs'],
    },
  },
};
