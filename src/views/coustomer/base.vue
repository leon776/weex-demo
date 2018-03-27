<style lang="scss">
  @import '../../assets/style/mod-coustomer-detail.scss';
</style>
<template>
  <div class="mod-coustomer-detail">
    <div class="mod-coustomer-detail-main">
      <div class="mod-coustomer-detail-options-group">
        <div class="mod-coustomer-detail-opitem">
          <text>姓名</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.realname" class="mod-coustomer-detail-input"
            @change="save($event, 'realname')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>年龄</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.age" class="mod-coustomer-detail-input"
            @change="save($event, 'age')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>手机</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="detail.cellphone" class="mod-coustomer-detail-input"
            @change="save($event, 'cellphone')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>Email</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.email" class="mod-coustomer-detail-input"
            @change="save($event, 'email')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>QQ</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.qq" class="mod-coustomer-detail-input"
            @change="save($event, 'qq')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>地址</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.address" class="mod-coustomer-detail-input"
            @change="save($event, 'address')"></div>
        </div>
      </div>
      <div class="mod-coustomer-detail-options-group">
        <div class="mod-coustomer-detail-opitem-btn" @click="mockSave">
          <text class="mod-coustomer-detail-opitem-btn-text">保存</text>
        </div>
      </div>
    </div>
    <div class="mod-coustomer-detail-mask" v-if="showMask"></div>
  </div>
</template>

<script>
import mixin from '../../mixins/index';
import coustomerEdit from '../../mixins/coustomerEdit';

export default {
  mixins: [mixin, coustomerEdit],
};
</script>
