<template>
  <div class="app-wrapper">
    <head-bar></head-bar>
    <div class="container">
      <router-view class="body"></router-view>
    </div>
    <foot-bar :active-nav-index="activeNavIndex"></foot-bar>
  </div>
</template>
<script>
import router from './routers/index';
import headBar from './components/headBar.vue';
import footBar from './components/footBar.vue';
import util from './lib/util';

export default {
  name: 'index',
  components: {
    headBar,
    footBar,
  },
  router,
  computed: {
    activeNavIndex() {
      return this.$route.meta.activeNav;
    },
  },
  data() {
    return {
    };
  },
  created() {
    util.ws.start();
    router.push('/');
    // if (this.$route.path !== '/') {
    //   this.$store.dispatch('talkList/getList', { status: 'received' });
    // }
  },
  mounted() {},
};
</script>

<style lang="scss">
@import './assets/style/g.scss';
.container{
  padding: 100px 0 112px;flex:1;
}
</style>
