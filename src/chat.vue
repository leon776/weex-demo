<template>
  <div class="app-wrapper">
    <head-bar :title="coustomerDetail.nickname"></head-bar>
    <div class="container">
      <chat-container
        ref="chat"
        :message="message"
        :avatar="coustomerDetail.avatar"
        @load-more="loadMore"
      >
      </chat-container>
      <chat-input ref="chatInput"
        @kf-input="likeWs"
        :openid="coustomerDetail.openid"
        :acid="coustomerDetail.acid">
      </chat-input>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import util from './lib/util';
import mixin from './mixins/index';
import headBar from './components/subHeadBar.vue';
import chatContainer from './components/chatContainer.vue';
import chatInput from './components/chatInput.vue';

export default {
  name: 'index',
  components: {
    headBar,
    chatContainer,
    chatInput,
  },
  mixins: [mixin],
  computed: {
    coustomerDetail() {
      return this.getCoustomerDetail(this.uid);
    },
    message() {
      return this.messageIndex(this.coustomerDetail.openid);
    },
    ...mapGetters({
      messageIndex: 'message/messageIndex',
      getCoustomerDetail: 'coustomer/detail',
    }),
  },
  // watch: {
  //   coustomerDetail(value) {
  //   },
  // },
  data() {
    return {
      uid: this.$route.query.uid,
      openid: this.$route.query.openid,
      loading: false,
    };
  },
  created() {
    this.$store.dispatch('coustomer/getDetail', this.uid).then(() => {
      this.hasRead();
    });
    this.$store.dispatch('message/getMessage', { openid: this.openid }).then(() => {
      util.ws.start();
      this.subscribe();
    });
  },
  mounted() {
  },
  methods: {
    hasRead() {
      // 改变排队状态
      util.http.post('kefu/chatTo', {
        fid: this.coustomerDetail.fid,
      });
      // 清未读消息数
      util.ws.send({
        fid: this.uid,
        openid: this.openid,
        type: 'read',
      });
      util.pubsub.publish('startTalk', {
        openid: this.openid,
        num: this.coustomerDetail.unread_count,
      });
    },
    subscribe() {
      // 订阅websocket消息
      util.pubsub.subscribe(null, 'ws', (...args) => {
        this.$store.dispatch('message/handleWs', ...args);
      });
    },
    loadMore() {
      // eslint-disable-next-line
      const { current_page, total_pages } = this.message.meta.pagination;
      // eslint-disable-next-line
      if (current_page < total_pages && !this.loading) {
        this.loading = true;
        this.$store.dispatch('message/getMessage', { openid: this.openid }).then(() => {
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      }
    },
    // 模拟ws消息
    likeWs(message) {
      util.pubsub.publish('kfMessage', Object.assign(message, {
        nickname: this.coustomerDetail.nickname,
        msgtype: 'text',
        fstatus: 1,
      }));
    },
  },
};
</script>

<style lang="scss">
@import './assets/style/g.scss';
.container{
  padding: 100px 0 0;flex:1;
}
</style>
