<template>
  <div>
    <div v-show="loading" style="background: white">
      <van-skeleton title :row="20" style="height: 100%; overflow: hidden" />
    </div>
    <div v-show="!loading">
      <formPageCore
        v-if="type === 'formPage'"
        @onSubmitSuccess="$emit('onSubmitSuccess', true)"
        @onMounted="loading = false"
      ></formPageCore>
      <previewPageCore
        v-else
        @onSubmitSuccess="$emit('onSubmitSuccess', true)"
        @onMounted="loading = false"
      ></previewPageCore>
    </div>
  </div>
</template>
<script>
import formPageCore from "./formPageCore.vue";
import previewPageCore from "./previewPageCore.vue";
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
    previewPageCore,
  },
};
</script>
<style lang="less">
.van-skeleton {
  padding: 0px;
}
</style>
