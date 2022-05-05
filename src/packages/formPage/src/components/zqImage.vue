<!-- LJY time: -->
<template>
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
          :file-list="fileList"
          :on-change="bannerChange"
          :auto-upload="false"
        >
          <div class="flex-row-jc">
            <div class="up-img" v-for="(item, index) in fileList" :key="index">
              <div class="img-upload">
                <img class="banner" :src="domain() + item.key" alt="" />
                <div class="delete-wrapper" @click.stop="handleRemove(item)">
                  <zq-icon name="icon-shanchuicon-normal"></zq-icon>
                </div>
              </div>
            </div>
            <div
              v-show="
                fileList.length < $attrs.currentItem.num_range.image_number
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
  //监听属性 类似于data概念
  //监控data中的数据变化
  watch: {
    fileList: {
      handler() {
        this.$set(
          this.value,
          this.$attrs.currentItem.field_name,
          this.fileList
        );
      },
      deep: true,
    },
  },
  //方法集合
  methods: {
    domain(){
      var res = this.closest2('ZqFormPage').domain
      return res
    },
    handleRemove(data) {
      this.fileList = this.fileList.filter((item) => item.key != data.key);
    },
    bannerChange(file, fileList) {
      const image_number = this.$attrs.currentItem.num_range.image_number;
      if (this.fileList.length >= image_number) {
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
          this.next
      )
    },
    onExceed(fileList, image_number) {
      fileList = fileList.splice(image_number);
      this.$zqMessage.error(
        `上传图片超出设定的${this.$attrs.currentItem.num_range.image_number}张的数量限制!`
      );
    },
    onSuccess(data) {
      this.fileList.push(data);
      console.log(data, "onSuccess");
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
.zq-image__comp {
  width: 100%;
   .el-upload {
    width: 100%;
  }
   .el-upload-list {
    display: none;
  }
}
.flex-row-jc {
  //max-width: 342px;
  //margin-left: -12px;
  .up-img {
    float: left;
    width: 33.33%;
    text-align: center;
    color: #aab1b9;
    box-sizing: border-box;
    padding-left: 12px;
    padding-bottom: 12px;
    .img-upload {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      background: #f5f8fb;
      border-radius: 4px;
      border: 1px solid #dbe0e6;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .delete-wrapper {
        position: absolute;
        right: 4px;
        bottom: 4px;
        padding: 2px;
        line-height: 1;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 2px;
        .icon-shanchuicon-normal {
          color: #fff;
          &:hover {
            // color: #ff724f;
          }
        }
      }
    }
    .img-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      background: #f5f8fb;
      border-radius: 4px;
      border: 1px dashed #dbe0e6;
      &:hover {
        border-color: rgba(255, 114, 79, 1);
        .icon-tupian2,
        .upload-text {
          color: rgba(255, 114, 79, 1);
        }
      }
    }

    .upload-btn__content {
      position: absolute;
      width: 100%;
      left: 50%;
      top: 50%;
      line-height: 1;
      transform: translate(-50%, -50%);
      .icon-tupian2 {
        display: block;
        font-size: 35px;
        color: #aab1b9;
        margin-bottom: 3px;
      }
    }
  }
}
</style>
