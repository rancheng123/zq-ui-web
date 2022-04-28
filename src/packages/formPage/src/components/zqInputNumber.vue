<!-- DJH time: -->
<template>
  <div>
    <zq-form-item v-bind="$attrs">
      <!-- 带区号的手机号 -->
      <template>
        <el-input-number
          v-model="default_value"
          :style="$attrs.formData.advance_attribute.input.style"
          style="text-align: center !important"
          :placeholder="$attrs.currentItem.placeholder"
          @change="handlerChange"
        ></el-input-number>
      </template>
    </zq-form-item>
  </div>
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
  computed: {
    default_value: {
      get() {
        let value = this.value[this.$attrs.currentItem.field_name];
        return typeof value === "number" ? value : undefined; // 默认值为空  须设置为undefined
      },
      set(val) {
        this.$set(
          this.value,
          this.$attrs.currentItem.field_name,
          typeof val === "number" ? val : ""
        );
      },
    },
  },
  //监控data中的数据变化
  watch: {},
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
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
/deep/.el-input-number {
  text-align: center !important;
  overflow: hidden !important;
  width: 100%;
  max-width: 180px;
}
</style>
