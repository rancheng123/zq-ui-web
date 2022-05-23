<template>
  <div :class="{
    formPageBox: true,
    enlargeIframe: isEnlarge,
  }">
    <popup
        v-if="formData"
        :type="'formPage'"
    ></popup>
  </div>

</template>
<script>
import popup from "./popup.vue";
import request from "./utils/request.js";
import './utils/index.js'
import Vue from 'vue'
Vue.prototype.closest2 = function(target) {
  let current = this
  while (current) {
    if (current && current.$vnode && current.$vnode.tag) {
      const tagName = current.$vnode.tag.replace(/vue-component-\d+-/, '')

      if (target === tagName) {
        return current
      } else {
        current = current.$parent
      }
    } else {
      current = current.$parent
    }
  }

  return null
}
export default {
  name: "ZqFormPage",
  data(){
    return {
      formData: null,
      isEnlarge: false,
    }
  },
  components: {
    popup,
  },
  computed: {
    apiPrefix(){
      if(
          location.pathname.match('web-mobile') &&
          location.host.match('localhost')
      ){
        return '/cdpApi/'
      }else{
        return '/api/'
      }

    }
  },
  props: {
    isPreview: {
      type: Boolean,
      default(){
        return false
      }
    },
    imageServerDomain: {
      type: String,
      default(){
        return ''
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
