import * as C from '../types/userTypes';
// 根据用户菜单获取
export function queryUserMenu() {
  return { type: C.MENU_BY_USER };
}
