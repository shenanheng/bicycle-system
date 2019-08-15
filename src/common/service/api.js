/**
 * 封装axios请求
 */

import axios from 'axios';
import { Message } from 'antd';
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
  let loading = document.getElementById('ajaxLoading');
  loading.style.display = 'none';
  if (resp.status !== 200) {
    console.log('Server error occurred');
    return window.Promise.reject('Server error occurred');
  }
  const data = resp.data;
  return new Promise((resolve, reject) => {
    if (resp && data.code + '' === CODE_SUCCESS + '') {
      resolve(data);
    } else {
      if (data.code === CODE_FAIL_LOGIN) {
        Message.error('token过期,或者没有登录');
        utils.signOut();
      } else if (data.code === NO_VIEW_RECORD_PERMISSION) {
        Message.error('您没有权限访问');
        window.history.go(-1);
      } else if (data.msg) {
        Message.error(data.msg);
      } else {
        Message.error(`code:${data.code}`);
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
  let httpUrl = window.config[server] + url;
  const userObj = utils.decUserInfo();
  let header = {
    'Content-Type': jsonType
      ? 'application/json;charset=UTF-8'
      : 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    token: userObj.token,
    responseType: 'json'
  };
  if (headers === 'file') {
    delete header['Content-Type'];
    header['Content-Type'] = 'multipart/form-data';
  } else {
    header = Object.assign(header, headers);
  }
  let loading = document.getElementById('ajaxLoading');
  loading.style.display = 'block';
  return axios({
    params: method === METHODS.GET ? params : null,
    data: method === METHODS.POST ? params : null,
    method,
    url: httpUrl,
    headers: header
  })
    .then(checkRespStatus)
    .catch(error => {
      let loading = document.getElementById('ajaxLoading');
      loading.style.display = 'none';
      if (!error.code && !navigator.onLine) {
        // 因无网络而出错的情况
        Message.error('网络出错，请重试');
      }
      if (error.message && error.message.indexOf('timeout') > -1) {
        Message.error('请求超时，请重试');
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
        Message.error('您没有权限访问');
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
