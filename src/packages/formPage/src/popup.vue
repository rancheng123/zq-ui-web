<template>
  <div>
    <div  class="formTypeFinder">
      哈哈哈啊
    </div>
    <flexBox>
      <div slot="head">
        <div>
          <div class="mobilePopTitle">表单填写</div>
          <zq-icon
              name="icon-shanchuyixuanchengyuan"
              class="icon-qingchuMobile"
              @click="dePopupForm"
          ></zq-icon>
        </div>
      </div>

      <div slot="body">
        <div class="box">
          <div class="form-title">
            <div v-html="ctaTitleAndDesc"></div>
          </div>
        </div>
      </div>
    </flexBox>


  </div>
</template>
<script>
import flexBox from "./components/flexBox/index.vue";
import { isMobile } from "./utils/index.js";
import {getReleaseDetailsApp} from "./api/index.js";
export default {
  name: "formPage",
  data() {
    return {
      loading: true,
      popupFormStatus: false,

      submitSuccess: false,
      formData: {
        form_type: 1,
      },
      ctaTitleAndDesc: "",
    };
  },
  components: {
    flexBox,
  },
  props: {
    type: {
      type: String,
      default() {
        return "formPage";
      },
    },
  },
  computed: {
    showQingchuMobile: {
      cache: false,
      get: function () {
        let res = false;
        if (this.isMobile()) {
          if (this.isEnlarge()) {
            if (!this.submitSuccess) {
              res = true;
            }
          }
        }
        return res;
      },
    },
    whiteBg: {
      cache: false,
      get: function () {
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
  },
  methods: {
    isMobile,
    async getDetail() {
      let self = this;
      let params = {
        form_id: (() => {
          if (this.type === "formPage") {
            return this.$route.query.form_id;
          } else {
            return this.$route.query.id;
          }
        })(),
        org_id: this.$route.query.org_id,
      };
      getReleaseDetailsApp(params)
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
            self.loading = false;
          } else {
            this.$zqMessage.error(msg);
          }
        });
    },
    onMounted() {
      //this.loading = false;
    },
    onSubmitSuccess(val) {
      this.submitSuccess = val;
      if (this.formData.form_type == 2) {
        this.shrinkIframes();
      }
    },
    reSubmit() {
      this.rePopupForm();

      setTimeout(() => {
        // this.sendMessage2({
        //   type: "reload",
        // });
        window.frameElement && window.frameElement.classList.add("reload");
        location.reload();
      }, 1000);
    },
    shrinkIframes(type) {
      let iframes = this.getAllAncestorIframes();
      for (let index in iframes) {
        if (type === "reset") {
          iframes[index].classList.remove("enlargeIframe");
        } else {
          if (iframes[index] !== window.frameElement) {
            iframes[index].classList.remove("enlargeIframe");
          }
        }
      }

      if (this.isMobile()) {
        //删除遮罩
        var layerDom =
          window.top.document.body.querySelector("#layerDomForForm");
        window.top.document.body.removeChild(layerDom);
      }
    },
    getAllAncestorIframes() {
      let res = [];
      let currentWin = window;
      let goOnWhile = true;
      while (goOnWhile) {
        if (currentWin.frameElement) {
          res.push(currentWin.frameElement);
          this.createStyle(currentWin.parent);
        }

        if (currentWin.parent) {
          currentWin = currentWin.parent;
          if (currentWin === currentWin.top) {
            goOnWhile = false;
          }
        } else {
          goOnWhile = false;
        }
      }
      return res;
    },
    createStyle(window) {
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("class", "enlargeStyle");
      //不能换行，否则失效
      style.innerText = `.enlargeIframe{position: fixed;width: 100%;height: 100%;top:0px;left:0px;z-index:10000}.enlargeIframe.notFull{height: 80%;top:20%;}`;
      window.document.head.appendChild(style);
    },
    isEnlarge() {
      //测试 start
      //return true;
      //测试 end

      if (window.frameElement) {
        return window.frameElement.classList.contains("enlargeIframe");
      } else {
        return false;
      }
    },
    enlargeIframes() {
      let iframes = this.getAllAncestorIframes();

      if (
        window.parent &&
        window.parent.document.querySelector(".cta-preview")
      ) {
        this.ctaTitleAndDesc =
          window.parent.document.querySelector(".cta-preview").innerHTML;
      }

      for (let index in iframes) {
        iframes[index].classList.add("enlargeIframe");
      }

      if (this.isMobile()) {
        //找到Cta 设置成80% 高度
        for (let index in iframes) {
          if (
            (this.isMobile() &&
              iframes[index]
                .getAttribute("src")
                .match("data-configuration/cta")) ||
            iframes[index].getAttribute("src").match("web-mobile/cta")
          ) {
            iframes[index].classList.add("notFull");
          }
        }

        //设置遮罩
        var layerDom = document.createElement("div");
        window.top.document.body.appendChild(layerDom);

        layerDom.setAttribute("id", "layerDomForForm");
        layerDom.style =
          "width: 100%;height: 100%;background: #000000;opacity: 0.66; position:fixed;top:0px;left:0px;";
      }
    },
    rePopupForm() {
      this.submitSuccess = false;
      this.popupFormStatus = false;
      //this.loading = true;
      this.enlargeIframes();
      // if (this.isEnlarge()) {
      //   //this.shrinkIframes();
      // } else {
      //
      // }
    },
    popupForm() {
      this.loading = true;
      this.popupFormStatus = true;
      this.enlargeIframes();
      // if (this.isEnlarge()) {
      //   //this.shrinkIframes();
      // } else {
      //
      // }
    },
    dePopupForm() {
      this.loading = true;
      this.popupFormStatus = false;
      this.shrinkIframes("reset");
    },
    sendMessage2(msgObj) {
      if (window.frameElement && window.frameElement.message) {
        window.frameElement.message(msgObj);
      }
    },
  },
  mounted() {
    this.sendMessage2({
      type: "mounted",
    });

    this.getDetail();

    document.documentElement.classList.add("borderRadius");
  },
};
</script>
<style lang="less">
@import "popup.less";
</style>
