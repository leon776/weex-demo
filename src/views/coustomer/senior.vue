<style lang="scss">
  @import '../../assets/style/mod-coustomer-detail.scss';
</style>
<template>
  <div class="mod-coustomer-detail">
    <div class="mod-coustomer-detail-main">
      <div class="mod-coustomer-detail-options-group">
        <div class="mod-coustomer-detail-opitem">
          <text>行业</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.industry" class="mod-coustomer-detail-input"
            @change="save($event, 'realname')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>公司</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.company" class="mod-coustomer-detail-input"
            @change="save($event, 'age')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>职位</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="detail.position" class="mod-coustomer-detail-input"
            @change="save($event, 'cellphone')"></div>
        </div>
        <div class="mod-coustomer-detail-opitem">
          <text>备注</text>
          <div class="mod-coustomer-detail-opitem-input">
            <input type="text" v-model="profile.remark" class="mod-coustomer-detail-input"
            @change="save($event, 'email')"></div>
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
