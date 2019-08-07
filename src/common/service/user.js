import * as USER from '@common/constants/serviceUrl/user';
import post, { get } from '@common/service/api';

export default {
  // 根据用户权限进行菜单的生成
  queryMenuByUser: (params) => get(
    {
      params,
      url: USER.QUERY_MENU_BY_USER
    },
  ),
  aa: (params) => post(
    {
      params,
      url: USER.QUERY_MENU_BY_USER
    },
  )
};