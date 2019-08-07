import { combineReducers } from 'redux';
import manageReducer from './manage';
export default combineReducers({
  queryDictionaryTablesM:manageReducer.queryDictionaryTables
});
