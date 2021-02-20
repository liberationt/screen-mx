<template>
    <div class="short_width">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">睦邻点</div>
        </div>
        <div class="onlyDisplay">
            <div class="halfWidth homePensionLeft">
                <div>
                    <span class="font26">日均服务人次</span>
                    <div class="display mt20">
                        <div class="display">
                            <div v-for="item in ['8','4','1']" :key="item" class="communityList">{{item}}</div>
                        </div>
                        <!-- <div class="display cursorPointer" @click="showTable(1)">
                            <div v-for="item in ['8','4','1']" :key="item" class="communityList">{{item}}</div>
                        </div> -->
                        <!-- <div class="mt15 ml30">
                            <p class="font18">较上年</p>
                            <span>
                                <span class="font22 brightColor">11562</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span>
                        </div> -->
                    </div>
                </div>
                <div class="mt20">
                    <!-- <div class="font26 onlyDisplay cursorPointer">
                        <span class="mr30" :class="index===1?'activeColor':''" @click="changeTab(1)">街镇分布</span>
                        <span :class="index===2?'activeColor':''" @click="changeTab(2)">老人分布</span>
                    </div> -->
                    <div>
                        <Chart :option="streetOption" :height="height" :width="width"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg">
                <serviceElderTable :close="closeTab"/>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts"
import Chart from "@/components/Chart"
import {areaCode} from '@/api/areaCode'
import {getStreetNumber} from '@/api/elderlyInfor'
import serviceElderTable from "./secondScreen/serviceElderTable"

export default {
    components:{Chart,serviceElderTable},
    data(){
        return{
            height:"330px",
            width:"1120px",
            index:1,
            streetOption:{
                title:[
                    {
                        text: '街镇分布',
                        left: '0%',
                        top: '3%',
                        textStyle: {
                            fontSize: 22,
                            color:'#fff'
                        }
                    },
                    {
                        text: '单位:家',
                        left: '92%',
                        top: '7%',
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
                    top: '20%',
                    right: '3%',
                    left: '3%',
                    bottom: '18%'
                },
                xAxis: {
                    type: 'category',
                    color: '#59588D',
                    data: ['浦江镇','吴泾镇','马桥镇','颛桥镇','梅陇镇','莘庄镇','七宝镇','虹桥镇','华漕镇','浦锦街道','江川路街道','古美街道','新虹街道','莘庄工业区'] ,
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
                    data:[16,6,12,6,12,6,8,6,16,6,6,12,18,16],
                    barWidth: '20px',
                    cursor: 'default',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#13d9a3' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#13d9a3' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                        }
                    },
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                        position: 'top',
                        color: '#13d9a3',
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
            },
            isShowBg:false,
        }
    },
    methods:{
        showTable(num){
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
        },
        changeTab(num){
            this.index=num
        },
        //街镇
        getStreet(){
            getStreetNumber({areaCode:areaCode}).then(res=>{
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
    // .fontBold{
    //     font-weight: bold;
    //     color:
    // }
</style>
