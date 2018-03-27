import axios from 'weex-axios';
import config from '../config';
import helper from './helper';
// eslint-disable-next-line
const weexNavigator = weex.requireModule('navigator');
// eslint-disable-next-line
const modal = weex.requireModule('modal');

let showLogin = false;

// create a new instance of axios with a custom config
const http = axios.create({
  baseURL: config.api, // api的base_url
  timeout: 50000, // 请求超时时间
  responseType: 'json',
  validateStatus(status) {
    return status >= 200 && status <= 500; // default
  },
});

// 这里有坑，storage.getItem这鬼东西是同步而非异步
http.interceptors.request.use((cfg) => {
  const requestConfig = cfg;
  // eslint-disable-next-line
  const token = helper.getStore()('token');

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token.token}`;
  }
  return requestConfig;
});

http.interceptors.response.use((param) => {
  // console.log(param);
  let res;
  if (param.status === 401 && !showLogin && param.config.url.indexOf('login') < 0) {
    modal.alert({
      message: '登录过期',
      duration: 0.5,
    }, () => {
      weexNavigator.push({
        url: helper.setBundleUrl('login.js'),
      });
    });
    showLogin = true;
    res = Promise.reject(param.data);
  } else if (param.status >= 300) {
    res = Promise.reject(param.data);
  } else {
    res = param.data;
  }
  return res;
});

export default http;
