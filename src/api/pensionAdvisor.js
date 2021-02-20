import request from "@/utils/request";

const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 线下顾问总数
export function getDownGw(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/advisoryPointSum",
    method: "get",
    params
  });
}

// 服务量
export function getServiceNum(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/serviceVolumeSum",
    method: "get",
    params
  });
}

// 顾问点区域分布
export function getGwPoints(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/advisoryPointRegionalDistribution",
    method: "get",
    params
  });
}

//  顾问员区域分布
export function getGwMans(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/consultantRegionalDistribution",
    method: "get",
    params
  });
}

// 服务统计
export function getServiceAllNum(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/serviceStatistics",
    method: "get",
    params
  });
}

// 线上顾问
export function getUpGw(params) {
  return request({
    baseURL,
    url: "/consultant/number",
    method: "get",
    params
  });
}
