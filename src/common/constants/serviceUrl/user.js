/**
 * 请求地址的配置
 *
 */
const getApi = url => `/user${url}`;
// 测试
export const A = getApi('/A');
// 根据用户权限进行菜单的生成
export const QUERY_MENU_BY_USER = getApi('/menuList');

