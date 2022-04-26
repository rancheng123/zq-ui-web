<template>
  <popup :type="'formPage'"></popup>
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
    }
  }
};
</script>
