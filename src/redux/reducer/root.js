import * as C from '../types/rootTypes';

const rootState = {
  collapsed: false // 默认是没有收起来
};

export default (state = rootState, action) => {
  switch (action.type) {
    // 菜单的收缩
    case C.COLLAPSED:
      return {
        ...state,
        collapsed: !state.collapsed
      };
    default:
      return { ...state };
  }
};
