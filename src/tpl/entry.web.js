import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import weex from 'weex-vue-render';

weex.init(Vue);
Vue.use(Vuex);
Vue.use(Router);
const Store = require('../../src/store');