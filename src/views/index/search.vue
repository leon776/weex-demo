<style lang="scss">
  .mod-search{
    background-color: #e3e3e5;flex:1;
    &-header{
      width: 680px;height: 80px;margin: 40px 35px;
      border-bottom-color: #cccccc;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-radius: 8px;background-color: #ffffff;
      flex-direction:row;
    }
    &-select{
      width: 110px;
    }
    &-label{
      flex:1;
    }
    &-text{line-height: 80px;text-align: center;color: #666666;font-size: 28px;}
    &-icon-arrow {
      position: absolute;
      width: 12px;
      height: 6px;
      top: 36px;
      right: 0px;
    }
    &-input{
      flex:1;background-color: transparent;line-height: 80px;
      padding-left:12px;color: #242424;
    }
    &-input-outer{flex:1;}
    &-iconfont{
      font-size: 32px;line-height: 80px;color: #666666;text-align: center;width: 80px;
      font-family:"iconfont";
    }
    &-hidden-select{
      position: absolute;opacity: 0;left: -9999px;
    }
    &-main{
      flex:1;
    }
  }
</style>
<template>
<div class="mod-search">
  <div class="mod-search-header">
    <div class="mod-search-select">
      <label class="mod-search-label" for="searchType">
        <text class="mod-search-text">{{searchTypeText}}</text>
        <image class="mod-search-icon-arrow" :src="arrow"/>
      </label>
    </div>
    <div class="mod-search-input-outer">
      <input class="mod-search-input" type="search"
      return-key-type="search" @return="doSearch" v-model="keyword">
    </div>
    <div class="mod-search-iconfont" @click="doSearch">&#xe61d;</div>
    <select id="searchType" class="mod-search-hidden-select">
      <option value="talk">对话</option>
      <option value="coustomer">客户</option>
    </select>
  </div>
  <div class="mod-search-main">
    <talklist :data="talkList" @change-talk="changeTalk" v-if="talkList.length > 0"></talklist>
    <coustomerList :data="coustomerList" v-if="coustomerList.length > 0"></coustomerList>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import talklist from '../../components/talkList.vue';
import coustomerList from '../../components/coustomerList.vue';
import config from '../../config';

export default {
  components: {
    talklist,
    coustomerList,
  },
  data() {
    return {
      arrow: `${config.cdn}assets/icon/icon-arrow-down.png`,
      keyword: '',
      searchTypeText: '对话',
      searchType: 'talk',
      // searchType: 'coustomer',
    };
  },
  computed: {
    ...mapGetters({
      talkList: 'talkList/searchList',
      coustomerList: 'coustomer/searchList',
    }),
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
    this.resetSearchData();
  },
  methods: {
    changeTalk() {},
    doSearch() {
      if (this.keyword) {
        switch (this.searchType) {
          case 'talk':
            this.searchTalk();
            break;
          case 'coustomer':
            this.searchCoustomer();
            break;
          default:
            break;
        }
      }
    },
    searchTalk() {
      this.$store.dispatch('talkList/search', { keyword: this.keyword });
    },
    searchCoustomer() {
      this.$store.dispatch('coustomer/search', { keyword: this.keyword });
    },
    resetSearchData() {
      this.$store.commit('talkList/resetSearchData');
      this.$store.commit('coustomer/resetSearchData');
    },
  },
};
</script>
