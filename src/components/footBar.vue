<style lang="scss" scoped>
  .mod-footbar{
    position: fixed;height: 112px;left: 0;bottom: 0;width: 750px;
    align-items: center;flex-direction: row;
    background-color: #fcfcfc;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #ececec;
    &-item{
      flex:1;
      &-text{text-align: center;font-size: 24px;}
      &-iconfont, &-iconfont-green{
        font-size: 48px;margin-bottom: 4px;
        font-family:"iconfont" !important;text-align: center;
      }
      &-iconfont-green{color: #48c01e;}
      &-unread{
        position: absolute; width: 32px;height: 32px;line-height:32px;
        border-radius: 32px;
        left: 16px; top: -8px;margin-left: 16px;
        background-color: #ff0000; color: #ffffff;text-align: center;font-size: 20px;
      }
    }
  }
</style>
<template>
  <div class="mod-footbar">
    <div class="mod-footbar-item">
      <router-link to="/">
        <div>
          <text class="mod-footbar-item-iconfont-green" v-if="activeNavIndex === 0">&#xe779;</text>
          <text class="mod-footbar-item-iconfont" v-else>&#xe6bc;</text>
        </div>
        <text class="mod-footbar-item-text">微信</text>
        <text class="mod-footbar-item-unread" v-if="unreadMsgNum > 0">{{unreadMsgNum}}</text>
      </router-link>
    </div>
    <div class="mod-footbar-item">
      <router-link to="/coustomer">
        <div>
          <text class="mod-footbar-item-iconfont-green" v-if="activeNavIndex === 1">&#xe726;</text>
          <text class="mod-footbar-item-iconfont" v-else>&#xe7e3;</text>
        </div>
        <text class="mod-footbar-item-text">客户</text>
      </router-link>
    </div>
    <div class="mod-footbar-item">
      <router-link to="/user">
        <div>
          <text class="mod-footbar-item-iconfont-green" v-if="activeNavIndex === 2">&#xe6bb;</text>
          <text class="mod-footbar-item-iconfont" v-else>&#xe6b8;</text>
        </div>
        <text class="mod-footbar-item-text">个人中心</text>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['activeNavIndex'],
  computed: {
    ...mapGetters('talkList', [
      'unreadMsgNum',
    ]),
  },
  mounted() {
    // console.log(this.activeNavTab);
  },
};
</script>
