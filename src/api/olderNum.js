import request from "@/utils/request";

export function olderNum(params) {
  return request({
    url: "/screen/screen/person/sum",
    method: "get",
    params
  });
}

export function sexIs(params) {
  return request({
    url: "/screen/screen/person/sexRange",
    method: "get",
    params
  });
}

// 老人年龄段统计
export function ageRange(params) {
  return request({
    url: "/screen/screen/person/ageRangeJc",
    method: "get",
    params
  });
}

// 老人各个居委人数统计
export function committeeRange(params) {
  return request({
    url: "/screen/screen/person/committeeRange",
    method: "get",
    params
  });
}

// 养老方式统计
export function getElderMode(params) {
  return request({
    url: "/screen/screen/person/mode",
    method: "get",
    params
  });
}

// 居家养老统计
export function getElderHome(params) {
  return request({
    url: "/screen/screen/person/home",
    method: "get",
    params
  });
}

// 社区养老统计
export function getElderFacilities(params) {
  return request({
    url: "/screen/screen/person/facilities",
    method: "get",
    params
  });
}

// 机构养老统计
export function getElderInstitutions(params) {
  return request({
    url: "/screen/screen/person/mechanism",
    method: "get",
    params
  });
}
