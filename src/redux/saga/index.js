// generator 函数
import {  takeEvery } from 'redux-saga/effects';
import * as USER_TYPES from '../types/userTypes';
import * as userSaga from './user';

function* mySaga() {
  yield takeEvery(USER_TYPES.MENU_BY_USER, userSaga.queryUserMenu);
}
export default mySaga;
