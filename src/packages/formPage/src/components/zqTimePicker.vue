<!-- DJH time: -->
<template>
  <div class="flex-auto">
    <zq-form-item v-bind="$attrs">
      <template>
        <div class="flex-row-jc">
          <el-time-picker
            v-if="!isMobile"
            :clearable="false"
            :style="$attrs.formData.advance_attribute.input.style"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            :class="{ 'show_prefix-icon': timeValue }"
            @change="dateTimeChange"
            v-model="timeValue"
          >
          </el-time-picker>
          <van-field
            v-else
            readonly
            clickable
            :style="$attrs.formData.advance_attribute.input.style"
            name="datetimePicker"
            :value="timeValue"
            :left-icon="!timeValue ? 'icon el-icon-time' : ''"
            @click="showPickerFn"
          >
          </van-field>
          <van-popup v-model="showPicker" position="bottom">
            <!-- <van-datetime-picker
              title="选择时间"
              type="time"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            /> -->
            <van-picker
              ref="time"
              show-toolbar
              title="选择时间"
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </div>
      </template>
    </zq-form-item>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import { mixin } from "../utils/mixin.js";
import { copeIphoneXHomeIndicator, isMobile, dateFormat } from "../utils/index.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { zqFormItem },
  inheritAttrs: false,
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      showPicker: false,
      timeValue: this.value[this.$attrs.currentItem.field_name],
      columns: [
        // 第一列
        {
          values: [],
          defaultIndex: 0,
        },
        // 第二列
        {
          values: [],
          defaultIndex: 0,
        },
        // 第三列
        {
          values: [],
          defaultIndex: 0,
        },
      ],
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  //监控data中的数据变化
  watch: {
    value() {
      this.timeValue = this.value[this.$attrs.currentItem.field_name];
      // 设置过默认值也需要触发或者为空
    },
  },
  mounted() {
    this.initDefaultIndex();
    this.initColumns();
  },
  //方法集合
  methods: {
    isMobile,
    showPickerFn() {
      this.showPicker = true;
      this.$nextTick(() => {
        let dom = this.$refs.time.$el.querySelector(".van-picker__columns");
        copeIphoneXHomeIndicator(dom);
      });
    },
    onConfirm(data) {
      this.timeValue = data.join(":");
      this.dateTimeChange();
      this.showPicker = false;
    },
    dateFormat,
    dateTimeChange() {
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name,
        this.timeValue ? this.timeValue : ""
      );

      let fileRules = this.$attrs.currentItem.fileRules;
      if (fileRules.length > 0) {
        this.checkedFlieKey();
      }
    },
    initDefaultIndex() {
      if (this.timeValue) {
        const [h, m, s] = this.timeValue.split(":");
        this.columns[0].defaultIndex = Number(h);
        this.columns[1].defaultIndex = Number(m);
        this.columns[2].defaultIndex = Number(s);
      }
    },
    initColumns() {
      for (let i = 0; i < 60; i++) {
        if (i < 24) {
          this.columns[0].values.push(this.padZero(i));
        }

        this.columns[1].values.push(this.padZero(i));
        this.columns[2].values.push(this.padZero(i));
      }
    },
    padZero(num, targetLength = 2) {
      let str = num + "";
      while (str.length < targetLength) {
        str = "0" + str;
      }
      return str;
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
.flex-row-jc {
  display: flex;
  // justify-content: space-between;
  width: 100%;
  .show_prefix-icon {
    /deep/.el-input__prefix {
      display: none;
    }
  }
}
.ml20 {
  margin-left: 20px;
}
</style>
