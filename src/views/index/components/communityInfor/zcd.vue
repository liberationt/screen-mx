<template>
    <div class="long_width">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">助餐点</div>
        </div>
        <div class="onlyDisplay">
            <div class="pt20">
                <Chart :option="streetOption" :width="streetWisth" :height="streetHeight"/>
            </div>
            <div class="subsidyMoney">
                <!-- <div class="font22">补贴金额</div>
                <p class="textAlgin font16">单位:元</p>
                <div class="elderInforList">
                    <div v-for="(item,i) in dataList" :key="i" class="mb30">
                        <div class="elderNum">{{item.number}}</div>
                        <div class="elderAdd">{{item.streetName}}</div>
                    </div>
                </div> -->
                <Chart :option="mealsOption" :width="streetWisth" :height="streetHeight"/>
            </div>
            <div class="zcdRight">
                <div class="displayFlex font26">
                    <span>
                        <span class="mr20">堂吃人数(人)</span>
                        <span class="fontFamily brightColor">{{eatingHallNum}}</span>
                    </span>
                    <span>
                        <span class="mr20">送餐人数(人)</span>
                        <span class="fontFamily brightColor">{{foodDeliveryNum}}</span>
                    </span>
                </div>
                <div class="font26 mt20">送餐形式</div>
                <div>
                    <Chart :option="rainOption" :width="rainWisth" :height="rainHeight"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getFoodAid,getJzList,getRjList,getDelivery} from '@/api/communityInfor'
export default {
    components:{Chart},
    data(){
        return{
            streetWisth:"770px",
            streetHeight:'480px',
            optionHeight:"400px",
            rainWisth:'740px',
            rainHeight:'370px',
            streetOption:{},
            eatingHallNum:0,
            foodDeliveryNum:0,
            rainOption:{},
            dataList:[],
            mealsOption:{
                title:[
                    {
                        text: '助餐分类',
                        left: '5%',
                        top: '5%',
                        textStyle: {
                            fontSize: 24,
                            color:'#fff'
                        }
                    },
                    {
                        text: '单位：家',
                        left: '86%',
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
                    top: '20%',
                    right: '5%',
                    left: '10%',
                    bottom: '10%'
                },
                xAxis: {
                    type: 'category',
                    color: '#59588D',
                    data: ['助餐点','社会餐饮企业','单位食堂','社区长者食堂'],
                    axisLabel: {
                        margin: 10,
                        color: '#fff',
                        textStyle: {
                            fontSize: 18
                        },
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
                    data: [104,2,1,20],
                    barWidth: '20px',
                    cursor: 'default',
                    itemStyle: {
                        normal: {
                            color:function(params){
                                let colorList = ['#00ffd2','#ff9c00','#00d2ff','#ff4e4e','#03fefe']
                                return colorList[params.dataIndex]
                            },
                            barBorderRadius: [30, 30, 0, 0],
                        }
                    },
                    label: {
                        show: false,
                        fontSize: 16,
                        fontWeight: 'bold',
                        position: 'top',
                        color: '#50cef9',
                    }
                }]
            }
        }
    },
    methods:{
        getData(){
            let xAxisList = []
            let seriesList = [[],[]]
            getJzList({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    res.data.meals.forEach(item=>{
                        xAxisList.push(item.streetName)
                        seriesList[0].push(item.number)
                    })
                    this.streetOption={
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            top: '10%',
                            right:'10%',
                            left:'7%',
                            bottom:'15%'
                        },                // legend: {
                        title:[
                            {
                                text: '设施街道分布',
                                left: '0%',
                                top: '0%',
                                textStyle: {
                                    fontSize: 22,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '单位:个',
                                left: '82%',
                                top: '5%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            }
                        ],
                        toolbox: {
                            show: true,
                        },
                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: xAxisList,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "#ffffff", //X轴文字颜色
                                    fontSize: 14,
                                    marginTop: 10
                                },
                                interval: 0,
                                rotate:-40
                            },
                            axisLine:{
                                show: true,
                                lineStyle: {
                                    color: "#ccc"
                                },
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} ',
                                color: '#ffffff',
                                textStyle: {
                                    fontSize: 20
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "#ccc"
                                },
                            },
                        }],
                        series: [{
                                name: '助餐点',
                                cursor: 'default',
                                type: 'line',
                                data: seriesList[0],
                                lineStyle: {
                                    normal: {
                                        width: 3,
                                        color: {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: '#50cef9' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#50cef9' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#50cef9',
                                        borderWidth: 8,
                                        borderColor: "#50cef9"
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgba(63,161,200,0.9)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(63,161,200,0.2)'
                                            }
                                        ], false)
                                    }
                                }
                            },
                            {
                                name: '社区食堂',
                                type: 'line',
                                data: seriesList[1],
                                lineStyle: {
                                    normal: {
                                        width: 3,
                                        color: {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: '#13d9a3' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#13d9a3' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#13d9a3',
                                        borderWidth: 8,
                                        borderColor: "#13d9a3"
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(28,180,156,0.9)'
                                        },
                                            {
                                                offset: 1,
                                                color: 'rgba(28,180,156,0)'
                                            }
                                        ], false)
                                    }
                                },
                            }
                        ]
                    }
                }
            })
            getFoodAid({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.dataList.push({
                        streetName:'服务总数',
                        number:res.data.totalServices
                    })
                    res.data.meals.forEach(item=>this.dataList.push(item))
                }
            })
            getDelivery({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.eatingHallNum = res.data.eatingHallNum
                    this.foodDeliveryNum = res.data.foodDeliveryNum
                    let yAxisData= []
                    let seriesData1 = []
                    let seriesData2 = []
                    let formOfMealServiceList =  res.data.formOfMealServiceList
                    if(formOfMealServiceList&&formOfMealServiceList.length){
                        formOfMealServiceList.forEach(item=>{
                            yAxisData.push(item.streetName)
                            seriesData1.push(-item.number1)
                            seriesData2.push(item.number2)
                        })
                    }
                    this.rainOption = {
                        legend:{
                            selectedMode: false,
                            data:['堂吃','送餐'],
                            textStyle:{
                                color:'#fff'
                            }
                        },
                        // tooltip（提示框组件）
                        tooltip: {
                            //trigger(触发类型)，可选'item','axis','none'
                            trigger: 'axis',
                            axisPointer: {
                                //指示器类型,可选'line','shadow','cross'
                                type: 'shadow'
                            },
                            // 自定义提示内容
                            formatter: function(a){
                                var v = a[0];
                                return v.name + '<br/>' + v.marker +v.seriesName + '：'+ Math.abs(v.value);
                            }
                        },
                        xAxis: [{
                            type: 'value',
                            // min:-100,max:0,
                            gridIndex: 0,
                            axisTick:{show: false, inside:false},
                            axisLabel : {show: false},
                            axisLine: {// Y轴轴线样式
                                show: false,
                                lineStyle:{
                                    color:'#000',
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        },{
                            type: 'value',
                            gridIndex: 1,
                            // min:0,max:100,
                            axisTick:{show: false}, //是否显示刻度
                            axisLine: {// Y轴轴线样式
                                show: false, // 是否显示X轴
                                lineStyle:{
                                    color:'#000',
                                }
                            },
                            axisLabel : {
                                show: false //是否显示X轴内容
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                        yAxis: [{
                                type: 'category',
                                gridIndex: 0,
                                inverse: true,
                                data: yAxisData,
                                axisTick:{show:false},
                                axisLabel : {show:false,},
                                axisLine: {// Y轴轴线样式
                                    show: false,
                                    lineStyle:{
                                        color:'#000',
                                    }
                                }
                            },{
                                type: 'category',
                                gridIndex: 1,
                                inverse: true,
                                // "浦江","浦江","浦江","浦江","浦江","浦江","浦江","浦江","浦江","浦江","浦江"
                                data: yAxisData,
                                axisTick:{show:false},
                                axisLabel : {
                                    textStyle: {
                                        color: "#ffffff", //X轴文字颜色
                                        fontSize: 12,
                                        marginTop: 10
                                    }
                                },
                                axisLine: {
                                    show: false //是否显示轴线
                                }
                            }
                        ],
                        grid: [{
                            top: 50,
                            width: '38%',
                            left: 35,gridIndex: 0,
                            bottom:10,
                        }, {
                            top: 50,
                            left: '53%',gridIndex: 1,
                            bottom:10,
                        }],
                        series: [
                            {
                                name: '堂吃',
                                type: 'bar',
                                cursor: 'default',
                                barWidth:'15',
                                gridIndex: 0,
                                itemStyle:{
                                    normal: {
                                        show: true,
                                        color: '#1cefe9',
                                        barBorderRadius:50,
                                        borderWidth:0,
                                        borderColor:'#333',
                                        label:{
                                            show:true,position:'left',
                                            formatter:function(v){
                                                return (v.value * -1);
                                            }
                                        }
                                    }
                                },
                                data: seriesData1

                            },
                            {
                                name: '送餐',
                                type: 'bar',
                                cursor: 'default',
                                barWidth:'15',
                                xAxisIndex: 1,
                                yAxisIndex: 1,
                                itemStyle:{
                                    normal: {
                                        show: true,
                                        color: '#f9544a',
                                        barBorderRadius:50,
                                        borderWidth:0,
                                        borderColor:'#333',
                                        label:{
                                            show:true,position:'right',
                                            formatter:function(v){
                                                return v.value;
                                            }
                                        }
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
    .homePensionLeft{
        border-right:1px dashed #0eafb5;
        height:500px;
    }
    .elderInforList{
        height:390px;
        width:738px;
        display: flex;
        flex-wrap: wrap;
    }
    .elderNum{
        width:147px;
        height:68px;
        text-align: center;
        line-height: 68px;
        font-size:22px;
        font-weight: 500;
        color:#13d9a3;
        border-right:1px solid #1ce0dd;
        border-top:1px solid #1ce0dd;
        border-left:1px solid #1ce0dd;
    }
    .elderAdd{
        font-size: 20px;
        text-align: center;
        width:147px;
        height:38px;
        background:#2f4e6e;
        line-height: 38px;
        border:1px solid #1ce0dd;
    }
    .subsidyMoney{
        width:798px;
        // padding:20px 30px;
        border-left: 1px dashed #19dcdb;
        border-right: 1px dashed #19dcdb;
    }
    .zcdRight{
        width:740px;
        padding:20px 0 0 30px;
    }
</style>
