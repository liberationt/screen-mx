import request from "@/utils/request";
const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 线下养老顾问----养老顾问点表格
export function consultantPointTable(params) {
  return request({
    url: "/screen/screen/advisory/points/list",
    method: "get",
    params
  });
}

// 线下养老顾问----养老顾问员表格
export function consultantMemberTable(params) {
  return request({
    url: "/screen/screen/advisory/emp/list",
    method: "get",
    params
  });
}

// 线下养老顾问----咨询记录统计
export function consultingRecordStatistics(id) {
  return request({
    url: "/screen/screen/advice/record/count?id="+id,
    method: "get",
  });
}

// 线下养老顾问----咨询记录列表
export function consultingRecordTable(params) {
  return request({
    url: "/screen/screen/advice/record/emp",
    method: "get",
    params
  });
}