import 'dotenv/config';

export default {
  expo: {
    name: 'client',
    slug: 'your-app',
    extra: {
      SERVER_URL: process.env.REACT_APP_SERVER_URL,
      DEBUG_SERVER_URL: process.env.REACT_APP_DEBUG_SERVER_URL,
    },
  },
};
