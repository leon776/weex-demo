import Ws from './ws';
import helper from './helper';
import pubsub from './pubsub';
import http from './http';
import dateFormat from './dateFormat';


const util = {
  ws: new Ws(),
  http,
  pubsub,
  dateFormat,
  getStore: helper.getStore(),
  setStore: helper.setStore(),
  setBundleUrl: helper.setBundleUrl,
};

export default util;
