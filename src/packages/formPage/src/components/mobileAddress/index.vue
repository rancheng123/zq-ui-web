<template>
  <div>
    <div class="el-cascader addressWrap" @click="showAddress">
      <span v-if="province">
        {{ showChineseName(province, addressJson[nation]) }}
        <span v-if="city"> / </span>
        {{ showChineseName(city, addressJson[province]) }}
        <span v-if="area"> / </span>
        {{ showChineseName(area, addressJson[city]) }}
      </span>
      <span v-else style="color: #c0c4cc"> {{ placeholder }} </span>

      <i class="el-input__icon el-icon-arrow-down icon-down"></i>
    </div>
    <van-popup
      class="addressPopup"
      v-model="show"
      round
      closeable
      lock-scroll
      safe-area-inset-bottom
      position="bottom"
    >
      <div class="panelWrap" :style="panelWrapStyle">
        <div class="title">请选择所在地区</div>
        <div class="main">
          <div class="addressText">
            <span class="provinceName name" @click="operationType = 'province'">
              <span
                v-if="province"
                :class="{
                  orange: operationType === 'province',
                }"
              >
                {{ showChineseName(province, addressJson[nation]) }}
              </span>
              <span v-else class="orange">请选择 </span>
            </span>

            <span
              v-if="province"
              class="cityName name"
              @click="operationType = 'city'"
            >
              <span
                v-if="city"
                :class="{
                  orange: operationType === 'city',
                }"
              >
                {{ showChineseName(city, addressJson[province]) }}
              </span>
              <span v-else class="orange">请选择 </span>
            </span>
            <span
              v-if="province && city && addressJson[city]"
              class="countyName name"
              @click="operationType = 'area'"
            >
              <span
                v-if="area"
                :class="{
                  orange: operationType === 'area',
                }"
              >
                {{ showChineseName(area, addressJson[city]) }}
              </span>
              <span v-else class="orange">请选择 </span>
            </span>
          </div>
          <div class="dlWrap">
            <div ref="scrollWrap" class="scrollWrap">
              <dl :key="dataIndex" v-for="(dataBox, dataIndex) in dataList">
                <dt>{{ dataBox.letter }}</dt>
                <!--                <span
                  :a="
                    (() => {
                      dataBox;
                      debugger;
                    })()
                  "
                ></span>-->
                <dd
                  :class="{
                    selected: isSelected(item),
                  }"
                  :key="index"
                  v-for="(item, index) in dataBox.data"
                  @click="selectItem(item)"
                >
<!--                  <img
                    class="rightIcon"
                    :src="
                      require('./img/right.png')
                    "
                    alt=""
                  />-->
                  {{ item.chinese }}
                </dd>
              </dl>
            </div>
          </div>

          <div class="lettersBar">
            <div
              :class="{
                circleLetter: true,
                show: circleLetterShow,
              }"
            >
              {{ clickedLetter }}
            </div>
            <div class="lettersBarlistWrap">
              <div
                class="letter"
                :key="index"
                v-for="(dataBox, index) in dataList"
                @click="clickLetter(dataBox)"
              >
                {{ dataBox.letter }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import componentStore from "../../utils/componentStore.js";
import { IsIphonex } from "../../utils/index.js";
export default {
  name: "mobileAdress",
  data() {
    return {
      show: false,
      addressJson: this.extraData(window.addressJson_format1),
      address: "",
      area: "",
      city: "",
      province: "",
      nation: "1017",
      operationType: "province",
      clickedLetter: "",
      circleLetterShow: false,
      boxHeight: window.innerHeight - this.flexRange,
    };
  },
  props: {
    flexRange: {
      type: Number,
      default() {
        return 188;
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
    placeholder: {
      type: String,
      default() {
        return "";
      },
    },
  },
  mounted() {
    componentStore.set("address", this);

    // bar 的逻辑
    /*
      max-height: xxx

      1. 字母较少，  margin-bottm 12px 显示
      2. 字母较多，  margin-bottm 4px 显示

    */
    window.addEventListener("resize", this.computeBoxHeight);
  },
  beforeDestroy() {
    componentStore.clear("address");
    window.removeEventListener("resize", this.computeBoxHeight);
  },
  computed: {
    panelWrapStyle() {
      let style = "height:" + this.boxHeight + "px;";
      if (IsIphonex()) {
        style += "padding-bottom:68px";
      }

      return style;
    },

    getData() {
      let res = {};
      if (this.operationType === "province") {
        res = this.addressJson[this.nation];
      } else if (this.operationType === "city") {
        res = this.addressJson[this.province];
      } else if (this.operationType === "area") {
        res = this.addressJson[this.city];
      }
      return res;
    },
    dataList() {
      return this.formatData(this.getData);
    },
    isSelected: {
      cache: false,
      get: function () {
        return (item) => {
          let res = false;
          if (this.operationType === "province") {
            res = this.province === item.code;
          } else if (this.operationType === "city") {
            res = this.city === item.code;
          } else if (this.operationType === "area") {
            res = this.area === item.code;
          }
          return res;
        };
      },
    },
    showChineseName: {
      cache: false,
      get: function () {
        return (code, json) => {
          let res = "";
          for (let key in json) {
            if (key === code) {
              res = json[key].chinese;
            }
          }
          return res;
        };
      },
    },
  },
  methods: {
    computeBoxHeight() {
      this.boxHeight = window.innerHeight - this.flexRange;
    },
    showAddress() {
      this.show = true;
    },
    clickLetter(dataBox) {
      this.clickedLetter = dataBox.letter;
      this.circleLetterShow = true;
      setTimeout(() => {
        this.circleLetterShow = false;
      }, 300);
      let matchDom;
      let doms = this.$refs.scrollWrap.querySelectorAll("dl");
      for (let i = 0; i < doms.length; i++) {
        if (doms[i].querySelector("dt").innerText === dataBox.letter) {
          matchDom = doms[i];
        }
      }
      this.$refs.scrollWrap.scrollTop = matchDom.offsetTop;
    },
    scroll() {
      this.$refs.scrollWrap.scrollTop = 300;
    },
    selectItem(item) {
      if (this.isSelected(item)) {
        return;
      }

      if (this.operationType === "province") {
        this.province = item.code;
        this.city = "";
        this.area = "";
        this.operationType = "city";
      } else if (this.operationType === "city") {
        this.city = item.code;
        this.area = "";
        if (this.isHasChildren()) {
          this.operationType = "area";
        }
      } else if (this.operationType === "area") {
        this.area = item.code;
        if (this.isHasChildren()) {
          this.operationType = "mmmm";
        }
      }

      if (!this.isHasChildren()) {
        this.show = false;

        let selectArr = [];
        if (this.province) {
          selectArr.push({
            text: this.addressJson[this.nation][this.province].chinese,
            value: this.addressJson[this.nation][this.province].code,
          });
        }
        if (this.city) {
          selectArr.push({
            text: this.addressJson[this.province][this.city].chinese,
            value: this.addressJson[this.province][this.city].code,
          });
        }
        if (this.area) {
          selectArr.push({
            text: this.addressJson[this.city][this.area].chinese,
            value: this.addressJson[this.city][this.area].code,
          });
        }

        this.$emit("finish", {
          selectedOptions: selectArr,
        });
      }
    },
    isHasChildren() {
      let res = true;
      if (this.city) {
        if (!this.addressJson[this.city]) {
          res = false;
        }
        if (this.area) {
          if (!this.addressJson[this.area]) {
            res = false;
          }
        }
      }
      return res;
    },
    extraData(data) {
      for (var key in data) {
        for (var subKey in data[key]) {
          data[key][subKey].code = subKey;
        }
      }
      return data;
    },
    formatData(dataJson) {
      let json = {};
      for (let key in dataJson) {
        let letter = dataJson[key].pinyin.substring(0, 1).toUpperCase();
        if (!json[letter]) {
          json[letter] = [];
        }
        json[letter].push(dataJson[key]);
      }

      let arr = [];
      for (let letter in json) {
        arr.push({
          letter,
          data: json[letter],
        });
      }
      return arr;
    },

    findProvince(chineseName) {
      let res = "";
      for (var key in this.addressJson) {
        for (var subkey in this.addressJson[key]) {
          if (this.addressJson[key][subkey].chinese === chineseName) {
            debugger;
          }
        }
      }
    },
  },
};
</script>
<style lang="less">
@import "index.less";
</style>
