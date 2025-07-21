import 'dotenv/config';

export default {
  expo: {
    name: 'YourApp',
    extra: {
      SERVER_URL: process.env.REACT_APP_SERVER_URL,
      ...(process.env.NODE_ENV !== 'production' && {
        DEBUG_SERVER_URL: process.env.REACT_APP_DEBUG_SERVER_URL,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      }),
    },
  },
};
