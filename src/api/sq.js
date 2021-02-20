import request from "@/utils/request";
// 街镇分布
export function getJzList(params) {
  return request({
    url: "/screen/screen/service/provider/orgType/street/distributed",
    method: "get",
    params
  });
}
// 类型分布
export function getTypeList(params) {
  return request({
    url: "/screen/screen/service/provider/orgType/statistical",
    method: "get",
    params
  });
}
// 街道排序
export function getJdList(params) {
  return request({
    url: "/screen/screen/config?screenName=闵行区&screenConfigType=顶部街道名称排序和链接",
    method: "get",
    params
  });
}
