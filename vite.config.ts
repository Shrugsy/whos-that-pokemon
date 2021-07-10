import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

/**
 * {@link https://vitejs.dev/config/}
 */
export default defineConfig((config) => {
  return {
    plugins: [reactRefresh()],
    esbuild: {
      jsxFactory: 'jsx',
      jsxInject: `
    import { jsx } from '@emotion/react';
    import React from 'react';
    `,
    },
    resolve: {
      alias: [{ find: '@/', replacement: '/src/' }],
    },
  };
});
