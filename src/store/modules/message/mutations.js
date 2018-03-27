import immutable from 'immutable';
import util from '../../../lib/util';

export default {
  // 更新聊天记录列表
  pushMessage(state, param) {
    const { data, meta, openid } = param;
    let message;
    if (meta.pagination.current_page > 1) {
      message = state.messageIndex.get(openid);
      message = message.set('list', message.get('list').concat(data));
    } else {
      message = immutable.Map();
      message = message.set('list', immutable.List(data));
    }
    message = message.set('meta', immutable.fromJS(meta));
    state.messageIndex = state.messageIndex.set(openid, message);
  },
  // 更新单个聊天记录
  updateMessage(state, param) {
    const {
      openid,
      content,
      flag,
      createTime,
      id,
      type,
    } = param;
    const list = state.messageIndex.get(openid).get('list');
    const newList = list.unshift({
      id,
      flag,
      msgtype: type || 'text',
      content,
      created_at: util.dateFormat((createTime || (new Date())), 'yyyy-MM-dd hh:mm'),
    });
    state.messageIndex = state.messageIndex.setIn([openid, 'list'], newList);
  },
};
