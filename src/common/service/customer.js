import * as CUSTOMER from '@common/constants/serviceUrl/customer';
import post, { get } from '@common/service/api';

export default {
  /** 公共 */
  // home菜单列表
  queryHomeMenuList: (params) => post(CUSTOMER.QUERYHOMEMENULIST, params),
  // 查询所在大区
  queryLocation: (params) => get(
    {
      params,
      url: CUSTOMER.QUERYLOCATION
    },
  ),

  /** 车商管理 */
  // 车商列表查询
  queryVehicleDealerList: (params) => get({
    params,
    url: CUSTOMER.QUERYVEHIVLEDEALERLIST
  }),
  // 车商详情查询
  queryVehicleDealerDetail: (params) => get({
    params,
    url: CUSTOMER.QUERYVEHIVLEDEALERDETAIL
  }),
  // 查询车商流程记录
  queryVehicleProcessRecord: (params) => get({
    params,
    url: CUSTOMER.QUERYVEHICLEPROCESSRECORD
  }),
  // 查询待办已办列表
  queryIsTodoList: (params) => get({
    params,
    url: CUSTOMER.QUERYISTODOLIST
  }),
  // 新建车商
  createVehicleDealer: (params) => post({
    params,
    url: CUSTOMER.CREATEVEHIVLEDEALER
  }),
  // 修改车商状态
  updateVehicleDealerState: (params) => post({
    params,
    url: CUSTOMER.UPDATEVEHIVLEDEALERSTATE,
    headers: 'file'
  }),
  // 修改车商信息
  updateVehicleDealerDetail: (params) => post({
    params,
    url: CUSTOMER.UPDATEVEHIVLEDEALERDETAIL
  }),
  // 提交车商流程
  updateVehicleDealerProcess: (params) => post({
    params,
    url: CUSTOMER.UPDATEVEHIVLEDEALERPROCESS
  }),
  // 导出车商列表
  exportCarDealerList: (params) => post({
    params,
    url: CUSTOMER.EXPORT_CAR_DEALER_LIST
  }),


  /** 客户管理 */
  // 客户列表查询
  queryCustomerList: (params) => get({
    params,
    url: CUSTOMER.QUERY_CUSTOMER_LIST
  }),
  // 新增客户
  addCustomer: (params) => post({
    params,
    url: CUSTOMER.ADD_CUSTOMER
  }),
  // 客户信息详情
  getCustomerDetalis: (params) => get({
    params,
    url: CUSTOMER.GET_CUSTOMER_DETAILS
  }),
  // 客户信息修改
  updateCustomerInfo: (params) => post({
    params,
    url: CUSTOMER.UPDATE_CUSTOMER_INFO
  }),
  // 获取客户超级详情(包含基本信息,紧急联系人,关联关系,管理团队,修改记录,客户房产,车辆)
  queryCustomerSuperInfo: (params) => get({
    params,
    url: CUSTOMER.QUERY_CUSTOMER_SUPER_DETAILS
  }),
  // 获取客户修改的记录
  queryPeopleRecord: (params) => get({
    params,
    url: CUSTOMER.GET_PERSON_MODIFY_RECORD
  }),
  // 保存紧急联系人
  saveEmergencyPeople: (params) => post({
    params,
    url: CUSTOMER.SAVE_EMERGENCY_PEOPLE
  }),
  // 获取紧急联系人
  queryEmergencyPeople: (params) => get({
    params,
    url: CUSTOMER.QUERY_EMERGENCY_PEOPLE
  }),
  // 新增关联关系
  insertCorrelation: (params) => post({
    params,
    url: CUSTOMER.INSERT_CORRELATION
  }),
  // 编辑关联关系
  updateCorrelation: (params) => post({
    params,
    url: CUSTOMER.UPDATE_CORRELATION
  }),
  // 删除关联关系
  delCorrelation: (params) => get({
    params,
    url: CUSTOMER.DEL_CORRELATION
  }),
  // 根据关联关系人证件号码查询关联关系人编号
  queryRelevantNumByCard: (params) => get({
    params,
    url: CUSTOMER.QUERY_RELEVANT_NUM_BY_CARD
  }),
  // 获取关联关系列表
  queryCorrelationList: (params) => get({
    params,
    url: CUSTOMER.QUERY_CORRELATION_LIST
  }),
  // 新增客户管理团队
  insertManageTeam: (params) => post({
    params,
    url: CUSTOMER.INSERT_MANAGE_TEAM
  }),
  //  获取管理团队
  queryManageTeamList: (params) => get({
    params,
    url: CUSTOMER.QUERY_MANAGE_TEAM_LIST
  }),
  //  获取管理团队
  exchangeManageRight: (params) => post({
    params,
    url: CUSTOMER.EXCHANGE_MANAGE_RIGHT
  }),
  // 删除管理权
  delManageTeam: (params) => get({
    params,
    url: CUSTOMER.DEL_MANAGE_TEAM
  }),
  // 新增家庭收入
  insertFamilyIncome: (params) => post({
    params,
    url: CUSTOMER.INSERT_FAMILY_INCOME
  }),
  // 获取家庭收入
  queryFamilyIncomeList: (params) => get({
    params,
    url: CUSTOMER.QUERY_FAMILY_INCOME_LIST
  }),
  // 修改收入明细
  updateFamilyIncome: (params) => post({
    params,
    url: CUSTOMER.UPDATE_FAMILY_INCOME
  }),
  // 删除收入明细
  delFamilyIncome: (params) => get({
    params,
    url: CUSTOMER.DEL_FAMILY_INCOME
  }),
  // 新增个人房产
  insertPersonalProperty: (params) => post({
    params,
    url: CUSTOMER.INSERT_PERSONAL_PROPERTY
  }),
  // 获取个人房产
  queryPersonalPropertyList: (params) => get({
    params,
    url: CUSTOMER.QUERY_PERSONAL_PROPERTY_LIST
  }),
  // 修改个人房产
  updatePersonalProperty: (params) => post({
    params,
    url: CUSTOMER.UPDATE_PERSONAL_PROPERTY
  }),
  //  删除个人房产
  delPersonalProperty: (params) => get({
    params,
    url: CUSTOMER.DEL_PERSONAL_PROPERTY
  }),
  // 新增个人车辆
  insertPersonalVehicle: (params) => post({
    params,
    url: CUSTOMER.INSERT_PERSONAL_VEHICLE
  }),
  // 获取个人车辆
  queryPersonalVehicleList: (params) => get({
    params,
    url: CUSTOMER.QUERY_PERSONAL_VEHICLE_LIST
  }),
  // 修改个人车辆
  updatePersonalVehicle: (params) => post({
    params,
    url: CUSTOMER.UPDATE_PERSONAL_VEHICLE
  }),
  //  删除个人车辆
  delPersonalVehicle: (params) => get({
    params,
    url: CUSTOMER.DEL_VEHICLE_PROPERTY
  })
};
