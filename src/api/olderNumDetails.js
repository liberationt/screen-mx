import request from "@/utils/request";
const baseURL = process.env.VUE_APP_ORDER_BASE_API; // 工单服务的API

// 老人数量-----表格数据接口
export function olderNumTable(params) {
  return request({
    url: "/screen/screen/person/personInfoList",
    method: "get",
    params
  });
}

// 老人数量-----表格详情数据：基础信息，标签信息
export function olderPeopleBaseMsg(id) {
    return request({
      url: "/screen/screen/person/personInfo?id="+id,
      method: "get",
    });
}

// 老人数量-----表格详情数据：保障信息
export function safeguardMsg(id) {
    return request({
      url: "/screen/screen/person/protectionInfo?pensionId="+id,
      method: "get",
    });
}

// 老人数量-----表格详情数据：应享受的服务项目
export function enjoyServiceProject(id,pageNum,pageSize) {
    return request({
      url: "/screen/screen/person/listServiceInfo?idCard="+id+"&areaCode=310112001000&pageNum="+pageNum+"&pageSize="+pageSize,
      method: "get",
    });
}

// 老人数量-----表格详情数据：刷卡记录
export function creditCardRecords(id,pageNum) {
    return request({
      url: "/screen/screen/pos/record/listPosRecord?pensionId="+id+"&pageNum="+pageNum+"&pageSize=5",
      method: "get",
    });
}

// 老人数量-----表格详情数据：刷卡统计
export function creditCardStatistics(id) {
    return request({
      url: "/screen/screen/pos/record/getPosRecordNumber?pensionId="+id,
      method: "get",
    });
}

// 老人数量-----表格详情数据：服务记录
export function serviceRecords(id,pageNum) {
    return request({
      url: "/screen/screen/advice/record/old/people?id="+id+"&pageNum="+pageNum+"&pageSize=5",
      method: "get",
    });
}
// 老人数量-----表格详情数据：服务工单
export function serviceSheetTabel(id,pageNum) {
  return request({
    baseURL,
    url: "/order/order/list?sid="+id+"&pageNum="+pageNum+"&pageSize=4",
    method: "get",
  });
}
