import util from '../lib/util';

// eslint-disable-next-line
const navigator = weex.requireModule('navigator');
// eslint-disable-next-line
const modal = weex.requireModule('modal');
// eslint-disable-next-line
const dom = weex.requireModule('dom');

// 所有页面都要检查登录
const checkLogin = function checkLogin() {
  if (!this.getStore('token') && this.$options.name !== 'login') {
    this.navigatorTo('login.js');
  }
};

export default {
  data() {
    return {
      // util,
      weex: {
        // storage,
        navigator,
        modal,
        dom,
      },
    };
  },
  created() {
    checkLogin.call(this);
  },
  methods: {
    setStore: util.setStore,
    getStore: util.getStore,
    navigatorTo(jsFile) {
      navigator.push({
        url: util.setBundleUrl(jsFile),
      });
    },
    navigatorBack() {
      navigator.pop();
    },
  },
};
