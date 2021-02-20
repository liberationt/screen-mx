<template>
    <div class="shortWidthStyle">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">居家养老</div>
        </div>
        <div class="onlyDisplay">
            <div class="halfWidth homePensionLeft">
                <div class="display">
                    <span class="font26">服务工单数(单)</span>
                    <span class="font26 greenColor fontFamily ml25 mr20 cursorPointer" @click="showTable(1)">{{orderCount}}</span>
                    <!-- <span>
                        <span class="font18">较上年</span>
                        <span class="font22 brightColor ml10 mr5">26545</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </span> -->
                </div>
                <div class="mt46">
                    <div class="displayNormal mb20">
                        <span class="font26">老人分布</span>
                        <span class="font16 mt20">单位:人</span>
                    </div>
                    <div class="elderInforList">
                        <div v-for="(item,i) in streetOption" :key="i">
                            <div class="elderNum cursorPointer" @click="showStreetTable(item.areaCode)">{{item.value}}</div>
                            <div class="elderAdd">{{item.key}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="halfWidth homePensionRight">
                <div class="display">
                    <span class="font26">服务方案(人)</span>
                    <span class="font26 fontFamily skyBlueColor ml25 mr20 cursorPointer" @click="showTable(2)">{{programmeNum}}</span>
                    <span>
                        <!-- <span class="font18">较上年</span>
                        <span class="font22 brightColor ml10 mr5">26545</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </span>
                </div>
                <div class="mt40">
                    <Chart :option="operateOptions" :height="optionHeight"/>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg"  v-if="serviceOrder">
                <serviceOrderTable :close="closeTab" />
            </div>
            <div class="toastImg"  v-if="elderlyDistribution">
                <elderlyDistributionTable :close="closeTab" :orgTypes="orgTypes"/>
            </div>
            <div class="toastImg"  v-if="servicePlan">
                <servicePlanTable :close="closeTab" :orgTypes="orgTypes"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import serviceOrderTable from "./secondScreen/serviceOrderTable"
import elderlyDistributionTable from "./secondScreen/elderlyDistributionTable"
import servicePlanTable from "./secondScreen/servicePlanTable"
import {getCare,getProjectType,getStreetRange,getOrderCount} from "@/api/elderlyInforDetails"
export default {
    components:{Chart,serviceOrderTable,elderlyDistributionTable,servicePlanTable},
    data(){
        return{
            optionHeight:"400px",
            operateOptions:{},
            programmeNum:0,
            orderCount:0,
            streetOption:[],
            isShowBg:false,
            serviceOrder:false,
            elderlyDistribution:false,
            servicePlan:false,
            orgTypes:''
        }
    },
    methods:{
        showTable(num){
            this.isShowBg = true
            switch(num){
                case 1 :
                    this.serviceOrder = true
                    break
                case 2 :
                    this.servicePlan = true
            }
        },
        showStreetTable(areaCode){
            this.orgTypes = areaCode
            this.isShowBg = true
            this.elderlyDistribution = true
        },
        closeTab(){
            this.isShowBg = false
            this.serviceOrder = false
            this.elderlyDistribution = false
            this.servicePlan = false
        },
        async getData(){
            await getCare({areaCode:areaCode}).then(res=>{
                if(res.code===0){
                    this.programmeNum = res.data
                }
            })
            await getProjectType({areaCode:areaCode,sort:'desc'}).then(res=>{
                if(res.code===0){
                    let yAxisData=[]
                    let seriesData = []
                    let dataList = [ ]
                    if(res.data.length){
                        res.data.forEach(item=>{
                           yAxisData.push(item.xmCode)
                           seriesData.push(item.count)
                        })
                        // seriesData= seriesData.sort((n1,n2)=>{
                        //     return n2-n1;
                        // });
                        // seriesData.forEach((item,i)=>{
                        //     // if(item === res.data[])

                        // })
                        // res.data.forEach(item=>{
                        //    seriesData.forEach(items=>{
                        //        if(item.count===items){
                        //           dataList.push(item)
                        //        }
                        //    })
                        // })
                    }
                    this.operateOptions={
                        title:[
                            {
                                text: '方案分布排行',
                                left:'0%',
                                top:'3%',
                                right:'0%',
                                textStyle: {
                                    fontSize: 22,
                                    color:'#fff',
                                }
                            },
                            {
                                text: '单位：人',
                                left: '82%',
                                top: '5%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            }
                        ],
                        grid: {
                            left: '0%',
                            right: '10%',
                            bottom: '0%',
                            top: '12%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'none'
                            }
                        },
                        xAxis: {
                            show: false,
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    color: 'red'
                                },
                            },
                        },
                        yAxis: [{
                            type: 'category',
                            inverse: true,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
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
                            axisLabel:{
                                interval:0,
                                textStyle: {
                                    fontSize: 18,
                                    color:'#1cefe9'
                                },
                                formatter: function (v, index) {
                                    let i = index + 1
                                    return `{unum${i}|NO.${i}} {b|${v} }`
                                },
                                rich: {
                                    color:'red',
                                    unum1: {
                                        color: '#f9544a',
                                        lineHeight: 10,
                                        fontSize: 18,
                                    },
                                    unum2: {
                                        color: '#fc7a3c',
                                        lineHeight: 10,
                                        fontSize: 18,
                                    },
                                    unum3: {
                                        color: '#ffd535',
                                        lineHeight: 10,
                                        fontSize: 18,
                                    },
                                    b:{
                                        color: '#fff',
                                        lineHeight: 10,
                                        fontSize: 18,
                                    },
                                }
                            },
                            data: yAxisData
                        }],
                        series: [{
                                name: '金额',
                                cursor: 'default',
                                type: 'bar',
                                zlevel: 1,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 30,
                                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#50cef9'
                                        }, {
                                            offset: 1,
                                            color: '#50cef9'
                                        }]),
                                    },
                                },
                                label: {
                                    normal: {
                                        color: '#08fff8',
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                        fontSize: 16
                                        },
                                        formatter: function (a) {
                                            return a.value
                                        },
                                    }
                                },
                                barWidth: 20,
                                data: seriesData
                            }
                        ]
                    }
                }
            })
            await getStreetRange({areaCode:areaCode}).then(res=>{
                if(res.code===0){
                    this.streetOption = res.data
                }
            })
            await getOrderCount({areaCode:areaCode}).then(res=>{
                if(res.code===0){
                    this.orderCount = res.data
                }
            })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    .homePensionLeft{
        border-right:1px dashed #0eafb5;
        height:500px;
        padding:20px 50px 0 0;
        .elderInforList{
            width:666px;
            display: flex;
            flex-wrap: wrap;
            border-left:1px solid #1ce0dd;
            border-bottom:1px solid #1ce0dd;
        }
        .elderNum{
            width:133px;
            height:68px;
            text-align: center;
            line-height: 68px;
            font-size:22px;
            font-weight: 500;
            color:#13d9a3;
            border-right:1px solid #1ce0dd;
            border-top:1px solid #1ce0dd;
        }
        .elderAdd{
            font-size: 20px;
            text-align: center;
            width:133px;
            height:38px;
            background:#2f4e6e;
            line-height: 38px;
            border-right:1px solid #1ce0dd;
            border-top:1px solid #1ce0dd;
        }
    }
    .homePensionRight{
        padding:20px 0 0 30px;
    }
</style>
