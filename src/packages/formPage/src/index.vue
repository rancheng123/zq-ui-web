<template>
  <div class="formPageBox">
    <popup
        v-if="formData"
        :type="'formPage'"
    ></popup>
  </div>

</template>
<script>
import popup from "./popup.vue";
import request from "./utils/request";
export default {
  name: "ZqFormPage",
  data(){
    return {
      formData: null
    }
  },
  components: {
    popup,
  },
  props: {
    apiPrefix: {
      type: String,
      default(){
        return '/api'
      }
    },
    VUE_APP_UI: {
      type: String,
      default(){
        return ''
      }
    },
    domain: {
      type: String,
      default(){
        return ''
      }
    },
    topLocation: {
      type: Object,
      default(){
        return {}
      }
    },
    params: {
      type: Object,
      default(){
        return {}
      }
    },

  },
  methods: {
    async getDetail() {
      let self = this;
      let params = {
        form_id: this.params.form_id,
        org_id: this.params.org_id,
      };

      request({
        url: this.apiPrefix + "cdp/form-app/details",
        method: "post",
        data:params,
      }).then(({ code, data, msg }) => {
        if (code == 0) {
          self.formData = JSON.parse(data.form_content);

          self.formData.advance_attribute = JSON.parse(
              self.formData.advance_attribute
          );
          self.formData.basic_attribute = JSON.parse(
              self.formData.basic_attribute
          );

          self.formData.field_content = JSON.parse(
              self.formData.field_content
          );


        } else {
          this.$zqMessage.error(msg);
        }
      });
    },
  },
  mounted(){
    this.getDetail()
  }
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
