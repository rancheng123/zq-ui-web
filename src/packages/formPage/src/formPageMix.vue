<template>
  <div class="form-pagecore-1214343353543">
    <div
        class="form-page form-configuration-wrap fullscreen transparentScrollBar"
        v-loading="loading"
        :style="[{ backgroundColor: `${formBg ? formBg : cta_background}` }]"
    >
      <div class="form-title" v-if="isEnlarge">
        <div v-html="ctaTitleAndDesc"></div>
      </div>
      <!-- 拿到数据后显示 -->
      <div
          v-if="!isPreview"
          class="copy"
          :data-clipboard-text="downloadUrl"
      ></div>

      <div class="from-warp" v-if="success">
        <div class="from-content" v-if="!is_submit">
          <div :style="'height: 24px;'" v-if="formData.form_type == 1 && !isMobile"></div>

          <div :class="{
          borderRadius6: formData.form_type == 1 && !isMobile
        }">
            <!-- 头图 -->
            <div class="banner banner15" v-if="formData.form_type == 1">
              <el-image
                  :src="imageServerDomain() + formData.basic_attribute.banner"
                  fit="fill"
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

            <!-- 表单项 -->
            <div class="file-show-content" v-if="!is_submit">
              <div class="center-scrollbar center-scrollbar8">
                <div :style="formData.advance_attribute.page.style">
                  <div
                      :class="{
                pcSinglePadding24: !isMobile && formData.form_type == 1,
              }"
                  >
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
                            :historyData="historyData"
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

          <div :style="'height: 24px;'" v-if="formData.form_type == 1 && !isMobile"></div>
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
        <img src="http://localhost:8092/lib/zq-public/utils/nodata.png" />
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
      historyData: {},
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
      cta_background: "", //表单cta设置的背景颜色,

    };
  },
  computed: {
    ctaTitleAndDesc(){
      return this.closest2('ZqFormPage').ctaTitleAndDesc;
    },
    isEnlarge() {
      return this.closest2('ZqFormPage').isEnlarge;
    },
    isPreview(){
      return this.closest2('ZqFormPage').isPreview
    },
    formBg() {
      if (
        this.formData &&
        this.formData.advance_attribute &&
        this.formData.advance_attribute.page &&
        this.formData.advance_attribute.page.style &&
        this.formData.advance_attribute.page.style.backgroundColor
      ) {
        return this.formData.advance_attribute.page.style.backgroundColor;
      } else {
        return "";
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

    if (!this.isPreview) {
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

      componentStore.set("formPage", this);
    }
  },
  methods: {
    imageServerDomain(){
      var res = this.closest2('ZqFormPage').imageServerDomain
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
      let self = this;
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
          //测试 start
          // var mockData = {"code":0,"msg":"请求成功","data":{"modify_time":1650947626,"0002":2,"op":"update","customer_id":"83d5ff59-4d95-7f74-57f5-275a5b2a3d50","is_del":1,"Company":"鲁H3018Z","CreatedTime":1650947626,"MobilePhone":"13671398016","leads_join_field":"member_info","islead":1,"schema_id":661,"province":"10180","modifier":"0","islead_time":1650791186,"anonymous_id":"D8906DBA42E1C19C","city":"104778","id":1875,"leads_owner":"","sync_time":1650963081,"create_time":1650791186,"creator":"0","leads_ownertime":0,"duo":"11111","LeadOwner":"","date":1650902400,"org_id":"org7acb9d894109987c28a2314b46eeca29","identity_id":"","source_type":"form","sync_source":0,"score_update_time":0,"FullName":"rc","Email":"1@163.con","area":"104778","old":{"op":"update","creator":"0","create_time":1650791186,"data":"{\"Email\": \"1@163.con\", \"IsLead\": \"1\", \"Address\": {\"area\": \"104778\", \"city\": \"104778\", \"address\": \"\", \"province\": \"10180\"}, \"Company\": \"鲁H3018Z\", \"FullName\": \"rc\", \"dafen002\": 0, \"LeadOwner\": \"\", \"dafen_001\": 0, \"renew_duo\": \"11111\", \"renew_0002\": 2, \"renew_date\": 1650902400, \"CreatedTime\": 1650947626, \"MobilePhone\": \"13671398016\", \"anonymous_id\": \"D8906DBA42E1C19C\", \"LastActiveTime\": 1650963081, \"LeadCreatedTime\": 1650791186}","identity_id":"","modifier":"0","modify_time":1650947626,"source_type":"form","sync_time":1650963081,"leads_ownertime":0,"sync_source":0,"islead":1,"islead_time":1650791186,"org_id":"org7acb9d894109987c28a2314b46eeca29","is_del":1,"schema_id":661,"score_update_time":0,"id":1875,"customer_id":"83d5ff59-4d95-7f74-57f5-275a5b2a3d50","leads_owner":""},"LeadCreatedTime":1650791186,"IsLead":"1","diff":["data"],"dafen002":0,"dafen_001":0,"LastActiveTime":1650963081}}
          // data = mockData.data;
          //测试 end


          if(self.submitData.Address){
            self.submitData.Address.province = data.province
            self.submitData.Address.city = data.city
            self.submitData.Address.area = data.area
          }else{

          }


          self.historyData = data
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


      let params;
      let api;
      if (!this.isPreview) {
        params = {
          form_id: this.form_id,
          org_id: this.org_id,
        };

        api = request({
          url: this.closest2('ZqFormPage').apiPrefix + "cdp/form-app/details",
          method: "post",
          data:params,
        })

      } else {
        params = {
          id: this.form_id,
          org_id: this.org_id,
        };


        api = request({
          url: this.closest2('ZqFormPage').apiPrefix + "cdp/form-app/get-form-info",
          method: "post",
          data: params,
        })
      }


      api.then(({ code, data, msg }) => {
        if (code == 0) {
          if (!this.isPreview) {
            self.formData = JSON.parse(data.form_content);
          } else {
            self.formData = data;
          }
          self.formData.advance_attribute = JSON.parse(
            self.formData.advance_attribute
          );
          self.formData.basic_attribute = JSON.parse(
            self.formData.basic_attribute
          );
          self.formData.field_content = JSON.parse(self.formData.field_content);
          self.$emit("onMounted");
          self.$emit("onFormDataChange", self.formData);
          this.$nextTick(() => {
            this.initData();
          });

          if (this.formData.basic_attribute.pageTitle) {
            document.title = this.formData.basic_attribute.pageTitle;
          }

          if (!this.isPreview) {
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
                ...getUtmJson(location, "link"),
              };


            }

            // 父级为未发布态 不需要统计
            if (this.isStatistics) {
              //防止多次统计
              if (!window.formVisited) {
                this.myCollect.$visit(params);
                window.formVisited = true;
              }
            }
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

          if (!this.isPreview) {
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
              params.source.utm = getUtmJson(location, "download");
            }

            request({
              url: this.closest2('ZqFormPage').apiPrefix +  "cdp/form-app/commit",
              method: "post",
              data: params,
            }).then(({ code, data, msg }) => {
              if (code == 0) {
                this.$emit("onSubmitSuccess", true);

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
              } else {
                this.$zqMessage.error(msg);
              }
            });
          } else {
            this.$emit("onSubmitSuccess", true);
            if (this.formData.personal_display_type == 1) {
              this.is_submit = true;
            } else if (this.formData.personal_display_type == 2) {
              window.location.href = this.formData.http_jump_link;
            }
          }
        } else {

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
