import * as C from '../types/userTypes';
// 根据用户菜单获取
export function queryUserMenu() {
  return { type: C.MENU_BY_USER };
}
// 获取登录信息
export function loginIn(data) {
  return { type: C.LOGIN_IN,data };
}

// 存储用户点击的菜单
export function saveNavItem(data) {
  return { type: C.SAVE_NAV_ITEM,data };
}
// 删除用户点击的菜单
export function delNavItem(data) {
  return { type: C.DEL_NAV_ITEM,data };
}