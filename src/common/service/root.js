import * as ROOT from '@common/constants/serviceUrl/root';
import post, { get } from '@common/service/api';

export default {
  // 查询城市管理列表
  queryCityManageList: params =>
    get({
      params,
      url: ROOT.QUERY_CITY_MANAGE_LIST
    }),
  // 查询订单管理列表
  queryOrderManageList: params =>
    get({
      params,
      url: ROOT.QUERY_ORDER_MANAGE_LIST
    }),
  // 查询单个订单详情
  queryOrderDetails: params =>
    get({
      params,
      url: ROOT.QUERY_ORDER_DETAILS
    }),
  // 查询单个结束订单详情
  queryEndBikeInfo: params =>
    get({
      params,
      url: ROOT.QUERY_END_BIKE_INFO
    }),
  // 结束订单
  finishOrder: params =>
    post({
      params,
      url: ROOT.FINISH_ORDER
    }),
  // 查询员工管理列表
  querystaffManageList: params =>
    get({
      params,
      url: ROOT.QUERY_STAFF_MANAGE_LIST
    }),
  // 新增员工
  addStaff: params =>
    post({
      params,
      url: ROOT.ADD_STAFF
    }),
  // 查看员工
  seeStaff: params =>
    get({
      params,
      url: ROOT.SEE_STAFF
    }),
  // 编辑员工
  editStaff: params =>
    post({
      params,
      url: ROOT.EDIT_STAFF
    }),
  // 删除员工
  delStaff: params =>
    post({
      params,
      url: ROOT.DEL_STAFF
    }),
  // 自行车区域查询
  queryBikeList: params =>
    get({
      params,
      url: ROOT.QUERY_BIKE_LIST
    }),
  // 用户权限列表
  queryUserRightList: params =>
    get({
      params,
      url: ROOT.QUERY_USER_RIGHT_LIST
    }),
  // 更新用户权限
  editUserRight: params =>
    post({
      params,
      url: ROOT.EDIT_USER_RIGHT
    }),
  // 用户授权
  updateUserAuthorize: params =>
    post({
      params,
      url: ROOT.UPDATE_USER_AUTHORIZE
    })
};
