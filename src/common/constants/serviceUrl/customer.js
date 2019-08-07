/**
 * 请求地址的配置
 *
 */
const getApi = (url) => `/customer/${url}`;
// 查询主页菜单
export const QUERYHOMEMENULIST = getApi('');
/**
 * 公用接口
 */
// 查询所在大区
export const QUERYLOCATION = getApi('/cs/carDealer/getGroupZon');

/**
 * 车商管理
 */
// 车商列表查询
export const QUERYVEHIVLEDEALERLIST = getApi('/cs/carDealer/getCarDealerList');
// 新增车商
export const CREATEVEHIVLEDEALER = getApi('/cs/carDealer/addCarDealer');
// 查询待办已办列表
export const QUERYISTODOLIST = getApi('/cs/WFCarDealer/getTaskList');
// 车商详情查询
export const QUERYVEHIVLEDEALERDETAIL = getApi('/cs/carDealer/getCarDealerDetail');
// 查询车商流程记录
export const QUERYVEHICLEPROCESSRECORD = getApi('/cs/WFCarDealer/getWfBizComments');
// 修改车商状态
export const UPDATEVEHIVLEDEALERSTATE = getApi('/cs/carDealer/updateCarDealerState');
// 修改车商信息
export const UPDATEVEHIVLEDEALERDETAIL = getApi('/cs/carDealer/updateCarDealer');
// 提交车商流程
export const UPDATEVEHIVLEDEALERPROCESS = getApi('/cs/WFCarDealer/submitTask');
// 导出车商列表
export const EXPORT_CAR_DEALER_LIST = getApi('/cs/carDealer/export');


/**
 * 客户管理
 */
// 客户列表查询
export const QUERY_CUSTOMER_LIST = getApi('/cs/cuPersonalInfo/getPageList');
// 新增客户
export const ADD_CUSTOMER = getApi('/cs/cuPersonalInfo/insert');
// 客户信息详情
export const GET_CUSTOMER_DETAILS = getApi('/cs/cuPersonalInfo/getInfo');
// 客户信息修改
export const UPDATE_CUSTOMER_INFO = getApi('/cs/cuPersonalInfo/update');
// 获取客户超级详情(包含基本信息,紧急联系人,关联关系,管理团队,修改记录,客户房产,车辆)
export const QUERY_CUSTOMER_SUPER_DETAILS = getApi('/cs/cuPersonalInfo/getDetail');
// 获取客户修改的记录
export const GET_PERSON_MODIFY_RECORD = getApi('/cs/personalModifyRecord/getList');
// 保存紧急联系人
export const SAVE_EMERGENCY_PEOPLE = getApi('/cs/cuEmergencyContact/save');
// 获取紧急联系人
export const QUERY_EMERGENCY_PEOPLE = getApi('/cs/cuEmergencyContact/getList');
// 新增关联关系
export const INSERT_CORRELATION = getApi('/cs/cuCorrelativeRel/insert');
// 编辑关联关系
export const UPDATE_CORRELATION = getApi('/cs/cuCorrelativeRel/update');
// 删除关联关系
export const DEL_CORRELATION = getApi('/cs/cuCorrelativeRel/delete');
// 根据关联关系人证件号码查询关联关系人编号
export const QUERY_RELEVANT_NUM_BY_CARD = getApi('/cs/cuPersonalInfo/getList');
// 获取关联关系
export const QUERY_CORRELATION_LIST = getApi('/cs/cuCorrelativeRel/getList');
// 新增客户管理团队
export const INSERT_MANAGE_TEAM = getApi('/cs/customerManagerTeam/insert');
// 获取管理团队
export const QUERY_MANAGE_TEAM_LIST = getApi('/cs/customerManagerTeam/getList');
// 互换管理权
export const EXCHANGE_MANAGE_RIGHT = getApi('/cs/customerManagerTeam/changeManagerType');
// 删除管理团队
export const DEL_MANAGE_TEAM = getApi('/cs/customerManagerTeam/delete');
// 新增家庭收入
export const INSERT_FAMILY_INCOME = getApi('/cs/cuIncomeDtl/insert');
// 获取收入明细
export const QUERY_FAMILY_INCOME_LIST = getApi('/cs/cuIncomeDtl/getByCondition');
// 修改收入明细
export const UPDATE_FAMILY_INCOME = getApi('/cs/cuIncomeDtl/update');
// 删除收入明细
export const DEL_FAMILY_INCOME = getApi('/cs/cuIncomeDtl/delete');
// 新增个人房产
export const INSERT_PERSONAL_PROPERTY = getApi('/cs/cuPersonalHouse/insert');
// 获取个人房产
export const QUERY_PERSONAL_PROPERTY_LIST = getApi('/cs/cuPersonalHouse/getList');
// 修改个人房产
export const UPDATE_PERSONAL_PROPERTY = getApi('/cs/cuPersonalHouse/update');
// 删除个人房产
export const DEL_PERSONAL_PROPERTY = getApi('/cs/cuPersonalHouse/delete');
// 新增个人车辆
export const INSERT_PERSONAL_VEHICLE = getApi('/cs/cuPersonalCar/insert');
// 获取个人车辆
export const QUERY_PERSONAL_VEHICLE_LIST = getApi('/cs/cuPersonalCar/getList');
// 修改个人车辆
export const UPDATE_PERSONAL_VEHICLE = getApi('/cs/cuPersonalCar/update');
// 删除个人车辆
export const DEL_VEHICLE_PROPERTY = getApi('/cs/cuPersonalCar/delete');
