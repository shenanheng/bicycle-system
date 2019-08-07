import * as C from '../types/rootTypes';
// 改变menu菜单的折叠
export function changeMenuCollapsed(data) {
  return { type: C.COLLAPSED, data };
}
