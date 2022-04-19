<template>
  <i class="font_family zq-icon" :class="[name,disabled? 'disabled': '']" v-on="$listeners"></i>
</template>

<script>
export default {
  name: 'ZqIcon',
  inheritAttrs: false,
  props: {
    name: String,
    disabled: Boolean
  },
};
</script>
