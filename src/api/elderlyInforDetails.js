import request from "@/utils/request";
const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API
//养老机构

//机构养老  --- 机构
export function getProvideAged(params) {
    return request({
      url: "/screen/org/person/assort",
      method: "get",
      params
    });
}
//机构养老  --- 街镇分布
export function getStreet(params) {
    return request({
      url: "/screen/org/person/orgTypeForStreet",
      method: "get",
      params
    });
}

//老人统计
//老人男女占比
export function getSex(params) {
    return request({
      url: "/screen/screen/person/sexRange",
      method: "get",
      params
    });
}
//增长趋势
export function getGrowth(params) {
    return request({
      url: "/screen/screen/person/sexGrowthTrend",
      method: "get",
      params
    });
}


//居家养老  --  服务方案
export function getCare(params) {
  return request({
    url: "/screen/home/care/order/projectTypeForSum",
    method: "get",
    params
  });
}
export function getProjectType(params) {
  return request({
    url: "/screen/home/care/order/projectTypeCount",
    method: "get",
    params
  });
}
//老人分布
export function getStreetRange(params) {
  return request({
    url: "/screen/home/care/order/streetRange",
    method: "get",
    params
  });
}
//工单
export function getOrderCount(params) {
  return request({
    url: "/screen/home/care/order/order/count",
    method: "get",
    params
  });
}
//社区养老 --- 生活
export function getLift(params) {
  return request({
    baseURL,
    url: "/order/market",
    method: "get",
    params
  });
}
// 生活统计
export function getLiftStreet(params) {
  return request({
    baseURL,
    url: "/order/area/leadWire/street",
    method: "get",
    params
  });
}
export function getCareFor(params) {
  return request({
    baseURL,
    url: "/order/area/careFor",
    method: "get",
    params
  });
}
export function getCareInfor(params) {
  return request({
    baseURL,
    url: "/order/area/careFor/street",
    method: "get",
    params
  });
}
//紧急救助
export function getHelp(params) {
  return request({
    baseURL,
    url: "/consultant/pension",
    method: "get",
    params
  });
}
//话务量
export function getTrafficVolume(params) {
  return request({
    baseURL,
    url: "/consultant/number",
    method: "get",
    params
  });
}
//救助统计
export function getHelpTotal(params) {
  return request({
    baseURL,
    url: "/order/urgent/rescue",
    method: "get",
    params
  });
}
//列表
export function getPersonInfoList(params) {
  return request({
    url: "/screen/screen/person/personInfoList",
    method: "get",
    params
  });
}
//详情
export function getPersonInfoDetail(params) {
  return request({
    url: "/screen/screen/person/personInfo",
    method: "get",
    params
  });
}
//享受的服务项目
export function getServiceInfo(params) {
  return request({
    url: "/screen/screen/person/listServiceInfo",
    method: "get",
    params
  });
}
// 保障信息
export function safeguardMsg(id) {
  return request({
    url: "/screen/screen/person/protectionInfo?pensionId="+id,
    method: "get",
  });
}
// 老人数量-----表格详情数据：刷卡统计
export function creditCardStatistics(id) {
  return request({
    url: "/screen/screen/pos/record/getPosRecordNumber?pensionId="+id,
    method: "get",
  });
}
// 老人数量-----表格详情数据：刷卡记录
export function creditCardRecords(params) {
  return request({
    url: "/screen/screen/pos/record/listPosRecord",
    method: "get",
    params
  });
}


//新增   老人    机构和社区养老
export function getOrgTypesList(params) {
  return request({
    url: "/screen/org/person/list",
    method: "get",
    params
  });
}
//新增  老人   居家养老
export function getHomeList(params) {
  return request({
    url: "/screen/home/care/order/personList",
    method: "get",
    params
  });
}
//新增 老人 机构养老
export function getOrgtype(params) {
  return request({
    url: "/screen/org/person/list/orgtype",
    method: "get",
    params
  });
}
//新增 老人 性别
export function getByCondition(params) {
  return request({
    url: "/screen/screen/person/personInfoByConditionList",
    method: "get",
    params
  });
}
//新增 老人 服务方案
export function getProjectTypeList(params) {
  return request({
    url: "/screen/home/care/order/projectTypeList",
    method: "get",
    params
  });
}
//新增 老人 志愿者

export function getVolunteer(params) {
  return request({
    url: "/screen/volunteer/area/volunteer",
    method: "get",
    params
  });
}
//新增 老人 服务对象
export function getServiceObj(params) {
  return request({
    url: "/screen/volunteer/area/volunteer/service/obj",
    method: "get",
    params
  });
}
//新增 老人 租赁点
export function getAssistiveStore(params) {
  return request({
    url: "/screen/screen/assistive/store",
    method: "get",
    params
  });
}
//新增  老人 合同
export function getAssistiveContract(params) {
  return request({
    url: "/screen/screen/assistive/contract",
    method: "get",
    params
  });
}
//新增 老人 智慧养老
export function getSmartPension(params) {
  return request({
    baseURL,
    url: "/order/area/smart/pension/list",
    method: "get",
    params
  });
}
