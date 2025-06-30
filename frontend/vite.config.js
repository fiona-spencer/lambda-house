import { mergeConfig } from 'vite';

export default (config) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
        three: 'three', // ✅ Explicit alias for 'three'
      },
    },
    server: {
      allowedHosts: true,
    },
    assetsInclude: ['**/*.xml'],
  });
};
