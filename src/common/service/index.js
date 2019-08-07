import manageApi from './manage';
import userApi from './user';

export default {
  ...manageApi,
  ...userApi
};
