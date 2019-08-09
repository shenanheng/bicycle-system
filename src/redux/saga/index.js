// generator 函数
import {  takeEvery } from 'redux-saga/effects';
import * as USER_TYPES from '../types/userTypes';
import * as MANAGE_TYPES from '../types/manageTypes';
import * as userSaga from './user';
import * as manageSaga from './manage';

function* mySaga() {
  // user
  yield takeEvery(USER_TYPES.MENU_BY_USER, userSaga.queryUserMenu);
  // manage
  yield takeEvery(MANAGE_TYPES.QUERY_DIC, manageSaga.queryDic);
  yield takeEvery(MANAGE_TYPES.QUERY_CHINA_CITIES, manageSaga.queryChinaCities);
}
export default mySaga;
