import * as C from '../types/manageTypes';
// 查询字典
export function queryDic() {
    return { type: C.QUERY_DIC };
}
// 查询中国的所有城市
export function queryChinaCities() {
    return { type: C.QUERY_CHINA_CITIES };
}