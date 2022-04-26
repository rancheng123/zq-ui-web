import request from "../utils/request.js";
/**
 * 公司名称联想查询
 * @return
 */
export function searchEnterprise(data) {
  return request({
    url: "/leads/company/search-enterprise",
    method: "post",
    data,
  });
}


//表单回显c端
export function getReleaseDetailsApp(data) {
  return request({
    url: "cdp/form-app/details",
    method: "post",
    data,
  });
}
