import Vue from 'vue'
Vue.prototype.closest2 = function(target) {
  let current = this
  while (current) {
    if (current && current.$vnode && current.$vnode.tag) {
      const tagName = current.$vnode.tag.replace(/vue-component-\d+-/, '')

      if (target === tagName) {
        return current
      } else {
        current = current.$parent
      }
    } else {
      current = current.$parent
    }
  }

  return null
}

export const IsIphonex = () => {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  //测试 start
  //return true;
  //测试 end

  if (isIOS) {
    if (screen.height == 812 && screen.width == 375) {
      return true;
    } else {
      return false;
    }
  }
};

export const copeIphoneXHomeIndicator = (dom) => {
  if (IsIphonex()) {
    let range = 68;
    if (!dom.oldHeight) {
      dom.oldHeight = Number(dom.style.height.replace("px", ""));
    }

    //debugger;
    dom.style.height = dom.oldHeight - range + "px";
    dom.style.paddingBottom = range + "px";
  }
};

export const visible = (dom) => {
  return !!(dom.offsetWidth || dom.offsetHeight || dom.getClientRects().length);
};

export const isMobile = () => {
  let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};


export const dateFormat = (fmt, date) => {
  if (!date || typeof date !== "number") return "";
  date = new Date(date * 1000);
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}



