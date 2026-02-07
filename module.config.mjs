import auth from 'auth-astro';


export default {
  type: 'feature',
  order: 50,
  integrations: [auth()],
  vite: {
    optimizeDeps: {
      include: ['bcryptjs'],
    },
  },
};

