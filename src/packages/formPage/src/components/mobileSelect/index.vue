<template>
  <div class="mobileSelectWrap">
    <van-field
      class="zq-select input-with-select"
      readonly
      clickable
      :style="style1"
      name="picker"
      right-icon="icon el-icon-arrow-up"
      :placeholder="placeholder"
      :value="currentLabel"
      @click="showVanPicker"
    />
    <van-popup v-model="showPicker" position="bottom">
      <flexBox class="van-picker">
        <div slot="head" class="van-picker__toolbar">
          <button type="button" class="van-picker__cancel" @click="closePop">
            取消
          </button>
          <div class="van-ellipsis van-picker__title">下拉框选择</div>
          <button
            type="button"
            class="van-picker__confirm"
            :disabled="currentSelect === -1"
            @click="confirmFn"
          >
            确认
          </button>
        </div>
        <div slot="body">
          <ul style="height: 196px; padding-bottom: 68px;margin-left: 0px !important;list-style: none !important;">
            <!-- van-picker-column__item--selected               -->
            <li
              v-for="(item, index) in data"
              :key="index"
              :class="{
                selectItem: true,
                selected: index === currentSelect,
              }"
              @click="
                () => {
                  selectFn(index);
                }
              "
            >
              <div class="van-ellipsis">{{ item.label }}</div>
            </li>
          </ul>
        </div>
      </flexBox>
    </van-popup>
  </div>
</template>
<script>
import { copeIphoneXHomeIndicator } from "../../utils/index.js";
import flexBox from "../flexBox/index.vue";
export default {
  name: "mobileSelect",
  data() {
    return {
      showPicker: false,
      currentSelect: -1,
    };
  },
  computed: {
    currentLabel() {
      let res = this.data.filter((item) => {
        return item.value === this.value;
      })[0];
      if (res) {
        return res.label;
      } else {
        return "";
      }
    },
  },
  components: {
    flexBox,
  },
  props: {
    value: {
      type: String,
      default() {
        return "";
      },
    },
    style1: {
      type: Object,
      default() {
        return {};
      },
    },
    placeholder: {
      type: String,
      default() {
        return "";
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    showVanPicker() {
      this.showPicker = true;

      let currentSelect = -1;
      this.data.forEach((item, index) => {
        if (item.value === this.value) {
          currentSelect = index;
        }
      });
      this.currentSelect = currentSelect;
      this.$nextTick(() => {
        let dom = this.$el.querySelector(".flexBoxWrap");
        copeIphoneXHomeIndicator(dom);
      });
    },
    selectFn(index) {
      this.currentSelect = index;
      this.$emit("change");
    },
    closePop() {
      this.showPicker = false;
    },
    confirmFn() {
      this.closePop();
      this.$emit("confirm", this.data[this.currentSelect]);
    },
  },
};
</script>
