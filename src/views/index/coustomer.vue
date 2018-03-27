<style lang="scss">
  .mod-talk{
    flex:1;
  }
</style>
<template>
<div class="mod-talk">
  <refresh class="refresh"
  @refresh="onrefresh"
  @pullingdown="onpullingdown"
  :display="refreshing ? 'show' : 'hide'">
    <text class="indicator-text">刷新中 ...</text>
    <loading-indicator class="indicator"></loading-indicator>
  </refresh>
  <coustomerList
    :data="list"
    :pagination="meta.pagination"
    @load-more="loadMore"
  ></coustomerList>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import coustomerList from '../../components/coustomerList.vue';

export default {
  components: {
    coustomerList,
  },
  data() {
    return {
      loading: false,
      refreshing: false,
    };
  },
  computed: {
    ...mapGetters('coustomer', [
      'list',
      'meta',
    ]),
  },
  created() {
    if (this.list.length === 0) this.$store.dispatch('coustomer/getList', {});
  },
  mounted() {
  },
  methods: {
    loadMore(pagination) {
      if (pagination.current_page < pagination.total_pages) {
        this.$store.dispatch('coustomer/getList', {});
      }
    },
    onrefresh() {},
    onpullingdown(event) {
      console.log(event);
    },
  },
};
</script>
