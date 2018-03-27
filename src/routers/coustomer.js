import Router from 'vue-router';
import Detail from '../views/coustomer/detail.vue';
import Base from '../views/coustomer/base.vue';
import Senior from '../views/coustomer/senior.vue';

export default new Router({
  // mode: 'hash',
  routes: [
    { path: '/detail', component: Detail, meta: {} },
    { path: '/base', component: Base, meta: {} },
    { path: '/senior', component: Senior, meta: {} },
  ],
});
