import request from "@/utils/request";

// 获取List map
export function getMapList(params) {
  return request({
    url: "/screen/screen/map/ready",
    method: "get",
    params
  });
}

// 获取15life
export function getMapLife(params) {
  return request({
    url: "/screen/screen/map/life",
    method: "get",
    params
  });
}
