<!-- LJY time: -->
<template>
  <div class="zq-image-24133432143214324">
    <div class="flex-auto">
      <zq-form-item v-bind="$attrs">
        <template>
          <el-upload
              v-model="value[$attrs.currentItem.field_name]"
              class="zq-image__comp"
              action=""
              ref="upload"
              :multiple="true"
              :on-remove="handleRemove"
              :on-change="bannerChange"
              :auto-upload="false"
          >
            <div class="flex-row-jc" style="margin-left: -12px">
              <div class="up-img" v-for="(item, index) in newFileList" :key="index">
                <div class="img-upload">

<!--                  <img class="banner" :src="imageServerDomain() + item.key" alt="" />-->
                  <img class="banner" :src="item" alt="" />
                  <div class="delete-wrapper" @click.stop="handleRemove(item)">
                    <zq-icon name="icon-shanchuicon-normal"></zq-icon>
                  </div>
                </div>
              </div>
              <div
                  v-show="
                newFileList.length < $attrs.currentItem.num_range.image_number
              "
                  class="up-img upload-btn"
              >
                <div class="img-wrapper">
                  <div class="upload-btn__content">
                    <zq-icon name="icon-tupian2"></zq-icon>
                    <span class="upload-text">上传图片</span>
                  </div>
                </div>
              </div>
            </div>
          </el-upload>
        </template>
      </zq-form-item>
    </div>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zqFormItem from "./zqFormItem.vue";
import {upload} from "../utils/qiniu";
export default {
  //import引入的组件需要注入到对象中才能使用
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    newFileList: {
      get() {
        var res = [];
        if (this.value[this.$attrs.currentItem.field_name]) {
          res = this.value[this.$attrs.currentItem.field_name];
        }
        return res;
      },
      set(value) {
        debugger;
        this.$set(this.$attrs.currentItem, 'default_value', value);
        this.$set(this.value, this.$attrs.currentItem.field_name, value);
      },
    },
  },
  components: { zqFormItem },
  inheritAttrs: false,
  data() {
    //这里存放数据
    return {
      fileList: [],
      limitSize: 2,
      limitType: ["png", "jpg", "jpeg"],
    };
  },

  //方法集合
  methods: {
    imageServerDomain(){
      var res = this.closest2('ZqFormPage').imageServerDomain
      return res
    },
    handleRemove(data) {
      var fileList = this.newFileList.filter((item) => item != data);
      this.$set(this.value, this.$attrs.currentItem.field_name, fileList);
    },
    bannerChange(file, fileList) {
      const image_number = this.$attrs.currentItem.num_range.image_number;
      if (this.newFileList.length >= image_number) {
        this.$zqMessage.error(`图片最多只能上传${image_number}张!`);
        return;
      }
      const isLt5M = file.size / 1024 / 1024 < this.limitSize;
      const fileType = file.name.split(".").pop().toLowerCase();
      const isFileType = this.limitType.includes(fileType);
      if (!isLt5M) {
        fileList.pop();
        this.$zqMessage.error(`上传文件大小不能超过 ${this.limitSize}MB!`);
        return false;
      }
      if (!isFileType) {
        fileList.pop();
        this.$zqMessage.error(`图片只能是 ${this.limitType.join(",")} 格式!`);
        return false;
      }
      if (fileList && fileList.length > image_number) {
        this.onExceed(fileList, image_number);
        return;
      }
      const fileName = "cdp/" + file.uid;

      upload(
          this.closest2('ZqFormPage').apiPrefix,
          file.raw,
          fileName,
          fileName,
          this.onSuccess,
          this.uploadError,
          this.next)
      // this.$sdk.qiniuUpload(
      //   file.raw,
      //   fileName,
      //   fileName,
      //   this.onSuccess,
      //   this.uploadError,
      //   this.next
      // );
    },
    onExceed(fileList, image_number) {
      fileList = fileList.splice(image_number);
      this.$zqMessage.error(
        `上传图片超出设定的${this.$attrs.currentItem.num_range.image_number}张的数量限制!`
      );
    },
    onSuccess(data) {
      console.log('newFileList', this.newFileList);
      // var fileList = this.newFileList;
      // fileList.push(data);
      var fileList_new = this.newFileList;
      fileList_new.push(this.imageServerDomain() + data.key);
      this.$set(this.value, this.$attrs.currentItem.field_name, fileList_new);

      console.log(data, 'onSuccess');
    },
    uploadError() {
      this.$zqMessage.error("上传失败");
    },
    next() {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
