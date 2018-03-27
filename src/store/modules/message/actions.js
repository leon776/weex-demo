import util from '../../../lib/util';

export default {
  // -> dispatch('message/getMessage')
  getMessage({ state, commit }, { openid }) {
    const meta = state.messageIndex.get(openid) ? state.messageIndex.get(openid).get('meta') : null;
    return util.http.get('chat/message', {
      params: {
        openid,
        page: meta ? meta.get('pagination').get('current_page') + 1 : 1,
      },
    }).then((res) => {
      commit('pushMessage', Object.assign(res, { openid }));
    });
  },
  // -> dispatch('message/sendMessage')
  sendMessage({ commit }, {
    acid,
    openid,
    content,
    time,
  }) {
    commit('updateMessage', {
      id: +(new Date()),
      openid,
      content,
      flag: 2,
      createTime: time,
    });
    return util.http.post('/oa/message/sendText', {
      acid,
      to: openid,
      msg: content,
    }).then(() => {
    });
  },
  // 分发websocket
  // -> dispatch('message/handleWs')
  handleWs({ commit }, param) {
    if (param.msgtype) {
      commit('updateMessage', {
        id: +(new Date()),
        openid: param.openid,
        flag: 1,
        createTime: param.createTime * 1000,
        content: param.content,
      });
    }
  },
};
