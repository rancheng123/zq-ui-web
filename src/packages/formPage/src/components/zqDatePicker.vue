<!-- DJH time: -->
<template>
  <div class="zq-datepicker-2124321432143">
    <div class="flex-auto">
      <zq-form-item v-bind="$attrs">
        <template>
          <div class="flex-row-jc">
            <el-date-picker
                v-if="!isMobile"
                :clearable="false"
                :style="$attrs.formData.advance_attribute.input.style"
                value-format="timestamp"
                v-model="dateValue"
                @change="dateChange"
                :class="{ 'show_prefix-icon': dateValue }"
                type="date"
            >
            </el-date-picker>
            <van-field
                v-else
                readonly
                clickable
                :style="$attrs.formData.advance_attribute.input.style"
                name="datetimePicker"
                :value="dateFormat('YYYY-mm-dd', dateValue / 1000)"
                :left-icon="!dateValue ? 'icon el-icon-date' : ''"
                @click="showPickerFn"
            >
            </van-field>
            <van-popup v-model="showPicker" position="bottom">
              <van-datetime-picker
                  ref="date"
                  title="选择日期"
                  :value="
                dateValue
                  ? new Date(dateFormat('YYYY-mm-dd', dateValue / 1000))
                  : new Date()
              "
                  type="date"
                  @confirm="onConfirm"
                  @cancel="showPicker = false"
              />
            </van-popup>
          </div>
        </template>
      </zq-form-item>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import { mixin } from "../utils/mixin.js";
import { copeIphoneXHomeIndicator, isMobile } from "../utils/index.js";
import {dateFormat} from "../utils/index.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { zqFormItem },
  inheritAttrs: false,
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      isMobile: false,
      showPicker: false,
      dateValue:
        parseInt(this.value[this.$attrs.currentItem.field_name]) * 1000,
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
    },
  },
  mounted() {
    this.isMobile = isMobile()
    let date = parseInt(this.value[this.$attrs.currentItem.field_name]);
    this.dateValue = date ? date * 1000 : "";
  },
  //方法集合
  methods: {
    showPickerFn() {
      this.showPicker = true;
      this.$nextTick(() => {
        let dom = this.$refs.date.$el.querySelector(".van-picker__columns");
        copeIphoneXHomeIndicator(dom);
      });
    },
    onConfirm(data) {
      console.log(data);
      this.dateValue = new Date(data).getTime();
      this.dateChange();

      this.showPicker = false;
    },
    dateFormat,
    dateChange() {
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name,
        this.dateValue ? this.dateValue / 1000 : ""
      );
      this.checkedFlieKey();
    },
  },
};
</script>
