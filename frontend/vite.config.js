import { mergeConfig } from 'vite';

export default (config) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: true,
    },
    assetsInclude: ['**/*.xml'], // 👈 This should be outside the server block
  });
};
