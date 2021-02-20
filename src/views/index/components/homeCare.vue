<template>
    <div class="shortWidth jjly">
        <div class="inforTitle displayFlex">
            <div><img src="@/assets/img/jjyl.png" alt=""></div>
        </div>
        <!-- <div class="baseInfor">
            <div class="baseInforTop">
                <div :class="index==1?'activeColor':''" @click="changeDate(1)">基础信息<span class="lineColor" v-if="index==1"></span></div>
                <div :class="index===2?'activeColor':''" @click="changeDate(2)">街镇分布<span class="lineColor" v-if="index==2"></span></div>
            </div>
            <div v-if="index==1" class="display">
                <div class="saveWidth">
                    <div class="mb20">
                        <h4 class="font26">服务人员（人）</h4>
                        <div class="displayFlex">
                            <div class="font36 yellowColor" style="margin-bottom:-10px">{{serveNumber}}</div>
                            <div>
                                <p class="font18">较上年</p>
                                <span>
                                    <span class="mr5 font20 blueColor" >253</span>
                                    <span><img src="@/assets/img/up.png" alt=""></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="mb20">
                        <h4 class="font26">服务老人数（人）</h4>
                        <div class="displayFlex">
                            <div class="font36 yellowColor" style="margin-bottom:-10px">{{serveOldNumber}}</div>
                            <div>
                                <p class="font18">较上年</p>
                                <span>
                                    <span class="mr5 font20 blueColor" >253</span>
                                    <span><img src="@/assets/img/up.png" alt=""></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font26">服务工单数（单）</h4>
                        <div class="displayFlex">
                            <div class="font36 yellowColor" style="margin-bottom:-10px">{{serveOrderNumber}}</div>
                            <div>
                                <p class="font18">较上年</p>
                                <span>
                                    <span class="mr5 font20 blueColor">253</span>
                                    <span><img src="@/assets/img/up.png" alt=""></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ageOption">
                    <Chart :option="ageOptions"/>
                </div>
            </div>
            <div v-if="index==2">
                <div>
                    <Chart :option="streetOptions"/>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import echarts from "echarts"
// import Chart from "@/components/Chart"
import { getServeNumber,getServeOldNumber,getOrderNumber,getAgeRange,getStreetRange } from '@/api/homeCare'
import {areaCode} from '@/api/areaCode'
export default {
    // components:{Chart},
    data(){
        return{
            index:1,
            serveNumber:0,
            serveOldNumber:0,
            serveOrderNumber:0,
            streetOptions:{},
            ageOptions:{}
        }
    },
    methods:{
        changeDate(num){
            this.index=num
        },
        //服务人员
        getServe(){
            getServeNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveNumber = res.data
                }
            })
        },
        //老人
        getOlder(){
            getServeOldNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveOldNumber=res.data
                }
            })
        },
        // 工单
        getOrder(){
            getOrderNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveOrderNumber = res.data
                }
            })
        },
        //年龄分布
        getRange(){
            getAgeRange({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let data = []
                    if(res.data&&res.data.length){
                        res.data.forEach(item=>{
                            data.push({
                                name:item.key,
                                value:item.value,
                                per:item.per
                            })
                        })
                        var arrName = this.getArrayValue(data, "name");
                        var arrValue = this.getArrayValue(data, "value");
                        var sumValue = eval(arrValue.join('+'));
                        var objData = this.array2obj(data, "name");
                        var optionData = this.getData(data,sumValue)
                        this.ageOptions={
                            legend: {
                                type: 'scroll',
                                orient: 'vertical',
                                top: 'center',
                                right: 30,
                                textStyle: {
                                    color: 'red',
                                    fontSize: 25,
                                },
                                data: arrName,
                                formatter(name) {
                                    let res = data.filter(v => v.name === name);
                                    res = res[0];
                                    return `{uname|${name}}{unum|${res.value}}`
                                },
                                textStyle: {
                                    color: '#77899c',
                                    rich: {
                                        uname: {
                                            width: 100,
                                            fontSize:20,
                                            color:'#fff',
                                            lineHeight:35
                                        },
                                        unum: {
                                            color: '#4ed139',
                                            fontSize:20,
                                            width: 100,
                                            align: 'right'
                                        }
                                    }
                                },
                            },
                            tooltip: {
                                show: true,
                                trigger: "item",
                                formatter: "{a}<br>{b}:{c}({d}%)"
                            },
                            color: ['#ff3427', '#2f88e7', '#ffce14', '#ff2e90','#13d9a3'],
                            grid: {
                                top: '16%',
                                bottom: '53%',
                                left: "30%",
                                containLabel: false
                            },
                            yAxis: [{
                                type: 'category',
                                inverse: true,
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    interval: 0,
                                    inside: true,
                                    textStyle: {
                                        color: "#fff",
                                        fontSize: 16,
                                    },
                                    show: true
                                },
                                data: optionData.yAxis
                            }],
                            xAxis: [{
                                show: false
                            }],
                            series: optionData.series
                        }
                    }
                }
            })
        },
        //处理年龄分布数据
        getArrayValue(array, key) {
            var key = key || "value";
            var res = [];
            if (array) {
                array.forEach(function(t) {
                    res.push(t[key]);
                });
            }
            return res;
        },
         //处理年龄分布数据
        array2obj(array,key){
            var resObj = {};
            for(var i=0;i<array.length;i++){
                resObj[array[i][key]] = array[i];
            }
            return resObj;
        },
         //处理年龄分布数据
        getData(data,sumValue){
            var res = {
                series: [],
                yAxis: []
            };
            for (let i = 0; i < data.length; i++) {
                res.series.push({
                    name: '',
                    type: 'pie',
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
                    center: ["30%", "55%"],
                    label: {
                        show: false
                    },
                    itemStyle: {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 5,
                    },
                    data: [{
                        value: data[i].value,
                        name: data[i].name
                    }, {
                        value: sumValue - data[i].value,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }]
                });
                res.series.push({
                    name: '',
                    type: 'pie',
                    silent: true,
                    z: 1,
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
                    center: ["30%", "55%"],
                    label: {
                        show: false
                    },
                    itemStyle: {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 5,
                    },
                    data: [{
                        value: 7.5,
                        itemStyle: {
                            color: "#0b357b",
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }, {
                        value: 2.5,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }]
                });
                res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
            }
            return res;
        },
        //街镇分布
        getStreet(){
            getStreetRange({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let xAxisData = []
                    let seriesData = []
                    let dataList = res.data
                    if(dataList&&dataList.length){
                        dataList.forEach(item=>{
                            xAxisData.push(item.key)
                            item.value = (item.value/10000).toFixed(2)
                            seriesData.push(item.value)
                        })
                    }
                    this.streetOptions={
                        title:{
                            text: '居家养老分布统计',
                            left:'2%',
                            textStyle: {
                                fontSize: 20,
                                color:'#fff'
                            },
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        grid: {
                            top: '20%',
                            right: '1%',
                            left: '6%',
                            bottom: '10%'
                        },
                        xAxis: {
                            type: 'category',
                            color: '#59588D',
                            data: xAxisData,
                            axisLabel: {
                                margin: 20,
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
                            name:'单位：万人',
                            nameTextStyle:{
                                color:"#fff",
                                fontSize:20,
                                align:'left',
                                padding:[0,0,0,-35]
                            },
                            color:"#fff",
                            axisLabel: {
                                // formatter: '{value}%',
                                color: '#fff',
                                textStyle: {
                                    fontSize: 22
                                },
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(107,107,107,0.37)',
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(131,101,101,0.2)',
                                    type: 'dashed',
                                }
                            }
                        },
                        series: [{
                            type: 'bar',
                            data: seriesData,
                            barWidth: '20px',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#ffce14' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#d4aa0c' // 100% 处的颜色
                                    }], false),
                                    barBorderRadius: [30, 30, 0, 0],
                                }
                            },
                            label: {
                                show: true,
                                fontSize: 26,
                                fontWeight: 'bold',
                                position: 'top',
                                color: '#ffce14',
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
        }
    },
    mounted(){
        this.getServe()
        this.getOlder()
        this.getOrder()
        this.getRange()
        this.getStreet()
    }
}
</script>
<style lang="scss" scoped>
.saveWidth{
    width:405px;
    height:350px;
    padding-right:70px;
    border-right:1px dashed #4cf9ff;
    p{
        margin:0 0 3px 0;
    }
}
.ageOption{
    width:690px;
}
</style>