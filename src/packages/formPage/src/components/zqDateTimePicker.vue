<!-- DJH time: -->
<template>
  <div class="flex-auto">
    <zq-form-item v-bind="$attrs">
      <template>
        <div v-if="!isMobile" class="flex-row-jc">
          <el-date-picker
            :clearable="false"
            :style="$attrs.formData.advance_attribute.input.style"
            value-format="timestamp"
            v-model="dateValue"
            @change="dateChange"
            :class="{ 'show_prefix-icon': dateValue }"
            type="date"
          >
          </el-date-picker>
          <el-time-picker
            :clearable="false"
            :disabled="!dateValue"
            :style="$attrs.formData.advance_attribute.input.style"
            class="ml20"
            value-format="timestamp"
            format="HH:mm"
            :class="{ 'show_prefix-icon': timeValue }"
            @change="dateTimeChange"
            v-model="timeValue"
          >
          </el-time-picker>
        </div>
        <div v-else class="flex-row-jc">
          <van-field
            readonly
            clickable
            :style="$attrs.formData.advance_attribute.input.style"
            name="datetimePicker"
            :value="dateFormat('YYYY-mm-dd', dateValue / 1000)"
            :left-icon="!dateValue ? 'icon el-icon-date' : ''"
            @click="showDatePickerFn"
          >
          </van-field>

          <!--    :value="dateFormat('HH:MM', timeValue / 1000)"        -->

          {{ dateFormat("HH:MM", timeValue / 1000) }}
          <van-field
            class="ml20"
            readonly
            clickable
            :disabled="!dateValue"
            :style="$attrs.formData.advance_attribute.input.style"
            name="datetimePicker"
            :value="dateFormat('HH:MM', timeValue / 1000)"
            :left-icon="!timeValue ? 'icon el-icon-time' : ''"
            @click="() => dateValue && showTimePickerFn()"
          >
          </van-field>
        </div>
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker
            ref="date"
            title="选择日期"
            :value="
              dateValue
                ? new Date(dateFormat('YYYY-mm-dd', dateValue / 1000))
                : new Date()
            "
            type="date"
            @confirm="dateConfirm"
            @cancel="showDatePicker = false"
          />
        </van-popup>
        <van-popup v-model="showTimePicker" position="bottom">
          <van-datetime-picker
            ref="time"
            :value="timeValue ? dateFormat('HH:MM', timeValue / 1000) : '00:00'"
            title="选择时间"
            type="time"
            @confirm="timeConfirm"
            @cancel="showTimePicker = false"
          />
        </van-popup>
      </template>
    </zq-form-item>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import { mixin } from "../utils/mixin.js";
import { copeIphoneXHomeIndicator, isMobile } from "../utils/index.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { zqFormItem },
  inheritAttrs: false,
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      dateValue: "",
      timeValue: "",

      showDatePicker: false,
      showTimePicker: false,
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
      let date = parseInt(this.value[this.$attrs.currentItem.field_name]);
      this.dateValue = date ? date * 1000 : "";
      let time = parseInt(this.value[this.$attrs.currentItem.field_name]);
      this.timeValue = time ? time * 1000 : "";
    },
  },
  mounted() {
    let date = parseInt(this.value[this.$attrs.currentItem.field_name]);
    this.dateValue = date ? date * 1000 : "";
    let time = parseInt(this.value[this.$attrs.currentItem.field_name]);
    this.timeValue = time ? time * 1000 : "";
  },
  //方法集合
  methods: {
    isMobile,
    showTimePickerFn() {
      this.showTimePicker = true;
      this.$nextTick(() => {
        let dom = this.$refs.time.$el.querySelector(".van-picker__columns");
        copeIphoneXHomeIndicator(dom);
      });
    },
    showDatePickerFn() {
      this.showDatePicker = true;
      this.$nextTick(() => {
        let dom = this.$refs.date.$el.querySelector(".van-picker__columns");
        copeIphoneXHomeIndicator(dom);
      });
    },
    dateFormat(type, time) {
      return this.$common.dateFormat(type, time);
    },
    dateTimeChange() {
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name,
        this.dateValue ? this.timeValue / 1000 : ""
      );

      let fileRules = this.$attrs.currentItem.fileRules;
      if (fileRules.length > 0) {
        this.checkedFlieKey();
      }
    },
    dateChange() {
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name,
        this.dateValue ? this.timeValue / 1000 : ""
      );
      this.checkedFlieKey();
    },
    dateConfirm(data) {
      this.dateValue = new Date(data).getTime();
      this.dateChange();

      this.showDatePicker = false;
    },
    timeConfirm(time) {
      let date = this.dateFormat("YYYY-mm-dd", this.dateValue / 1000);
      this.timeValue = new Date(date + " " + time).getTime();
      this.dateTimeChange();
      this.showTimePicker = false;
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
