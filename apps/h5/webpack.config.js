const getWebpackConfig = require('@nrwl/react/plugins/webpack')
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(getWebpackConfig(config), {
    module: {
      rules: [
        { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
      ]
    }
  })
}
