import request from "@/utils/request";
//综合为老
export function getIntegrated(params) {
    return request({
      url: "/screen/screen/service/provider/area/comprehensive",
      method: "get",
      params
    });
}
//助餐点
export function getFoodAid(params) {
    return request({
      url: "/screen/screen/service/provider/area/foodAid",
      method: "get",
      params
    });
}
// 街镇分布
export function getJzList(params) {
    return request({
      url: "/screen/screen/service/provider/orgType/street/distributed",
      method: "get",
      params
    });
}
//日间照护 
export function getRjList(params) {
    return request({
      url: "/screen/screen/service/provider/area/dayCare",
      method: "get",
      params
    });
}
//养老顾问点 --服务老人
export function getDayCare(params) {
    return request({
      url: "/screen/screen/advisory/area/dayCare",
      method: "get",
      params
    });
}
//顾问员
export function getDayNumber(params) {
  return request({
    url: "/screen/screen/advisory/empCount",
    method: "get",
    params
  });
}
//街道
export function getDayStreet(params) {
    return request({
      url: "/screen/screen/advisory/area/street",
      method: "get",
      params
    });
}
//列表
export function getInstitutions(params) {
    return request({
      url: "/screen/screen/advisory/area/institutions",
      method: "get",
      params
    });
}
//堂吃
export function getDelivery(params) {
  return request({
    url: "/screen/screen/service/provider/area/deliveryForm",
    method: "get",
    params
  });
}
//老年活动室
export function getElderlyActivity(params) {
  return request({
    url: "/screen/screen/service/provider/area/elderlyActivityRoom",
    method: "get",
    params
  });
}
//机构  新曾三级页面接口
export function getDataListThere(params) {
  return request({
    url: "/screen/screen/service/provider/area/pensionAgency",
    method: "get",
    params
  });
}
//新增 顾问点 
export function getPointThere(params) {
  return request({
    url: "/screen/intelligent/pension/adviser/area/advisory/point",
    method: "get",
    params
  });
}
//新增 顾问员
export function getAdvisory(params) {
  return request({
    url: "/screen/screen/advisory/empList",
    method: "get",
    params
  });
}
