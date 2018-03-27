import util from '../../../lib/util';

export default {
  // -> dispatch('talkList/getList')
  getList({ state, commit }, { status, limit }) {
    return util.http.get('followers/latest', {
      params: {
        limit: limit || 20,
        fstatus: status,
        page: Math.min(
          state[status].meta.get('pagination').get('current_page') + 1,
          state[status].meta.get('pagination').get('total_pages'),
        ),
      },
    }).then((res) => {
      commit('updateList', {
        status,
        data: res.data,
        meta: res.meta,
      });
    });
  },
  // -> dispatch('talkList/search')
  search({ commit }, { keyword }) {
    return util.http.get('followers/latest', {
      params: {
        keyword,
        fstatus: ['received', 'pending'],
        limit: Number.MAX_VALUE,
      },
    }).then((res) => {
      commit('updateSearchList', {
        data: res.data,
      });
    });
  },
  // -> dispatch('talkList/startTalk')
  startTalk({ commit }, { openid, num }) {
    commit('reduceUnread', num);
    commit('updateReceived', openid);
    commit('updatePending', openid);
  },
  // 分发websocket
  // -> dispatch('talkList/分发websocket')
  handleWs({ commit }, param) {
    if (param.msgtype) {
      commit('updateTalkListSingle', param);
    }
  },
};
