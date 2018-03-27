/* eslint-disable */
import talkList from './modules/talk';
import coustomer from './modules/coustomer';
import user from './modules/user';
import message from './modules/message';

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  modules: {
    talkList,
    coustomer,
    user,
    message,
  },
  strict: debug,
};

// exports.modules = {
//     talkList,
//     coustomer,
// };
// export default new Vuex.Store({
//   modules: {
//     cart,
//     products
//   },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// });