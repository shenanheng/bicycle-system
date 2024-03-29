import * as USER from '@common/constants/serviceUrl/user';
import post, { get } from '@common/service/api';

export default {
  // 登录
  login: params =>
    post({
      params,
      url: USER.LOGIN
    }),
  // 根据用户权限进行菜单的生成
  queryMenuByUser: params =>
    get({
      params,
      url: USER.QUERY_MENU_BY_USER
    }),
  // 根据用户来查询人员
  queryUserListByUser: params =>
    get({
      params,
      url: USER.QUERY_USER_LIST_BY_USER
    })
};
