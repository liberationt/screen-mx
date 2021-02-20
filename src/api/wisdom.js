import request from "@/utils/request";

const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 紧急救助服务老人
export function getServiceOlder(params) {
  return request({
    baseURL,
    url: "/consultant/pension",
    method: "get",
    params
  });
}

// 求助人员统计
export function getHelpMans(params) {
  return request({
    baseURL,
    url: "/order/urgent/rescue",
    method: "get",
    params
  });
}

// 服务老人年龄分布
export function getOlderAge(params) {
  return request({
    baseURL,
    url: "/consultant/pension/age",
    method: "get",
    params
  });
}

// 服务工单
export function getCareFor(params) {
  return request({
    baseURL,
    url: "/order/area/careFor",
    method: "get",
    params
  });
}

// 服务工单jiedao
export function getCareForStreet(params) {
  return request({
    baseURL,
    url: "/order/area/careFor/street",
    method: "get",
    params
  });
}

// 服务工单年齡
export function getCareForAge(params) {
  return request({
    baseURL,
    url: "/order/area/careFor/age",
    method: "get",
    params
  });
}

// 生活服务服务工单数
export function getMarket(params) {
  return request({
    baseURL,
    url: "/order/area/market",
    method: "get",
    params
  });
}

// 生活服务分类统计
export function getType(params) {
  return request({
    baseURL,
    url: "/order/area/leadWire/server",
    method: "get",
    params
  });
}

// 生活服务街镇分布
export function getServiceStreet(params) {
  return request({
    baseURL,
    url: "/order/area/leadWire/street",
    method: "get",
    params
  });
}
