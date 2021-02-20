<template>
    <div class="short_width">
        <div class="elderInforTitle">
            <div class="inforTitleImg" style="cursor: inherit">老年活动室(银龄之家)</div>
        </div>
        <div>
            <Chart :option="streetOption" :height="height" :width="width"/>
        </div>
    </div>
</template>
<script>
import echarts from "echarts"
import Chart from "@/components/Chart"
import {areaCode} from '@/api/areaCode'
import {getElderlyActivity} from '@/api/communityInfor'

export default {
    components:{Chart},
    data(){
        return{
            height:"480px",
            width:"1100px",
            index:1,
            streetOption:{}
        }
    },
    methods:{
        changeTab(num){
            this.index=num
        },
        //街镇
        getStreet(){
            getElderlyActivity({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let xAxisData = []
                    let seriesData = []
                    let dataList = res.data
                    if(dataList&&dataList.length){
                        dataList.forEach(item=>{
                            xAxisData.push(item.streetName)
                            seriesData.push(item.number)
                        })
                    }
                    this.streetOption={
                        title:[
                            {
                                text: '街镇分布',
                                left: '0%',
                                top: '4%',
                                textStyle: {
                                    fontSize: 20,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '单位:家',
                                left: '92%',
                                top: '10%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#ccc'
                                }
                            }
                        ],
                        tooltip: {
                            trigger: 'item'
                        },
                        grid: {
                            top: '18%',
                            right: '3%',
                            left: '7%',
                            bottom: '12%'
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
                            cursor: 'default',
                            data: seriesData,
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
                                show: true,
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
        },
    },
    mounted(){
        this.getStreet()
    }
}
</script>
<style lang="scss" scoped>
    .homePensionLeft{
        height:500px;
        padding:20px 0 0 0 ;
    }
    .fontBold{
        font-weight: bold;
    }
</style>
