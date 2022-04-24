<!-- DJH time: -->
<template>
  <div>
    <component v-bind:is="tag" v-bind="$attrs" v-on="$listeners"></component>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 手机号
import phoneNumber from "./phoneNumber.vue";
// 控制面板
import panel from "./panel.vue";
// 控制面板
import zqInput from "./zqInput.vue";
// 下拉
import zqSelect from "./zqSelect.vue";
// 多行文本
import zqTextarea from "./zqTextarea.vue";
// 单选
import zqRadio from "./zqRadio.vue";
// 多选
import zqCheckbox from "./zqCheckbox.vue";
// 数字
import zqInputNumber from "./zqInputNumber.vue";
// 电子邮箱
import zqEmail from "./zqEmail.vue";
// 地址
import zqAddress from "./zqAddress.vue";
// 日期和时间
import zqDateTimePicker from "./zqDateTimePicker.vue";
// 日期
import zqDatePicker from "./zqDatePicker.vue";
// 时间
import zqTimePicker from "./zqTimePicker.vue";
// 图片
import zqImage from "./zqImage.vue";
// 金额
import zqAmount from "./zqAmount.vue";
// 公司
import zqCompany from "./zqCompany.vue";
export default {
  name: "DraggableItem",
  //import引入的组件需要注入到对象中才能使用
  components: {
    phoneNumber,
    panel,
    zqInput,
    zqSelect,
    zqTextarea,
    zqRadio,
    zqCheckbox,
    zqInputNumber,
    zqEmail,
    zqAddress,
    zqDateTimePicker,
    zqDatePicker,
    zqTimePicker,
    zqImage,
    zqAmount,
    zqCompany,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    tag() {
      return this.$attrs.currentItem && this.$attrs.currentItem.tag;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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

.draggable-item {
  &:hover {
    .del-icon {
      display: inline-block;
    }
  }
}
.panel-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2b3d4f;
  line-height: 24px;
  margin-bottom: 8px;
}
.from-item {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px 40px;
  margin-bottom: 16px;
  border: 1px solid #ffffff;
  flex: 1;
  .flex-auto {
    flex: 1;
  }
  &.panel {
    padding: 24px 0px;
    .el-tabs__content {
      padding: 0 !important;
    }
    .el-tabs__header {
      padding: 0;
      margin: 0 50px;
    }
    .empty-info {
      margin: 24px 40px;
      width: calc(100% - 80px);
    }
  }

  &:hover {
    border: 1px solid #ff724f;
  }
  position: relative;
  .del-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    background: #fdfdff;
    border: 1px solid #ff724f;
    right: -10px;
    top: -12px;
    font-size: 24px;
    color: #ff724f;
    border-radius: 12px;
    text-align: center;
    display: none;
  }
  .is-show-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 32px;
    top: 28px;
    font-size: 24px;
  }

  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100% !important;
  }
  .el-select {
    width: 100% !important;
  }
  /deep/.el-input-number {
    // width: 100% !important;
    overflow: hidden !important;
  }
}
</style>
