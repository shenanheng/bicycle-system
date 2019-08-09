import * as ROOT from '@common/constants/serviceUrl/root';
import post, { get } from '@common/service/api';

export default {
  a: (params) => post(
    {
      params,
      url: ROOT.QUERY_CITY_MANAGE_LIST
    },
  ),
  // 查询城市管理列表
  queryCityManageList: (params) => get(
    {
      params,
      url: ROOT.QUERY_CITY_MANAGE_LIST
    },
  )
};