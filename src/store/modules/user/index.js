import immutable from 'immutable';
import actions from './actions';
import mutations from './mutations';

const state = {
  base: immutable.Map(),
};

const getters = {
  base() {
    return state.base.toObject();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
