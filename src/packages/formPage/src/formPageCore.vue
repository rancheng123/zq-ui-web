<template>
  <div
      class="form-page form-configuration-wrap fullscreen"
      v-loading="loading"
      :style="[{ backgroundColor: `${whiteBg ? whiteBg : cta_background}` }]"
  >
    <!-- 拿到数据后显示 -->
    <div class="copy" :data-clipboard-text="downloadUrl"></div>
    <div class="from-warp" v-if="success">
      <div class="from-content" v-if="!is_submit">
        <!-- 表单项 -->
        <div class="file-show-content" v-if="!is_submit">
          <div class="center-scrollbar">
            <!-- 头图 -->
            <div class="banner" v-if="formData.form_type == 1">
              <el-image
                  :src="$domain + formData.basic_attribute.banner"
                  fit="fit"
                  :style="{
                  height: isMobile
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
            <div>
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
                    <input type="text">
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
                ><span
                    :style="formData.basic_attribute.submitBtnText.style"
                >{{ formData.basic_attribute.submitBtnText }}</span
                ></el-button
                >
              </div>
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

    <!--  单页面表单用此结果页     -->
    <div class="submit-over" v-if="is_submit && formData.form_type == 1">
      <img src="../assets/nodata.png" />
      <span class="decs" v-html="formData.personal_display_content"> </span>
    </div>

    <!-- 隐私条框弹窗 -->
  </div>
</template>
<script>
// 表单组件


import { getUtmJson } from "./utils/parseUrl.js";
import componentStore from "./utils/componentStore.js";
import { isMobile } from "./utils/index.js";

export default {
  data() {
    return {
      showPop: true,
      testvisible: false,
      submitData: {},
      formData: {},
      loading: false,
      key: "",
      uo: "",
      success: false,
      is_submit: false,
      myCollect: null,
      privacyMobileVisible: false,
      privacyPcVisible: false,
      is_mobi: false,
      privacyName: "",
      privacyContent: "",
      isReadPrivacy: false,
      ppid: "", //父级页面id
      isStatistics: true, // 是否 需要统计
      downloadUrl: "", // 父页面有表单提交的下载动作
      module: "", // 父级的模块
      source: {}, // 访问链路
      isWeiXin: false,
      cta_background: "", //表单cta设置的背景颜色
    };
  },
  computed: {
    whiteBg() {
      if (
          this.formData &&
          this.formData.advance_attribute &&
          this.formData.advance_attribute.page &&
          this.formData.advance_attribute.page.style &&
          this.formData.advance_attribute.page.style.backgroundColor
      ) {
        return this.formData.advance_attribute.page.style.backgroundColor;
      } else {
        return "white";
      }
    },
  },
  components: {  },
  mounted() {
    this.cta_background = this.$route.query.ctaBackground || "";
    this.unique_id = this.$route.query.unique_id || "";
    this.form_id = this.$route.query.form_id || "";
    this.org_id = this.$route.query.org_id || "";
    this.ppid = this.$route.query.ppid || ""; //父页面id
    this.isStatistics = this.$route.query.isStatistics == 2 ? false : true;
    this.downloadUrl = this.$route.query.downloadUrl || "";
    this.module = this.$route.query.module || "";
    this.pType = this.$route.query.pType || "";
    this.pId = this.$route.query.pId || "";
    this.gType = this.$route.query.gType || "";
    this.gId = this.$route.query.gId || "";
    this.zType = this.$route.query.zType || "";
    this.zId = this.$route.query.zId || "";
    this.getDetail();
    this.$nextTick(() => {
      document.getElementById("app").setAttribute("class", "fullscreen");
    });
    this.uo = window.localStorage.getItem("uo") || "";
    this.is_mobi = isMobile();
    if (this.is_mobi) {
      let head = document.getElementsByTagName("head");
      let meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      head[0].appendChild(meta);
    }
    if (this.isStatistics) {
      this.myCollect = {}
      this.myCollect.init({});
    }
    window.addEventListener("click", this.sendMessage);
    this.isWeiXin = this.isweiXin();

    //测试 start
    //this.is_submit = true;
    console.log(this, "------------ppp------------");
    //测试 end
    componentStore.set("formPage", this);
  },
  methods: {
    sendMessage() {
      window.parent.postMessage({ type: "cdp" }, "*");
    },
    isMobile,
    checked(key, value) {
      if (this.formData.is_auto_completion == 2) {
        this.getHistoryData(key, value, this.org_id);
      }
    },
    getHistoryData(key, value, org_id) {
      let params = {
        key,
        value,
        org_id,
      };
      this.$Api.form.getHistoryData(params).then(({ code, data }) => {
        if (code == 0) {
          let filedKey = Object.keys(data);
          let submitData = {};
          filedKey.forEach((item) => {
            submitData[item] = data[item];
          });

          this.submitData = {
            ...this.submitData,
            ...submitData,
          };
        } else {
          // this.$zqMessage.error(msg);
        }
      });
    },

    async getDetail() {
      let self = this;
      let params = {
        form_id: this.form_id,
        org_id: this.org_id,
      };
      this.$Api.form
          .getReleaseDetailsApp(params)
          .then(({ code, data, msg }) => {
            if (code == 0) {
              self.formData = JSON.parse(data.form_content);

              self.formData.advance_attribute = JSON.parse(
                  self.formData.advance_attribute
              );
              self.formData.basic_attribute = JSON.parse(
                  self.formData.basic_attribute
              );

              self.formData.field_content = JSON.parse(
                  self.formData.field_content
              );

              this.$emit("onMounted");
              self.$emit("onFormDataChange", self.formData);
              this.$nextTick(() => {
                this.initData();
              });

              if (this.formData.basic_attribute.pageTitle) {
                document.title = this.formData.basic_attribute.pageTitle;
              }
              if (this.uo && this.uo != 0) {
                this.key = "customer_id";
                if (this.formData.is_auto_completion == 2) {
                  this.$nextTick(() => {
                    this.getHistoryData(
                        "renew_customer_id",
                        this.uo,
                        this.org_id
                    );
                  });
                }
              }
              //页面访问买点
              let params = {
                page_id: this.form_id, // 必传 页面id
                page_first_title: self.formData.form_name, // 可传 页面一级标题
                source_title: "", // 可传 页面来源
                parent_page_id: this.ppid,
              };

              //单页面表单
              if (self.formData.form_type === 1) {
                params = {
                  ...params,
                  ...getUtmJson(window.top.location, "link"),
                };

                console.log(params, "--aaaa");
              }

              // 父级为未发布态 不需要统计
              if (this.isStatistics) {
                this.myCollect.$visit(params);
              }
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
      this.success = true;
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
      let hasObjectNoValue = false;
      let self = this;
      Object.keys(this.submitData).forEach((item, index) => {
        if (
            Object.prototype.toString.call(this.submitData[item]) ===
            "[object Object]" &&
            this.formData.field_content[index] &&
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
          if (
              "Image" in this.submitData &&
              !this.submitData[item].length <= 0
          ) {
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

          let submitPanelData = {};
          this.formData.field_content.forEach((item) => {
            if (item.tag == "panel" && item.isEdit) {
              submitPanelData[item.field_name] = item.activeValue;
            }
          });
          // 父级为未发布态 不需要统计
          if (!this.isStatistics) {
            if (this.downloadUrl && this.downloadUrl != "undefiend") {
              if (this.isWeiXin) {
                window.parent.postMessage({ type: "cdpDownload" }, "*");
              } else {
                self.download(this.downloadUrl);
              }
            }
            this.is_submit = true;
            this.$emit("onSubmitSuccess", true);
            return false;
          }
          if (this.zType && this.zType != "undefiend") {
            this.source[this.zType] = this.zId;
          }
          if (this.gType && this.gType != "undefiend") {
            this.source[this.gType] = this.gId;
          }
          if (this.pType && this.pType != "undefiend") {
            this.source[this.pType] = this.pId;
          }

          const params = {
            anonymous_id: this.myCollect.$getAnonymousId(),
            unique_id: this.unique_id,
            org_id: this.org_id,
            ...this.submitData,
            ...submitPanelData,
            module: this.module,
            source: this.source,
            clientresources: {
              customer_id: window.localStorage.getItem("uo"),
              secretcode: window.localStorage.getItem("secretcode"),
            },
          };

          //下载统计
          if (this.downloadUrl && this.downloadUrl != "undefiend") {
            params.source.utm = getUtmJson(window.top.location, "download");
          }

          this.$Api.form.commit(params).then(({ code, data, msg }) => {
            if (code == 0) {
              //获取customer_id，用于c端埋点 -qrj
              window.parent.parent.postMessage(
                  { customer_id: data.customer_id },
                  "*"
              );
              // window.parent.postMessage({ customer_id: data }, '*');
              localStorage.setItem("customer_id", data.customer_id);
              // 先下载 cms 需求
              if (this.downloadUrl && this.downloadUrl != "undefiend") {
                if (this.isWeiXin) {
                  window.parent.postMessage({ type: "cdpDownload" }, "*");
                } else {
                  self.download(this.downloadUrl);
                }
              }
              if (this.formData.personal_display_type == 1) {
                this.is_submit = true;
              } else if (this.formData.personal_display_type == 2) {
                if (window.self === window.top) {
                  this.fnPageJump();
                } else {
                  // false 说明被iframe嵌套的 如 在cta中预览嵌套表单
                  if (isMobile()) {
                    // 因safari的安全机制将“异步”window.open阻挡了所以采用localtion
                    // 被两级iframe嵌套了
                    window.parent.parent.location.href =
                        this.formData.http_jump_link;
                  } else {
                    this.fnPageJump();
                  }
                }
              }
              window.localStorage.setItem("uo", data.customer_id);
              window.localStorage.setItem("secretcode", data.secretcode);
              this.$emit("onSubmitSuccess", true);
            } else {
              this.$zqMessage.error(msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 打开新页面跳转 (解决浏览器默认阻止打开新页面)
    fnPageJump() {
      // 用户点击时 => 浏览器打开一个空白页
      this.newTab = window.open(`'about:blank'`);
      // 重定向至目标页面
      this.newTab.location.href = this.formData.http_jump_link;
    },
    download(url) {
      let a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    //判断是否是微信浏览器的函数
    isweiXin() {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {},
  beforeDestroy() {
    componentStore.clear("formPage");
    window.removeEventListener("click", this.sendMessage);
  }, //生命周期 - 销毁之前
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
  overflow-y: auto;
  /deep/.el-input__inner {
    padding-right: 8px;
  }
}
/deep/.el-scrollbar,
/deep/.el-scrollbar__wrap,
/deep/.el-scrollbar__view {
  height: 100vh;
}
.ml24 {
  margin-left: 24px;
}
.form-page {
  //max-width: 816px;
  height: 100vh;
  margin: 0 auto;
}
.form-page::-webkit-scrollbar {
  height: 0;
  width: 0;
  color: transparent;
}

.preview-form-page-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.from-content {
  width: 100%;
  height: 100%;
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
/deep/.el-form-item {
  margin: 0;
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
    border-radius: 0px;
    border: none;
    box-sizing: border-box;
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

@media (max-width: 768px) {
  .form-page {
    width: 100vw;
    height: 100vh;
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
  .sumbit-btn {
    width: 100% !important;
  }
}
::-webkit-scrollbar {
  width: 6px;
  height: 12px;
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  display: block;
  min-height: 12px;
  min-width: 6px;
  border-radius: 6px;
  background-color: #d9d9d9;
}
</style>
