import { put } from 'redux-saga/effects';
import Api from '@api';

// 查询字典表
export function* queryDic(action) {
  try {
    const res = yield Api.queryDictionaries();
    yield put({ type: `${action.type}_SAGA`, data: res.data });
    return;
  } catch (e) {
    console.log('请求错误');
  }
}

// 查询中国所有的城市
export function* queryChinaCities(action) {
  try {
    const res = yield Api.queryChinaCities();
    yield put({ type: `${action.type}_SAGA`, data: res.data });
    return;
  } catch (e) {
    console.log('请求错误');
  }
}