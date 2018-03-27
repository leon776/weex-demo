<style scoped lang="scss">
.mod-chat-loading-block{height: 48px;}
.mod-chat{
  flex:1; font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  &-item{
    &-user-face{width: 64px;height: 64px;border-radius: 6px;}
    &-time{
      padding: 16px 24px;
      line-height: 1.5;
      flex-direction: row;
      justify-content:center;
      &-text{text-align: center;color: #999999;font-size: 24px;}
    }
    &-my{
      padding: 16px 24px;
      line-height: 1.5;
      flex-direction: row;
      justify-content:flex-end;
      &-text{
        line-height: 48px;font-size: 28px;
      }
      &-main{
        background-color: #f3f3f3;
        padding: 8px 20px;
        border-radius: 6px;
        line-height: 48px;
        margin-right: 16px;
      }
      &-main-overflow{
        background-color: #f3f3f3;
        padding: 8px 20px;
        border-radius: 6px;
        line-height: 48px;
        margin-right: 16px;
        width: 500px;
      }
    }
    &-cous{
      padding: 16px 24px;
      line-height: 1.5;
      flex-direction: row;
      &-text{
        font-size: 28px;color: #242424;line-height: 48px;
      }
      &-main{
        padding: 8px 20px;
        border-radius: 6px;
        margin-left: 16px;
        line-height: 48px;
        background-color: #a0e75a;
      }
    }
    &-event{
      padding: 16px 24px;
      line-height: 1.5;
      flex-direction: row;
      justify-content:center;color: #999999;
      &-main{
        font-size: 24px;
        background-color:#B0B0B0;
        opacity: 0.8;
      }
    }
    &-image{
      padding: 0;border-radius: 6px; margin: -16px -24px;
      width: 200px;height: 200px;
    }
  }
}
</style>
<template>
  <list class="mod-chat" @scroll="loadMore" offset-accuracy="100">
    <cell class="mod-chat-loading-block"></cell>
    <cell
      v-for="(item, index) in list"
      v-if="item.content"
      :key="item.id"
      :ref="`item-${item.id}`">
      <div class="mod-chat-container">
        <!-- 时间 -->
        <div class="mod-chat-item-time"
        v-if="index !== 0 && item.createtime - list[index - 1].createtime >= 300">
          <text class="mod-chat-item-time-text">{{item.created_at.substr(0, 16)}}</text>
        </div>
        <!-- 事件 -->
        <div class="mod-chat-item-event"
          v-if="item.flag === 1 && item.msgtype === 'event'"
        >
          <text class="mod-chat-item-event-main">{{item.content}}</text>
        </div>
        <!-- 客户消息 -->
        <div class="mod-chat-item-cous" v-if="item.flag === 1 && item.msgtype != 'event'">
          <image :src="avatar" class="mod-chat-item-user-face" />
          <div :class="{
            'mod-chat-item-my-main': item.content.length < 50,
            'mod-chat-item-my-main-overflow': item.content.length > 50,
          }" v-if="item.msgtype === 'text'">
            <text class="mod-chat-item-cous-text">{{item.content}}</text>
          </div>
          <div class="mod-chat-item-cous-main" v-if="item.msgtype === 'image'">
            <image class="mod-chat-item-image"
              :src="item.content"
              @click="viewImg($event)"
              resize="cover"
            />
          </div>
        </div>
        <!-- 客服消息 -->
        <div class="mod-chat-item-my" v-if="item.flag === 2">
          <div :class="{
            'mod-chat-item-my-main': item.content.length < 50,
            'mod-chat-item-my-main-overflow': item.content.length > 50,
          }" v-if="item.msgtype === 'text'">
            <text class="mod-chat-item-my-text">{{item.content}}</text>
          </div>
          <div class="mod-chat-item-my-main" v-if="item.msgtype === 'image'">
            <image class="mod-chat-item-image"
              :src="item.content"
              @click="viewImg($event)"
              resize="cover"
            />
          </div>
          <div class="mod-chat-item-my-main" v-if="item.msgtype === 'event'">
            <text class="mod-chat-item-my-text">{{item.content}}</text>
          </div>
          <image :src="kfavatar" class="mod-chat-item-user-face" />
        </div>

      </div>
    </cell>
  </list>
</template>

<script>
import mixin from '../mixins/index';
import config from '../config';
// 格式化消息
// eslint-disable-next-line
const formatMsg = (data) => {
  return data.reverse();
};

export default {
  data() {
    return {
      kfavatar: `${config.cdn}assets/img/kf.jpg`,
      targetscrollToElementId: 0,
    };
  },
  props: ['message', 'avatar'],
  computed: {
    list() {
      return this.message.list ? formatMsg(this.message.list) : [];
    },
    meta() {
      return this.message.meta || {};
    },
  },
  watch: {
    list() {
      this.$nextTick(() => {
        if (this.list.length) {
          const itemId = this.targetscrollToElementId || this.list[this.list.length - 1].id;
          const offset = this.targetscrollToElementId ? -48 : 0;
          this.weex.dom.scrollToElement(this.$refs[`item-${itemId}`][0], { animated: false, offset });
          this.targetscrollToElementId = 0;
        }
      });
    },
  },
  mixins: [mixin],
  mounted() {
  },
  methods: {
    loadMore({ contentOffset }) {
      if (contentOffset.y > -100) {
        this.targetscrollToElementId = this.list[0].id;
        this.$emit('load-more');
      }
    },
    // @todo
    viewImg() {},
  },
};
</script>
