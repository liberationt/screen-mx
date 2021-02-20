<template>
    <div class="shortWidthStyle">
        <div class="elderInforTitle">
            <div class="inforTitleImg" style="cursor: inherit">膳食费</div>
        </div>
        <div class="pt20">
            <div class="display">
                <div class="display halfWidth">
                    <div class="font26 mr20">养老机构膳食费</div>
                    <div class="onlyDisplay">
                        <div v-for="(item,i) in mealExpensesNumOne" :key="i" class="communityList greenColor">{{item}}</div>
                    </div>
                </div>
                <div class="display halfWidth">
                    <div class="font26 mr20">长者照护之家膳食费</div>
                    <div class="onlyDisplay">
                        <div v-for="(item,i) in mealExpensesNumTwo" :key="i" class="communityList skyBlueColor">{{item}}</div>
                    </div>
                </div>
            </div>
            <div>
                <Chart :option="mealExpensesOption" :height="height" :width="widht"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getMealCost} from "@/api/pensionInstitutions"
export default {
    components:{Chart},
    data(){
        return{
            index:1,
            mealExpensesNumOne:[0],
            mealExpensesNumTwo:[0],
            bedOption:{},
            height:'390px',
            widht:'1450px',
            mealExpensesOption:{

            },
        }
    },
    methods:{
        getnursing(){
            getMealCost({areaCode: areaCode}).then(res=>{
                if(res.code==0){
                    let xAxisData = []
                    let seriesData1=[]
                    let seriesData2 = []
                    let mealExpensesList = res.data.mealExpensesList
                    this.nursingExpensesNumOne = res.data.mealExpensesList
                    this.nursingExpensesNumTwo = res.data.mealExpensesList
                    this.mealExpensesNumOne = String(res.data.mealExpensesNumOne).split("")
                    this.mealExpensesNumTwo = String(res.data.mealExpensesNumTwo).split("")
                     if(mealExpensesList&&mealExpensesList.length){
                        mealExpensesList.forEach(item=>{
                            xAxisData.push(item.streetName)
                            seriesData1.push(item.number1)
                            seriesData2.push(item.number2)
                        })
                    }
                    this.mealExpensesOption = {
                        grid: {
                            top: '25%',
                            right: '3%',
                            left: '5%',
                            bottom: '14%'
                        },
                        title:[
                            {
                                text: '街镇分布',
                                left:'0%',
                                top:'10%',
                                textStyle: {
                                    fontSize: 26,
                                    color:'#fff',
                                }
                            },
                            {
                                text: '单位：元',
                                left: '92%',
                                top: '15%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            }
                        ],
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow",
                                label: {
                                    show: true,
                                    fontSize:16
                                }
                            }
                        },
                        legend: {
                            data: ["养老机构", "长者照护之家"],
                            selectedMode: false,
                            top: "14%",
                            textStyle: {
                            color: "#fff",
                            fontSize: 16
                            }
                        },
                        xAxis: {
                            data: xAxisData,
                            axisLine: {
                                show: true, //隐藏X轴轴线
                                lineStyle: {
                                    color: '#26D9FF',
                                    width:2
                                }
                            },
                            axisTick: {
                                show: true //隐藏X轴刻度
                            },
                            axisLabel: {
                                margin: 10,
                                show: true,
                                textStyle: {
                                    color: "#ffffff", //X轴文字颜色
                                    fontSize: 12,
                                    marginTop: 10
                                },
                                interval: 0,
                                rotate:-40
                            }
                        },
                        yAxis: [{
                            type: "value",
                            /*name: "亿元",*/
                            nameTextStyle: {
                            color: "#ebf8ac",
                                fontSize: 16
                            },
                            axisTick: {
                                show: true
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 16
                                }
                            },
                        }],
                        series: [
                            {
                            name: "养老机构",
                            cursor: 'default',
                            type: "bar",
                            barWidth: 20,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#1cefe9' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#1cefe9' // 100% 处的颜色
                                    }], false),
                                    barBorderRadius: [30, 30, 0, 0],
                                }
                            },
                            data: seriesData1
                            },
                            {
                            name: "长者照护之家",
                            cursor: 'default',
                            type: "bar",
                            barWidth: 20,
                            itemStyle: {
                                normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#ffe640' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#ffe640' // 100% 处的颜色
                                    }], false),
                                    barBorderRadius: [30, 30, 0, 0],
                                }
                            },
                            data: seriesData2
                            }
                        ]
                    }
                    // if(res.data.elderlyCareHomeList&&res.data.elderlyCareHomeList.length){
                    //     let data = res.data.elderlyCareHomeList
                    //     let pensionAgencyStreetVoList = res.data.pensionAgencyStreetVoList
                    //     data.forEach(item=>{
                    //         this.nursingOption.xAxis.data.push(item.streetName)
                    //         this.nursingOption.series[0].data.push(item.number)
                    //     })
                    //     pensionAgencyStreetVoList.forEach(item=>{
                    //         this.nursingOption.series[1].data.push(item.number)
                    //     })
                    // }
                }
            })
        },
    },
    mounted(){
        this.getnursing()
    }
}
</script>
<style lang="scss" scoped>
    .cwfLeft{

        width:470px;
        padding-right:30px;
    }
    .cwfRight{
        width:970px;
    }
</style>
