const chanelId = Symbol('broadcast');
const broadcast = new BroadcastChannel(chanelId.toString());

const pubsub = {
  topics: {},
  subid: 1,
  // 广播到当前webview
  publish(topic, ...args) {
    const topics = this.topics[topic];
    if (topics) {
      topics.map(v => (
        v.fn(args)
      ));
    }
  },
  // 订阅消息
  subscribe(context, topic, fn) {
    const id = this.subid.toString();
    this.topics[topic] = this.topics[topic] || [];
    this.topics[topic].push({
      id,
      fn(args) {
        fn.call(context, ...args);
      },
    });
    this.subid += 1;
    return id;
  },
  // 取消订阅
  unSubscribe(topic, id) {
    this.topics[topic].forEach((v, k) => {
      if (v.id === id) {
        this.topics[topic].splice(k, 1);
      }
    });
  },
};

// 发布消息&&广播到其他webview
const publish = (topic, ...args) => {
  pubsub.publish(topic, ...args);
  broadcast.postMessage({ topic, args });
};

const subscribe = (...args) => {
  pubsub.subscribe.call(pubsub, ...args);
};
const unSubscribe = (...args) => {
  pubsub.unSubscribe.call(pubsub, ...args);
};

// 监听来自其他页面的消息
broadcast.onmessage = function onmessage(evt) {
  const params = evt.data;
  pubsub.publish(params.topic, ...params.args);
};

export default {
  publish,
  subscribe,
  unSubscribe,
};
