<template>
  <el-button
    class="zq-button"
    v-bind="$attrs"
    v-on="$listeners"
  ><slot /></el-button>
</template>
<script>
export default {
  name: 'ZqButton',
  inheritAttrs: false,
  props: {},
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
