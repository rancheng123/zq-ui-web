<template>
  <div class="form-pagecore-1214343353543">
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
                    :src="domain() + formData.basic_attribute.banner"
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
                      <preview-item
                          v-for="item in formData.field_content"
                          class="draggable-item"
                          :currentItem="item"
                          :formData="formData"
                          v-model="submitData"
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
  </div>

</template>
<script>
// 表单组件
import previewItem from "./components/previewItem.vue";
import { getUtmJson } from "./utils/parseUrl.js";
import componentStore from "./utils/componentStore.js";
import { isMobile } from "./utils/index.js";
import request from "./utils/request";

export default {
  data() {
    return {
      isMobile: false,
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
  components: { previewItem },
  mounted() {
    this.isMobile = isMobile()
    this.cta_background = this.closest2('ZqFormPage').params.ctaBackground || "";
    this.unique_id = this.closest2('ZqFormPage').params.unique_id || "";
    this.form_id = this.closest2('ZqFormPage').params.form_id || "";
    this.org_id = this.closest2('ZqFormPage').params.org_id || "";
    this.ppid = this.closest2('ZqFormPage').params.ppid || ""; //父页面id
    this.isStatistics = this.closest2('ZqFormPage').params.isStatistics == 2 ? false : true;
    this.downloadUrl = this.closest2('ZqFormPage').params.downloadUrl || "";
    this.module = this.closest2('ZqFormPage').params.module || "";
    this.pType = this.closest2('ZqFormPage').params.pType || "";
    this.pId = this.closest2('ZqFormPage').params.pId || "";
    this.gType = this.closest2('ZqFormPage').params.gType || "";
    this.gId = this.closest2('ZqFormPage').params.gId || "";
    this.zType = this.closest2('ZqFormPage').params.zType || "";
    this.zId = this.closest2('ZqFormPage').params.zId || "";
    this.getDetail();
    this.$nextTick(() => {
      if(document.getElementById("app")){
        document.getElementById("app").setAttribute("class", "fullscreen");
      }
    });
    this.uo = window.localStorage.getItem("uo") || "";
    this.is_mobi = this.isMobile;
    if (this.is_mobi) {
      let head = document.getElementsByTagName("head");
      let meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      head[0].appendChild(meta);
    }
    if (this.isStatistics) {

      this.myCollect = new Collect({
        org_id: this.org_id,
        customer_id: this.uo,
        baseUrl: this.$trackUrl,
        module_type: "form",
      });
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
    domain(){
      var res = this.closest2('ZqFormPage').domain
      return res
    },
    emitMsg(msgObj){
      this.closest2('ZqFormPage').$emit('message',msgObj)
    },
    parentJump(){
      //此 parent不要动
      window.parent.location.href =
          this.formData.http_jump_link;
    },
    parentEmitMsg(msgObj){
      //此 parent不要动
      window.parent.postMessage(
          msgObj,
          "*"
      );

    },
    sendMessage() {
      this.emitMsg({
        type: "cdp"
      })
    },
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
      request({
        url: this.closest2('ZqFormPage').apiPrefix +  "cdp/form-app/get-info",
        method: "post",
        data: params,
      }).then(({ code, data }) => {
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

      request({
        url: this.closest2('ZqFormPage').apiPrefix + "cdp/form-app/details",
        method: "post",
        data:params,
      }).then(({ code, data, msg }) => {
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
                ...getUtmJson(this.closest2('ZqFormPage').topLocation, "link"),
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
      request({
        url: this.closest2('ZqFormPage').apiPrefix + "cdp/form-app/privacy-details",
        method: "post",
        data: params,
      }).then(({ code, data, msg }) => {
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

                this.emitMsg({ type: "cdpDownload" })

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
            params.source.utm = getUtmJson(this.closest2('ZqFormPage').topLocation, "download");
          }

          request({
            url: this.closest2('ZqFormPage').apiPrefix +  "cdp/form-app/commit",
            method: "post",
            data: params,
          }).then(({ code, data, msg }) => {
            if (code == 0) {
              //获取customer_id，用于c端埋点 -qrj
              this.parentEmitMsg({ customer_id: data.customer_id })

              localStorage.setItem("customer_id", data.customer_id);
              // 先下载 cms 需求
              if (this.downloadUrl && this.downloadUrl != "undefiend") {
                if (this.isWeiXin) {
                  this.emitMsg({ type: "cdpDownload" })
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
                  if (this.isMobile) {
                    // 因safari的安全机制将“异步”window.open阻挡了所以采用localtion
                    // 被两级iframe嵌套了
                    this.parentJump()
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
