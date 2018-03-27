import util from '../../../lib/util';

export default {
  // -> dispatch('coustomer/getList')
  getList({ state, commit }, { limit }) {
    return util.http.get('followers', {
      params: {
        limit: limit || 10,
        page: Math.min(
          state.meta.get('pagination').get('current_page') + 1,
          state.meta.get('pagination').get('total_pages'),
        ),
      },
    }).then((res) => {
      commit('updateList', {
        data: res.data,
        meta: res.meta,
      });
    });
  },
  // -> dispatch('coustomer/search')
  search({ commit }, { keyword }) {
    return util.http.get('followers', {
      params: {
        keyword,
        limit: Number.MAX_VALUE,
        page: 1,
      },
    }).then((res) => {
      commit('updateSearchList', {
        data: res.data,
      });
    });
  },
  // -> dispatch('coustomer/getDetail')
  getDetail({ commit }, uid) {
    return util.http.get(`followers/${uid}`, {
      params: {
        include: ['profile', 'level', 'labels', 'kefu'],
      },
    }).then((res) => {
      commit('updateDetails', {
        key: uid,
        value: res.data,
      });
    });
  },
};
