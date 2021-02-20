<template>
	<div>
		<!-- 面板标题 -->
		<template v-if="currentItem.elementType === 'pannelTitle'">
				<template slot="title">
					<div class="titleSlider">
						<span ><i class="titleTip"></i>{{currentItem.serviceValue}}</span>
					</div>
				</template>
				<el-form ref="form_service" key="form_service" label-position="left" label-width="auto">
					<el-row :gutter="0" v-if="!currentItem.checkbox">
						<div v-if="!currentItem.checkbox && currentItem.children !== null">
							<template  v-for="(item, index) in currentItem.children">
								<InstituField :currentItem="item" :modelType="modelType" :key="index"></InstituField>
							</template>
						</div>
					</el-row>
					<el-row v-else class="pannelTitle_checkout">
						<!--查看-->
						<div :style="modelType !== 'look'?'':'display:inline-block;'">
							<template v-if="currentItem.serviceKey !== null">
								<span v-for="(item, index) in currentItem.children" :key="index" style="margin-right: 0px;font-size:26px">
									{{item.serviceValue}}{{index === currentItem.children.length-1?'':'，'}}
								</span>
							</template>
						</div>
					</el-row>
				</el-form>
		</template>
		<!-- 需要单选且需要隐藏或显示 -->
		<template v-else-if="parentItem && parentItem.elementType === 'inputLabel'">
			<!--查看-->
			<div class="labelRedioPannel">
				<el-form-item class="labelRedio_title">
					<template v-if="parentItem.serviceKey !== null">
						<span :label="item.serviceKey" v-for="(item, index) in parentItem.children" :key="index" class="font26">
							{{item.serviceValue}}
						</span>
					</template>
				</el-form-item>
				<el-row :gutter="0" v-if="!parentItem.checkbox">
					<template  v-if="!parentItem.checkbox && parentItem.children !== null">
						<template v-for="(itemLabelRadio,index) in parentItem.children">
							<span v-show="itemLabelRadio.ifSelected" :key="index">
							<template v-show="itemLabelRadio.ifSelected" v-if="!itemLabelRadio.checkbox && itemLabelRadio.children !== null && itemLabelRadio.serviceKey.startsWith('sqwsfwss_jbfw_ddsz')">
								<template  v-for="(item,index) in itemLabelRadio.children">
									<InstituField :currentItem="item" :modelType="modelType" :key="index"></InstituField>
								</template>
							</template>
							<template v-show="itemLabelRadio.ifSelected" v-if="!itemLabelRadio.checkbox && itemLabelRadio.children !== null && itemLabelRadio.serviceKey.startsWith('sqwsfwss_jbfw_plsz')">
								<el-row v-if="itemLabelRadio.children" class="label_checkout">
								<span v-for="(item,index) in itemLabelRadio.children" :key="index">
									<span class="font26" v-if="item.serviceKey !== 'sqwsfwss_jbfw_plsz_kssj' && item.serviceKey !== 'sqwsfwss_jbfw_plsz_jssj' && item.serviceKey !== 'sqwsfwss_jbfw_plsz_qb'">{{item.serviceValue}}</span>
								</span>
								</el-row>
								<el-row v-if="itemLabelRadio.children" style="padding-left: 70px;margin-bottom: 20px;" >
								<span v-for="(item,index) in itemLabelRadio.children" :key="index">
									<span class="font26" v-if="item.serviceKey === 'sqwsfwss_jbfw_plsz_kssj' || item.serviceKey === 'sqwsfwss_jbfw_plsz_jssj'">
									{{item.serviceValue}}{{item.subsidyValue}}&nbsp;&nbsp;
									</span>
								</span>
								</el-row>
							</template>
							</span>
						</template>
					</template>
				</el-row>
			</div>
			</template>
			<!-- 带复选框、输入框的label -->
			<template v-if="currentItem.elementType === 'inputCheckboxLabel'">
			<!--查看-->
			<div class="labelPannel">
				<el-form-item class="labelRedio_title">
				<span style="width: 210px;" class="font26">{{currentItem.serviceValue}}</span>
				<template v-if="currentItem.serviceKey !== null">
					<span v-for="(item, index) in currentItem.children" :key="index">
						<span v-if="'inputCheckbox' === item.elementType" class="font26">
						{{item.serviceValue}}{{item.subsidyValue}}{{index === currentItem.children.length-1?'':'，'}}
						</span>
							<span v-if="'inputCheckboxTimeHHmm' === item.elementType" class="font26">
							{{item.serviceValue}}{{item.subsidyValue}}{{index === currentItem.children.length-1?'':'，'}}
						</span>
					</span>
				</template>
				</el-form-item>
			</div>
		</template>
			<!-- 自身不带单选框、且下级带单选框的inputLabel -->
		<template v-if="currentItem.elementType === 'inputLabel'">
			<!-- 查看 -->
			<div class="labelPannel">
				<span class="label_title">{{currentItem.serviceValue}}</span>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
				<!-- 适用于带隐藏显示的单选 -->
				<template v-if="currentItem.children !== null">
					<!-- 不需要当前节点 只需要传递父节点参数即可 -->
					<InstituField :currentItem="{}" :modelType="modelType" :parentItem="currentItem" ></InstituField>
				</template>
				</el-row>
			</div>
		</template>
		<!-- 不带单选框的label -->
		<template v-if="currentItem.elementType === 'label'">
			<!--查看-->
			<div class="labelPannel">
				<span class="label_title">{{currentItem.serviceValue}}</span>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
					<template v-if="!currentItem.checkbox && currentItem.children !== null" >
						<template v-for="(item,index) in currentItem.children" >
							<InstituField :currentItem="item" :modelType="modelType" :key="index"></InstituField>
						</template>
					</template>
				</el-row>
				<el-row v-else class="label_checkout" :style="modelType !== 'look'?'':'display:inline-block;padding-left:90px;'">
					<template v-if="currentItem.serviceKey !== null">
						<span v-for="(item, index) in currentItem.children" class="font26"  style="margin-right: 0px;" :key="index">
           				 	{{item.serviceValue}}{{'inputNumberCheckbox' === item.elementType ? item.subsidyValue + '元' : ''}}{{index === currentItem.children.length-1?'':'，'}}
						</span>
					</template>
				</el-row>
			</div>
		</template>
		<!--带单选框的label-->
		<template v-else-if="currentItem.elementType === 'labelRedio'">
			<!--查看-->
			<div class="labelRedioPannel">
				<span class="label_title" style="padding-left: 70px;">{{currentItem.serviceValue}}</span>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
					<template  v-if="!currentItem.checkbox && currentItem.children !== null">
						<template v-for="(item,index) in currentItem.children">
							<InstituField :currentItem="item" :modelType="modelType" :key="index"></InstituField>
						</template>
					</template>
				</el-row>
				<el-row v-else-if="currentItem.children" class="label_checkout" :style="modelType !== 'look'?'':'display:inline-block;padding-left:140px;'">
					<template  v-if="currentItem.serviceKey !== null">
						<span v-for="(item, index) in currentItem.children" class="font26" style="margin-right: 0px;" :key="index">
							{{item.serviceValue}}{{index === currentItem.children.length-1?'':'，'}}
						</span>
					</template>
				</el-row>
			</div>
		</template>
		<!--带单选框的subsidyForm 表单-->
		<template v-else-if="currentItem.elementType === 'subsidyForm'">
			<!--查看-->
			<div class="subsidyFormPannel">
				<span class="subsidyFormPannel_title;font26" style="padding-left: 70px;">{{currentItem.serviceValue}}</span>
				<el-row class="label_checkout" style="padding-left: 140px;">
					<template v-if="currentItem.serviceKey !== null">
						<span v-for="(item, index) in currentItem.children" class="font26"  style="margin-right: 0px;" :key="index">
							<span>{{item.serviceValue}}：{{item.subsidyValue}}</span>
						</span>
					</template>
				</el-row>
			</div>
		</template>
	</div>
</template>
<script>
	export default {
		name: 'InstituField',
		props: ['currentItem','modelType', 'parentItem'],
		watch: {},
		data() {
			return {}
		},
		mounted() {},
		methods: {
		  // 复选框取消后需要取消输入框中的值
		  changeCheckboxValue(data) {
			if (data.elementType === 'inputNumberCheckbox') {
			if (!data.ifSelected) {
				data.ifSelected = false;
				data.subsidyValue = null;
			}
			}
			if (data.elementType === 'inputCheckboxLabel') {
			if (!data.ifSelected) {
				if (data.children) {
				return data.children.forEach((item)=>{
					item.ifSelected = false;
					item.subsidyValue = null;
				});
				}
			}
			}
		},
		//改变单选框事件
		changeRedioValue(data) {
			//对下级不是单选框和复选框的数据进行操作
			if (data.elementType === 'subsidyForm'){
				if (!data.ifSelected) {
					if (data.children) {
						return data.children.forEach((item)=>{
							item.ifSelected = false;
							item.subsidyValue = null;
						});
					}
				}
			}
			//对下级是单选框和复选框的数据进行操作
			else {
				if (!data.ifSelected) {
					if (data.children) {
						return data.children.forEach((item)=>{
							item.ifSelected = false;
						});
					}
				}
			}
		},
      // 改变输入单选框事件
      changeLabelRadioRadioValue(value, item) {
        item.children.forEach((i) => {
          i.ifSelected = value === i.serviceKey;
          i.subsidyValue = null;
          // 清理脏数据
          if (i.serviceKey === value) {
            i.children.forEach((ci) => {
              // 如果是inputCheckbox要指定为true 因为它头部没有带复选框所以默认是true 否则就被禁用掉了
              ci.ifSelected = ci.elementType === 'inputCheckbox' || ci.elementType === 'inputCheckboxTimeHHmm';
              ci.subsidyValue = null;
              if (ci.children) {
                ci.children.forEach((cci) => {
                  cci.ifSelected = false;
                  cci.subsidyValue = null;
                });
              }
            });
          }
        });
      },
      // 改变复杂复选框
      changeItemLabelCheckboxValue(itemLabelRadio, item) {
        if (item.serviceValue === '全部') {
          itemLabelRadio.children.forEach((i) => {
            if (i.elementType === 'inputCheckboxLabel') {
              i.ifSelected = item.ifSelected;
            }
          });
        }
        // 如果选中了 全部选项则 全部选项也应该选中
        let isAllTrue = true;
        let allCheckBoxElement = null;
        if (item.serviceValue !== '全部') {
          itemLabelRadio.children.forEach((i) => {
            if (i.serviceValue === '全部') {
              allCheckBoxElement = i;
            }
            if (i.serviceValue !== '全部') {
              if (!i.ifSelected) {
                isAllTrue = false;
              }
            }
          });
          // 将检测结果赋值给全部复选框
          if (allCheckBoxElement) {
            allCheckBoxElement.ifSelected = isAllTrue
          }
        }
      },
		}
	}
</script>

<style scoped>

	.pannelTitle_checkout{
		padding-left: 70px;
	}
	.pannelTitle_checkout span{
		margin-right: 20px;
	}

	.label_checkout{
		padding-left: 70px;
		margin-bottom: 20px;
	}
	.label_checkout span{
		margin-right: 20px;
	}

	.labelRedio_checkout{
		padding-left: 140px;
		margin-bottom: 20px;
	}
	.labelRedio_checkout span{
		margin-right: 20px;
	}

	.label_title{
		padding-left:0px;
		margin-bottom: 20px;
		display: block;
		font-size:30px;
		font-weight: bold;
	}

	.label_title + .el-form.el-form--label-left .label_title{
		padding-left: 70px;
	}
	.label_title + .el-form.el-form--label-left .label_title + .el-form.el-form--label-left .label_checkout{
		padding-left: 140px;
	}

	.labelRedio_title{
		padding-left: 70px;
	}

	.labelPannel > .el-row > div > .labelPannel{
		padding-left: 50px;
	}

	.subsidyFormPannel{
	}
	.subsidyFormPannel > .subsidyFormPannel_title {
		line-height: 24px;
		height: 24px;
		margin-bottom: 20px;
		padding-left: 70px;
		display: block;;
	}
	.subsidyFormPannel > .subsidyFormItem{
		padding-left: 140px;
	}

	/*==================================*/
	.titleSlider {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.titleSlider > span {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: #fff;
		padding: 0 10px 0 20px;
		height: 47px;
		font-size:16px;
    	font-weight: 600;
	}

	.titleSlider > span .titleTip {
		position: absolute;
		top: 50%;
		left: 10px;
		margin-top: -9px;
		width: 3px;
		height: 18px;
		background-color: #0078D4;
		display: inline-block;
	}

	.titleSlider::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 1px;
		border-top: 1px dashed #E1E1E1;
		content: '';
	}
</style>

<style>
	.inputNumberDiv > .el-input.el-input--medium > .el-input__inner{
		text-align: left !important;
	}
</style>

