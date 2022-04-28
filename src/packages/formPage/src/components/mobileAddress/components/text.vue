<template>
  <span
    ><span v-if="province">
      {{ showChineseName(province, addressJson[nation]) }}
    </span>
    <span v-else class="orange">请选择 </span></span
  >
</template>
<script>
export default {
  name: "Text",
  props: {
    value: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>
