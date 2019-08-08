// react
import React from 'react';
import ReactDOM from 'react-dom';
// pwd
import * as serviceWorker from './serviceWorker';
// redux
import { Provider } from 'react-redux';
import store from './redux/index'

//组件
import App from './App';

// 配置以及样式
import '@common/constants/config';
import '@less/common/index.less';





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
