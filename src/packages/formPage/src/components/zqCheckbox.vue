<!-- DJH time: -->
<template>
  <div class="flex-auto checkbox-warp-21432234423423">
    <zq-form-item v-bind="$attrs" class="checkbox-warp">
      <template>
        <el-checkbox-group @change="handlerChange" v-model="checkeds">
          <el-checkbox
            v-for="item in options"
            :label="item.value"
            :key="item.value"
            >{{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
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
  data() {
    //这里存放数据
    return {};
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  //监听属性 类似于data概念
  computed: {
    checkeds: {
      get() {
        return this.$attrs.currentItem.default_value || []; // 避免 Error in render: "TypeError: Cannot read properties of undefined (reading 'length')"
      },
      set(value) {
        this.$set(this.$attrs.currentItem, "default_value", value);
        this.$set(this.value, this.$attrs.currentItem.field_name, value);
      },
    },
    options() {
      return this.$attrs.currentItem.options.filter((item) => item.isShow);
    },
  },
  mounted() {},
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
