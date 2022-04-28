<!-- DJH time: -->
<template>
  <zq-form-item v-bind="$attrs">
    <template>
      <zq-input
        :style="$attrs.formData.advance_attribute.input.style"
        v-model.trim="value[$attrs.currentItem.field_name]"
        :placeholder="$attrs.currentItem.placeholder"
        class="input-with-select"
        @blur="handlerChange"
      >
      </zq-input>
    </template>
  </zq-form-item>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import { mixin } from "../utils/mixin.js";
export default {
  //import引入的组件需要注入到对象中才能使用

  components: { zqFormItem },
  inheritAttrs: false,
  mixins: [mixin],
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    value: {
      handler() {
        // 设置过默认值也需要触发或者为空
        let fileRules = this.$attrs.currentItem.fileRules;
        if (fileRules && fileRules.length > 0) {
          this.$nextTick(() => {
            this.checkedFlieKey();
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    console.log("input2", this.$attrs.currentItem);
  },
  //方法集合
  methods: {
    handlerChange() {
      let fileRules = this.$attrs.currentItem.fileRules;
      if (fileRules.length > 0) {
        this.checkedFlieKey();
      }
    },
  },
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.code-row {
  display: flex;
  justify-content: space-between;
  .el-input {
    flex: 1;
    .el-input__inner {
      height: 40px !important;
      line-height: 40px !important;
    }
  }
  .code-btn {
    margin-left: 16px;
  }
}
</style>
