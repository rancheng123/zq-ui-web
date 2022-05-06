<template>
  <popup :type="'formPage'"
  ></popup>
</template>
<script>
import popup from "./popup.vue";
export default {
  name: "ZqFormPage",
  components: {
    popup,
  },
  props: {
    formData: {
      type: Object,
      default(){
        return {}
      }
    },
    apiPrefix: {
      type: String,
      default(){
        return '/api'
      }
    },
    domain: {
      type: String,
      default(){
        return ''
      }
    },

  },
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
