<style lang="scss" scoped>
  .mod-talk-list{
    flex:1;
    &-panel{
      height: 100px;width: 750px;
      align-items: center;
      flex-direction:row;
    }
    &-user-face{
      width: 100px;height: 100px;
    }
    &-content {
      flex: 1;padding-left: 16px;font-size: 24px;
      color: #8f8f8f; padding-right: 64px;
    }
    &-user-name{
      color: #242424;margin-bottom: 12px;height: 32px;
      flex-direction: row;
      &-text{
        font-size: 32px;color: #333333;flex:1;
        height:32px;line-height: 32px;
      }
      &-time{
        line-height: 28px;height: 28px;
        font-size: 24px;color: #8f8f8f;
        text-align: right;
      }
    }
    &-item-is-loading{
      padding: 0;height: 80px;
      &-text{
        color: #666666; font-size: 28px;text-align: center;flex:1;height: 80px;line-height:80px;
      }
    }
    &-news{
      position: absolute; width: 32px;height: 32px;
      border-radius: 32px;
      background-color: #ff0000; left: 80px; top: -10px;
      &-text{
        font-size: 20px; color: #ffffff;line-height: 32px;text-align: center;
      }
    }
    &-user-msg{
      text-overflow: ellipsis;
      &-text{font-size: 24px;color: #999999;}
    }
    &-item{
      border-bottom-color: #e1e1e1;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      height: 132px;padding: 16px 28px;
      background-color: #ffffff;
    }
  }
</style>
<template>
  <list class="mod-talk-list" @loadmore="loadMore" :offset-accuracy="100">
    <cell class="mod-talk-list-item"
      v-for="item in data"
      :key="item.id"
      :class="{
        'is-unread': item.unread_count > 0,
      }"
      @click="startTalk(item.id, item.openid)"
    >
      <div class="mod-talk-list-panel">
        <image :src="item.avatar" class="mod-talk-list-user-face" />
        <div class="mod-talk-list-content">
          <div class="mod-talk-list-user-name">
            <text class="mod-talk-list-user-name-text">{{item.nickname}}</text>
            <!-- <text class="text">({{item.app_name}})</text> -->
            <text class="mod-talk-list-user-name-time">{{item.reply_time || item.created_at}}</text>
          </div>
          <div class="mod-talk-list-user-msg" v-if="item.last_msg_type === 'image'">
            <text class="mod-talk-list-user-msg-text">
              <!-- eslint-disable-next-line -->
              <template v-if="item.unread_count > 0">[{{item.unread_count}}条]</template>[图片]</text>
          </div>
          <div class="mod-talk-list-user-msg" v-else>
            <text class="mod-talk-list-user-msg-text">
              <!-- eslint-disable-next-line -->
              <template v-if="item.unread_count > 0">[{{item.unread_count}}条]</template>{{item.last_msg}}</text>
          </div>
        </div>
        <div class="mod-talk-list-news" v-show="item.unread_count > 0">
          <text class="mod-talk-list-news-text">{{item.unread_count}}</text>
        </div>
      </div>
    </cell>
    <cell class="mod-talk-list-item-is-loading"
      v-if="pagination && pagination.total_pages > 1">
      <text class="mod-talk-list-item-is-loading-text">{{
        pagination.current_page === pagination.total_pages ? '我是有底线的' : '努力加载中...'
      }}</text>
    </cell>
  </list>
</template>

<script>
export default {
  data() {
    return {
      refreshing: false,
    };
  },
  props: ['data', 'pagination'],
  methods: {
    startTalk(uid, openid) {
      this.$emit('start-talk', uid, openid);
    },
    loadMore() {
      this.$emit('load-more', this.pagination);
    },
    onrefresh() {},
    onpullingdown(event) {
      console.log(event);
    },
  },
  mounted() {
    // console.log(1);
    // this.$emit('loadmore');
    // console.log(this);
  },
};
</script>
