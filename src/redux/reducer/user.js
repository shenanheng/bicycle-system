import * as C from '../types/userTypes';
const userState = {
  userMenuList: [], // 用户菜单列表
  loginInfo: {} // 登录信息
};

export default (state = userState, action) => {
  switch (action.type) {
    //用户列表的生成
    case `${C.MENU_BY_USER}_SAGA`:
      return {
        ...state,
        userMenuList: action.data
      };
    // 登录信息
    case `${C.LOGIN_IN}`:
      return {
        ...state,
        loginInfo: action.data
      };
    default:
      return { ...state };
  }
};
