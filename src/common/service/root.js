import * as ROOT from '@common/constants/serviceUrl/root';
import post, { get } from '@common/service/api';

export default {
  // 查询城市管理列表
  queryCityManageList: (params) => get(
    {
      params,
      url: ROOT.QUERY_CITY_MANAGE_LIST
    },
  ),
  // 查询订单管理列表
  queryOrderManageList: (params) => get(
    {
      params,
      url: ROOT.QUERY_ORDER_MANAGE_LIST
    },
  ),
  // 查询单个订单详情
  queryOrderDetails: (params) => get(
    {
      params,
      url: ROOT.QUERY_ORDER_DETAILS
    },
  ),
   // 查询单个订单详情
   queryEndBikeInfo: (params) => get(
    {
      params,
      url: ROOT.QUERY_END_BIKE_INFO
    },
  ),
  finishOrder: (params) => post(
    {
      params,
      url: ROOT.FINISH_ORDER
    },
  )
};