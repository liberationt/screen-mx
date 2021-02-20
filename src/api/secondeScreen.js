import request from "@/utils/request";

// 居家养老
export function getHomeOld(params) {
  return request({
    url: "/screen/screen/person/home/list",
    method: "get",
    params
  });
}

// 适老化改造
export function getReform(params) {
  return request({
    url: "/screen/screen/person/reform/list",
    method: "get",
    params
  });
}

// 无障碍扶手
export function getObstacle(params) {
  return request({
    url: "/screen/screen/person/obstacle/list",
    method: "get",
    params
  });
}

// 机构列表
export function getFacilities(params) {
  return request({
    url: "/screen/screen/person/facilities/list",
    method: "get",
    params
  });
}

// 机构设施详情
export function getFacilitiesDetail(id) {
  return request({
    url: "/screen/screen/service/provider/agency/" + id,
    method: "get"
  });
}

// 老人列表
export function getOlderList(params) {
  return request({
    url: "/screen/org/person/orgPersonList",
    method: "get",
    params
  });
}

// 进老卡列表
export function getOlderCard(params) {
  return request({
    url: "/biz/person/elderly/card/screen",
    method: "get",
    params
  });
}


// 助餐补贴
export function getListMeal(params) {
  return request({
    url: "/screen/screen/pos/record/listMeal",
    method: "get",
    params
  });
}

// 长护险列表
export function getlongHelp(params) {
  return request({
    url: "/screen/screen/long/nursing/risks/longNursingRiskList",
    method: "get",
    params
  });
}

// 长护险护理类型列表
export function getlongHelpForH11(params) {
  return request({
    url: "/screen/screen/long/nursing/risks/longNursingRiskForH11List",
    method: "get",
    params
  });
}

// 高龄老人
export function getolderMan(params) {
  return request({
    url: "/screen/volunteer/obj/list",
    method: "get",
    params
  });
}

// 志愿者
export function getVolunteerList(params) {
  return request({
    url: "/screen/volunteer",
    method: "get",
    params
  });
}

// 志愿者ID
export function getVolunteerIdList(params) {
  return request({
    url: "/screen/volunteer/obj",
    method: "get",
    params
  });
}

//养老服务团队
export function getserviceTableList(params) {
  return request({
    url: "/screen/screen/service/provider/serviceTeam",
    method: "get",
    params
  });
}
