import util from '../../../lib/util';

export default {
  // -> dispatch('user/getBase')
  getBase({ commit }) {
    util.http.get('op/info').then((res) => {
      commit('updateBase', {
        data: res.data,
      });
    });
  },
};
