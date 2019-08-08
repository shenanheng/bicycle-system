import { put } from 'redux-saga/effects';
import Api from '@api';

export function* queryUserMenu(action) {
  try {
    const res = yield Api.queryMenuByUser();
    yield put({ type: `${action.type}_SAGA`, data: res.data });
    return;
  } catch (e) {
    console.log('请求错误');
  }
}
