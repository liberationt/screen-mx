import request from "@/utils/request";
// 老人总数
export function getElderNumber(params) {
    return request({
      url: "/screen/screen/person/sum",
      method: "get",
      params
    });
}
//老人年龄分布
export function getAgeDistribution(params) {
  return request({
    url: "/screen/screen/person/ageRangeBegin60",
    method: "get",
    params
  });
}
//老人街镇
export function getStreetNumber(params){
  return request({
    url: "/screen/screen/person/committeeRange",
    method: "get",
    params
  });
}
// 老人津贴
export function getOlderSubsidyNumber(params) {
  return request({
    url: "/screen/home/care/order/olderSubsidyCountForArea",
    method: "get",
    params
  });
}
//综合津贴
export function getSubsidyNumber(params) {
  return request({
    url: "/screen/screen/person/elderly/complex/subsidy",
    method: "get",
    params
  });
}
//助餐津贴
export function getFoodSubsidyNumber(params) {
  return request({
    url: "/screen/screen/person/food/subsidy",
    method: "get",
    params
  });
}

// 机构类别
export function getOrgList() {
  return request({
    url: "/screen/screen/map/orgType/street/distributed/number?areaCode=310112000000&orgTypes=1010,1011,2011,2014,2010,2013,2017,2020",
    method: "get"
  });
}

// 机构list
export function getMapList(code) {
  return request({
    url: "/screen/screen/map/orgType/street/distributed/info?areaCode=" + code + "&orgTypes=1010,1011,2011,2014,2010,2013,2017,2020&isIncludeYourself=true",
    method: "get"
  });
}
