import auth from 'auth-astro';


export default {
  type: 'feature',
  order: 50,
  integrations: [auth({ configFile: './modules/user-api/auth.config' })],
  vite: {
    optimizeDeps: {
      include: ['bcryptjs'],
    },
  },
};

