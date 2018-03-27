<style lang="scss" scoped>
  .mod-headbar{
    position: fixed;height: 100px;left: 0;top: 0;width: 750px;
    align-items: center;flex-direction: row;background-color: #000000;
    z-index: 9;
    &-iconfont{
      width: 100px;line-height:100px;font-family:"iconfont" !important;
      color: #ffffff;font-size: 32px;font-weight: bold;text-align: center;
    }
    &-title{color: #ffffff;font-size: 32px;}
  }
</style>
<template>
  <div class="mod-headbar">
    <text class="mod-headbar-iconfont" @click="navigatorBack">&#xe600;</text>
    <text class="mod-headbar-title">{{title}}</text>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import mixin from '../mixins/index';

export default {
  data() {
    return {};
  },
  props: ['title'],
  mixins: [mixin],
  computed: {
    ...mapGetters('talkList', [
      'unreadMsgNum',
    ]),
  },
  methods: {
  },
};
</script>
