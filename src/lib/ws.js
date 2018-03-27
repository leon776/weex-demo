import config from '../config';
import http from './http';
import pubsub from './pubsub';

let running = false;
const Ws = function Ws() {
  // eslint-disable-next-line
  const websocket = weex.requireModule('webSocket');
  this.server = new WebSocket(config.ws);
  this.server.onmessage = (res) => {
    try {
      pubsub.publish('ws', JSON.parse(res.data));
      // this.dispatch(JSON.parse(res.data));
    } catch (e) {
      console.error(e);
    }
  };
};

// Ws.prototype.observers = [];
// Ws.prototype.dispatch = function dispatch(...data) {
//   this.observers.forEach((observer) => {
//     observer.fn.call(observer.object, ...data);
//   });
// };
Ws.prototype.start = function start() {
  if (!running) {
    http.get('/op/info').then((res) => {
      this.server.send(`{"type":"connect", "kid": "${res.data.id}", "client": "app"}`);
    });
    running = true;
  }
};
Ws.prototype.send = function send(json) {
  this.server.send(JSON.stringify(json));
};
// Ws.prototype.addObserver = function addWatcher(object, fn) {
//   this.observers.push({ object, fn });
//   this.start();
// };

// const ws = new Ws();

export default Ws;
