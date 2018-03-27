/* 对话列表 */
import immutable from 'immutable';
import actions from './actions';
import mutations from './mutations';

const defaultMeta = {
  pagination: {
    count: 0,
    current_page: 0,
    per_page: 20,
    total_pages: null,
    total: 0,
  },
  total_unread_count: 0,
};

const defaultState = {
  searchList: immutable.List(),
  received: {
    data: immutable.List(),
    meta: immutable.fromJS(defaultMeta),
  },
  pending: {
    data: immutable.List(),
    meta: immutable.fromJS(defaultMeta),
  },
};

const getters = {
  unreadMsgNum(state) {
    // eslint-disable-next-line
    const unread = Math.max(state.received.meta.toObject().total_unread_count, state.pending.meta.toObject().total_unread_count);
    return Math.min(99, unread);
  },
  searchList(state) {
    return state.searchList.toArray();
  },
  receivedList(state) {
    return state.received.data.toArray();
  },
  receivedMeta(state) {
    return {
      pagination: state.received.meta.get('pagination').toObject(),
    };
  },
  pendingList(state) {
    return state.pending.data.toArray();
  },
  pendingMeta(state) {
    return {
      pagination: state.pending.meta.get('pagination').toObject(),
    };
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
