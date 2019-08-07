const { override, addLessLoader, fixBabelImports,addWebpackAlias } = require('customize-cra');
const path = require('path')
const rewiredMap = () => config => {
  config.devtool =
    config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};

const addSvgLoader = () => config => {
  config.module.rules.forEach(item => {
    if (item.oneOf) {
      item.oneOf.unshift({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          }
        ]
      });
    }
  });
  return config;
};

module.exports = override(
  // 添加 @svgr/webpack loader
  addSvgLoader(),
  addWebpackAlias({
    '@redux': path.resolve(__dirname, 'src/redux'),
    '@less': path.resolve(__dirname, 'src/less'),
    '@common': path.resolve(__dirname, 'src/common'),
    '@business': path.resolve(__dirname, 'src/businessComponent'),
    '@view': path.resolve(__dirname, 'src/view'),
    '@api': path.resolve(__dirname, 'src/common/service/index.js'),
    '@': path.resolve(__dirname, 'src'),
    '@action':path.resolve(__dirname, 'src/redux/action')
  }),
  // antd 按需加载
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    libraryName: 'antd',
    style: true
  }),
  // 添加less 和 配置主题
  addLessLoader({
    javascriptEnabled: true,
  }),

  // 关闭mapSource
  rewiredMap()
);
