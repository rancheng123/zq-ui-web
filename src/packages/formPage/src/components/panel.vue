<!-- DJH time: -->
<template>
  <div
    class=""
    v-if="$attrs.currentItem.isShow && $attrs.currentItem.isHidden == 1"
  >
    <preview-item-panel
      v-for="item in panelActiveChildren"
      class="draggable-item"
      :currentItem="item"
      :formData="$attrs.formData"
      v-model="$attrs.value"
      v-on="$listeners"
      :key="item.field_name"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import previewItemPanel from "./previewItemPanel.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Panel",
  components: { previewItemPanel },
  props: {
    //这里接受参数
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    panelActiveChildren() {
      let activePanel = this.$attrs.currentItem.editableTabs.filter((item) => {
        return item.value == this.$attrs.currentItem.activeValue;
      });
      if (this.$attrs.currentItem.activeValue == "") {
        return [];
      } else {
        return activePanel[0].children;
      }
    },
  },
  //监控data中的数据变化
  watch: {
    "$attrs.value"() {
      console.log("======", this.$attrs.value);
    },
  },
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$attrs.currentItem.isShow = false;
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
