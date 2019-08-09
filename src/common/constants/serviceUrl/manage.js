/**
 * 请求地址的配置
 *
 */
const getApi = (url) => `/manage${url}`;
// 查询字典表
export const QUERY_DICTIONARIES = getApi('/getDictionaries');
// 查询中国所有的城市
export const QUERY_CHINA_CITIES = getApi('/getCities');
