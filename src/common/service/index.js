import customerApi from './customer';
import manageApi from './manage';

export default {
  ...customerApi,
  ...manageApi
};
