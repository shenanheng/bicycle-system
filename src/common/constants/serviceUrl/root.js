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
// 获取结束订单的详情
export const QUERY_END_BIKE_INFO = getApi('/getEndBikeInfo');
// 结束订单的详情
export const FINISH_ORDER = getApi('/finishOrder');
// 获取员工列表
export const QUERY_STAFF_MANAGE_LIST = getApi('/staffManageList');
// 新增员工
export const ADD_STAFF = getApi('/addStaff');
// 查看员工
export const SEE_STAFF = getApi('/seeStaff');
// 更新员工
export const EDIT_STAFF = getApi('/updateStaff');
// 删除员工
export const DEL_STAFF = getApi('/delStaff');
// 自行车区域列表查询
export const QUERY_BIKE_LIST = getApi('/bikeList');