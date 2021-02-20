import request from "@/utils/request";
// 查看某一机构详情
export function institutionDetailsData(id,st) {
	return request({
		url: '/admin/service/facility/'+id+'?selectType='+st,
		method: 'get'
	})
}
// 所有下拉框的字典数据
export function allSelectdictionaryData(data) {
	return request({
		url: '/admin/system/dict/datas?dictTypes='+data,
		method: 'get'
	})
}

//助餐点
// 查看某一机构详情
export function institutionDetailsDatas(id,st) {
	return request({
		url: '/admin/service/facility/playRoom/'+id+'?selectType='+st,
		method: 'get'
	})
}
/**
 * 根据机构的类型值返回对应的机构名称
 * @param instituType
 * @returns {string}
 */
export function facilityTypeFun(instituType) {
	let _type_ = ''
	switch (instituType) {
	  case '2010':
		_type_ = '日间照护机构'
		break
	  case '2011':
		_type_ = '综合为老服务中心'
		break
	  case '2012':
		_type_ = '邻里汇'
		break
	  case '2013':
		_type_ = '老年活动室'
		break
	  case '2014':
		_type_ = '助餐点'
		break
	  case '2015':
		_type_ = '社区长者食堂'
		break
	  case '2016':
		_type_ = '护理站'
		break
	  case '2017':
		_type_ = '社区养老组织'
		break
	  case '2018':
		_type_ = '健康小屋'
		break
	  case '2019':
		_type_ = '护理院'
		break
		  case '4001':
			  _type_ = '养老辅具展示点'
			  break
	  case '2020':
			  _type_ = '社区卫生服务设施'
			  break
	}
	return _type_
  }