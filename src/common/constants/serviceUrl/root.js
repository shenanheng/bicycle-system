/**
 * 请求地址的配置
 *
 */
const getApi = url => `/root${url}`;
// 查询城市管理列表
export const QUERY_CITY_MANAGE_LIST = getApi('/cityManageList');
// 查询订单管理列表
export const QUERY_ORDER_MANAGE_LIST = getApi('/orderManageList');
// 查询单个订单详情
export const QUERY_ORDER_DETAILS = getApi('/getOrderDetails');
