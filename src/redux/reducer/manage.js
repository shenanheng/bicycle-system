import * as C from '../types/manageTypes';
export default {
  queryDictionaryTables: (
    state = {
      vehicleDealerNature: [], // 车商性质
      vehicleDealerAdmitt: [], // 车商准入状态
      rebateType: [], // 返利类型
      accountNature: [], // 查询账户性质
      maritalStatus: [], // 婚姻状况
      sex: [], // 性别
      cultureDegree: [], // 文化程度
      children: [], // 子女情况
      schoolSituation: [], // 子女上学情况
      occupationalStatus: [], // 职业状况
      belongIndustry: [], // 所属行业
      unitProperty: [], // 单位性质
      incomeStatus: [], // 月固定收入
      incomeProve: [], // 收入佐证
      propertyNature: [], // 房产性质
      propertyArea: [], // 房产区域
      purchaseMethod: [], // 购买方式
      kinshipType: [], // 亲属关系
      certificateType: [], // 证件类型
      managerType: [], // 管理类型
      incomePerson: [], // 收入人
      siteProperties: [], // 场地性质
      shares: [], // 股份构成
      dealerGrade: [] // 车商等级
    },
    action
  ) => {
    if (action.type === C.QUERY_DICTIONARY_TABLES) {
      const {
        rebateType,
        Car_Bsns_Char: vehicleDealerNature,
        account_type: accountNature,
        allowState: vehicleDealerAdmitt,
        marriage_type: maritalStatus,
        sex,
        DegreeOfEducation: cultureDegree,
        children,
        school_Situation: schoolSituation,
        OccupationalStatus: occupationalStatus,
        belong_industry: belongIndustry,
        unit_Property: unitProperty,
        IncomeStatus: incomeStatus,
        income_prove: incomeProve,
        Property_nature: propertyNature,
        Property_area: propertyArea,
        Purchase_method: purchaseMethod,
        kinship_type: kinshipType,
        certificateType,
        managerType,
        income_person: incomePerson,
        site_Properties: siteProperties,
        Shares: shares,
        DEALER_GRADE: dealerGrade
      } = action.data;
      return {
        vehicleDealerNature, // 车商性质
        rebateType, // 返利类型
        belongIndustry, // 所属行业
        incomeStatus, // 月固定收入
        incomeProve, // 收入佐证
        kinshipType, // 亲属关系
        incomePerson, // 收入人
        dealerGrade, // 车商等级
        accountNature: accountNature.map(item => {
          // 帐户性质
          const obj = item;
          obj.value = +item.value;
          return obj;
        }),
        vehicleDealerAdmitt: vehicleDealerAdmitt.map(item => ({
          ...item,
          value: item.value * 1
        })), // 车商准入状态
        maritalStatus: maritalStatus.map(item => ({
          ...item,
          value: item.value * 1
        })), // 婚姻状况
        sex: sex.map(item => ({ ...item, value: item.value * 1 })), // 性别
        cultureDegree: cultureDegree.map(item => ({
          ...item,
          value: item.value * 1
        })), // 文化程度
        children: children.map(item => ({ ...item, value: item.value * 1 })), // 子女情况
        schoolSituation: schoolSituation.map(item => ({
          ...item,
          value: item.value * 1
        })), // 子女上学情况
        occupationalStatus: occupationalStatus.map(item => ({
          ...item,
          value: item.value * 1
        })), // 职业状况

        unitProperty: unitProperty.map(item => ({
          ...item,
          value: item.value * 1
        })), // 单位性质

        propertyNature: propertyNature.map(item => ({
          ...item,
          value: item.value * 1
        })), // 房产性质
        propertyArea: propertyArea.map(item => ({
          ...item,
          value: item.value * 1
        })), // 房产区域
        purchaseMethod: purchaseMethod.map(item => ({
          ...item,
          value: item.value * 1
        })), // 购买方式
        certificateType: certificateType.map(item => ({
          ...item,
          value: item.value * 1
        })), // 证件类型
        managerType: managerType.map(item => ({
          ...item,
          value: item.value * 1
        })), // 管理类型
        siteProperties: siteProperties.map(item => ({
          ...item,
          value: item.value * 1
        })), // 场地性质
        shares: shares.map(item => ({
          ...item,
          value: item.value * 1
        })) // 股份构成
      };
    }
    return state;
  }
};
