import immutable from 'immutable';

export default {
  // 更新聊天列表
  updateList(state, param) {
    const { status, data, meta } = param;
    const list = state[status];
    if (meta.pagination.current_page > 1) {
      list.data = list.data.concat(immutable.List(data));
    } else {
      list.data = immutable.List(data);
    }
    list.meta = immutable.fromJS(meta);
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
  // 单条消息处理
  updateTalkListSingle(state, param) {
    const list = param.fstatus === 1 ? state.received : state.pending;
    const message = {
      avatar: param.avatar,
      nickname: param.nickname,
      last_msg: param.content,
      last_msg_time: param.createTime,
      unread_count: 1,
    };
    let newCoustomer = true;
    list.data.forEach((v, k) => {
      if (v.openid === param.openid) {
        newCoustomer = false;
        list.data = list.data.set(k, Object.assign(v, message, {
          unread_count: v.unread_count + 1,
        }));
      }
    });
    if (newCoustomer) {
      list.data = list.data.push(message);
    }
    list.meta = list.meta.update('total_unread_count', v => Number(v) + 1);
  },
  // 接待+1
  updateReceived(state, openid) {
    const received = state.received.data;
    received.forEach((v, k) => {
      if (v.openid === openid) {
        state.received.data = received.delete(k).unshift(Object.assign(v, { unread_count: 0 }));
      }
    });
  },
  // 排队-1
  updatePending(state, openid) {
    const pendingList = state.pending.data;
    const receivedList = state.received.data;
    const receivedMeta = state.received.meta;
    const pendingMeta = state.pending.meta;
    pendingList.forEach((v, k) => {
      if (v.openid === openid) {
        state.received.data = receivedList.push(v);
        state.pending.data = pendingList.delete(k);
        state.received.meta = receivedMeta.updateIn(['pagination', 'total'], val => Number(val) + 1);
        state.pending.meta = pendingMeta.updateIn(['pagination', 'total'], val => Number(val) - 1);
      }
    });
  },
  // 减掉已读消息
  reduceUnread(state, num) {
    state.pending.meta = state.pending.meta.update('total_unread_count', v => Number(v) - num);
    state.received.meta = state.received.meta.update('total_unread_count', v => Number(v) - num);
  },
};
