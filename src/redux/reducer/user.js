import * as C from '../types/userTypes';
const userState = {
  userMenuList: [], // 用户菜单列表
  loginInfo: {}, // 登录信息
  navList: [] // 导航列表
};

export default (state = userState, action) => {
  const { navList } = state;
  const { type, data } = action;
  switch (type) {
    //用户列表的生成
    case `${C.MENU_BY_USER}_SAGA`:
      return {
        ...state,
        userMenuList: data
      };
    // 登录信息
    case `${C.LOGIN_IN}`:
      return {
        ...state,
        loginInfo: data
      };
    // 存储用户点击的菜单
    case `${C.SAVE_NAV_ITEM}`:
      if (navList.length === 0) {
        return {
          ...state,
          navList: navList.concat(data)
        };
      } else if (
        !navList.some(one => one.key === data.key) &&
        data.key !== '/home/index'
      ) {
        return {
          ...state,
          navList: navList.concat(data)
        };
      }
      return state;
    case `${C.DEL_NAV_ITEM}`:
      return {
        ...state,
        navList: navList.concat(data)
      };
    default:
      return { ...state };
  }
};
