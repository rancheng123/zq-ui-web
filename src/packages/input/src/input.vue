<template>
  <div style="border:1px solid green">
    this is zq-input version45678
    <el-input :style="{ width: width }" v-bind="$attrs" class="zq-input" v-on="$listeners">
      <slot />
    </el-input>
  </div>


</template>
<script>
export default {
  name: 'ZqInput',
  inheritAttrs: false,
  props: {
    width: {
      type: String,
      default: '320px'
    }
  }
}
</script>
