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
