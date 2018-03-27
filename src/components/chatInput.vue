<style scoped lang="scss">
  .mod-chat-input{
    height: 96px;background-color: #eeeeee;flex-direction:row;
    &-input{
      flex: 1;margin: 16px;line-height: 64px;padding-left: 12px;color: #555555;
    }
    &-btn{
      width: 100px; height: 60px; margin-top: 16px;margin-right: 16px;
      &-text{
        color: #ffffff;background-color: #46c01b;font-size: 28px;text-align: center;
        height: 60px;line-height: 60px;
        border-radius: 6px;
      }
    }
  }
</style>
<template>
  <div class="mod-chat-input">
    <input return-key-type="done"
      @return="send"
      class="mod-chat-input-input"
      v-model="input"
    />
    <div class="mod-chat-input-btn" @click="send">
      <text class="mod-chat-input-btn-text">发送</text>
    </div>
  </div>
</template>

<script>
// import util from '../util';

export default {
  data() {
    return {
      input: '',
    };
  },
  props: ['openid', 'acid'],
  mounted() {
  },
  methods: {
    send() {
      if (this.input.replace(/ /g, '')) {
        const message = {
          acid: this.acid,
          openid: this.openid,
          content: this.input,
          time: +(new Date()),
        };
        this.$store.dispatch('message/sendMessage', message).then(() => {});
        this.input = '';
        this.$emit('kf-input', message);
      }
    },
  },
};
</script>
