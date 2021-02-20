<template>
    <div class="shortWidthStyle">
        <div class="elderInforTitle">
            <div class="inforTitleImg" style="cursor: inherit">床位费&nbsp; \ &nbsp;护理费</div>
        </div>
        <div>
            <div class="baseInforTop">
                <div :class="index==1?'activeColor':''" @click="changeDate(1)">床位费<span class="lineColor" v-if="index==1"></span></div>
                <div :class="index===2?'activeColor':''" @click="changeDate(2)">护理费<span class="lineColor" v-if="index==2"></span></div>
            </div>
            <div>
                <div class="displayFlex">
                    <div class="display">
                        <div class="font26 mr10">
                            <span v-if="index==1">养老机构一般床位费</span>
                            <span v-else>养老机构一般护理费</span>
                        </div>
                        <div class="displayFlex" v-if="index==1">
                            <div v-for="(item,i) in bedChargeNumOne" :key="i" class="listInfor font36 greenColor">{{item}}</div>
                        </div>
                        <div class="displayFlex" v-else>
                            <div v-for="(item,i) in nursingExpensesNumOne" :key="i" class="listInfor font36 greenColor">{{item}}</div>
                        </div>
                    </div>
                    <!-- <div class="display" :class="index===1?'mt60':'mt30'">
                        <div  style="width:190px;text-align:center">
                            <div class="font26">
                                <span v-if="index==1">认知症床位费</span>
                                <span v-else>认知症护理费</span>
                            </div>
                            <p class="font20" style="text-align:center;">(养老机构)</p>
                        </div>
                        <div class="font40 greenColor" v-if="index==1">{{bedChargeNumOne}}</div>
                        <div class="font40 greenColor" v-else>{{nursingExpensesNumOne}}</div>
                    </div> -->
                    <div class="display">
                        <div class="font26 mr10">
                            <span v-if="index==1">长者照护之家一般床位费</span>
                            <span v-else>长者照护之家一般护理费</span>
                        </div>
                        <div class="displayFlex" v-if="index==1">
                            <div v-for="(item,i) in bedChargeNumTwo" :key="i" class="listInfor font36 skyBlueColor">{{item}}</div>
                        </div>
                        <div class="displayFlex" v-else>
                            <div v-for="(item,i) in nursingExpensesNumTwo" :key="i" class="listInfor font36 skyBlueColor">{{item}}</div>
                        </div>
                    </div>
                    <!-- <div class="display mt30" v-if="index===2">
                        <div style="width:190px;text-align:center">
                            <div class="font26">认知症护理费</div>
                            <p class="font20">(长者照护之家)</p>
                        </div>
                        <div class="font40 skyBlueColor">{{nursingExpensesNumTwo}}</div>
                    </div> -->
                </div>
                <div class="cwfRight">
                    <div v-if="index===1">
                        <Chart :option="bedOption" :height="height" :width="widht"/>
                    </div>
                    <div v-else>
                        <Chart :option="nursingOption" :height="height" :width="widht"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getBedCharge,getNursingExpenses} from "@/api/pensionInstitutions"
export default {
    components:{Chart},
    data(){
        return{
            bedChargeNumOne:0,
            bedChargeNumTwo:0,
            nursingExpensesNumOne:0,
            nursingExpensesNumTwo:0,
            index:1,
            bedOption:{},
            height:'390px',
            widht:'1440px',
            nursingOption:{},
        }
    },
    methods:{
        changeDate(num){
            this.index=num
        },
        getData(){
            getBedCharge({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.bedChargeNumOne = String(res.data.bedChargeNumOne).split("")
                    this.bedChargeNumTwo = String(res.data.bedChargeNumTwo).split("")
                    let xAxisData = []
                    let seriesData = []
                    let dataList = res.data.bedChargeList
                    if(dataList&&dataList.length){
                        dataList.forEach(item=>{
                            xAxisData.push(item.streetName)
                            seriesData.push(item.number2)
                        })
                    }
                    this.bedOption={
                        title:[
                            {
                                text: '单位：元',
                                left: '92%',
                                top: '10%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            }
                        ],
                        tooltip: {
                            trigger: 'item'
                        },
                        grid: {
                            top: '16%',
                            right: '3%',
                            left: '5%',
                            bottom: '24%'
                        },
                        xAxis: {
                            type: 'category',
                            color: '#59588D',
                            data: xAxisData,
                            axisLabel: {
                                margin: 10,
                                color: '#fff',
                                textStyle: {
                                    fontSize: 12
                                },
                                interval: 0,
                                rotate:-40
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#fff',
                                }
                            },
                            axisTick: {
                                show: false
                            },
                        },
                        yAxis: {
                            color:"#fff",
                            axisLabel: {
                                color: '#fff',
                                textStyle: {
                                    fontSize: 22
                                },
                            },
                            axisLine: {
                                show:false,
                                lineStyle: {
                                    color: '#fff',
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        series: [{
                            type: 'bar',
                            data: seriesData,
                            cursor: 'default',
                            barWidth: '20px',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#50cef9' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#50cef9' // 100% 处的颜色
                                    }], false),
                                    barBorderRadius: [30, 30, 0, 0],
                                }
                            },
                            label: {
                                show: false,
                                fontSize: 16,
                                fontWeight: 'bold',
                                position: 'top',
                                color: '#50cef9',
                                formatter: (params)=>{//单独对第一个label使用样式
                                    if (params.dataIndex === 0) {
                                        return '{a|'+params.value+'}'
                                    }
                                },
                                rich: {//使用富文本编辑字体样式
                                    // a: {
                                    //     color: 'red',
                                    //     fontSize:26
                                    // }
                                }
                            }
                        }]
                    }
                }
            })
            getNursingExpenses({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let xAxisData = []
                    let seriesData1=[]
                    let seriesData2 = []
                    let nursingExpensesList = res.data.nursingExpensesList
                    this.nursingExpensesNumOne = String(res.data.nursingExpensesNumOne).split("")
                    this.nursingExpensesNumTwo = String(res.data.nursingExpensesNumTwo).split("")
                    if(nursingExpensesList&&nursingExpensesList.length){
                        nursingExpensesList.forEach(item=>{
                            xAxisData.push(item.streetName)
                            seriesData1.push(item.number1)
                            seriesData2.push(item.number2)
                        })
                    }

                    this.nursingOption={
                        grid: {
                            top: '16%',
                            right: '3%',
                            left: '6%',
                            bottom: '24%'
                        },
                        title:[
                            // {
                            //     text: '街道统计',
                            //     left:'2%',
                            //     top:'0%',
                            //     textStyle: {
                            //         fontSize: 26,
                            //         color:'#fff',
                            //     }
                            // },
                            {
                                text: '单位：元',
                                left: '92%',
                                top: '10%',
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
                            top: "6%",
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
                                    fontSize: 22
                                }
                            },
                        }],
                        series: [
                            {
                            name: "养老机构",
                            type: "bar",
                            cursor: 'default',
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

</style>
