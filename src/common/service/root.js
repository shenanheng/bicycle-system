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
    })
};
