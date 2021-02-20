<template>
<div>
    <div class="shortWidthStyle shortWidthStyles onlyDisplay">
        <div class="halfWidth communityInfor">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">社区养老</div>
            </div>
            <div class="communityInforLeft">
                <div class="displayFlex">
                    <div class="display">
                        <span><img src="@/assets/img/zhwl.png" alt=""></span>
                        <span class="font24 ml20">社区综合为老服务中心</span>
                    </div>
                    <div>
                        <span class="font26 fontFamily greenColor">8137</span>
                        <span class="font16">(日均服务人次)</span>
                    </div>
                </div>
                <div class="displayFlex">
                    <div class="display">
                        <span><img src="@/assets/img/zcd.png" alt=""></span>
                        <span class="font24 ml20">助餐点</span>
                    </div>
                    <div>
                        <span class="font26 fontFamily beigeColor">10414</span>
                        <span class="font16">(日均服务人次)</span>
                    </div>
                </div>
                <div class="displayFlex">
                    <div class="display">
                        <span><img src="@/assets/img/rjzh.png" alt=""></span>
                        <span class="font24 ml20">日间照护</span>
                    </div>
                    <div>
                        <span class="font26 fontFamily pinkColor">519</span>
                        <span class="font16">(日均服务人次)</span>
                    </div>
                </div>
                <div class="displayFlex">
                    <div class="display">
                        <span><img src="@/assets/img/mld.png" alt=""></span>
                        <span class="font24 ml20">睦邻点</span>
                    </div>
                    <div>
                        <span class="font26 fontFamily skyRedColor">841</span>
                        <span class="font16">(日均服务人次)</span>
                    </div>
                </div>
                <!-- <div class="displayFlex">
                    <div class="display">
                        <span><img src="@/assets/img/ylgw.png" alt=""></span>
                        <span class="font24 ml20">养老顾问点</span>
                    </div>
                    <div>
                        <span class="font26 fontFamily skyBlueColor">789</span>
                        <span class="font16">(日均服务人次)</span>
                    </div>
                </div> -->
                <div class="displayFlex">
                    <div class="display">
                        <span><img src="@/assets/img/lnhd.png" alt=""></span>
                        <span class="font24 ml20">老年活动室(银龄之家)</span>
                    </div>
                    <div>
                        <span class="font26 fontFamily yellowColor">12248</span>
                        <span class="font16">(日均服务人次)</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="halfWidth communityInfor">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">智慧养老</div>
            </div>
            <div class="communityInforRight">
                <div class="baseInforTop">
                    <div :class="index==1?'activeColor':''" @click="changeDate(1)">生活服务<span class="lineColor" v-if="index==1"></span></div>
                    <div :class="index===2?'activeColor':''" @click="changeDate(2)">主动关爱<span class="lineColor" v-if="index==2"></span></div>
                    <div :class="index===3?'activeColor':''" @click="changeDate(3)">紧急救援<span class="lineColor" v-if="index==3"></span></div>
                    <div :class="index===4?'activeColor':''" @click="changeDate(4)">智能终端<span class="lineColor" v-if="index==4"></span></div>
                </div>
                <div class="display mt30" v-if="index==1">
                    <div class="font26 mr20">服务总人次</div>
                    <div class="display numberList cursorPointer" @click="showTable(1)">
                        <!-- <div v-for="(item,i) in activeCarePension" :key="i">{{item}}</div> -->
                        <div v-for="(item,i) in ['1','6','7','3','3']" :key="i">{{item}}</div>
                    </div>
                    <div class="mt10 ml20">
                        <!-- <p class="font18">较上年</p>
                        <span class="font22 brightColor">6353</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </div>
                </div>
                <div class="displayFlex mt30 mb10" v-if="index==2">
                    <div class="display">
                        <span class="font26 mr20">服务工单数(单)</span>
                        <span class="font30 fontFamily beigeColor cursorPointer" @click="showTable(2)">{{activeCareOrder}}</span>
                    </div>
                    <div class="display">
                        <span class="font26 mr20">服务人次</span>
                        <!-- <span class="font30 fontFamily beigeColor cursorPointer" @click="showTable(3)">{{activeCareNum}}</span> -->
                        <span class="font30 fontFamily beigeColor cursorPointer" @click="showTable(3)">857329</span>
                    </div>
                </div>
                <div class="displayFlex mt30" v-if="index==3">
                    <div class="display">
                        <span class="font26 mr20">话务量(通)</span>
                        <span class="font30 fontFamily beigeColor cursorPointer" @click="showTable(4)">{{trafficVolume}}</span>
                    </div>
                    <div class="display">
                        <span class="font26 mr20">服务老人数(人)</span>
                        <span class="font30 fontFamily beigeColor cursorPointer" @click="showTable(5)">{{servingTheElderly}}</span>
                    </div>
                </div>
                <div v-if="index==1">
                    <Chart :option="streetOption" :height="height" :width="widht"/>
                </div>
                <div v-if="index==2">
                    <Chart :option="careOption" :height="height" :width="widht"/>
                </div>
                <div v-if="index==3">
                    <h4 class="font26 mt25">求助人员统计</h4>
                    <div class="jjjy">
                        <div>
                            <div>
                                <span class="font14">今日求助人数</span>
                                <span class="fontFamily orangeYellowColor font18">{{dataInfor.todaySHelp}}</span>
                            </div>
                            <div>
                                <span class="font14">累计求助人次</span>
                                <!-- <span class="fontFamily lightGreenColor font18">{{dataInfor.rescueTotal}}</span> -->
                                <span class="fontFamily lightGreenColor font18">63344</span>
                            </div>
                        </div>
                        <div class="mt120">
                            <div>
                                <span class="font14">今日援助人数</span>
                                <span class="fontFamily lightGreenColor font18">{{dataInfor.aidToday}}</span>
                            </div>
                            <div>
                                <span class="font14">累计援助人次</span>
                                <!-- <span class="fontFamily lightGreenColor font18">{{dataInfor.assistanceTotal}}</span> -->
                                <span class="fontFamily lightGreenColor font18">400</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="elder">
                <elderTable :close="closeTab" :type="type" />
            </div>
            <div class="toastImg" v-if="serviceCare">
                <serviceCareTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="trafficVolumes">
                <trafficVolumeTable :close="closeTab"/>
            </div>
        </div>
    </div>
    <div class="bg" v-if="isShowZZ" @click.self="closeTab">
        <div class="toastImg">
            <smartTerminal :close="closeTab"/>
        </div>

    </div>
</div>
</template>
<script>
import {getStreetNumber} from '@/api/elderlyInfor'
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import elderTable from "./secondScreen/elderTable"
import serviceCareTable from "./secondScreen/serviceCareTable"
import trafficVolumeTable from "./secondScreen/trafficVolumeTable"
import {getLift,getCareFor,getCareInfor,getLiftStreet,getHelp,getHelpTotal,getTrafficVolume} from '@/api/elderlyInforDetails'
import smartTerminal from "./secondScreen/smartTerminal"
export default {
    components:{Chart,elderTable,serviceCareTable,trafficVolumeTable,smartTerminal},
    data(){
        return{
            index:1,
            streetOption:{},
            careOption:{},
            orderOption:{},
            height:"340px",
            widht:"700px",
            dataInfor:{},
            activeCarePension:[],
            activeCareNum:0,
            activeCareOrder:0,
            servingTheElderly:0,
            trafficVolume:0,
            isShowBg:false,
            elder:false,
            serviceCare:false,
            trafficVolumes:false,
            type:'',
            isShowZZ:false
        }
    },
    methods:{
        showTable(num){
            this.isShowBg = true
            switch(num){
                case 1:
                    this.type= 1
                    this.elder = true
                    break
                 case 2:
                    this.serviceCare = true
                    break
                case 3:
                    this.type = 3
                    this.elder = true
                    break
                case 4:
                    this.trafficVolumes = true
                    break
                case 5:
                    this.type = 2
                    this.elder = true
                    break
            }
        },
        closeTab(){
            this.isShowBg = false
            this.elder = false
            this.serviceCare = false
            this.trafficVolumes = false
            this.isShowZZ = false
        },
        changeDate(num){
            this.index=num
            if(num==4){
                this.isShowZZ = true
            }
        },
        getData(){
            //生活服务
            // getLift({town:'闵行区'}).then(res=>{
            //     if(res.code==0){
            //         this.activeCarePension = String(res.data.peopleCount).split("")
            //     }
            // })
            //关爱
            getCareFor({town:'闵行区'}).then(res=>{
                if(res.code==0){
                    // this.activeCareNum = res.data.activeCarePension
                    this.activeCareOrder = res.data.activeCareOrder
                }
            })
            //救助
            getHelp({town:'闵行区'}).then(res=>{
                if(res.code==0){
                   this.servingTheElderly = res.data.servingTheElderly
                }
            })
            getTrafficVolume({town:'闵行区'}).then(res=>{
                if(res.code==0){
                    this.trafficVolume = res.data.trafficVolume
                }
            })
            //救助统计
            getHelpTotal({town:'闵行区'}).then(res=>{
                if(res.code == 0){
                    this.dataInfor = res.data
                }
            })
        },
        async getStreetNum(){
            let dataList = []
            await getLiftStreet({area:'新浦江镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'吴泾镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'马桥镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'颛桥镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'梅陇镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'莘庄镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'七宝镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'虹桥镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'华漕镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'浦锦街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'江川路街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'古美街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'新虹街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getLiftStreet({area:'莘庄工业区'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            this.streetOption={
                title:[
                    {
                        text: '街镇分布',
                        left:'0.5%',
                        top:'5%',
                        right:'0%',
                        textStyle: {
                            fontSize: 26,
                            color:'#fff',
                        }
                    },
                    {
                        text: '单位：人',
                        left: '82%',
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
                    left: '6%',
                    bottom: '20%'
                },
                xAxis: {
                    type: 'category',
                    color: '#59588D',
                    data: ["浦江镇","吴泾镇","马桥镇","颛桥镇","梅陇镇","莘庄镇","七宝镇","虹桥镇","华漕镇","浦锦街道","江川路街道","古美街道","新虹街道","莘庄工业区"],
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
                            fontSize: 14
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
                    data: dataList,
                    barWidth: '20px',
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
        },
        async getCareInfo(){
            let dataList=[]
            await getCareInfor({area:'浦江镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'吴泾镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'马桥镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'颛桥镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'梅陇镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'莘庄镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'七宝镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'虹桥镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'华漕镇'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'浦锦街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'江川路街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'古美街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'新虹街道'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            await getCareInfor({area:'莘庄工业区'}).then(res=>{
                if(res.code == 0){
                    dataList.push(res.data.statistics)
                }
            })
            this.careOption={
                title:[
                    {
                        text: '工单分布',
                        left:'0.5%',
                        top:'5%',
                        right:'0%',
                        textStyle: {
                            fontSize: 26,
                            color:'#fff',
                        }
                    },
                    {
                        text: '单位：人',
                        left: '82%',
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
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    color: '#59588D',
                    data: ["浦江镇","吴泾镇","马桥镇","颛桥镇","梅陇镇","莘庄镇","七宝镇","虹桥镇","华漕镇","浦锦街道","江川路街道","古美街道","新虹街道","莘庄工业区"],
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
                            fontSize: 14
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
                    data: dataList,
                    barWidth: '20px',
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
    },
    mounted(){
        this.getData()
        this.getStreetNum()
        this.getCareInfo()
    }
}
</script>
<style lang="scss" scoped>
    .communityInfor{
        padding:0px 30px;
        .communityInforLeft{
            >div{
                border-bottom: 1px dashed #0eafb5;
                line-height: 90px;
            }
            >div:nth-of-type(6){
                border:none
            }
        }
        .numberList{
            div{
                width:48px;height:68px;
                border:1px solid #18ede7;font-size:36px;
                color:#13d9a3;
                font-family: Helvetica;
                line-height:68px;
                text-align: center;
                margin-right:10px;
            }
        }
        .jjjy{
            background:url("../../../../assets/img/jz.png");
            background-size:100% 100%;
            background-repeat: no-repeat;
            height:202px;
            margin-top:30px;
            >div{
                display: flex;
                justify-content: space-between;
                div{
                    width:240px;
                    display: flex;
                    justify-content: space-around;
                }
            }
        }
    }
</style>
