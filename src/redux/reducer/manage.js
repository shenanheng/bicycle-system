import * as C from '../types/manageTypes';
const manageState = {
  dictionaries: {
    carMode: [], // 用车模式
    operateMode: [], // 运营模式
    authorizeState: [] // 加盟商授权状态
  },
  provinceCityAreaOld: [],
  provinceCityAreaTree: []
};
// 处理省市区
function handleCities(data) {
  let { province, city, country } = data;
  let provinceCityAreaTree = [];
  province.forEach(i => {
    provinceCityAreaTree.push({
      value: `${i.id}-${i.name}`,
      label: i.name,
      children: []
    });
  });
  city.forEach(i => {
    provinceCityAreaTree.forEach(f => {
      if (+f.value.split('-')[0] === i.parentId) {
        f.children.push({
          value: `${i.id}-${i.name}`,
          label: i.name,
          children: []
        });
      }
    });
  });
  country.forEach(i => {
    provinceCityAreaTree.forEach(f => {
      f.children.forEach(t => {
        if (+t.value.split('-')[0] === i.parentId) {
          t.children.push({
            value: `${i.id}-${i.name}`,
            label: i.name
          });
        }
      });
    });
  });
  return provinceCityAreaTree
}
export default (state = manageState, action) => {
  let { type, data } = action;

  switch (type) {
    // 字典的查询
    case `${C.QUERY_DIC}_SAGA`:
      return { ...state, dictionaries: data };
    // 中国所有的城市
    case `${C.QUERY_CHINA_CITIES}_SAGA`:

      return {
        ...state,
        provinceCityAreaOld: data,
        provinceCityAreaTree: handleCities(data)
      };
    default:
      return { ...state };
  }
};
