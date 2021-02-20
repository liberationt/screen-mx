<template>
    <div class="longWidthStyle pl30 pr30">
        <div class="elderInforTitle">
            <div class="inforTitleImg" style="cursor: inherit">机构统计</div>
        </div>
        <div class="pt20">
            <div class="onlyDisplay">
                <div class="halfWidth jgTopLeft">
                    <Chart :option="option" :height="height" :isClick="true" @showAgeToast="showAgeToast"/>
                </div>
                <div class="pl30">
                    <div class="font26 fontFamily mb30">日常监测</div>
                    <div class="display pl20">
                        <div class="onlyDisplay borderBottom">
                            <div class="mr20">
                                <img src="@/assets/img/youxiu.png" alt="">
                            </div>
                            <div>
<!--                                <span class="font30 orangeColor cursorPointer" @click="showTable(1)">{{generalData.excellent}}</span>-->
                                <span class="font30 orangeColor cursorPointer" @click="showTable(1)">12</span>
                                <p class="font18">等级：优秀</p>
                            </div>
                        </div>
                        <div class="onlyDisplay borderBottom borderBottomNone">
                            <div class="mr20">
                                <img src="@/assets/img/lianghao.png" alt="">
                            </div>
                            <div>
<!--                                <span class="font30 orangeColor cursorPointer" @click="showTable(2)">{{generalData.good}}</span>-->
                                <span class="font30 orangeColor cursorPointer" @click="showTable(2)">8</span>
                                <p class="font18">等级：良好</p>
                            </div>
                        </div>
                    </div>
                    <div class="display pl20">
                        <div class="onlyDisplay borderBottom borderBottomBottomNone">
                            <div class="mr20">
                                <img src="@/assets/img/yiban.png" alt="">
                            </div>
                            <div>
<!--                                <span class="font30 orangeColor cursorPointer" @click="showTable(3)">{{generalData.general}}</span>-->
                                <span class="font30 orangeColor cursorPointer" @click="showTable(3)">19</span>
                                <p class="font18">等级：一般</p>
                            </div>
                        </div>
                        <div class="onlyDisplay borderBottom borderBottomNone borderBottomBottomNone">
                            <div class="mr20">
                                <img src="@/assets/img/jiaocha.png" alt="">
                            </div>
                            <div>
<!--                                <span class="font30 orangeColor cursorPointer" @click="showTable(4)">{{generalData.worse}}</span>-->
                                <span class="font30 orangeColor cursorPointer" @click="showTable(4)">1</span>
                                <p class="font18">等级：较差</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt30">
                <h3 class="mb20 font28">机构列表</h3>
                <div class="elTableStyle" style="height:600px;">
                    <el-table
                        :data="tableData"
                        :cell-style="cellStyle"
                         v-loading="loading"
                        >
                        <el-table-column
                            prop="streetName"
                            label="所属街道"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="orgName"
                            label="机构名称"
                            show-overflow-tooltip
                            min-width="180">
                            <template slot-scope="scope">
                                <span class="cursorPointer" @click="showDetails(scope.row.orgId,scope.row.type)">{{scope.row.orgName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orgType"
                            label="机构类型">
                        </el-table-column>
                        <el-table-column
                            prop="serviceTotalnum"
                            label="服务人员">
                        </el-table-column>
                        <el-table-column
                            prop="bedTotal"
                            label="床位">
                        </el-table-column>
                        <el-table-column
                            prop="bedUnused"
                            label="空余床位">
                        </el-table-column>
                        <el-table-column
                            prop="persion"
                            label="入住老人">
                            <template slot-scope="scope">
                                {{ scope.row.bedTotal - scope.row.bedUnused }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="mt20 paginationStyle">
                    <pagination
                        class="PaginationStyle"
                        v-show="total>0"
                        :total="total"
                        :page.sync="form.pageNum"
                        :limit.sync="form.pageSize"
                        @pagination="getData(form)"
                    />
                </div>
            </div>
        </div>
        <div class="detailsMain"  v-if="isShow">
            <jjDetail class="toastImg" :close="closeTab" :id="detailId" :instituType='instituType'/>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="monitor">
                <monitorTable :close="closeTab" :orgTypes="orgTypes" :titleName="titleName" :type="type" />
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import pagination from "../Pagination"
import {getRatingStatistics,gradingStatistics,getOrganization} from "@/api/pensionInstitutions"
import  monitorTable from "./secondScreen/monitorTable"

import jjDetail from "./jjDetail"
export default {
    components:{Chart,pagination,jjDetail,monitorTable},
    data(){
        return{
            form:{
                pageNum:1,
                pageSize:7,
                areaCode:areaCode,
                orgTypes:'1010,1011'
            },
            isShow:false,
            warnImg:require('../../../../assets/img/star1.png'),
            total:0,
            height:'280px',
            option:{},
            generalData:{},
            tableData: [],
            loading:false,
            instituType:'',
            detailId:'',
            monitor:false,
            isShowBg:false,
            orgTypes:'',
            titleName:'',
            type:'',
        }
    },
    methods:{
        showDetails(id,type){
            this.isShow = true
            this.instituType = type
            this.detailId = id
        },
        showTable(num){
            switch(num){
                case 1:
                    this.orgTypes='excellent'
                    this.titleName='养老机构'
                    this.type =1
                    break
                case 2:
                    this.orgTypes='good'
                    this.titleName='养老机构'
                    this.type =1
                    break
                case 3:
                    this.orgTypes='general'
                    this.titleName='养老机构'
                    this.type =1
                    break
                case 4:
                    this.orgTypes='worse'
                    this.titleName='养老机构'
                    this.type =1
                    break
            }
            this.monitor = true
            this.isShowBg = true
        },
        showAgeToast(params){
            this.titleName='养老机构'
            this.type = 2
            if(params.name=='一级'||params.event.target.anid=='label_0'){
              this.orgTypes='firstLevel'
            }else if(params.name=='二级'||params.event.target.anid=='label_1'){
              this.orgTypes='secondary'
            }else if(params.name=='三级'||params.event.target.anid=='label_2'){
              this.orgTypes='third_grade'
            }
            this.monitor = true
            this.isShowBg = true
        },
        closeTab(){
            this.isShow = false
            this.isShowBg = false
            this.monitor = false
        },
        cellStyle({row, column, rowIndex, columnIndex}){
            if(columnIndex==1){
                return `color:#ffd535`
            }else{
                return `color:#fff`
            }
        },
        getData(form){
            this.loading = true
            getOrganization(this.form).then(res=>{
                if(res.code ==0 ){
                    this.loading = false
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
        },
        getDatas(form){
            let warnImg1 = require('../../../../assets/img/star1.png')
            let warnImg2 = require('../../../../assets/img/star2.png')
            let warnImg3 = require('../../../../assets/img/star3.png')
            getRatingStatistics({areaCode:areaCode,orgType:'1010,1011'}).then(res=>{
                if(res.code == 0){
                    this.generalData = res.data
                }
            })
            gradingStatistics({areaCode:areaCode,orgType:'1010,1011'}).then(res=>{
                if(res.code==0){
                    let seriesData = [18, 10, 3]
                    // const {firstLevel,secondary,third_grade} = res.data
                    // seriesData.push(firstLevel,secondary,third_grade)
                    this.option={
                        grid: {
                            left: '1%',
                            right: '5%',
                            bottom: '0%',
                            top: '20%',
                            containLabel: true
                        },
                        title:{
                            text: '评定等级',
                            textStyle:{
                                fontSize:26,
                                color:'#fff'
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'none'
                            },
                            formatter: function(params) {
                                // return params[0].name + '<br/>' +
                                //     "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                                //     params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' 万元<br/>'
                            }
                        },
                        xAxis: {
                            show: false,
                            type: 'value'
                        },
                        yAxis: [{
                            type: 'category',
                            inverse: true,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize:22,
                                },
                            },
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            data: ['一级', '二级', '三级']
                        }, {
                            type: 'category',
                            inverse: true,
                            axisTick: 'none',
                            axisLine: 'none',
                            show: true,
                            triggerEvent:true,
                            axisLabel: {
                                clickable:true,
                                textStyle: {
                                    color: '#ffe640',
                                    fontSize: '20'
                                },
                                formatter: function(value,i) {
                                    i++
                                    return `${value}\n{warnValue${i}|}`
                                    // return `{uname|${name}}{unum${i}|${res.value}}`
                                },
                                rich: {
                                    warnValue1: {
                                        height: 15,
                                        align: 'center',
                                        backgroundColor: {
                                            image: warnImg1  	//这个warnImg是上面定义的图片var warnImg = "img/warn.png";
                                        }
                                    },
                                    warnValue2: {
                                        height: 15,
                                        align: 'center',
                                        backgroundColor: {
                                            image: warnImg2 	//这个warnImg是上面定义的图片var warnImg = "img/warn.png";
                                        }
                                    },
                                    warnValue3: {
                                        height: 15,
                                        align: 'center',
                                        backgroundColor: {
                                            image: warnImg3  	//这个warnImg是上面定义的图片var warnImg = "img/warn.png";
                                        }
                                    },
                                }
                            },
                            data: seriesData
                        }],
                        series: [{
                                name: '金额',
                                type: 'bar',
                                zlevel: 1,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 30,
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgb(57,89,255,1)'
                                        }, {
                                            offset: 1,
                                            color: 'rgb(46,200,207,1)'
                                        }]),
                                    },
                                },
                                barWidth: 20,
                                data: seriesData
                            },
                            {
                                name: '背景',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '-100%',
                                data: [100, 100, 100],
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(24,31,68,1)',
                                        barBorderRadius: 30,
                                    }
                                },
                            },
                        ]
                    }
                }
            })
            this.getData()
        }
    },
    mounted(){
        this.getDatas()
    }
}
</script>
<style lang="scss" scoped>
   .jgTopLeft{
       border-right:1px dashed #19d0d1;
       height:280px;
   }
   .borderBottom{
       border-bottom: 1px dashed #198f9b;
       border-right: 1px dashed #198f9b;
       height:110px;width:384px;
   }
   .borderBottomNone{
       border-right:none;
       padding-left:30px;
   }
   .borderBottomBottomNone{
       border-bottom:none;
       padding-top:40px;
   }
   .detailsMain{
        position: absolute;
        width:4700px;
        height:1566px;
        top:0;
        left: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99999;
        .toastImg{
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
   }
</style>
