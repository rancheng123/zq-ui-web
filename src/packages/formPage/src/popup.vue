<template>
  <div>
    <div style="display: none" class="formTypeFinder">
      {{ formData.form_type == 1 ? "单页面表单" : "嵌入式表单" }}
    </div>

    <div>
      <!--  嵌入式表单    -->
      <div v-if="formData.form_type == 2">
        <!-- 未弹出   -->
        <div v-if="!popupFormStatus">
          <!--  透明层 点击弹出    -->
          <div class="transparentOverLay" @click="popupForm"></div>

          <Skeleton
            :key="skeletonKey"
            :type="type"
            :loading="loading"
            @onSubmitSuccess="onSubmitSuccess"
            @onMounted="onMounted"
          ></Skeleton>
        </div>

        <!-- 弹出   -->
        <div v-else>
          <!--  移动端  start    -->
          <!--   v-if="showQingchuMobile && "    -->
          <div v-if="isMobile" class="mobileEmbed">
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
                <div class="box"  :style="'background:' + formData.advance_attribute.page.style.backgroundColor">
                  <Skeleton
                      :key="skeletonKey"
                      :type="type"
                      :loading="loading"
                      @onSubmitSuccess="onSubmitSuccess"
                      @onMounted="onMounted"
                  ></Skeleton>
                </div>
              </div>
            </flexBox>
          </div>
          <!--  移动端  end    -->

          <!--  pc端  start    -->
          <div v-else class="pcEmbed">
            <div class="whiteBg" :style="'backgroundColor:' + whiteBg">
              <zq-icon
                v-if="isEnlarge()"
                name="icon-qingchu"
                class="icon-qingchu icon-qingchu-pcPopup"
                @click="dePopupForm"
              ></zq-icon>
              <div class="fullscreenInnerWrap transparentScrollBar">
                <div class="centerBox">
                  <Skeleton
                    :key="skeletonKey"
                    :type="type"
                    :loading="loading"
                    @onSubmitSuccess="onSubmitSuccess"
                    @onMounted="onMounted"
                  ></Skeleton>
                </div>
              </div>
            </div>
          </div>
          <!--  pc端  end    -->
        </div>
      </div>

      <!-- 单页面表单   -->
      <div v-else>
        <div v-if="isMobile" class="mobileSingle">
          <Skeleton
            :key="skeletonKey"
            :type="type"
            :loading="loading"
            @onSubmitSuccess="onSubmitSuccess"
            @onMounted="onMounted"
          ></Skeleton>
        </div>
        <div v-else class="pcSingle">
          <Skeleton
            :key="skeletonKey"
            :type="type"
            :loading="loading"
            @onSubmitSuccess="onSubmitSuccess"
            @onMounted="onMounted"
          ></Skeleton>
        </div>
      </div>

      <!--  嵌入式表单用此结果页     -->
      <div class="submit-over2" v-if="submitSuccess && formData.form_type == 2">
        <img src="../assets/submitSuccess.png" />
        <div class="decs" v-html="formData.personal_display_content"></div>
        <zq-button class="submitBtn mt32" plain @click="reSubmit"
          >重新提交</zq-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import flexBox from "./components/flexBox/index.vue";
import Skeleton from "./Skeleton.vue";
import componentStore from "./utils/componentStore.js";
import { isMobile } from "./utils/index.js";
export default {
  name: "popup",
  data() {
    return {
      skeletonKey: Date.now(),
      isMobile:false,
      loading: true,
      popupFormStatus: false,

      submitSuccess: false,
      formData: {
        form_type: 1,
      },
    };
  },
  components: {
    flexBox,
    Skeleton,
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
        if (this.isMobile) {
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
    onMounted() {

    },
    onSubmitSuccess(val) {
      this.submitSuccess = val;
      if (this.formData.form_type == 2) {
        this.shrinkIframes();
      }
    },
    reSubmit() {
      this.submitSuccess = false;
      this.enlargeIframes();
      this.skeletonKey = Date.now();
    },

    getAllAncestorIframes() {
      let res = [];


      res.push(
          document.querySelector('.formPageBox')
      )
      this.createStyle(window);

      let currentWin = window;
      let goOnWhile = true;
      while (goOnWhile) {
        //失效了 start
        if (currentWin.frameElement) {
          res.push(currentWin.frameElement);
          this.createStyle(currentWin.parent);
        }
        //失效了 end

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
      style.innerText = `.enlargeIframe{position: fixed !important;width: 100% !important;height: 100% !important;top:0px;left:0px;z-index:1000}.enlargeIframe.notFull{height: 80% !important;top:20% !important;}.equalCta{position: absolute !important;top: 0px !important;left: 0px !important;width: 100% !important;z-index: 1 !important;border-radius: 0px !important;}.positionRelative{position:relative !important}.zIndex0{z-index:0 !important;}.noTransform{transform: inherit !important;}.div_hidden2{transform: none !important;}.transparentScrollBar{background-color: transparent !important;scrollbar-color: transparent transparent !important;scrollbar-width: none !important;}  .transparentScrollBar::-webkit-scrollbar {height: 0px !important;width: 0px !important;color: transparent !important;}  .transparentScrollBar::-webkit-scrollbar-thumb {display: block !important;height: 0px !important;width: 0px !important;background-color: transparent !important;}`;
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


    shrinkIframes11(type) {
      let iframes = this.getAllAncestorIframes();
      for (let index in iframes) {
        if (type === "reset") {
          iframes[index].classList.remove("enlargeIframe");
        } else {
          if (iframes[index].tagName === 'IFRAME') {
            iframes[index].classList.remove("enlargeIframe");
          }
        }
      }

      if (this.isMobile) {

        //失效了  start
        //删除遮罩
        var layerDom =
            window.top.document.body.querySelector("#layerDomForForm");
        window.top.document.body.removeChild(layerDom);
        //失效了  end
      }
    },
    shrinkIframes(type) {
      let iframes = this.getAllAncestorIframes();
      let div_hidden = window.top.document.querySelector(".div_hidden");
      if (div_hidden) {
        div_hidden.classList.remove("div_hidden2");
      }

      let topDocumentDom = window.top.document.documentElement
      topDocumentDom.classList.remove('transparentScrollBar')

      //只有一层iframe
      if (window.parent === window.top) {
        if (type !== "reset") {
          this.toggleClasses(iframes, "add");
        }
      } else {
        var windows = this.getWindows()
        var carousels =[]
        windows.forEach((window)=>{
          var subCarousels = window.document.querySelectorAll(
              ".el-carousel__item.is-active"
          )
          subCarousels.forEach((ele)=>{
            carousels.push(ele)
          })
        })
        if (!(carousels && carousels.length)) {
          carousels = window.top.document.querySelectorAll(".van-swipe__track");
        }
        if (carousels && carousels.length) {
          for (var i = 0; i < carousels.length; i++) {
            carousels[i].classList.remove("noTransform");
          }
        }



        var pNavSearch = []
        windows.forEach((window)=>{
          var subPNavSearch = window.document.querySelectorAll(
              ".p-nav-search"
          )
          subPNavSearch.forEach((ele)=>{
            pNavSearch.push(ele)
          })
        })
        if (pNavSearch && pNavSearch.length) {
          for (var i = 0; i < pNavSearch.length; i++) {
            pNavSearch[i].classList.remove("zIndex0");
          }
        }
      }

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

        //只有一层， 并且是嵌入式表单
        if (window.parent === window.top && this.formData.form_type == 2) {
          window.frameElement.classList.remove("notFull");
        }
      }
    },
    toggleClasses(iframes, action) {
      let parentElement
      if(this.isMobile()){
        parentElement =
            window.frameElement.closest(".cta-warp-from") ||
            window.frameElement.closest(".white-paper");
      }else{
        parentElement =
            window.frameElement.closest(".cta-warp-from") ||
            window.frameElement.closest(".white-form");
      }


      if (action === "remove") {
        parentElement.classList.remove("positionRelative");
        iframes[0].classList.remove("equalCta");
      } else {
        parentElement.classList.add("positionRelative");
        iframes[0].classList.add("equalCta");
      }
    },
    getWindows(){
      let iframes = this.getAllAncestorIframes();
      return [
        window.top,
        ...iframes.map((iframe)=>{
          return iframe.contentWindow
        })
      ]
    },

    enlargeIframes() {
      let iframes = this.getAllAncestorIframes();

      let div_hidden = window.top.document.querySelector(".div_hidden");
      if (div_hidden) {
        div_hidden.classList.add("div_hidden2");
      }

      let topDocumentDom = window.top.document.documentElement
      topDocumentDom.classList.add('transparentScrollBar')

      //只有一层iframe
      if (window.parent === window.top) {
        this.toggleClasses(iframes, "remove");
      } else {

        var windows = this.getWindows()

        var carousels =[]
        windows.forEach((window)=>{
          var arr = window.document.querySelectorAll(
              ".el-carousel__item.is-active"
          )
          arr.forEach((ele)=>{
            carousels.push(ele)
          })
        })
        if (!(carousels && carousels.length)) {
          carousels = window.top.document.querySelectorAll(".van-swipe__track");
        }
        if (carousels && carousels.length) {
          for (var i = 0; i < carousels.length; i++) {
            carousels[i].classList.add("noTransform");
          }
        }


        var pNavSearch = []
        windows.forEach((window)=>{
          var subPNavSearch = window.document.querySelectorAll(
              ".p-nav-search"
          )
          subPNavSearch.forEach((ele)=>{
            pNavSearch.push(ele)
          })
        })
        if (pNavSearch && pNavSearch.length) {
          for (var i = 0; i < pNavSearch.length; i++) {
            pNavSearch[i].classList.add("zIndex0");
          }
        }

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

        //只有一层， 并且是嵌入式表单
        if (window.parent === window.top && this.formData.form_type == 2) {
          window.frameElement.classList.add("notFull");
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
      // this.submitSuccess = false;
      // this.popupFormStatus = false;
      // this.enlargeIframes();
      // // if (this.isEnlarge()) {
      // //   //this.shrinkIframes();
      // // } else {
      // //
      // // }
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
    this.isMobile = isMobile()
    this.sendMessage2({
      type: "mounted",
    });

    let self = this;
    self.formData = self.closest2('ZqFormPage').formData
    self.loading = false;


    document.documentElement.classList.add("borderRadius");
    console.log(this, '-----popup-----')
    componentStore.set("popup", this);
  },
  beforeDestroy() {
    componentStore.clear("popup");
  }, //生命周期 - 销毁之前
};
</script>
