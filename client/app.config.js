import 'dotenv/config';

export default {
  expo: {
    name: 'YourApp',
    scheme: 'broker2broker',
    extra: {
      SERVER_URL: process.env.REACT_APP_SERVER_URL,
      ...(process.env.NODE_ENV !== 'production' && {
        DEBUG_SERVER_URL: process.env.REACT_APP_DEBUG_SERVER_URL,
      }),
      plugins: [
      "expo-secure-store"
    ]
    },
  },
};
