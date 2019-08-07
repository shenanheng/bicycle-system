import * as MANAGE from '@common/constants/serviceUrl/manage';
import post, { get } from '@common/service/api';

export default {
  // 查询类型字典
  queryDictionaryTables: (params) => post(
    {
      params,
      url: MANAGE.QUERY_DICTIONARY_TABLES,
      server: 'manageService'
    },
  ),
  // 查询所在的省市区
  queryProvinceCityArea: (params) => get(
    {
      params,
      url: MANAGE.QUERY_PROVINCE_CITY_AREA,
      server: 'manageService'
    },
  )
};
