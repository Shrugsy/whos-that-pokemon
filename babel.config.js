// Only used by Jest
module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: '2', targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    function () {
      return {
        visitor: {
          /**
           * Replaces `import.meta.*` with `process.*` for jest
           * @see {@link https://github.com/vitejs/vite/issues/1149#issuecomment-775033930}
           */
          MetaProperty(path) {
            path.replaceWithSourceString('process');
          },
        },
      };
    },
  ],
};
