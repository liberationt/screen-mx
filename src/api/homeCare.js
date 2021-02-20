import request from "@/utils/request";
// 服务人员
export function getServeNumber(params) {
    return request({
      url: "/screen/home/care/order/serviceCount",
      method: "get",
      params
    });
}
//服务老人
export function getServeOldNumber(params) {
    return request({
      url: "/screen/home/care/order/olderCount",
      method: "get",
      params
    });
}
//工单
export function getOrderNumber(params) {
    return request({
      url: "/screen/home/care/order/order/count",
      method: "get",
      params
    });
}
//年龄分布
export function getAgeRange(params) {
    return request({
      url: "/screen/home/care/order/orderPersonAgeRange",
      method: "get",
      params
    });
}
//街镇分布
export function getStreetRange(params) {
    return request({
      url: "/screen/home/care/order/streetRange",
      method: "get",
      params
    });
}

// 服务项目类型
export function getProjectType(params) {
  return request({
    url: "/screen/home/care/order/projectTypeForSum",
    method: "get",
    params
  });
}

// 服务商总数
export function getOrganNum(params) {
  return request({
    url: "/screen/home/care/order/organForCount",
    method: "get",
    params
  });
}

// 服务人员街镇分布
export function getServiceStreetNum(params) {
  return request({
    url: "/screen/home/care/order/serviceForRange",
    method: "get",
    params
  });
}

// 服务项热度排名
export function getProjectHot(params) {
  return request({
    url: "/screen/home/care/order/projectTypeCount",
    method: "get",
    params
  });
}

// 服务老人性别
export function getProjectSex(params) {
  return request({
    url: "/screen/home/care/order/orderPersonAgeAndSexTypeRange",
    method: "get",
    params
  });
}

// 居家养老列表
export function getProjectHodgepodge(params) {
  return request({
    url: "/screen/home/care/order/hodgepodge",
    method: "get",
    params
  });
}

// 服务工单街镇分布
export function getProjectOrderForRange(params) {
  return request({
    url: "/screen/home/care/order/orderForRange",
    method: "get",
    params
  });
}

// 服务商街镇分布
export function getProjectOrganForAssort(params) {
  return request({
    url: "/screen/home/care/order/organForAssort",
    method: "get",
    params
  });
}

// 服务工单列表
export function getOrderList(params) {
  return request({
    url: "/screen/home/care/order/orderList",
    method: "get",
    params
  });
}

// 服务工单详细{id}
export function getOrderDetail(id) {
  return request({
    url: "/screen/home/care/order/detail/" + id,
    method: "get"
  });
}
