<template>
  <div class="app-wrapper">
    <head-bar :title="'客户详情'"></head-bar>
    <div class="container">
      <router-view class="body"></router-view>
    </div>
  </div>
</template>
<script>
import router from './routers/coustomer';
import headBar from './components/subHeadBar.vue';

export default {
  name: 'index',
  components: {
    headBar,
  },
  router,
  computed: {
  },
  data() {
    return {
    };
  },
  created() {
    router.push('/');
  },
  mounted() {
  },
};
</script>

<style lang="scss">
@import './assets/style/g.scss';
.container{
  padding: 100px 0 0;flex:1;
}
</style>
