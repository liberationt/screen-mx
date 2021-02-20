import request from "@/utils/request";

const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 线上养老顾问--话务量
export function getTrafficVolume(params) {
  return request({
    baseURL,
    url: "/consultant/number",
    method: "get",
    params
  });
}

// 线下养老顾问--顾问员统计
export function getAdviserCount(params) {
  return request({
    url: "/screen/screen/advisory/empCount",
    method: "get",
    params
  });
}

// 线下养老顾问--顾问点统计
export function getAdviserSiteCount(params) {
  return request({
    url: "/screen/screen/advisory/pointCount",
    method: "get",
    params
  });
}

// 线下养老顾问--咨询列表
export function getRecordList(params) {
  return request({
    url: "/screen/screen/advice/record/list",
    method: "get",
    params
  });
}

// 咨询记录
export function getRecordWeek(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/consultationRecord",
    method: "get",
    params
  });
}
