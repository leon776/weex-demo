/* eslint-disable */
import immutable from 'immutable';

export default {
  // 更新列表
  updateList(state, param) {
    const { status, data, meta } = param;
    if (meta.pagination.current_page > 1) {
      state.list = state.list.concat(immutable.List(data));
    } else {
      state.list = immutable.List(data);
    }
    state.meta = immutable.fromJS(meta);
  },
  // 搜索列表
  updateSearchList(state, param) {
    const { data } = param;
    state.searchList = immutable.List(data);
  },
  // 重置搜索列表
  resetSearchData(state) {
    state.searchList = immutable.List();
  },
  // 更新详情
  updateDetails(state, param) {
    state.details = state.details.set(param.key, immutable.fromJS(param.value));
  },
}
