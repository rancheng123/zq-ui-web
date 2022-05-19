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
          ></Skeleton>
        </div>

        <!-- 弹出   -->
        <div v-else>
          <!--  移动端  start    -->
          <!--   v-if="showQingchuMobile && "    -->
          <div v-if="isMobile" class="mobileEmbed">
            <div style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px;z-index: 100000000000;">
              <div style="height: 80%;width: 100%;top: 20%;position: absolute;z-index: 2;">
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
                      ></Skeleton>
                    </div>
                  </div>
                </flexBox>
              </div>
              <div style="width: 100%; height: 100%; background: rgb(0, 0, 0); opacity: 0.66; position: absolute; top: 0px; left: 0px;z-index: 1;"></div>
            </div>


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
          ></Skeleton>
        </div>
        <div v-else class="pcSingle">
          <Skeleton
              :key="skeletonKey"
              :type="type"
              :loading="loading"
              @onSubmitSuccess="onSubmitSuccess"
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
    shrinkIframes() {
      this.closest2('ZqFormPage').isEnlarge = false
    },
    isEnlarge() {
      return this.closest2('ZqFormPage').isEnlarge;
    },
    enlargeIframes() {
      this.closest2('ZqFormPage').isEnlarge = true
    },
    popupForm() {
      this.loading = true;
      this.popupFormStatus = true;
      this.enlargeIframes();
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
