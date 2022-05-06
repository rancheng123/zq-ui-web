<template>
  <div class="flexBoxWrap-21432143">
    <div class="flexBoxHead" ref="flexBoxHead">
      <slot name="head"></slot>
    </div>
    <div class="flexBoxBody" :style="flexBoxBodyStyle">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "flexBox",
  data() {
    return {
      flexBoxHeadHeight: 0,
    };
  },
  computed: {
    flexBoxBodyStyle() {
      return "height: calc(100% - " + this.flexBoxHeadHeight + "px)";
    },
  },
  mounted() {
    this.flexBoxHeadHeight = this.$refs.flexBoxHead.offsetHeight;
    setTimeout(() => {
      this.flexBoxHeadHeight = this.$refs.flexBoxHead.offsetHeight;
    }, 1000);
  },
};
</script>
