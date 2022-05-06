<!-- DJH time: -->
<template>
  <div class="zq-form-item-12212342343">
    <el-form-item
        v-if="$attrs.currentItem.isHidden == 1"
        class="form-item-label-warp"
        :prop="cusProps ? cusProps : $attrs.currentItem.field_name"
        :description="$attrs.currentItem.helpText"
        :helpTextType="$attrs.currentItem.helpTextType"
        :rules="rules"
    >
    <span
        slot="label"
        class="label flex-row"
        v-if="label && $attrs.currentItem.helpTextType == '1'"
    >
      <span class="label flex-row">
        <span
            class="label-text"
            :style="$attrs.formData.advance_attribute.submitBtnText.style"
        >
          <span
              v-if="$attrs.currentItem.is_required == 2"
              :style="{
              color: $attrs.formData.basic_attribute.requiredAsteriskColor,
            }"
          >*</span
          >
          {{ label }}
        </span>
        <span
            class="description"
            :style="$attrs.formData.advance_attribute.helpText.style"
        >
          {{ $attrs.currentItem.helpText }}</span
        ></span
      >
    </span>
      <span
          slot="label"
          class="label flex-col"
          v-if="label && $attrs.currentItem.helpTextType == '2'"
      >
      <span class="label help-text__lable">
        <span
            class="label-text"
            :style="$attrs.formData.advance_attribute.submitBtnText.style"
        >
          <span
              v-if="$attrs.currentItem.is_required == 2"
              :style="{
              color: $attrs.formData.basic_attribute.requiredAsteriskColor,
            }"
          >*</span
          >
          {{ label }}
        </span></span
      >
      <span
          class="description"
          :style="$attrs.formData.advance_attribute.helpText.style"
      >
        {{ $attrs.currentItem.helpText }}</span
      >
    </span>
      <slot></slot>
      <span
          slot="error"
          slot-scope="scope"
          class="el-form-item__error"
          :style="$attrs.formData.advance_attribute.errorText.style"
      >
      {{ scope.error }}
    </span>
    </el-form-item>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let checkNumber = (rule, value, callback) => {
  if (value > rule.max) {
    callback(new Error("最大不能超过" + rule.max));
  } else if (value < rule.min) {
    callback(new Error("最小不能低于" + rule.min));
  } else {
    callback();
  }
};
const checkMoney = (rule, value, callback) => {
  const decimals = value.split(".")[1];
  if (decimals && decimals.length > rule.max) {
    callback(new Error("小数位最多不能超过" + rule.max + "位"));
  } else {
    callback();
  }
};
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "zqFormItem",
  props: {
    isHiddenLabel: {
      type: Boolean,
      default: false,
    },
    cusProps: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    label() {
      return this.isHiddenLabel ? "" : this.$attrs.currentItem.display_name;
    },
    rules() {
      const filed = this.$attrs.currentItem;
      let rules = [];
      if (filed.is_required == 2) {
        rules.push({
          required: true,
          message: "必填项不能为空",
          trigger: ["blur", "change"],
        });
      }
      // if (filed.filed_type != "Number") {
      //   rules.push({
      //     min: parseInt(filed.num_range.min),
      //     max: parseInt(filed.num_range.max),
      //     message: `长度在 ${filed.num_range.min} 到 ${filed.num_range.max} 个字符`,
      //     trigger: ["blur", "change"],
      //   });
      // }
      // if (filed.filed_type == "Number") {
      //   rules.push({
      //     pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
      //     message: `长度在 ${filed.num_range.min} 到 ${filed.num_range.max} 个字符`,
      //     trigger: ["blur", "change"],
      //   });

      // }
      if (filed.num_range && (filed.num_range.min || filed.num_range.max)) {
        if (filed.tag == "zqInput" || filed.tag == "zqTextarea") {
          rules.push({
            min: filed.num_range.min,
            max: filed.num_range.max,
            message: `长度在 ${filed.num_range.min} 到 ${filed.num_range.max} 个字符`,
            trigger: "blur",
          });
        }
        if (filed.tag == "zqInputNumber") {
          rules.push({
            min: filed.num_range.min,
            max: filed.num_range.max,
            validator: checkNumber,
            trigger: ["blur", "change"],
          });
        }
      }
      if (filed.tag == "zqAmount") {
        rules.push({
          max: filed.num_range.decimal_place_length,
          validator: checkMoney,
          trigger: ["blur", "change"],
        });
      }
      if (filed.tag == "phoneNumber") {
        rules.push({
          pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/,
          message: "手机号格式有误",
          trigger: ["blur", "change"],
        });
      }
      if (filed.tag == "zqEmail") {
        rules.push({
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        });
      }
      return rules;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    },
  },
};
</script>
