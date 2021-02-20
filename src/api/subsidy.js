import request from "@/utils/request";

// 助餐补贴统计
export function getSubsidyInfo(params) {
  return request({
    url: "/screen/screen/pos/record/subsidyInfo",
    method: "get",
    params
  });
}

// 助餐补贴一月内统计
export function getSubsidyMonthReport(params) {
  return request({
    url: "/screen/pos/record/monthSubsidy",
    method: "get",
    params
  });
}

// 助餐补贴一周内统计
export function getSubsidyWeekReport(params) {
  return request({
    url: "/screen/pos/record/weekSubsidy",
    method: "get",
    params
  });
}
