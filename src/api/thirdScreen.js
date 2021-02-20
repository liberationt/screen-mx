import request from "@/utils/request";
const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 话务量
export function getPhoneList(params) {
  return request({
    baseURL,
    url: "/consultant/order/list",
    method: "get",
    params
  });
}

// 老人话务服务量
export function getOlderPhoneList(params) {
  return request({
    baseURL,
    url: "/consultant/server/list",
    method: "get",
    params
  });
}

// 生活服务工单数
export function getLifeList(params) {
  return request({
    baseURL,
    url: "/order/area/life/order/list",
    method: "get",
    params
  });
}

// 生活老人服务量
export function getLifeOlderList(params) {
  return request({
    baseURL,
    url: "/order/area/life/pension/list",
    method: "get",
    params
  });
}

// 主动关爱列表
export function getloveList(params) {
  return request({
    baseURL,
    url: "/order/area/active/order/list",
    method: "get",
    params
  });
}

// 主动关爱老人列表
export function getloveOlderList(params) {
  return request({
    baseURL,
    url: "/order/area/active/pension/list",
    method: "get",
    params
  });
}

// 居家养老服务老人总是
export function getHomeServiceOlderList(params) {
  return request({
    url: "/screen/home/care/order/personList",
    method: "get",
    params
  });
}

// 居家养老服务人员总数
export function getHomeServiceManList(params) {
  return request({
    url: "/screen/home/care/order/serviceList",
    method: "get",
    params
  });
}

// 居家养老服务商列表
export function getHomeServiceShopList(params) {
  return request({
    url: "/screen/home/care/order/getOrganList",
    method: "get",
    params
  });
}

// 社区设施列表
export function getPensionAgencyList(params) {
  return request({
    url: "/screen/screen/service/provider/area/pensionAgency",
    method: "get",
    params
  });
}

// 租赁点
export function getRentList(params) {
  return request({
    url: "/screen/screen/assistive/store",
    method: "get",
    params
  });
}

// 合同
export function getContractList(params) {
  return request({
    url: "/screen/screen/assistive/contract",
    method: "get",
    params
  });
}

// 视频列表
export function getVideoList(params) {
  return request({
    url: "/screen/screen/service/provider/area/pensionEq",
    method: "get",
    params
  });
}

// 指定视频
export function getVideo(params) {
  return request({
    url: "/screen/screen/service/provider/area/getOrgEq",
    method: "get",
    params
  });
}

// 智能终端获取数据
export function getWisdom(params) {
  return request({
    url: "/screen/screen/service/eq/device/getDeviceTotallist2",
    method: "get",
    params
  });
}

// 智能终端位置信息
export function getWz(params) {
  return request({
    url: "/screen/screen/service/eq/device/getEqlist",
    method: "get",
    params
  });
}

export function userDetailsData(id) {
  return request({
    url: '/admin/policy/info/'+id,
    method: 'get'
  })
}

export function wisOlder(params) {
  return request({
    baseURL,
    url: '/order/area/smart/pension/count',
    method: 'get',
    params
  })
}
