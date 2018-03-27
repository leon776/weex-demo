import Router from 'vue-router';
import Talk from '../views/index/talk.vue';
import Coustomer from '../views/index/coustomer.vue';
import User from '../views/index/user.vue';
import Search from '../views/index/search.vue';

export default new Router({
  // mode: 'hash',
  routes: [
    { path: '*', component: Talk, meta: { activeNav: 0 } },
    { path: '/', component: Talk, meta: { activeNav: 0 } },
    { path: '/search', component: Search, meta: { activeNav: NaN } },
    { path: '/talk', component: Talk, meta: { activeNav: 0 } },
    { path: '/coustomer', component: Coustomer, meta: { activeNav: 1 } },
    { path: '/user', component: User, meta: { activeNav: 2 } },
  ],
});
