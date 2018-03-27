<style lang="scss">
  .mod-user-center{
    flex:1;background-color: #ebebeb;
    &-info{
      background-color: #ffffff;margin: 32px 0;padding: 24px 32px;
      flex-direction: row;align-items: center;
    }
    &-thumb{
      width: 128px;height: 128px;margin-right: 32px;background-color: #ebebeb;
      &-image{
        flex:1;
      }
    }
    &-content{
      flex:1;
      &-user-name{font-size: 32px;margin-bottom: 8px;}
      &-other{color: #666666;font-size: 28px;}
    }
    &-main{
    }
    &-options {
      background-color: #ffffff;margin: 0 0 24px 0;padding: 24px 32px;
      &-btn{
        text-align: center;
      }
    }
  }
</style>
<template>
<div class="mod-user-center">
  <div class="mod-user-center-info">
    <div class="mod-user-center-thumb">
      <image class="mod-user-center-thumb-image"
      :src="`${config.cdn}${base.avatar}`"
      v-if="base.avatar"/>
    </div>
    <div class="mod-user-center-content">
      <text class="mod-user-center-content-user-name">用户名：{{base.name}}</text>
      <text class="mod-user-center-content-other">手机号：{{base.cellphone}}</text>
    </div>
  </div>
  <div class="mod-user-center-main">
    <div class="mod-user-center-options">
      <div class="item">
        <text>邮箱：{{base.email}}</text>
      </div>
    </div>
    <div class="mod-user-center-options">
      <div>
        <text class="mod-user-center-options-btn">退出登录</text>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import config from '../../config';

export default {
  data() {
    return {
      config,
    };
  },
  computed: {
    ...mapGetters('user', [
      'base',
    ]),
  },
  created() {
    this.$store.dispatch('user/getBase');
  },
  mounted() {
  },
  methods: {
  },
};
</script>
