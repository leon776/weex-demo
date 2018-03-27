import { mapGetters } from 'vuex';
import util from '../lib/util';

export default {
  data() {
    return {
      uid: this.$route.query.uid,
      saveQuene: [],
      saving: false,
      showMask: true,
    };
  },
  computed: {
    detail: {
      get() {
        return this.getDetail(this.uid);
      },
    },
    profile() {
      return this.detail.profile ? this.detail.profile.data : {};
    },
    ...mapGetters('coustomer', {
      getDetail: 'detail',
    }),
  },
  created() {
    this.$store.dispatch('coustomer/getDetail', this.uid);
  },
  mounted() {
    setTimeout(() => {
      this.showMask = false;
    }, 300);
  },
  methods: {
    save(event, field) {
      this.saveQuene.push('');
      return util.http.patch(`followers/${this.uid}`, {
        value: event.value,
        field,
      }).then(() => {
        this.saveQuene.pop('');
      });
    },
    mockSave() {
      if (this.saveQuene.length === 0 && !this.saving) {
        this.saving = true;
        this.weex.modal.toast({
          message: '保存成功',
          duration: 0.8,
        });
        setTimeout(() => {
          this.saving = false;
        }, 800);
      } else if (this.saveQuene.length > 0) {
        setTimeout(this.mockSave, 500);
      }
    },
  },
};
