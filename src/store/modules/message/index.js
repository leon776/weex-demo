import immutable from 'immutable';
import actions from './actions';
import mutations from './mutations';

const state = {
  messageIndex: immutable.Map(),
};

const getters = {
  messageIndex() {
    return key => (
      state.messageIndex.get(key) ? state.messageIndex.get(key).toJS() : {}
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
