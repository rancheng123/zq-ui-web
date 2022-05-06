import axios from "axios";
import { getToken, removeToken } from "./auth.js";
const service = axios.create({
  timeout: 6000000,
});
service.interceptors.request.use(
  (config) => {
    console.log("config", config);
    const token = getToken();
    if (token) {
      config.headers["zq-jwt-user"] = token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    if (res.data.code === 2) {
      // TODO 登陆失效的操作
      removeToken();
      window.location.href = "/login";
      return Promise.reject(new Error(res.data.msg || "Error"));
    } else if (res.data.code === -2) {
      window.location.href = "/404";
      return Promise.reject(new Error(res.data.msg || "Error"));
    } else if (res.data.code === 3) {
        alert("无权限，请联系系统管理员修改权限设置")
      return Promise.reject(new Error(res.data.msg || "Error"));
    } else if (res.data.code === 12030) {
      let timesRun = 10;
      let html = `<div style="display: flex;">
      <span style="width: 26px;
      height: 22px;
      background: #FF724F;color:#fff;border-radius:22px;text-align:center;line-height:22px" font-size:"16px">!</span>
      <div class="second-confirm-content" style="display: flex;
      flex-direction: column;
      padding: 0 8px;">
        <div class="second-confirm-tip" style="padding-bottom:8px;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 24px;">提示</div>
        <div class="second-confirm-decs" style="font-size: 14px;
        font-weight: 400;
        color: #AAB1B9;
        line-height: 20px;">当前账户已被管理员禁用，将于<span style="color:#FF724F" id="timesRun">${timesRun}s</span>后退出登录，若有疑问请联系系统管理员</div>
      </div>
    </div>`;
      let interval = setInterval(function () {
        timesRun--;
        document.querySelector("#timesRun").innerText = timesRun + "s";
        if (timesRun <= 0) {
          clearInterval(interval);
          document.querySelector(".logout-btn").click();
        }
      }, 1000);
        clearInterval(interval);
        removeToken();
        window.location.href = "/login";
      return Promise.reject(new Error(res.msg || "Error"));
    } else if (res.data.code === 12033) {
      // 退出到scrm 登录页
      removeToken();
      window.location.href = "/login";
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);
export default service;
