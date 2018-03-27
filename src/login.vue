<template>
  <div class="mod-login">
    <div class="mod-login-logo">
      <image class="mod-login-logo-icon" :src="icon" />
      <text class="mod-login-logo-text">小柚鱼塘</text></div>
    <div class="mod-login-form">
      <form>
      <div class="mod-login-form-item">
        <text class="mod-login-form-item-pre-fix">+86</text>
        <input type="tel" placeholder="请输入手机号"
        class="mod-login-form-item-input"
        v-model="postData.username">
      </div>
      <div class="mod-login-form-item">
        <input type="password" placeholder="密码"
        class="mod-login-form-item-input"
        v-model="postData.password" autocomplete="false">
      </div>
      <div class="mod-login-form-item-btn">
        <text class="mod-btn" @click="login">登录</text>
      </div>
      <div class="mod-login-form-item-err">
        <text class="mod-login-form-item-errtext">{{errText}}</text>
      </div>
      </form>
    </div>
    <div class="mod-login-footer">
      <text class="mod-login-footer-text">好生意，好伙伴</text>
      <text class="mod-login-footer-text">深圳小柚互动科技有限公司版权所有</text>
    </div>
  </div>
</template>
<script>
import mixin from './mixins/index';
import util from './lib/util';
import config from './config';

export default {
  name: 'login',
  mixins: [mixin],
  data() {
    return {
      icon: `${config.cdn}/assets/img/icon.png`,
      postData: {
        username: '',
        password: '',
      },
      errText: '',
    };
  },
  mounted() {
    const loginData = this.getStore('loginData');
    this.postData.username = loginData ? loginData.username : null;
    this.postData.password = loginData ? loginData.password : null;
  },
  methods: {
    login() {
      if (!this.postData.username || !this.postData.password) {
        this.errText = '用户名和密码不能为空';
      } else {
        this.errText = '';
        util.http.post('/op/login', this.postData).then((res) => {
          this.weex.modal.toast({
            message: '登录成功',
            duration: 0.8,
          });
          this.setStore('loginData', this.postData);
          this.setStore('token', res.data);
          this.weex.navigator.push({
            url: util.setBundleUrl('index.js'),
          });
        }).catch((e) => {
          console.error(e);
          this.errText = e ? e.message : '用户名或密码错误';
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import './assets/style/g.scss';
.mod-login{
  padding: 128px 24px 64px; flex:1;
  background-color: #fafafa;
  &-logo{
    line-height: 128px;margin-bottom: 128px;
    text-align: center;justify-content:center;flex-direction: row;
    &-text{
      color: #569dfa; font-size: 64px;text-align: center;
      width: 300px;
    }
    &-icon{
      height: 96px;width: 96px;margin-left: -48px;
    }
  }
  &-form{
    &-item{
      height: 96px;line-height: 96px;
      border-bottom-color: #ececec;
      border-bottom-width: 1px;
      border-bottom-style: solid;flex-direction:row;
      &-pre-fix{width: 120px;text-align: center;line-height: 96px;
        border-right-color: #ececec;
        border-right-width: 1px;
        border-right-style: solid;
      }
      &-input{height: 96px;flex:1;background-color: transparent;padding-left:24px;}
      &-btn{
        margin-top: 100px;
      }
      &-err{
        margin-top: 48px;
      }
      &-errtext{
        text-align: center;color: #ff0000;
      }
    }
  }
  &-footer{
    position: absolute;line-height: 48px;left: 0;bottom: 36px;width: 750px;
    &-text{color: #777777;text-align: center; font-size: 24px;}
  }
}
</style>
