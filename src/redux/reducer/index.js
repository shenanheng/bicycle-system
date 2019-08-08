import { combineReducers } from 'redux';
import rootReducer from './root';
import manageReducer from './manage';
import userReducer from './user';

export default combineReducers({
  rootState:rootReducer,
  manageState:manageReducer,
  userState:userReducer
});
