import request from "@/utils/request";

// 敬老卡数量
export function getCardSum(params) {
  return request({
    url: "/screen/elderly/card/sum",
    method: "get",
    params
  });
}

// 敬老卡金额
export function getCardMoney(params) {
  return request({
    url: "/screen/elderly/card/money",
    method: "get",
    params
  });
}

// 敬老卡按年龄统计
export function getCardAgeReport(params) {
  return request({
    url: "/screen/elderly/card/age",
    method: "get",
    params
  });
}

// 敬老卡按时间统计
export function getCardDateReport(params) {
  return request({
    url: "/screen/elderly/card/date",
    method: "get",
    params
  });
}
