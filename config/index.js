const path = require('path');
const srcPath = path.resolve(__dirname, '..', 'src');
const { getLocalIP, getCssScopedName } = require('@elux/cli-utils');
const config = {
  projectName: 'taro-elux-demo',
  date: '2022-8-8',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  alias: {
    '@': srcPath,
  },
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
    'process.env.PROJ_ENV': JSON.stringify({
      ApiPrefix: `http://${getLocalIP()}:3003/`,
      StaticPrefix: `http://${getLocalIP()}:3003/`,
    }),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true,
        config: {
          namingPattern: 'module',
          generateScopedName(localName, mfileName) {
            return getCssScopedName(srcPath, localName, mfileName);
          },
          localIdentContext: srcPath,
        },
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser',
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true,
        config: {
          namingPattern: 'module',
          generateScopedName(localName, mfileName) {
            return getCssScopedName(srcPath, localName, mfileName);
          },
          localIdentContext: srcPath,
        },
      }
    },
    esnextModules: ["@taroify"],
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
