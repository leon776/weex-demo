// eslint-disable-next-line
const storage = weex.requireModule('storage');
// eslint-disable-next-line
const { bundleUrl } = weex.config;

const setBundleUrl = (jsFile) => {
  let host = '';
  let path = '';
  let nativeBase;
  let entry = jsFile;
  const isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
  if (isAndroidAssets) {
    nativeBase = 'file://assets/dist';
  } else if (isiOSAssets) {
    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
  } else {
    const matches = /\/\/([^/]+?)\//.exec(bundleUrl);
    const matchFirstPath = /\/\/[^/]+\/([^\s]+)\//.exec(bundleUrl);
    if (matches && matches.length >= 2) {
      [, host] = matches;
    }
    if (matchFirstPath && matchFirstPath.length >= 2) {
      [, path] = matchFirstPath;
    }
    nativeBase = `http://${host}/`;
  }
  const h5Base = '';
  // in Native
  let base = nativeBase;
  if (typeof navigator !== 'undefined' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko')) {
    // check if in weexpack project
    if (path === 'web' || path === 'dist') {
      base = `${h5Base}/dist/`;
    } else {
      base = h5Base;
      entry = entry.replace('.js', '.html');
    }
  } else {
    base = nativeBase + (path ? `${path}/` : '');
  }
  return base + entry;
};
// 写本地存储
const setStore = () => (
  function __setStore(key, data) {
    storage.setItem(key, JSON.stringify(data));
    return JSON.stringify(data);
  }
);
// 读本地存储
const getStore = () => (
  function __getStore(key) {
    let data = null;
    storage.getItem(key, (res) => {
      if (res.result === 'success') {
        data = JSON.parse(res.data);
      }
    });
    return data;
  }
);

module.exports = {
  setBundleUrl,
  getStore,
  setStore,
};
