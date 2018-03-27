<style lang="scss">
  @import '../../assets/style/mod-coustomer-detail.scss';
</style>
<template>
  <div class="mod-coustomer-detail">
    <div class="mod-coustomer-detail-info">
      <div class="mod-coustomer-detail-thumb">
        <image class="mod-coustomer-detail-thumb-image" :src="detail.avatar"/>
      </div>
      <div class="mod-coustomer-detail-content">
        <text class="mod-coustomer-detail-content-user-name"
        >用户名：{{detail.nickname}}（{{gender}}）</text>
        <text class="mod-coustomer-detail-content-other"
        >手机号：{{detail.cellphone || '-'}}</text>
        <text class="mod-coustomer-detail-content-other"
        >地区：{{profile.resideprovince}} {{profile.residecity}}</text>
      </div>
    </div>
    <div class="mod-coustomer-detail-main">
      <div class="mod-coustomer-detail-options-group">
        <router-link :to="`/base?uid=${uid}`" class="mod-coustomer-detail-opitem">
          <text>基础信息</text>
          <div class="mod-coustomer-detail-iconfont-fh" @click="navigatorBack">&#xe600;</div>
        </router-link>
        <router-link :to="`/senior?uid=${uid}`" class="mod-coustomer-detail-opitem">
          <text>高级信息</text>
          <div class="mod-coustomer-detail-iconfont-fh" @click="navigatorBack">&#xe600;</div>
        </router-link>
      </div>
      <div class="mod-coustomer-detail-options-group">
        <div class="mod-coustomer-detail-opitem-btn" @click="startTalk">
          <text class="mod-coustomer-detail-opitem-btn-text">发送消息</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixin from '../../mixins/index';

export default {
  data() {
    return {
      uid: this.$route.query.uid,
    };
  },
  computed: {
    detail() {
      return this.getDetail(this.uid);
    },
    profile() {
      return this.detail.profile ? this.detail.profile.data : {};
    },
    gender() {
      let gender;
      if (this.detail.gender === 1) {
        gender = '男';
      } else if (this.detail.gender === 2) {
        gender = '女';
      } else {
        gender = '未知';
      }
      return gender;
    },
    ...mapGetters('coustomer', {
      getDetail: 'detail',
    }),
  },
  mixins: [mixin],
  created() {
    this.$store.dispatch('coustomer/getDetail', this.uid);
  },
  methods: {
    startTalk() {
      this.navigatorTo(`chat.js#/?uid=${this.uid}&openid=${this.detail.openid}`);
    },
  },
};
</script>
