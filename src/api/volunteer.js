import request from "@/utils/request";

// 获取志愿者总数
export function volunteerCount(params) {
  return request({
    url: "/screen/volunteer/volunteer/count",
    method: "get",
    params
  });
}


// 获取志愿者总数
export function serviceObjectCount(params) {
  return request({
    url: "/screen/volunteer/serviceObject/count",
    method: "get",
    params
  });
}
