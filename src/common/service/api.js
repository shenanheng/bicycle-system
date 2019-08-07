/**
 * 封装axios请求
 */
import axios from 'axios';
import _ from 'lodash';
import qs from 'querystring';
import { message } from 'antd';
import utils from '@common/utils/misc';
const CODE_SUCCESS = 200;
const CODE_FAIL_LOGIN = 401; // 登录失效或者token过期
const NO_VIEW_RECORD_PERMISSION = 403;
const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};
const checkRespStatus = resp => {
  if (resp.status !== 200) {
    console.log('Server error occurred');
    return window.Promise.reject('Server error occurred');
  }
  const data = resp.data;
  return new Promise((resolve, reject) => {
    if (resp && data.code + '' === CODE_SUCCESS + '') {
      resolve(data);
    } else {
      if (data.msg) {
        message.error(data.msg);
      } else {
        message.error(`code:${data.code}`);
      }
      reject(data);
    }
  });
};
const request = ({
  url,
  params,
  headers = {},
  method = METHODS.GET,
  jsonType = true,
  server = 'service'
}) => {
  let httpUrl = url;
  const userObj = utils.decUserInfo();
  const options = {
    headers: {
      'Content-Type': jsonType
        ? 'application/json;charset=UTF-8'
        : 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },
    // timeout: 300000,
    method,
    responseType: 'json'
  };
  options.headers.token = userObj.token;
  if (method !== METHODS.GET) {
    // form表单类型
    if (headers === 'file') {
      delete options.headers['Content-Type'];
      options.headers['Content-Type'] = 'multipart/form-data';
      options.data = params;
    } else {
      options.data = jsonType ? JSON.stringify(params) : qs.stringify(params);
    }
  } else if (method === METHODS.GET && !_.isEmpty(params)) {
    const newParams =
      (~httpUrl.lastIndexOf('?') ? '&' : '?') + qs.stringify(params);
    httpUrl += newParams;
  }
  httpUrl = window.config[server] + httpUrl;
  return axios(httpUrl, options)
    .then(checkRespStatus)
    .catch(error => {
      if (!error.code && !navigator.onLine) {
        // 因无网络而出错的情况
        message.error('网络出错，请重试');
      }
      if (error.message && error.message.indexOf('timeout') > -1) {
        message.error('请求超时，请重试');
      }
      if (error.response && error.response.status === CODE_FAIL_LOGIN) {
        console.log('token过期或者登录失败跳转到登录页面');
        utils.signOut();
      }
      if (
        error.response &&
        error.response.status === NO_VIEW_RECORD_PERMISSION
      ) {
        // 没有权限
        window.history.go(-1);
        message.error('您没有权限访问');
      }
      return new Promise((resolve, reject) => {
        // 返回错误回调
        reject(error);
      });
    });
};
const post = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.POST,
    jsonType: true
  });
export const get = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.GET,
    jsonType: true
  });
export default post;
