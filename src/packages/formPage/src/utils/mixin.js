/*eslint-disable*/
/**
 *  面板规则 优先级从下往上
 *  开发思路
 *  1、当有带规则的字段发生变化后触发 checkedFlieKey 方法
 *  2、checkedFlieKey 对所有带规则字段进行规则校验
 * （不包括面板中未激活的字段 item.activeValue != "" 面板被激活 panle.value == item.activeValue 激活那个状态 ）
 *  3、规则检验 都是通字符串来校验的 由initRuleValue 方法对不同的数据类型做规则值的处理
 *  4、有 ruleType 方法 做规则区分 之后调用各自的方法校验
 *  5、规则匹配并且是激活的字段 调用 isRulePanel 设置面板激活的状态值 并标记面板的检验状态
 *  (面板的校验状态用来标记是否有其他字段激活了当前面板，未当前规则未匹配时做保留和重置的依据，实现失效后隐藏面板)
 *  (规则为显示是 如果没有被激活过则默认显示第一个状态，激活过就显示激活的面板)
 *  6、规则匹配失败 查看当前规则控制的面板是否有被其他字段激活 有则保持不变 无则隐藏，
 *    如果隐藏面板，需要校验面板各个状态中的字段是否有激活的面板 有则隐藏激活的面板 递归检验
 *  7、如果是最后一个规则字段的最后规则  一轮校验结束 重置面板的检验状态
 */
import {dateFormat} from "./index";
export const mixin = {
  mounted() {
    this.hasRuleFlie();
    this.getFlieKeyArray();
  },
  data() {
    return {
      hasRuleFlieLength: 0, // 带规则字段的总数
      hasFlieLength: 0, // 带规则字段的总数
      isLasteRule: 0, // 最后一个规则字段的规则触发数
      flieKeyArray: [], // 所有规则字段的key的数组
    };
  },
  methods: {
    /**
     * 获取还有规则字段的数量
     * 用来判断是否是最后一个
     * 是 初始化校验状态
     * 下次校验可以不匹配可以重置
     */
    hasRuleFlie() {
      this.$attrs.formData.field_content.forEach((item) => {
        if (item.tag == "panel") {
          item.editableTabs.forEach((panle) => {
            if (panle.children.length > 0) {
              panle.children.forEach((panelFile) => {
                if (panelFile.fileRules.length > 0) {
                  this.hasRuleFlieLength++;
                }
              });
            }
          });
        } else {
          if (item.fileRules.length > 0) {
            this.hasRuleFlieLength++;
          }
        }
      });
    },
    /**
     * 获取所有规则字段的field_name
     * 用来判断当前的规则字段的索引
     */
    getFlieKeyArray() {
      this.$attrs.formData.field_content.forEach((item) => {
        if (item.tag == "panel") {
          item.editableTabs.forEach((panle) => {
            if (panle.children.length > 0) {
              panle.children.forEach((panelFile) => {
                if (panelFile.fileRules.length > 0) {
                  this.hasFlieLength++;
                  this.flieKeyArray.push({
                    field_name: panelFile.field_name,
                    ruleLength: panelFile.fileRules.length,
                  });
                }
              });
            }
          });
        } else {
          if (item.fileRules.length > 0) {
            this.hasFlieLength++;
            this.flieKeyArray.push({
              field_name: item.field_name,
              ruleLength: item.fileRules.length,
            });
          }
        }
      });
    },
    /**
     * 时间转化
     * @param {*} time
     * @param {*} type
     * @returns
     */
    dateFormat,

    /**
     * 格式化校验数据
     * @param {*} item
     * @returns
     * Text: "zqInput",
        TextArea: "zqTextarea",
        Select: "zqSelect",
        Radio: "zqRadio",
        CheckBox: "zqCheckbox",
        Number: "zqInputNumber",
        Address: "zqAddress",
        DateTime: "zqDateTimePicker",
        PhoneNumber: "MobilePhone",
        Email: "zqEmail",
     */
    initRuleValue(item) {
      let val = null;
      // 字段不存在 设置为空
      if (!this.value[item.field_name] || this.value[item.field_name] == []) {
        val = "";
      } else {
        // 地址字段转化为字符串
        if (item.tag == "zqAddress") {
          if (
            this.value[item.field_name].province == "" &&
            this.value[item.field_name].address == ""
          ) {
            val = "";
          } else {
            val = this.value[item.field_name + "address"];
          }
        } else if (item.tag == "zqEmail" || item.tag == "phoneNumber") {
          // 邮箱和手机号 获取检验状态
          val = this.value[`${item.field_name}_checked`];
          // } else if (item.tag == "zqRadio") {
          //   // 单选 根据key 获取 lable
          //   let labels = item.options.filter(
          //     (option) => option.value == this.value[item.field_name]
          //   );
          //   val = labels.length > 0 ? labels[0].label : "";
          // } else if (item.tag == "zqSelect") {
          // 单选 根据key 获取 lable
          // let labels = item.options.filter(
          //   (option) => option.value == this.value[item.field_name]
          // );
          // val = labels.length > 0 ? labels[0].label : "";
        } else if (item.tag == "zqCheckbox") {
          // 单选 根据key 获取 lable 在转化为数组
          if (this.value[item.field_name].length == 0) {
            val = "";
          } else {
            val = item.options
              .filter((options) => {
                return this.value[item.field_name].includes(options.value);
              })
              .map((ite) => {
                return ite.label;
              })
              .join("");
          }
        } else if (item.tag == "zqInputNumber") {
          // 数字类型转字符串
          val = this.value[item.field_name].toString();
        } else if (item.tag == "zqDateTimePicker") {
          // 日期转化为字符串
          val = this.dateFormat(
            this.value[item.field_name],
            "YYYY-mm-dd HH:MM"
          );
        } else {
          val = this.value[item.field_name];
        }
      }

      return val;
    },
    /**
     * 有规则值变化时遍历校验所有规则字段
     */
    checkedFlieKey() {
      this.$attrs.formData.field_content.forEach((item) => {
        if (item.tag == "panel") {
          item.editableTabs.forEach((panle) => {
            if (panle.children.length > 0) {
              panle.children.forEach((panelFile) => {
                if (panelFile.fileRules.length > 0) {
                  panelFile.fileRules.forEach((rule) => {
                    let val = this.initRuleValue(panelFile);
                    if (
                      item.activeValue != "" &&
                      panle.value == item.activeValue
                    ) {
                      this.ruleType(rule, val, "", panelFile.field_name, true);
                    } else {
                      this.ruleType(rule, val, "", panelFile.field_name, false);
                    }
                  });
                }
              });
            }
          });
        } else {
          if (item.fileRules.length > 0) {
            item.fileRules.forEach((rule) => {
              let val = this.initRuleValue(item);
              if (item.activeValue != "") {

                this.ruleType(rule, val, "", item.field_name, true);
              } else {
                this.ruleType(rule, val, "", item.field_name, false);
              }
            });
          }
        }
      });
    },
    /**
     *  规则类型区分
     * @param {*} item  字段
     * @param {*} val 输入的值
     * @param {*} isEnd  暂时不用
     * @param {*} field_name  字段的唯一标识
     * @param {*} flag  是否是激活字段
     */
    ruleType(item, val, isEnd, field_name, flag) {
      switch (item.selectValue) {
        case 1:
          this.isSuccess(
            item.panelRule,
            val,
            item.selectValue,
            isEnd,
            field_name,
            flag
          );
          break;
        case 2:
          this.isError(
            item.panelRule,
            val,
            item.selectValue,
            isEnd,
            field_name,
            flag
          );
          break;
        case 3:
          this.isEqual(
            item.panelRule,
            val,
            item.value,
            isEnd,
            field_name,
            flag
          );
          break;
        case 4:
          this.isNoEqual(
            item.panelRule,
            val,
            item.value,
            isEnd,
            field_name,
            flag
          );
          break;
        case 5:
          this.isLike(item.panelRule, val, item.value, isEnd, field_name, flag);
          break;
        case 6:
          this.isNolike(
            item.panelRule,
            val,
            item.value,
            isEnd,
            field_name,
            flag
          );
          break;
        case 7:
          this.isStart(
            item.panelRule,
            val,
            item.value,
            isEnd,
            field_name,
            flag
          );
          break;
        case 8:
          this.isEnd(item.panelRule, val, item.value, isEnd, field_name, flag);
          break;
        case 9:
          this.isNull(item.panelRule, val, item.value, isEnd, field_name, flag);
          break;
        case 10:
          this.isHas(item.panelRule, val, item.value, isEnd, field_name, flag);
          break;
        default:
          break;
      }
    },
    /**
     * 初始化面板状态
     * @param {*} panelIndex
     */
    initpanel(panelIndex) {
      this.$attrs.formData.field_content[panelIndex].editableTabs.forEach(
        (panle) => {
          // 面板是否有状态
          if (panle.children.length > 0) {
            // 有查看每个状态的字段是否配置了规则
            panle.children.forEach((panelFile) => {
              // 字段是否有规则
              if (panelFile.fileRules.length > 0) {
                // 判断是否是有效的规则
                panelFile.fileRules.forEach((panelFileItem) => {
                  if (panelFileItem.panelRule.length > 0) {
                    // 循环规则找出规则控制的面板
                    panelFileItem.panelRule.forEach((panelRuleItem) => {
                      // 面板索引
                      let fileIndex =
                        this.$attrs.formData.field_content.findIndex(
                          (fileIndexItem) => {
                            return (
                              fileIndexItem.field_name ==
                              panelRuleItem.field_name
                            );
                          }
                        );
                      // 是否有规则命中
                      let isPanelSuccess =
                        this.$attrs.formData.field_content[fileIndex].isSuccess;
                      // 没有隐藏面板
                      if (!isPanelSuccess) {
                        this.$attrs.formData.field_content[
                          fileIndex
                        ].activeValue = "";
                      }
                      this.initpanel(fileIndex);
                    });
                  }
                });
              }
            });
          }
        }
      );
    },
    /**
     * 规则匹配成功
     * @param {*} panelRule
     * @param {*} field_name
     * @returns
     */
    isRulePanel(panelRule, field_name) {

      // 获取规则面板
      let panelIndex = this.$attrs.formData.field_content.findIndex((item) => {
        return item.field_name == panelRule.field_name;
      });
      // 面板的显示和隐藏的状态判断
      if (panelRule.field_value == "show") {
        // 没有激活面板状态默认显示第一个
        if (this.$attrs.formData.field_content[panelIndex].activeValue == "") {
          if (
            this.$attrs.formData.field_content[panelIndex].editableTabs.length >
              0 &&
            this.$attrs.formData.field_content[panelIndex].editableTabs[0]
              .children.length > 0
          ) {
            // let defalueRule =
            //   this.$attrs.formData.field_content[panelIndex].editableTabs[0]
            //     .value;
            this.$attrs.formData.field_content[panelIndex].isEdit = true;
            this.$attrs.formData.field_content[panelIndex].activeValue = "";
            // this.$attrs.formData.field_content[panelIndex].activeValue =
            // defalueRule;
          }
        }
        this.$attrs.formData.field_content[panelIndex].isShow = true;
        // 最后一个初始化检验状态
        if (filedIndex + 1 == this.hasRuleFlieLength) {
          // this.$attrs.formData.field_content[panelIndex].isSuccess = false;
          this.$attrs.formData.field_content.forEach((item, index) => {
            if (item.tag == "panel") {
              this.$attrs.formData.field_content[index].isSuccess = false;
            }
          });
        }
        return;
      }
      // 隐藏状态
      if (panelRule.field_value == "hidden") {
        this.$attrs.formData.field_content[panelIndex].isShow = false;
        this.$attrs.formData.field_content[panelIndex].isEdit = true;
        if (this.hasRuleFlieLength == 1) {
          this.$attrs.formData.field_content[panelIndex].isSuccess = false;
        } else {
          this.$attrs.formData.field_content[panelIndex].isSuccess = true;
        }
        // 面板值设置为空
        this.$attrs.formData.field_content[panelIndex].activeValue = "";
        // 最后一个初始化检验状态
        if (filedIndex + 1 == this.hasRuleFlieLength) {
          // this.$attrs.formData.field_content[panelIndex].isSuccess = false;
          this.$attrs.formData.field_content.forEach((item, index) => {
            if (item.tag == "panel") {
              this.$attrs.formData.field_content[index].isSuccess = false;
            }
          });
        }
        return;
      }
      // 匹配上显示项设为true
      this.$attrs.formData.field_content[panelIndex].isShow = true;
      this.$attrs.formData.field_content[panelIndex].isEdit = true;
      this.$attrs.formData.field_content[panelIndex].isSuccess = true;
      // 设置面板的激活状态值
      this.$attrs.formData.field_content[panelIndex].activeValue =
        panelRule.field_value;
      let filedIndex = this.flieKeyArray.findIndex((item) => {
        return item.field_name == field_name;
      });
      // 最后一个初始化检验状态
      // this.hasFlieLength 所有的规则字段总数
      // filedIndex + 1 当前字段的索引
      if (filedIndex + 1 == this.hasFlieLength) {
        // 记录最后一个字段的规则触发次数 来判断是否是最后一个规则
        this.isLasteRule++;
        // 是最后的规则
        if (
          this.isLasteRule ==
          (this.flieKeyArray[filedIndex] &&
            this.flieKeyArray[filedIndex].ruleLength)
        ) {
          // 是最后一次则规则检验完成 计数清零
          this.isLasteRule = 0;
          //重置所有面板的检验成功的状态 isSuccess
          this.$attrs.formData.field_content.forEach((item, index) => {
            if (item.tag == "panel") {
              this.$attrs.formData.field_content[index].isSuccess = false;
            }
          });
        }
      }
    },
    /**
     * 规则触发 没有匹配
     * 根据面板时候被其他字段激活 isSuccess = true 激活
     * 激活 不改变面板状态
     * 没激活 面板状态设置为空
     * 如果是最后一个字段中是最后一个规则 则重置面板 isSuccess的状态 不然会影响下轮的检验
     * @param {*} panelRule
     * @param {*} val
     * @param {*} isEnd
     * @param {*} field_name
     */
    isNoRulePanel(panelRule, val, isEnd, field_name) {
      // 找到触发规则的字段的索引 判断是否是最后一个

      let filedIndex = this.flieKeyArray.findIndex((item) => {
        return item.field_name == field_name;
      });

      // 找到规则控制面板的索引
      let panelIndex = this.$attrs.formData.field_content.findIndex((item) => {
        return item.field_name == panelRule.field_name;
      });

      if (panelIndex >= 0) {
        // 获取面板面板的激活状态
        let isSuccess =
          this.$attrs.formData.field_content[panelIndex].isSuccess;
        // 未激活则隐藏面板 激活的面板不操作 使用上次激活的面板状态
        if (!isSuccess) {
          this.$attrs.formData.field_content[panelIndex].isShow = true;
          (this.$attrs.formData.field_content[panelIndex].activeValue = ""),
            // 查看当前面板的个状态的字段是否有控制的面板
            // 做面板的字段规则失效 隐藏面板字段控制的面板
            this.initpanel(panelIndex);
        }
      }
      // 最后一个初始化检验状态
      // this.hasFlieLength 所有的规则字段总数
      // filedIndex + 1 当前字段的索引
      if (filedIndex + 1 == this.hasFlieLength) {
        // 记录最后一个字段的规则触发次数 来判断是否是最后一个规则
        this.isLasteRule++;
        // 是最后的规则
        if (
          this.isLasteRule ==
          (this.flieKeyArray[filedIndex] &&
            this.flieKeyArray[filedIndex].ruleLength)
        ) {
          // 是最后一次则规则检验完成 计数清零
          this.isLasteRule = 0;
          //重置所有面板的检验成功的状态 isSuccess
          this.$attrs.formData.field_content.forEach((item, index) => {
            if (item.tag == "panel") {
              this.$attrs.formData.field_content[index].isSuccess = false;
            }
          });
        }
      }
    },
    /**
     * 正确
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isSuccess(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (ruleValue == val && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 不正确
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isError(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (ruleValue == val && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 等于
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isEqual(panelRules, val, ruleValue, isEnd, field_name, flag) {

      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        console.log(item);
        // ruleValue == item.field_value && flag
        if (ruleValue == val && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 不等于
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isNoEqual(panelRules, val, ruleValue, isEnd, field_name, flag) {

      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (ruleValue != val && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 包含
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isLike(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (val && val.indexOf(ruleValue) > -1 && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 不包含
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isNolike(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (val && val.indexOf(ruleValue) == -1 && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 开头匹配
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isStart(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (val && val.startsWith(ruleValue) && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 结尾匹配
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isEnd(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }
      panelRules.forEach((item) => {
        if (val && val.endsWith(ruleValue) && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 为空
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isNull(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }

      panelRules.forEach((item) => {
        if (!val && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
    /**
     * 不为空
     * @param {*} panelRules 触发的规则面板
     * @param {*} val  输入的值
     * @param {*} ruleValue  设置的值
     * @param {*} isEnd 暂时不用了
     * @param {*} field_name 字段值 为了查找字段的索引判断是否是最后一个规则字段
     * @param {*} flag 是否是激活字段
     * @returns
     */
    isHas(panelRules, val, ruleValue, isEnd, field_name, flag) {
      if (panelRules.length == 0) {
        return;
      }

      panelRules.forEach((item) => {
        if (val && flag) {
          this.isRulePanel(item, field_name);
        } else {
          this.isNoRulePanel(item, val, isEnd, field_name);
        }
      });
    },
  },
};
