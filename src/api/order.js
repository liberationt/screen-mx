import request from "@/utils/request";

const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 政府化服务工单
export function getGovernmentOrder(params) {
  return request({
    baseURL,
    url: "/order/government",
    method: "get",
    params
  });
}

// 市场化服务工单
export function getMarketOrder(params) {
  return request({
    baseURL,
    url: "/order/market",
    method: "get",
    params
  });
}

// 1
export function getVolunteer(params) {
  return request({
    url: "/screen/volunteer/statistics",
    method: "get",
    params
  });
}

// 2
export function getCode(params) {
  return request({
    url: "/uaa/oauth/token",
    method: "post",
    params
  });
}

// 服务工单list
export function getOrderList(params) {
  return request({
    baseURL,
    url: "/order/list",
    method: "get",
    params
  });
}

// 主动关爱list
export function getLoveList(params) {
  return request({
    baseURL,
    url: "/order/active/list",
    method: "get",
    params
  });
}

// 优抚List
export function getFirstHelp(params) {
  return request({
    baseURL,
    url: "/order/matchmaking/list",
    method: "get",
    params
  });
}
// 详情
export function getDetail(params) {
  return request({
    baseURL,
    url: "/order/detail",
    method: "get",
    params
  });
}