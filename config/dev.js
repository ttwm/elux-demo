module.exports = {
  env: {
    NODE_ENV: '"development"'//
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    webpackChain(chain) {
      chain.plugin('fastRefreshPlugin').tap(() => [{ overlay: false }]);
    },
  }
}
