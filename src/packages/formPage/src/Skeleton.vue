<template>
  <div>
    <div v-show="loading" style="background: white">
      11111

    </div>
    <div v-show="!loading">
      <formPageCore
          v-if="type === 'formPage'"
          @onSubmitSuccess="$emit('onSubmitSuccess', true)"
          @onMounted="loading = false"
      ></formPageCore>
    </div>
  </div>
</template>
<script>
import formPageCore from "./formPageCore.vue";
export default {
  name: "Skeleton",
  data() {
    return {
      loading: true,
    };
  },
  props: {
    type: {
      type: String,
      default() {
        return "formPage";
      },
    },
  },
  components: {
    formPageCore,
  },
};
</script>
<style lang="less">
.van-skeleton {
  padding: 0px;
}
</style>
