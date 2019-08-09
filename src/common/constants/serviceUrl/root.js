/**
 * 请求地址的配置
 *
 */
const getApi = (url) => `/root${url}`;
// 查询字典表
export const QUERY_CITY_MANAGE_LIST = getApi('/cityManageList');