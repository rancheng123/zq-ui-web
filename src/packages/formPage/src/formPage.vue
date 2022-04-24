<template>
  <div style="background: yellow">
    <popup :type="'formPage'"></popup>
  </div>
</template>
<script>
import popup from "./popup.vue";
export default {
  name: "ZqFormPage",
  components: {
    popup,
  },
};
</script>
