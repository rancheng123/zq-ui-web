<!-- DJH time: -->
<template>
  <div class="flex-auto">
    <zq-form-item v-bind="$attrs">
      <template>
        <zq-select
          :style="$attrs.formData.advance_attribute.input.style"
          v-model="selectedLabel"
          :placeholder="$attrs.currentItem.placeholder"
          class="input-with-select"
          :options="options"
          @change="handlerChange"
        >
        </zq-select>
      </template>
    </zq-form-item>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import { mixin } from "../utils/mixin.js";
import componentStore from "../utils/componentStore.js";
import { isMobile } from "../utils/index.js";
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
    return {
      defaultIndex: 0,
      showPicker: false,
      selectedValue: -1,
    };
  },
  //监听属性 类似于data概念
  computed: {
    options() {
      return this.$attrs.currentItem.options.filter((item) => item.isShow);
    },
    isMobile,
    selectedLabel: {
      get() {
        let val = "";
        this.$attrs.currentItem.options.forEach((item, index) => {
          if (item.value === this.$attrs.currentItem.default_value) {
            val = item.label;
            this.defaultIndex = index;
          }
        });
        return val;
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
  mounted() {
    componentStore.set("zqSelect", this);
  },
  beforeDestroy() {
    componentStore.clear("zqSelect");
  },
  //方法集合
  methods: {
    showVanPicker() {
      this.showPicker = true;
    },
    onConfirm(value) {
      this.$set(this.$attrs.currentItem, "default_value", value.value);
      this.$set(this.value, this.$attrs.currentItem.field_name, value.value);
      this.showPicker = false;
    },
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
/deep/ .van-picker {
  .van-picker-column__item {
    justify-content: left;
  }
}
</style>
