const {
  override, fixBabelImports, addLessLoader, addWebpackAlias,
} = require('customize-cra');
const path = require('path');


module.exports = override(
  // 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 配置别名
  addWebpackAlias({
    '@common': path.resolve(__dirname, 'src/common'),
  }),
  // 使用less
  addLessLoader({
    javascriptEnabled: true,
  }),
);
