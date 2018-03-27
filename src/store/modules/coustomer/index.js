import immutable from 'immutable';
import actions from './actions';
import mutations from './mutations';

const state = {
  details: immutable.Map(),
  list: immutable.List(),
  searchList: immutable.List(),
  meta: immutable.fromJS({
    pagination: {
      count: 0,
      current_page: 1,
      per_page: 20,
      total_pages: null,
      total: 0,
    },
  }),
};

const getters = {
  list() {
    return state.list.toArray();
  },
  meta() {
    return state.meta.toJS();
  },
  searchList() {
    return state.searchList.toArray();
  },
  detail() {
    return key => (
      state.details.get(key) ? state.details.get(key).toJS() : {}
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
