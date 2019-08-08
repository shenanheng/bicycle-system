import * as C from '../types/manageTypes';
const manageState ={
  dictionaries:[]
}
export default (state = manageState, action) => {
  switch (action.type) {
    // 字典的查询
    case C.QUERY_DICTIONARY_TABLES:
      return { ...state };
    default:
      return { ...state };
  }
}
