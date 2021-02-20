import request from "@/utils/request";

// 智能养老顾问
export function getPensionAdvices(params) {
  return request({
    url: "/admin/intelligent/pension/adviser",
    method: "get",
    params
  });
}
