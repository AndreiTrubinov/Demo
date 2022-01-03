const withAntdLess = require('next-plugin-antd-less');
const { i18n } = require('./next-i18next.config');

module.exports = withAntdLess({

  // modifyVars: { '@primary-color': '#04f' },

  //lessVarsFilePath: './styles/antd.less',
  lessVarsFilePathAppendToEndOfContent: true,
  i18n: i18n,

  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.svg$/,
      // loader: 'svg-url-loader'
      loader: 'file-loader'
    });

    return config;
  },

  reactStrictMode: true,

});