/* eslint-disable */
import immutable from 'immutable';

export default {
  // 更新基本信息
  updateBase(state, param) {
    const { data } = param;
    state.base = immutable.Map(data);
  },
}
