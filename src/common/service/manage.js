import * as MANAGE from '@common/constants/serviceUrl/manage';
import post, { get } from '@common/service/api';

export default {
  a: (params) => get(
    {
      params,
      url: MANAGE.QUERY_DICTIONARIES
    },
  ),
  // 查询类型字典
  queryDictionaries: (params) => post(
    {
      params,
      url: MANAGE.QUERY_DICTIONARIES
    },
  ),
  // 查询中国所有的城市
  queryChinaCities: (params) => post(
    {
      params,
      url: MANAGE.QUERY_CHINA_CITIES
    },
  )
};
