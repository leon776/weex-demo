<style lang="scss" scoped>
  .mod-headbar{
    position: fixed;height: 100px;line-height:100px;left: 0;top: 0;width: 750px;
    align-items: center;flex-direction: row;background-color: #000000;
    z-index: 9;
    &-msg{padding-left: 32px;}
    &-msg-text{color: #ffffff;font-size: 32px;}
    &-options{
      position: absolute;height: 40px;right: 32px;top: 32px;
      &-router{margin: -32px;padding: 32px;}
    }
    &-icon-search{
      color: #ffffff;font-size: 32px;line-height: 40px;font-weight: bold;
    }
  }
</style>
<template>
  <div class="mod-headbar">
    <div class="mod-headbar-msg">
      <!-- eslint-disable-next-line -->
      <text class="mod-headbar-msg-text">微信<template v-if="unreadMsgNum > 0">({{unreadMsgNum}})</template></text>
    </div>
    <div class="mod-headbar-options">
      <router-link to="/search" class="mod-headbar-options-router">
        <text class="mod-headbar-icon-search iconfont">&#xe61d;</text>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('talkList', [
      'unreadMsgNum',
    ]),
  },
  created() {},
};
</script>
