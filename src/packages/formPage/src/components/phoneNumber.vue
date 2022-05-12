<!-- DJH time: -->
<template>
  <div class="phoneNumber-341423">
    <div class="flex-auto">
      <zq-form-item v-bind="$attrs">
        <template>
          <zq-input
              :style="$attrs.formData.advance_attribute.input.style"
              v-model.trim="value[$attrs.currentItem.field_name]"
              :placeholder="$attrs.currentItem.placeholder"
              class="input-with-select"
              @blur="phoneChange"
          >
          </zq-input>
        </template>
      </zq-form-item>
      <div style="margin-bottom: 24px"></div>
      <zq-form-item
          v-bind="$attrs"
          :isHiddenLabel="true"
          :prop="$attrs.currentItem.field_name + 'code'"
          v-if="$attrs.currentItem.isVerificationCode == 2"
      >
        <template>
          <div class="code-row">
            <zq-input
                :style="$attrs.formData.advance_attribute.input.style"
                @input="codeInputBlur"
                v-model.trim="value[$attrs.currentItem.field_name + 'code']"
            ></zq-input>
            <zq-button
                :style="btnTheme($attrs.formData)"
                class="code-btn"
                @click="sendCode"
                :disabled="!value[$attrs.currentItem.field_name] || btnDisabled"
            >
              {{ codeBtnText }}
            </zq-button>
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
import { btnTheme } from "./commonTheme";
import request from "../utils/request";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "phoneNumber",
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
      code: "",
      codeBtnText: "获取验证码",
      btnDisabled: false,
      checkedStatus: "",
      checkedPhone: "",
    };
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
  mounted() {},
  //方法集合
  methods: {
    btnTheme,
    sendCode() {
      let self = this;
      const params = {
        value: this.value[this.$attrs.currentItem.field_name],
      };
      request({
        url: this.closest2('ZqFormPage').apiPrefix + "/cdp/form-app/get-code",
        method: "post",
        data: params,
      }).then(({ code, msg }) => {
        if (code == 0) {
          let timesRun = 90;
          this.btnDisabled = true;
          this.phoneCode = this.value;
          let interval = setInterval(function () {
            timesRun--;
            self.codeBtnText = `${timesRun}s`;
            if (timesRun === 0) {
              self.btnDisabled = false;
              self.codeBtnText = "重新获取";
              clearInterval(interval);
            }
          }, 1000);
        } else {
          this.$zqMessage.error(msg);
        }
      });
    },
    codeChange(val) {
      if (val.length >= 4) {
        this.codeInputBlur();
      }
    },
    phoneChange(val) {
      if (this.checkedStatus && val == this.checkedPhone) {
        // this.isSuccess();
        this.$set(
          this.value,
          `${this.$attrs.currentItem.field_name}_checked`,
          1
        );
        this.checkedFlieKey();
        this.checkedStatus = 1;
      } else if (this.checkedStatus && val != this.checkedPhone) {
        // this.isError();
        this.$set(
          this.value,
          `${this.$attrs.currentItem.field_name}_checked`,
          2
        );
        this.checkedFlieKey();
        this.checkedStatus = 2;
      }
    },
    codeInputBlur(val) {
      if (val && val.length !== 4) {
        this.checkedStatus = 2;
        this.$set(
          this.value,
          `${this.$attrs.currentItem.field_name}_checked`,
          2
        );
        this.checkedFlieKey();
        return;
      }
      const params = {
        value: this.value[this.$attrs.currentItem.field_name],
        code: this.value[this.$attrs.currentItem.field_name + "code"],
      };
      request({
        url: this.closest2('ZqFormPage').apiPrefix + "/cdp/form-app/check-code",
        method: "post",
        data: params,
      }).then(({ code }) => {
        if (code == 0) {
          this.$emit("checked", this.$attrs.currentItem.field_name);
          this.checkedStatus = 1;
          // this.isSuccess();
          this.$set(
            this.value,
            `${this.$attrs.currentItem.field_name}_checked`,
            1
          );
          this.checkedFlieKey();
          this.checkedPhone = this.value[this.$attrs.currentItem.field_name];
          // this.$zqMessage.success(msg);
        } else {
          this.checkedStatus = 2;
          // this.isError();
          this.$set(
            this.value,
            `${this.$attrs.currentItem.field_name}_checked`,
            2
          );
          this.checkedFlieKey();
          // this.$zqMessage.error(msg);
        }
      });
    },
  },
};
</script>
