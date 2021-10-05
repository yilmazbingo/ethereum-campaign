module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        web3: false,
      };
    }
    config.experiments = { topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
};
