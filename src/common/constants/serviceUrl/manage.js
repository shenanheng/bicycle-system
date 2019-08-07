/**
 * 请求地址的配置
 *
 */
const getApi = (url) => `${url}`;
// 测试
export const A = getApi('/A');
// 查询字典表
export const QUERY_DICTIONARY_TABLES = getApi('/dict/getDictByTypes');
// 查询所在省市区
export const QUERY_PROVINCE_CITY_AREA = getApi('/area/getAreaList');
