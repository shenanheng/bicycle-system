import * as C from '../types/manageTypes';
import Api from '@api';
export default {
  // 查询产品字典表
  queryDictionaryTablesM: () => {
    return dispatch => {
      Api.queryDictionaryTables([
        'Car_Bsns_Char',
        'allowState',
        'rebateType',
        'account_type',
        'marriage_type',
        'sex',
        'DegreeOfEducation',
        'children',
        'OccupationalStatus',
        'belong_industry',
        'unit_Property',
        'IncomeStatus',
        'income_prove',
        'Property_nature',
        'Property_area',
        'Purchase_method',
        'kinship_type',
        'certificateType',
        'managerType',
        'school_Situation',
        'income_person',
        'site_Properties',
        'Shares',
        'DEALER_GRADE'
      ]).then(res => {
        dispatch({type:C.QUERY_DICTIONARY_TABLES,data:res.data})
      });
    };
  }
};
