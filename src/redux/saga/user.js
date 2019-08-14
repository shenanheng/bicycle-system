import { put } from 'redux-saga/effects';
import Api from '@api';
import Utils from '@common/utils/misc';

export function* queryUserMenu(action) {
  try {
    const res = yield Api.queryMenuByUser();
    const data = Utils.createTreeData({
      list:res.data,
      rooId:null
    })
    yield put({ type: `${action.type}_SAGA`, data });
    return;
  } catch (e) {
    console.log('请求错误');
  }
}
