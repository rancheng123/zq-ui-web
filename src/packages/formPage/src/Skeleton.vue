<template>
  <div>
    <div v-show="loading" style="background: white">
      <van-skeleton title :row="20" style="height: 100%; overflow: hidden" />
    </div>
    <div v-show="!loading">
      <formPageMix
          :isFormPage="isFormPage()"
          @onSubmitSuccess="$emit('onSubmitSuccess', true)"
          @onMounted="loading = false"
      ></formPageMix>
    </div>
  </div>
</template>
<script>
import formPageMix from "./formPageMix.vue";
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
    formPageMix,
  },
  methods: {
    isFormPage() {
      return true;
    },
  },
};
</script>
