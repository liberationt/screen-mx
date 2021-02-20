import request from "@/utils/request";

// 长护险人数统计
export function getPeopleCount(params) {
  return request({
    url: "/screen/screen/long/nursing/risks/peopleCount",
    method: "get",
    params
  });
}

// 长护险等级统计
export function getLevelCount(params) {
  return request({
    url: "/screen/screen/long/nursing/risks/levelCount",
    method: "get",
    params
  });
}

// 长护险类型统计
export function getTypeCount(params) {
  return request({
    url: "/screen/screen/long/nursing/risks/nursingTypeCount",
    method: "get",
    params
  });
}
