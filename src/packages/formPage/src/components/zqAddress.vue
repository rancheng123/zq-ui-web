<!-- DJH time: -->
<template>
  <div class="flex-auto">
    <zq-form-item v-bind="$attrs">
      <template v-if="!isMobile">
        <el-cascader
          :style="$attrs.formData.advance_attribute.input.style"
          :placeholder="$attrs.currentItem.provincePlaceholder"
          :options="options"
          v-model.trim="addressDefaultValue"
          @change="handleChange"
          clearable
        ></el-cascader>
      </template>
      <template v-else>
        <div>
          <mobileAdress
            :flexRange="$attrs.formData.form_type == 2 ? 0 : 188"
            :placeholder="$attrs.currentItem.provincePlaceholder || '请选择'"
            :style="$attrs.formData.advance_attribute.input.style"
            :value="vant_addressDefaultValue"
            @finish="onConfirm"
          ></mobileAdress>
        </div>
      </template>
    </zq-form-item>

    <zq-form-item
      v-if="$attrs.currentItem.is_address == 2"
      :isHiddenLabel="true"
      v-bind="$attrs"
      :prop="$attrs.currentItem.field_name + 'address'"
      :description="$attrs.currentItem.helpTextArrangement"
      :required="$attrs.currentItem.is_required == 2"
    >
      <template>
        <zq-input
          :style="$attrs.formData.advance_attribute.input.style"
          :placeholder="$attrs.currentItem.addressPlaceholder"
          class="input-with-select"
          @blur="change"
          v-model.trim="addressInfo"
        ></zq-input>
      </template>
    </zq-form-item>

    <!--    <van-field
      class="m_address"
      v-model="vant_addressDefaultValue"
      :style="$attrs.formData.advance_attribute.input.style"
      is-link
      readonly
      :placeholder="$attrs.currentItem.provincePlaceholder || '请选择'"
      @click="showArea = true"
    >
    </van-field>
    <van-popup v-model="showArea" round position="bottom">
      <van-cascader
        title="请选择地址"
        :options="areaList"
        @close="showArea = false"
        @change="areaChange"
        @finish="onConfirm"
      />
    </van-popup>-->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import addressData from "../data/districts.json";
import { mixin } from "../utils/mixin.js";
import mobileAdress from "./mobileAddress/index.vue";
import { isMobile } from "../utils/index.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "zqAddress",
  components: { zqFormItem, mobileAdress },
  inheritAttrs: false,
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      addressDefaultValue: [],
      vant_addressDefaultValue: "",
      addressInfo: "",
      options: [],
      cityArr: [], //城市列表
      areaArr: [], //区县列表
      province: "", //省
      city: "", //市
      area: "", // 区县,
      areaList: [],
      showArea: false,
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
  //监听属性 类似于data概念
  computed: {
    iconClearShow() {
      return !!this.vant_addressDefaultValue;
    },
  },
  //监控data中的数据变化
  watch: {
    value() {
      if (this.value[this.$attrs.currentItem.field_name].province) {
        this.addressDefaultValue = [
          this.value[this.$attrs.currentItem.field_name].province,
          this.value[this.$attrs.currentItem.field_name].city,
          this.value[this.$attrs.currentItem.field_name].area,
        ];
      }
      if (this.value[this.$attrs.currentItem.field_name].address) {
        this.addressInfo =
          this.value[this.$attrs.currentItem.field_name].address;
      }
    },
  },
  //方法集合
  methods: {
    isMobile,
    initDistPicker() {
      let self = this;
      let distData = addressData;
      let options = [];
      // 省
      for (var provinceKy in distData["1017"]) {
        let optProvinceItem = {
          value: provinceKy,
          label: distData["1017"][provinceKy],
        };
        if (distData[provinceKy]) {
          // 市
          for (var cityKy in distData[provinceKy]) {
            optProvinceItem.children = optProvinceItem.children
              ? optProvinceItem.children
              : [];
            let optCityItem = {
              value: cityKy,
              label: distData[provinceKy][cityKy],
            };
            if (distData[cityKy]) {
              // 区
              for (var areaKy in distData[cityKy]) {
                optCityItem.children = optCityItem.children
                  ? optCityItem.children
                  : [];
                let optAreaItem = {
                  value: areaKy,
                  label: distData[cityKy][areaKy],
                };
                optCityItem.children.push(optAreaItem);
              }
            }
            optProvinceItem.children.push(optCityItem);
          }
        }
        options.push(optProvinceItem);
      }
      self.distData = distData;
      self.options = options;
      if (self.value[self.$attrs.currentItem.field_name]) {
        self.addressDefaultValue = [
          self.value[self.$attrs.currentItem.field_name].province,
          self.value[self.$attrs.currentItem.field_name].city,
          self.value[self.$attrs.currentItem.field_name].area,
        ];

        self.addressInfo =
          self.value[self.$attrs.currentItem.field_name].address;
      }
    },
    handleChange(value) {
      let self = this;
      //获取省名
      self.options.map((item) => {
        if (item.value == value[0]) {
          self.cityArr = item.children; //存储城市列表
          self.province = item.label;
        }
      });
      //获取市名
      self.cityArr.map((item) => {
        if (item.value == value[1]) {
          self.areaArr = item.children || []; //存储区县列表
          self.city = item.label;
        }
      });
      //获取区县名
      self.areaArr.map((item) => {
        if (item.value == value[2]) {
          self.area = item.label;
        }
      });
      let address = {
        province: this.addressDefaultValue[0],
        city: this.addressDefaultValue[1],
        area:
          this.addressDefaultValue.length >= 3
            ? this.addressDefaultValue[2]
            : this.addressDefaultValue[1], // scrm数据库中 直辖市 直接就是北京-朝阳
        address: this.addressInfo,
      };

      this.$set(this.value, this.$attrs.currentItem.field_name, address);
      let val = [this.province, this.city, this.area, this.addressInfo].join(
        ""
      );
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name + "address",
        val
      );

      let fileRules = this.$attrs.currentItem.fileRules;

      if (fileRules.length > 0) {
        this.checkedFlieKey();
      }
    },
    change() {
      let address = {
        province: this.addressDefaultValue[0],
        city: this.addressDefaultValue[1],
        area: this.addressDefaultValue[2],
        address: this.addressInfo,
      };

      this.$set(this.value, this.$attrs.currentItem.field_name, address);
      let val = [this.province, this.city, this.area, this.addressInfo].join(
        ""
      );
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name + "address",
        val
      );
      this.checkedFlieKey();
    },
    onConfirm({ selectedOptions }) {
      debugger;
      this.showArea = false;
      const formatAddress = selectedOptions.map((option) => option.text);
      this.vant_addressDefaultValue = formatAddress.join(" / ");
      this.$set(
        this.value,
        this.$attrs.currentItem.field_name + "address",
        formatAddress.join("") + this.addressInfo
      );

      let address = {
        province: selectedOptions[0].value,
        city: selectedOptions[1].value,
        area:
          selectedOptions.length >= 3
            ? selectedOptions[2].value
            : selectedOptions[1].value,
        address: this.addressInfo,
      };
      this.$set(this.value, this.$attrs.currentItem.field_name, address);
      // this.showArea = false;
    },
    clearInput() {
      this.vant_addressDefaultValue = "";
      let address = {
        province: "",
        city: "",
        area: "",
        address: this.addressInfo,
      };
      this.$set(this.value, this.$attrs.currentItem.field_name, address);
      this.initVantArea();
    },

    initVantArea() {
      let areaData = addressData;
      Object.keys(areaData["1017"]).forEach((item) => {
        this.areaList.push({
          text: areaData["1017"][item],
          value: item,
          children: areaChildren(item),
        });
      });
      function areaChildren(data) {
        let ary = [];
        if (!areaData[data]) return;
        Object.keys(areaData[data]).forEach((item) => {
          ary.push({
            text: areaData[data][item],
            value: item,
            children: areaChildren(item),
          });
        });
        return ary;
      }
    },
    areaChange(val) {
      console.log(val);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("-pppp---", this);
    this.initDistPicker();
    this.initVantArea();
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
<style lang="less">
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
.el-cascader {
  width: 100%;
}
.el-cascader-panel {
  height: 200px;
}
.m_address {
  .van-icon-arrow {
    display: none;
  }
}

@media (max-width: 768px) {
  .el-cascader-panel {
    height: 200px;
    width: 100vw !important;
    overflow: auto !important;
  }
}
// .el-popper {
//   width: 100vw !important;
//   overflow: auto !important;
// }
</style>
<style>
.van-popup--bottom.van-popup--round {
  border-radius: 8px 8px 0 0;
}
.van-cascader__option--selected {
  color: #ff724f;
}
.van-cascader .van-tabs__line {
  background-color: #ff724f;
}
</style>
