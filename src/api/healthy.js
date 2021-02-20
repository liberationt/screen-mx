import request from "@/utils/request";

// 健康小屋数量
export function getHealthyCount(params) {
  return request({
    url: "/screen/service/provider/healthyCount",
    method: "get",
    params
  });
}
