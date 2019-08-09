import manageApi from './manage';
import userApi from './user';
import rootApi from './root';

export default {
  ...manageApi,
  ...userApi,
  ...rootApi
};
