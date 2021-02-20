import request from "@/utils/request";
// 长护险人数统计
export function getPeopleNumber(params) {
    return request({
      url: "/screen/screen/long/nursing/risks/peopleCount",
      method: "get",
      params
    });
}
// 长护险类型统计
export function getTypeNumber(params) {
    return request({
      url: "/screen/screen/long/nursing/risks/nursingTypeCount",
      method: "get",
      params
    });
}
// 长护等级统计
export function getLevelNumber(params) {
    return request({
      url: "/screen/screen/long/nursing/risks/levelCount",
      method: "get",
      params
    });
}
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
    url: "/screen//home/care/order/olderCount",
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
//租赁点
export function getLeaseNumber(params) {
  return request({
    url: "/screen/screen/assistive/count",
    method: "get",
    params
  });
}
//获取志愿者人数
export function volunteerNumber(params) {
  return request({
    url: "/screen/volunteer/volunteer/count",
    method: "get",
    params
  });
}


// 获取服务对象
export function serviceObjectNumber(params) {
  return request({
    url: "/screen/volunteer/serviceObject/count",
    method: "get",
    params
  });
}

//体检人数
export function getNumber(params) {
  return request({
    url: "/screen/screen/person/sumByAge",
    method: "get",
    params
  });
}
