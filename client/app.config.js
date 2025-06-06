import 'dotenv/config';

export default {
  expo: {
    name: "Broker2Broker",
    slug: "broker2broker",
    version: "1.0.0",
    extra: {
      SERVER_URL: process.env.REACT_APP_DEBUG_SERVER_URL || process.env.REACT_APP_SERVER_URL,
    },
  },
};
