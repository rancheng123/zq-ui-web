<!-- DJH time: -->
<template>
  <div class="flex-auto">
    <zq-form-item v-bind="$attrs" class="radio-warp">
      <template>
        <zq-radio
          v-model="selectedLabel"
          :label="item.value"
          @change="handlerChange"
          v-for="item in options"
          :checked="item.isShow"
          :key="item.value"
          >{{ item.label }}
        </zq-radio>
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
    options() {
      return this.$attrs.currentItem.options.filter((item) => item.isShow);
    },
    selectedLabel: {
      get() {
        return this.$attrs.currentItem.default_value;
      },
      set(value) {
        this.$set(this.$attrs.currentItem, "default_value", value);
        this.$set(this.value, this.$attrs.currentItem.field_name, value);
      },
    },
  },
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
  mounted() {},
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
<style lang="less">
//@import url(); 引入公共css类
.radio-warp {
  .el-form-item__content {
    display: flex;
    flex-direction: column;
  }
  .zq-radio {
    margin-bottom: 8px;
    &:nth-last-child(1) {
      margin-bottom: 0px;
    }
  }
}
</style>
