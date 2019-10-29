/*
 * @Description: 封装axios
 * @Author: shenah
 * @Date: 2019-09-15 16:24:23
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-29 20:46:59
 */

import Qs from 'qs';
import utils from '@common/utils/misc';
import axios from 'axios';
import { Message } from 'antd';
const CODE_SUCCESS = 200;
const CODE_FAIL_LOGIN = 302; // 登录失效或者token过期
const NO_VIEW_RECORD_PERMISSION = 403;
const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};
const instance = axios.create({
  timeout: 5000
});
/*----------------------请求拦截----------------------*/
instance.interceptors.request.use(
  config => {
    utils.openLoading();
    // 参数序列化
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      const type = config.headers['Content-Type'];
      if (type && type.indexOf('json') > -1) {
        config.data = JSON.stringify(config.data);
      } else if (type && type.indexOf('form-data') > -1) {
        //
      } else {
        config.data = Qs.stringify(config.data);
      }
    }
    // 携带 token
    let loginObj = utils.decUserInfo('login');
    let accessToken = loginObj.accessToken;

    if (accessToken && config.url !== '/login') {
      config.headers.accessToken = accessToken;
    }
    return config;
  },
  error => {
    Message.error('加载超时');
    utils.closeLoading();
    return Promise.reject(error);
  }
);
/*----------------------响应拦截----------------------*/
instance.interceptors.response.use(
  response => {
    utils.closeLoading();
    return response;
  },
  error => {
    utils.closeLoading();
    if (error && error.response) {
      switch (error.response.status) {
        case CODE_FAIL_LOGIN:
          localStorage.clear();
          window.location.href = `${window.location.protocol}//${window.location.host}/#/login`;
          break;
        case NO_VIEW_RECORD_PERMISSION:
          Message.error('您无权访问该页面');
          window.history.go(-1);
          break;
        default:
      }
    }
    return Promise.reject(error);
  }
);
const request = ({
  url,
  params,
  headers = {},
  method = METHODS.GET,
  server = 'service',
  extraFileParams
}) => {
  let httpUrl = window.config[server] + url;
  function checkCode(res) {
    return new Promise((resolve, reject) => {
      if (res.code === CODE_SUCCESS) {
        resolve(res);
      } else {
        if (res.code === CODE_FAIL_LOGIN) {
          Message.error('token过期,或者没有登录');
          utils.signOut();
        } else if (res.code === NO_VIEW_RECORD_PERMISSION) {
          Message.error('您没有权限访问');
          window.history.go(-1);
        } else if (res.msg) {
          Message.error(res.msg);
        } else {
          Message.error(`code:${res.code}`);
        }
        reject(res);
      }
    });
  }
  if (method === METHODS.GET) {
    return instance
      .get(httpUrl, { params: params })
      .then(res => checkCode(res.data));
  } else if (method === METHODS.POST) {
    return instance
      .post(httpUrl, params, {
        headers,
        onUploadProgress: progressEvent => {
          let complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          if (extraFileParams) {
            extraFileParams.progress.progressNum = complete;
          }
        }
      })
      .then(res => checkCode(res.data));
  }
};
const post = ({ url, params, headers, server, extraFileParams }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.POST,
    extraFileParams
  });
export const get = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.GET
  });
export default post;
