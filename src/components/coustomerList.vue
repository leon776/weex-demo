<style scoped lang="scss">
  .mod-coustomer-list{
    flex:1;
    &-user-face{
      width: 100px;height: 100px;margin-right: 16px;
    }
    &-item{
      height: 136px; width:750px; padding: 16px 28px;background-color: #ffffff;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #e1e1e1;
      &-panel{
        height: 100px;align-items: center; flex-direction:row;
      }
      &-main{margin-left: 16px;}
      &-is-loading{
        padding: 0;height: 80px;
        &-text{
          color: #666666; font-size: 28px;text-align: center;flex:1;height: 80px;line-height:80px;
        }
      }
    }
  }
</style>
<template>
  <list class="mod-coustomer-list" @loadmore="loadMore" :offset-accuracy="100">
    <cell class="mod-coustomer-list-item"
      v-for="item in data"
      :key="item.id"
      @click="viewDetail(item.id)"
    >
      <div class="mod-coustomer-list-item-panel">
        <image :src="item.avatar" class="mod-coustomer-list-user-face" />
        <div class="mod-coustomer-list-item-main">
          <text>{{item.nickname}}</text>
        </div>
      </div>
    </cell>
    <cell class="mod-coustomer-list-item-is-loading"
      v-if="pagination && pagination.total_pages > 1">
      <text class="mod-coustomer-list-item-is-loading-text">{{
        pagination.current_page === pagination.total_pages ? '我是有底线的' : '努力加载中...'
      }}</text>
    </cell>
  </list>
</template>

<script>
import mixin from '../mixins/index';

export default {
  data() {
    return {
      refreshing: false,
    };
  },
  props: ['data', 'pagination'],
  mixins: [mixin],
  methods: {
    loadMore() {
      this.$emit('load-more', this.pagination);
    },
    viewDetail(uid) {
      this.navigatorTo(`coustomer.js#detail?uid=${uid}`);
    },
  },
  mounted() {
    // console.log(1);
    // this.$emit('loadmore');
    // console.log(this);
  },
};
</script>
