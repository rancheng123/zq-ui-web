<!-- by.xiaoxiao -->
<template>
  <div class="flex-auto">
    <zq-form-item v-bind="$attrs">
      <template>
        <zq-select
          v-if="!isMobile"
          :style="$attrs.formData.advance_attribute.input.style"
          v-model.trim="value[$attrs.currentItem.field_name]"
          :placeholder="$attrs.currentItem.placeholder"
          class="input-with-select"
          @change="handlerChange"
          filterable
          remote
          clearable
          :remote-method="remoteMethod"
        >
          <el-option
            v-for="item in companyList"
            :key="item.enterprise_name"
            :label="item.enterprise_name"
            :value="item.enterprise_name"
          >
          </el-option>
        </zq-select>
        <form action="/" v-else class="mobile-form">
          <van-search
            class="zq-select input-with-select"
            :style="$attrs.formData.advance_attribute.input.style"
            :placeholder="$attrs.currentItem.placeholder || '搜索'"
            v-model.trim="value[$attrs.currentItem.field_name]"
            @input="inputChange"
            @clear="value[$attrs.currentItem.field_name] = ''"
          />
          <ul v-show="showPicker" class="mobile-company">
            <template v-if="this.companyList.length > 0">
              <li
                @click="handlerChange(item.enterprise_name)"
                v-for="item in companyList"
                :key="item.enterprise_name"
              >
                {{ item.enterprise_name }}
              </li>
            </template>
            <template v-else>
              <li class="empty">无数据</li>
            </template>
          </ul>
        </form>
      </template>
    </zq-form-item>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import { mixin } from "../utils/mixin.js";
import { searchEnterprise } from "../api/index.js"; // 创建表单需要填写的字段
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
      showPicker: false,
      companyList: [],
    };
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
  mounted() {},
  //方法集合
  methods: {
    isMobile,
    remoteMethod(query) {
      if (query !== "") {
        searchEnterprise({ keyword: query })
          .then((res) => {
            if (res.code === 0) {
              this.loading = false;
              this.companyList = (res.data && res.data.item) || [];
              if (this.isMobile) {
                this.showPicker = true;
              }
            } else {
              this.$zqMessage.error(res.msg);
            }
          })
          .catch(() => {
            if (this.isMobile) {
              this.showPicker = false;
            }
          });
      } else {
        if (this.isMobile) {
          this.showPicker = false;
        }
        this.companyList = [];
      }
    },
    handlerChange(value) {
      let fileRules = this.$attrs.currentItem.fileRules;
      if (fileRules.length > 0) {
        this.checkedFlieKey();
      }
      if (this.isMobile) {
        this.$set(this.$attrs.currentItem, "default_value", value);
        this.$set(this.value, this.$attrs.currentItem.field_name, value);
        this.showPicker = false;
      }
    },
    inputChange() {
      setTimeout(() => {
        this.remoteMethod(this.value[this.$attrs.currentItem.field_name]);
      }, 300);
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
.mobile-form {
  position: relative;
  left: 0;
  top: 0;
  .mobile-company {
    position: absolute;
    width: 100%;
    max-height: 176px;
    overflow-y: scroll;
    border: solid 1px #e4e7ed;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    left: 0;
    top: 56px;
    z-index: 2;
    li {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2b3d4f;
      padding: 10px 15px;
      font-size: 14px;
      color: #2b3d4f;
      line-height: 20px;
      list-style: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .empty {
      text-align: center;
      background: #eff4f9;
      padding: 0;
      margin: 10px 0;
      color: #999;
    }
  }
}

.input-with-select /deep/.van-search__content {
  background-color: transparent !important;
  padding-left: 0 !important;
  .van-field .van-field__left-icon {
    left: -6px !important;
    top: 6px !important;
  }
  .van-field input.van-field__control {
    padding-left: 19px !important;
  }
}
</style>
