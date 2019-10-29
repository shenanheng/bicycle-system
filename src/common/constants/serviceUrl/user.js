/**
 * 请求地址的配置
 *
 */
const getApi = url => `/user${url}`;
// 登录
export const LOGIN = getApi('/login');
// 根据用户权限进行菜单的生成
export const QUERY_MENU_BY_USER = getApi('/menuList');
// 根据用户权限进行人员的查询
export const QUERY_USER_LIST_BY_USER = getApi('/userListByUser');
