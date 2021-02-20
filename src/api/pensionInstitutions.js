import request from "@/utils/request";


// 养老机构养老机构总数量  params=1010,1011
export function getInstitutionCount(params) {
    return request({
        url: "/screen/screen/service/provider/regional/institutionCount",
        method: "get",
        params
    });
}
export function getInstitutionNumber(params) {
    return request({
        url: "/screen/screen/service/provider/regional/institutionCount",
        method: "get",
        params
    });
}
// 养老机构	1010
// 长者照护之家	1011
// 护理站	2016
// 社区养老组织	2017
// 养老机构护理员总数量  参数 params=1010,1011,2017,2016
export function getNumberOfNursingCount(params) {
    return request({
        url: "/screen/screen/service/provider/regional/numberOfNursingCount",
        method: "get",
        params
    });
}
//入住老人
export function getOldNumber(params) {
    return request({
        url: "/screen/org/person/total",
        method: "get",
        params
    });
}


// 公建公营	op_mode_1
// 公建民营	op_mode_2
// 民建民营	op_mode_3
//运营形式 养老机构    params=1010
export function getTotalNumberOfOperatingFormsPension(params) {
    return request({
        url: "/screen/screen/service/provider/regional/totalNumberOfOperatingForms",
        method: "get",
        params
    });
}

// 公建公营	op_mode_1
// 公建民营	op_mode_2
// 民建民营	op_mode_3
//运营形式 长者照护之家    params=1011
export function getTotalNumberOfOperatingFormsElderly(params) {
    return request({
        url: "/screen/screen/service/provider/regional/totalNumberOfOperatingForms",
        method: "get",
        params
    });



}


// 优秀	excellent
// 良好	good
// 一般	general
// 较差	worse
//日常监测 养老机构    params=1010
export function getRatingStatistics(params) {
    return request({
        url: "screen/screen/service/provider/regional/ratingStatistics",
        method: "get",
        params
    });
}


// 一级	firstLevel
// 二级	secondary
// 三级	third_grade
//评估等级 养老机构    params=1010
export function gradingStatistics(params) {
    return request({
        url: "screen/screen/service/provider/regional/gradingStatistics",
        method: "get",
        params
    });
}

// 养护比
export function getRatio(params) {
    return request({
        url: "screen/screen/service/provider/pension/agency/ratio",
        method: "get",
        params
    });
}

// 床位信息
export function getBeds(params) {
    return request({
        url: "/screen/screen/service/provider/pension/agency/operation/bed/statistical",
        method: "get",
        params
    });
}
//街镇
export function getStreet(params) {
    return request({
        url: "/screen/screen/service/provider/regional/street/pensionAgency",
        method: "get",
        params
    });
}


//养老机构详情 
//年龄分布
export function getAgeRange(params) {
    return request({
        url: "/screen/screen/service/provider/area/ageRange",
        method: "get",
        params
    });
}
//入住人员
export function getAssort(params) {
    return request({
        url: "/screen/org/person/assort",
        method: "get",
        params
    });
}

//机构列表
export function getOrganization(params) {
    return request({
        url: "/screen/screen/service/provider/area/organization/list",
        method: "get",
        params
    });
}
//床位费
export function getBedCharge(params) {
    return request({
        url: "/screen/screen/service/provider/area/bedCharge",
        method: "get",
        params
    });
}

export function getBedNumber(params) {
    return request({
        url: "/screen/screen/service/provider/area/bed",
        method: "get",
        params
    });
}
// 护理费
export function getNursingExpenses(params) {
    return request({
        url: "/screen/screen/service/provider/area/NursingExpenses",
        method: "get",
        params
    });
}
//膳食费
export function getMealCost(params) {
    return request({
        url: "/screen/screen/service/provider/area/mealCost",
        method: "get",
        params
    });
}
//医养融合
export function getMedicalCare(params) {
    return request({
        url: "/screen/screen/service/provider/area/medicalCare",
        method: "get",
        params
    });
}
