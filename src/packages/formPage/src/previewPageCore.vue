<template>
  <div class="form-page form-configuration-wrap fullscreen" v-loading="loading">
    <!-- 拿到数据后显示 -->
    <div class="from-warp" v-if="success">
      <div class="from-content" v-if="!is_submit">
        <!-- 头图 -->
        <div class="banner" v-if="formData.form_type == 1">
          <el-image
            :src="$domain + formData.basic_attribute.banner"
            fit="fit"
            :style="{
              height: _isMobile
                ? formData.basic_attribute.banner_m_height
                : formData.basic_attribute.banner_b_height,
            }"
            v-show="formData.basic_attribute.banner"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <!-- 头图 end-->
        <!-- 表单项 -->
        <div
          class="file-show-content"
          v-if="!is_submit"
          :style="formData.advance_attribute.page.style"
        >
          <div class="center-scrollbar">
            <div :style="formData.advance_attribute.page.style">
              <!-- 标题和简介 -->
              <div class="form-title" v-if="formData.form_type == 1">
                <div
                  class="title"
                  :style="formData.advance_attribute.title.style"
                >
                  {{ formData.basic_attribute.title }}
                </div>
                <div
                  class="inc"
                  :style="formData.advance_attribute.introduction.style"
                >
                  {{ formData.basic_attribute.introduction }}
                </div>
              </div>
              <!-- 标题和简介 -->
              <!-- 表单区域 -->
              <el-row class="center-board-row">
                <el-form
                  label-position="top"
                  ref="ruleForm"
                  :model="submitData"
                  :hide-required-asterisk="true"
                  class="custom-form"
                >
                  <preview-item
                    v-for="item in formData.field_content"
                    class="draggable-item"
                    :currentItem="item"
                    :formData="formData"
                    v-model="submitData"
                    :submitData="submitData"
                    :key="item.field_name"
                  />
                </el-form>
              </el-row>
              <!-- 隐私条款 -->
              <div class="privacy-warp-sub" v-if="formData.is_privacy == 2">
                <zq-checkbox v-model="isReadPrivacy"> </zq-checkbox>
                <span
                  class="privacytext"
                  @click="previewPrivacy"
                  v-html="formData.basic_attribute.privacyText"
                ></span>
              </div>
              <!-- 表单区域 -->
              <el-button
                class="sumbit-btn"
                @click="submitForm"
                :style="formData.advance_attribute.submitBtn.style"
                ><span :style="formData.basic_attribute.submitBtnText.style">{{
                  formData.basic_attribute.submitBtnText
                }}</span></el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 隐私条框弹窗 -->
    <div class="privacy-warp-mobile-model" v-if="privacyMobileVisible"></div>
    <div class="privacy-warp-mobile" v-if="privacyMobileVisible">
      <div class="privacy-title">
        <span>{{ privacyName }}</span>
        <zq-icon
          name="icon-guanbi"
          @click="privacyMobileVisible = false"
        ></zq-icon>
      </div>
      <div class="privacy-contant-warp">
        <span v-html="privacyContent"></span>
      </div>
    </div>

    <!-- 隐私条框弹窗 -->
    <zq-dialog
      width="880px"
      :append-to-body="false"
      :modal-append-to-body="false"
      :title="privacyName"
      :visible.sync="privacyPcVisible"
      :titleBottomBorder="true"
      :showCancelButton="false"
      :showConfirmButton="false"
    >
      <span class="privacy-content" v-html="privacyContent"></span>
    </zq-dialog>
    <!-- 结果页 -->
    <div class="submit-over" v-if="is_submit">
      <img src="../assets/nodata.png" />
      <span class="decs" v-html="formData.personal_display_content"> </span>
    </div>
  </div>
</template>
<script>
// 表单组件
import previewItem from "./components/previewItem.vue";
export default {
  data() {
    return {
      is_mobile: true,
      submitData: {},
      formData: {},
      loading: false,
      key: "",
      uo: "",
      success: false,
      is_submit: false,
      privacyMobileVisible: false,
      privacyPcVisible: false,
      is_mobi: false,
      privacyName: "",
      privacyContent: "",
      isReadPrivacy: false,
    };
  },
  components: { previewItem },
  mounted() {
    this.$emit("onMounted");
    this.unique_id = this.$route.query.unique_id || "";
    this.form_id = this.$route.query.id || "";
    this.org_id = this.$route.query.org_id || "";
    this.getDetail();
    this.$nextTick(() => {
      document.getElementById("app").setAttribute("class", "fullscreen");
    });
    this.uo = window.localStorage.getItem("uo") || "";
    this.is_mobi =
      navigator.userAgent
        .toLowerCase()
        .match(
          /(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
        ) != null;
  },

  methods: {
    async getDetail() {
      let self = this;
      let params = {
        id: this.form_id,
        org_id: this.org_id,
      };
      await this.$Api.form.getDetailsApp(params).then(({ code, data, msg }) => {
        if (code == 0) {
          self.formData = data;
          self.formData.advance_attribute = JSON.parse(
            self.formData.advance_attribute
          );
          self.formData.basic_attribute = JSON.parse(
            self.formData.basic_attribute
          );
          self.formData.field_content = JSON.parse(self.formData.field_content);
          this.success = true;
          this.$nextTick(() => {
            this.initData();
          });
          if (this.formData.basic_attribute.pageTitle) {
            document.title = this.formData.basic_attribute.pageTitle;
          }
          console.log(self.formData, "--preview-");
        } else {
          this.$zqMessage.error(msg);
        }
      });
    },
    initData() {
      let submitData = {};
      this.formData.field_content.forEach((item) => {
        if (item.tag == "panel") {
          item.editableTabs.forEach((panle) => {
            if (panle.children.length > 0) {
              panle.children.forEach((panelFile) => {
                submitData[panelFile.field_name] = panelFile.default_value;
              });
            }
          });
        }
        submitData[item.field_name] = item.default_value;
      });
      this.submitData = submitData;
    },
    previewPrivacy() {
      let params = {
        org_id: this.org_id,
        id: this.formData.privacy_id,
      };
      this.$Api.form.getPrivacyDetails(params).then(({ code, data, msg }) => {
        if (code == 0) {
          this.privacyContent = data.privacy_content;
          this.privacyName = data.privacy_name;
          if (this.is_mobi) {
            this.privacyMobileVisible = true;
          } else {
            this.privacyPcVisible = true;
          }
        } else {
          this.$zqMessage.error(msg);
        }
      });
    },
    submitForm() {
      console.log("this.submitData", this.submitData);
      let hasObjectNoValue = false;
      Object.keys(this.submitData).forEach((item, index) => {
        if (
          Object.prototype.toString.call(this.submitData[item]) ===
            "[object Object]" &&
          this.formData.field_content[index].is_required == 2
        ) {
          if (
            !this.submitData[item].province &&
            !this.submitData[item].address
          ) {
            this.$zqMessage.error(
              `${this.formData.field_content[index].display_name}为必填项`
            );
            hasObjectNoValue = true;
          }
        }
        if (
          this.formData.field_content[index] &&
          this.formData.field_content[index].is_required == 2
        ) {
          if ("DateTime" in this.submitData && !this.submitData[item]) {
            this.$zqMessage.error(
              `${this.formData.field_content[index].display_name}为必填项`
            );
            hasObjectNoValue = true;
            return;
          }
          if ("Date" in this.submitData && !this.submitData[item]) {
            this.$zqMessage.error(
              `${this.formData.field_content[index].display_name}为必填项`
            );
            hasObjectNoValue = true;
          }
        }
        return hasObjectNoValue;
      });
      if (hasObjectNoValue) {
        return;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.formData.is_privacy == 2 && !this.isReadPrivacy) {
            this.$zqMessage.error("请先阅读隐私条款");
            return false;
          }

          this.$emit("onSubmitSuccess", true);
          if (this.formData.personal_display_type == 1) {
            this.is_submit = true;
          } else if (this.formData.personal_display_type == 2) {
            window.location.href = this.formData.http_jump_link;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>
<style lang="less" scoped>
#app {
  &.fullscreen {
    .layout-sidebar,
    .fixed-header {
      display: none;
    }
    .layout-container {
      margin: 0px !important;
    }
  }
}

.flex-row {
  display: flex;
  align-items: center;
}
.ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-warp {
  width: 100vw !important;
}
.fullscreen {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: auto;
  /deep/.el-input__inner {
    padding-right: 8px;
  }
}
/deep/.el-scrollbar,
/deep/.el-scrollbar__wrap,
/deep/.el-scrollbar__view {
  height: 100%;
}
.ml24 {
  margin-left: 24px;
}
.form-page {
  max-width: 816px;
  height: 100vh;
  margin: 0 auto;
  .banner {
    /deep/ .el-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-image__inner {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.preview-form-page-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.from-content {
  width: 100%;
  height: 100%;
}
.sumbit-btn {
  margin: 24px 0;
  // width: 100%;
  min-width: 88px;
  min-height: 40px;
}
/deep/.input-with-select {
  width: 100% !important;
}
.custom-form {
  //width: 456px;
  /deep/.el-input__inner,
  /deep/.el-textarea__inner {
    background-color: transparent;
    background-image: none;
    border-radius: none;
    border: none;
    box-sizing: border-box;
    color: inherit;
    display: inline-block;
    font-size: inherit;
    height: inherit;
    line-height: inherit;
    outline: 0;
    padding: 0;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    min-height: 40px;
    text-align: inherit;
  }
  /deep/ .van-field {
    display: flex;
    align-items: center;
    border: none;
    min-height: 40px;
    position: relative;
    .van-field__left-icon,
    .van-field__right-icon {
      position: absolute;
      height: 100%;
      top: 0;
      text-align: center;
      color: #c0c4cc;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      line-height: 40px;
      width: 25px;
    }
    .van-field__left-icon {
      left: 5px;
      margin-right: 4px;
    }
    .van-field__right-icon {
      right: 5px;
    }
    input.van-field__control {
      min-height: 40px;
    }
    .el-icon-arrow-up {
      color: #c0c4cc;
      font-size: 14px;
      transition: transform 0.3s;
      transform: rotateZ(180deg);
      cursor: pointer;
    }
    .el-icon-date {
      font-size: 14px;
      color: #c0c4cc;
    }
  }
  /deep/ .van-picker {
    .van-picker-column__item {
      padding: 0 24px;
      font-size: 14px;
      &.van-picker-column__item--selected {
        color: #ff724f;
      }
    }
    .van-picker__toolbar {
      padding: 5px 0;
      border: 1px solid #eff4f9;
      .van-picker__title {
        color: #2b3d4f;
      }
    }
    .van-picker__confirm {
      color: #ff724f;
    }
  }
}
.submit-over {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 68%;
  }
  .decs {
    width: 200px;
    height: 42px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #2b3d4f;
    line-height: 21px;
    text-align: center;
  }
}
.privacy-warp-sub {
  display: flex;
  margin-bottom: 24px;
  .privacytext {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #2b3d4f;
    line-height: 21px;
  }
}
.preview-warp {
  width: 100%;
  display: flex;
  justify-content: center;
  height: ~"calc(100% - 108px)";
  width: 100%;
  margin: 24px auto 24px;
  overflow: auto;
  .sumbit-btn {
    width: auto;
  }

  /deep/.form-item-label-warp .el-input,
  /deep/.form-item-label-warp .el-textarea,
  /deep/.form-item-label-warp .el-select {
    width: 456px !important;
  }
}
/deep/.el-form--label-top .el-form-item__label {
  padding: 0;
}
/deep/.el-form-item {
  margin-bottom: 24px;
}
.privacy-warp-mobile-model {
  position: absolute;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  width: 100%;
  z-index: 3;
  bottom: 0px;
}
.privacy-warp-mobile {
  position: absolute;
  max-height: 90%;
  background: #fff;
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  z-index: 3;
  min-height: 160px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  .privacy-title {
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid #eff4f9;
    line-height: 56px;
    .name {
      font-size: 16px;
      font-weight: 500;
      color: #2b3d4f;
      line-height: 24px;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon {
      width: 14px;
      font-size: 14px;
    }
  }
}
.privacy-contant-warp {
  height: initial;
  overflow: auto;
  padding: 16px 24px;
  font-size: 14px;

  font-weight: 400;
  color: #2b3d4f;
  line-height: 21px;
}
.privacy-content {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: #2b3d4f;
  line-height: 21px;
  height: 484px;
  overflow: auto;
}
/deep/.el-cascader__dropdown {
  width: 100vw;
  overflow: auto;
}
@media (max-width: 768px) {
  .form-page {
    width: 100vw;
    height: 100%;
    margin: 0;
  }
  .custom-form {
    width: 100%;
  }
  .preview-warp {
    width: 100%;
    /deep/.form-item-label-warp .el-input,
    /deep/ .form-item-label-warp .el-textarea,
    /deep/.form-item-label-warp .el-select {
      width: 100% !important;
      width: 100% !important;
    }
  }
}
</style>
