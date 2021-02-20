<template>
    <div class="short_width">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">日间照护机构</div>
        </div>
        <div class="onlyDisplay">
            <div class="homePensionLeft">
                <div>
                    <span class="font26">日均服务人次</span>
                    <div class="display mt10">
                        <div class="display">
                            <div v-for="(item,i) in ['5','1','9']" :key="i" class="communityList">{{item}}</div>
                        </div>
                        <!-- <div class="display cursorPointer" @click="showTable(1)">
                            <div v-for="item in pensionNum" :key="item" class="communityList">{{item}}</div>
                        </div> -->
                        <div class="mt15 ml30">
                            <!-- <p class="font18">较上年</p>
                            <span>
                                <span class="font22 brightColor">11562</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span> -->
                        </div>
                    </div>
                </div>
                <div class="mt45 mb45">
                    <span class="font26">服务人员数</span>
                    <div class="display mt10">
                        <div class="display">
                            <div v-for="(item,i) in numberOfPeopleServed" :key="i" class="communityList">{{item}}</div>
                        </div>
                        <div class="mt15 ml30">
                            <!-- <p class="font18">较上年</p>
                            <span>
                                <span class="font22 brightColor">11562</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span> -->
                        </div>
                    </div>
                </div>
                <div>
                    <span class="font26">认知症照护</span>
                    <div class="display mt10">
                        <div v-for="(item,i) in [6, 5]" :key="i" class="communityList">{{item}}</div>
                        <div class="mt15 ml30">
                            <!-- <p class="font18">较上年</p>
                            <span>
                                <span class="font22 brightColor">11562</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="homePensionRight">
                <div class="onlyDisplay font26 cursorPointer">
                    <span class="mr20" :class="index===1?'fontBold':''" @click="changeTab(1)">医养康护</span>
                    <span :class="index===2?'fontBold':''" @click="changeTab(2)">设置形式</span>
                </div>
                <div>
                    <Chart :option="streetOption" :width="width" :height="height" v-if="index===1"/>
                    <Chart :option="styleOption" :width="width" :height="height" v-else/>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="serviceElder">
                <serviceElderTable :close="closeTab"/>
            </div>
            <!-- <div class="toastImg" v-if="servicePersonal">
                <servicePersonalTable :close="closeTab"/>
            </div> -->
        </div>
    </div>
</template>
<script>
import echarts from "echarts"
import Chart from "@/components/Chart"
import {areaCode} from '@/api/areaCode'
import {getRjList} from '@/api/communityInfor'
import serviceElderTable from "./secondScreen/serviceElderTable"
// import servicePersonalTable from "./secondScreen/servicePersonalTable"

export default {
    components:{Chart,serviceElderTable},
    data(){
        return{
            height:"430px",
            width:"640px",
            index:1,
            streetOption:{},
            styleOption:{},
            pensionNum:[],
            numberOfPeopleServed:[],
            isShowBg:false,
            serviceElder:false,
            servicePersonal:false
        }
    },
    methods:{
        showTable(){
            this.serviceElder = true
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
            this.serviceElder = false
            this.servicePersonal = false
        },
        changeTab(num){
            this.index=num
        },
        //街镇
        getData(){
            getRjList({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let seriesData = []
                    let styleDate = []
                    const {pensionNum,numberOfPeopleServed,medicine,raise,kang,protect,smtype1,smtype5,smtype2,smtype4,smtype3} = res.data
                    this.pensionNum = String(pensionNum).split('')
                    // this.numberOfPeopleServed = String(numberOfPeopleServed).split('')
                    this.numberOfPeopleServed = [1, 4, 6]
                    seriesData.push(medicine,raise,kang,protect)
                    styleDate.push(smtype1,smtype5,smtype2,smtype4,smtype3)
                    this.streetOption={
                        title:[
                            {
                                text: '单位:家',
                                left: '90%',
                                top: '3%',
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
                            top: '12%',
                            right: '2%',
                            left: '8%',
                            bottom: '8%'
                        },
                        xAxis: {
                            type: 'category',
                            color: '#59588D',
                            data: ['医','养','康','护'],
                            axisLabel: {
                                margin: 10,
                                color: '#fff',
                                textStyle: {
                                    fontSize: 22
                                }
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
                                    fontSize: 16
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
                            // data:[30,50,70,90],
                            barWidth: '20px',
                            itemStyle: {
                                normal: {
                                    color:(params)=>{
                                        let colors = ['#50cef9','#f9544a','#13d9a3','#ffe400']
                                        return colors[params.dataIndex]
                                    },
                                    barBorderRadius: [30, 30, 0, 0],
                                }
                            },
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold',
                                position: 'top',
                                color: '#fff',
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
                    this.styleOption = {
                        title:[
                            {
                                text: '单位:家',
                                left: '90%',
                                top: '3%',
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
                            top: '12%',
                            right: '2%',
                            left: '8%',
                            bottom: '15%'
                        },
                        xAxis: {
                            type: 'category',
                            color: '#59588D',
                            data: ['单独设置','长照同址','综合为老同址','养老机构同址','日照同址'],
                            axisLabel: {
                                margin: 10,
                                color: '#fff',
                                textStyle: {
                                    fontSize: 14
                                },
                                padding:[20,0,0,-20],
                                interval: 0,
                                rotate:-30
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
                                    fontSize: 20
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
                            data: styleDate,
                            // data:[30,50,70,90],
                            barWidth: '20px',
                            itemStyle: {
                                normal: {
                                    color:(params)=>{
                                        let colors = ['#50cef9','#f9544a','#13d9a3','#ffe400']
                                        return colors[params.dataIndex]
                                    },
                                    barBorderRadius: [30, 30, 0, 0],
                                }
                            },
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold',
                                position: 'top',
                                color: '#fff',
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
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    .homePensionLeft{
        border-right:1px dashed #0eafb5;
        height:500px;
        padding:20px 0 0 0;
        width:460px;
    }
    .fontBold{
        font-weight: bold;
    }
    .homePensionRight{
        padding: 20px 0 0 30px;
    }
</style>
