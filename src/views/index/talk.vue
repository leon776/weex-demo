<style lang="scss">
  .mod-talk{
    flex:1;
    &-head{
      flex-direction:row;line-height: 72px;height: 72px;
      background-color: #f5f5f5;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #dedee0;
      &-item{
        flex:1;color: #333333;
      }
      &-text{text-align: center;font-size: 28px;line-height: 72px;}
      &-active-text{text-align: center;font-size: 28px;line-height: 72px;color: #48c01e;}
      &-line{
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e1e1e1;
      }
    }
    &-main{flex:1;}
  }
</style>
<template>
<div class="mod-talk">
  <div class="mod-talk-head">
    <div class="mod-talk-head-item" @click="changeStatus('received')">
      <text
        :class="{
          'mod-talk-head-active-text' : status === 'received',
          'mod-talk-head-text' : status === 'pending',
        }"
      >正在接待({{receivedMeta.pagination.total}})</text>
    </div>
    <div class="mod-talk-head-line"></div>
    <div class="mod-talk-head-item" @click="changeStatus('pending')">
      <text :class="{
          'mod-talk-head-active-text' : status === 'pending',
          'mod-talk-head-text' : status === 'received',
        }">正在排队({{pendingMeta.pagination.total}})</text>
    </div>
  </div>

  <div class="mod-talk-main">
    <talklist
      status="received"
      :data="receivedList"
      :pagination="receivedMeta.pagination"
      @start-talk="startTalk"
      @load-more="loadMore"
      v-if="status === 'received'"
      >
    </talklist>
    <talklist
      status="pending"
      :data="pendingList"
      :pagination="pendingMeta.pagination"
      @start-talk="startTalk"
      @load-more="loadMore"
      v-if="status === 'pending'"
      >
    </talklist>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import talklist from '../../components/talkList.vue';
import mixin from '../../mixins/index';
import util from '../../lib/util';

export default {
  components: {
    talklist,
  },
  data() {
    return {
      status: 'received',
      refreshing: false,
    };
  },
  computed: {
    ...mapGetters('talkList', [
      'receivedList',
      'pendingList',
      'receivedMeta',
      'pendingMeta',
    ]),
  },
  mixins: [mixin],
  created() {
    if (this.receivedList.length === 0) this.$store.dispatch('talkList/getList', { status: 'received' });
    if (this.pendingList.length === 0) this.$store.dispatch('talkList/getList', { status: 'pending' });
  },
  mounted() {
    // 订阅websocket消息
    util.pubsub.subscribe(null, 'ws', (...args) => {
      this.$store.dispatch('talkList/handleWs', ...args);
    });
    // 订阅聊天消息
    util.pubsub.subscribe(null, 'startTalk', (...args) => {
      this.$store.dispatch('talkList/startTalk', ...args);
    });
    // 订阅客服消息
    util.pubsub.subscribe(null, 'kfMessage', (...args) => {
      this.$store.dispatch('talkList/handleWs', ...args);
    });
  },
  methods: {
    startTalk(uid, openid) {
      this.navigatorTo(`chat.js#/?uid=${uid}&openid=${openid}`);
    },
    loadMore(pagination) {
      if (pagination.current_page < pagination.total_pages) {
        this.$store.dispatch('talkList/getList', { status: this.status });
      }
    },
    changeStatus(status) {
      this.status = status;
    },
  },
};
</script>
