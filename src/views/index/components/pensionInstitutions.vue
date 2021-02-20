<template>
    <div class="shortWidth">
        <div class="inforTitle displayFlex">
            <div class="inforTitleImg" @click="toFacilitiesInfor">养老机构</div>
<!--            <div class="inforTitleRight">电弧监控</div>-->
        </div>
        <div class="baseInfor">
            <div class="baseInforTop">
                <div :class="index==1?'activeColor':''" @click="changeDate(1)">基础信息<span class="lineColor" v-if="index==1"></span></div>
                <div :class="index===2?'activeColor':''" @click="changeDate(2)">运营信息<span class="lineColor" v-if="index==2"></span></div>
            </div>
            <div class="institutionsInfor displayFlex">
                <div class="yljg">
                    <div>
                        <div class="font26 mb20">养老机构(家)</div>
                        <!-- <span class="fontColor font32 " @click="openDailog('养老机构')" style="cursor: pointer">{{institutions}}</span> -->
                        <span class="fontColor font32 " @click="openDailog('养老机构')" style="cursor: pointer">52</span>
                    </div>
<!--                    <div class="displayColumn mt40 ml10">-->
<!--                        <span class="font18">较上年</span>-->
<!--                        <span>-->
<!--                            <span class="font22 colorInfor mr5">21</span>-->
<!--                            <span><img src="@/assets/img/up.png" alt=""></span>-->
<!--                        </span>-->
<!--                    </div>-->
                </div>
                <div class="yljg">
                    <div>
                        <div class="font26 mb20">长者照护之家(家)</div>
<!--                        <span class="institutionColor font32" @click="openDailog('长者照护之家')" style="cursor: pointer">{{institutionsNumber}}</span>-->
                        <span class="institutionColor font32" @click="openDailog('长者照护之家')" style="cursor: pointer">15</span>
                    </div>
<!--                    <div class="displayColumn mt40 ml10">-->
<!--                        <span class="font18">较上年</span>-->
<!--                        <span>-->
<!--                            <span class="font22 colorInfor mr5">21</span>-->
<!--                            <span><img src="@/assets/img/up.png" alt=""></span>-->
<!--                        </span>-->
<!--                    </div>-->
                </div>
                <div class="yljg">
                    <div>
                        <div class="font26 mb20">入住老人(人)</div>
<!--                        <span class="font32 rzlr" style="cursor: pointer" @click="openCheckDailog">{{elderCount}}</span>-->
                        <span class="font32 rzlr" style="cursor: pointer" @click="openCheckDailog">8462</span>
                    </div>
                </div>
                <div class="yljg">
                    <div>
                        <div class="font26 mb20">入住率(%)</div>
                        <!-- <span class="yellowColor font32 ">{{getRaig()}}</span> -->
                        <span class="yellowColor font32 ">64%</span>
                    </div>
                </div>
            </div>
            <div v-if="index==1" class="yljg">
                <div class="baseLeft">
                    <div class="mb40">
                        <div class="mb20">医养融合(家)</div>
                        <div class="display">
                            <div class="listInfor institutionColor font36" v-for="(item,i) in ylrh" :key="i">{{item}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="mb20">机构社区融合(家)</div>
                        <div class="display">
                            <div class="listInfor institutionColor font36" v-for="(item,i) in jgsqrh" :key="i">{{item}}</div>
                        </div>
                    </div>
                </div>
                <div class="baseRight">
                    <Chart :option="streetOption" :height="height" :width="width"/>
                </div>
            </div>
            <div v-if="index==2" class="displayFlexNormal">
                <div class="operation ">
                   <div class="operationDW"><span>运营形式</span><span class="font16 dw">单位：个</span></div>
                   <div style="height:270px;">
                        <Chart :option="operateOptions" :height="optionHeight"/>
                   </div>
                </div>
                <div class="badInfor">
                    <div>
<!--                        <Chart :option="options" :height="optionHeight"/>-->
                        <div class="display">
                            <div class="halfWidth">
                                <Chart :option="badOneOption" width="350px"/>
                            </div>
                            <div class="halfWidth">
                                <Chart :option="badTwoOption" width="350px"/>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
        <olderOrgan :close="closeDailog" :title="title" v-if="isShow"></olderOrgan>
        <div class="bg" v-if="isCheckShow" @click.self="closeCheckDailog">
            <div class="toastImg">
                <checkinTable :close="closeCheckDailog" ></checkinTable>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getInstitutionCount,getInstitutionNumber,getTotalNumberOfOperatingFormsElderly,getTotalNumberOfOperatingFormsPension,getRatio,getBeds,getAssort,getStreet} from "@/api/pensionInstitutions"
import {areaCode} from '@/api/areaCode'
import olderOrgan from "./homeDailog/olderOrgan";
import  checkinTable from "./facilitiesInfor/secondScreen/checkinTable"
export default {
    components:{Chart, olderOrgan, checkinTable},
    data(){
        return {
            isCheckShow: false,
            ylrh:[3,2],
            jgsqrh:[1,6],
            index: 1,
            height:'320px',
            width:'1280px',
            optionHeight:'280px',
            institutions: 0,
            institutionsNumber:0,
            numberOfNursing: 0,
            maintenanceRatio: 0,
            evaluationLevel: {
                firstLevel: 0,
                secondary: 0,
                third_grade: 0

            },
            elderCount:0,
            total:0,
            streetOption:{
                grid: {
                    left: '7%',
                    bottom:'25%'
                },
                title:[
                    {
                        text: '街镇分布',
                        left:'5%',
                        textStyle: {
                            fontSize: 22,
                            color:'#fff'
                        },
                    },
                    {
                        text: '单位:家',
                        left:'85%',
                        top:'10%',
                        textStyle: {
                            fontSize: 16,
                            color:'#fff'
                        },
                    },

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
                    top: "2%",
                    textStyle: {
                    color: "#fff",
                    fontSize: 16
                    }
                },
                xAxis: {
                    data: [],
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
                                color: '#13d9a3' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#13d9a3' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                        }
                    },
                    data: []
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
                                color: '#ffd53a' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#ffd53a' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                        }
                    },
                    data: []
                    }
                ]
            },
            options: {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '10%',
                    right:'3%'
                },                // legend: {
                title:[
                    {
                        text: '单位:个',
                        left: '81%',
                        top: '0%',
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
                    data: ['一般', '认知症', '已用', '空余'],
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#ffffff", //X轴文字颜色
                            fontSize: 16,
                            marginTop: 10
                        }
                    },

                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ',
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#ccc"
                        },
                    },
                }],
                series: [{
                        name: '养老机构',
                        type: 'line',
                        data: [],
                        lineStyle: {
                            normal: {
                                width: 5,
                                color: {
                                    type: 'linear',

                                    colorStops: [{
                                        offset: 0,
                                        color: '#ffe640' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#ffe640' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ffce14',
                                borderWidth: 8,
                                borderColor: "#ffce14"
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(255,206,20,0.9)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,206,20,0.2)'
                                    }
                                ], false)
                            }
                        }
                    },
                    {
                        name: '长者照护之家',
                        type: 'line',
                        data: [],
                        lineStyle: {
                            normal: {
                                width: 5,
                                color: {
                                    type: 'linear',
                                    colorStops: [{
                                        offset: 0,
                                        color: '#1cefe9' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#1cefe9' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#1cefe9',
                                borderWidth: 8,
                                borderColor: "#1cefe9"
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(28,239,233,0.9)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(28,239,233,0.2)'
                                    }
                                ], false)
                            }
                        },
                    }
                ]
            },
            operateOptions:{
                color: ['#3e6591', '#eb7d22', '#d73f45'],
                grid: {
                    left: '12%',
                    top:10,
                    bottom:30,
                },
                xAxis: {
                    show: false,
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: [{
                    axisTick: {
                        show: false,
                        alignWithLabel: false,
                        length: 5,
                    },
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ffffff',
                        }
                    },
                    axisLabel:{
                        textStyle: {
                            fontSize: 18
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: ['公建公营', '公建民营', '民建民营', '民办工商']
                }],
                series: [{
                    type: 'bar',
                    name: "养老机构",
                    cursor: 'default',
                    color: '#50cef9',
                    barWidth: 20,
                    data: [8,27,20,4],
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            textStyle: {color: '#ffe640'},
                            formatter: '{c}',
                            fontSize: 20,
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [30, 30, 30, 30],
                        }
                    },
                }]
            },
            title: '',
            isShow: false,
            badOneOption: {},
            badTwoOption: {},
            cognitionNum: ''
        }
    },
    methods:{
        getBed() {
            getBeds({
                areaCode: areaCode
            }).then(res =>{
                if (res.code === 0) {
                    this.bedUseNumber = res.data.pensionAgency.used + res.data.elderlyCareHome.used
                    this.bedSpareNumber = res.data.pensionAgency.spare + res.data.elderlyCareHome.spare
                    this.cognitionNum = res.data.pensionAgency.cognition + res.data.elderlyCareHome.cognition
                    this.total=res.data.pensionAgency.total+res.data.elderlyCareHome.total
                    let usePro = (this.bedSpareNumber/(this.bedUseNumber + this.bedSpareNumber)).toFixed(2)
                    let sparePro = 1-usePro
                    this.badOneOption = {
                        title:[{
                            text: "已用床位",
                            x: "35%",
                            y: "65%",
                            textStyle: {
                                fontSize: 22,
                                color: "#fff"
                            }
                        }
                        ],
                        // x轴
                        xAxis:{
                            show:false, // 不显示
                        },
                        // y轴
                        yAxis: {
                            show:false, // 不显示
                        },
                        grid:{
                            top:'2.5%',
                            right:'40',
                            bottom:'2.5%',
                            left:0,
                        },
                        series: [{
                            cursor: 'default',
                            type: 'liquidFill',
                            radius: '50%',  // 半径大小
                            center: ['50%', '33%'],    // 布局位置
                            // data:[usePro,usePro,usePro], // 水球波纹值
                            data:[0.64,0.64,0.64],
                            backgroundStyle: {
                                color: {
                                    type: 'linear',
                                    colorStops: [{
                                        offset: 1,
                                        color: '#193651'
                                    }],
                                    globalCoord: false
                                },
                            },
                            outline: { // 轮廓设置
                                show: true,
                                borderDistance: 2, // 轮廓间距
                                itemStyle: {
                                    borderColor: '#33b0bb', // 轮廓颜色
                                    borderWidth: 2, // 轮廓大小
                                    shadowBlur: 'none', // 轮廓阴影
                                }
                            },
                            color: [{
                                colorStops: [{
                                    offset: 1,
                                    color: 'rgba(36, 215, 217, 1)'
                                },{
                                    offset: 0,
                                    color: 'rgba(36, 215, 217, 1)'
                                }],
                                globalCoord: false
                            }],
                            label: {
                                normal: {
                                    // formatter: '{c}',
                                    color: '#fff', //波浪上文本颜色
                                    insideColor: '#fff', //波浪内部字体颜色
                                    fontSize: 30
                                }
                            }
                        }]
                    }
                    this.badTwoOption = {
                        title:[{
                            text: "空余床位",
                            x: "35%",
                            y: "65%",
                            textStyle: {
                                fontSize: 22,
                                color: "#fff"
                            }
                        }
                        ],
                        // x轴
                        xAxis:{
                            show:false, // 不显示
                        },
                        // y轴
                        yAxis: {
                            show:false, // 不显示
                        },
                        grid:{
                            top:'2.5%',
                            right:'40',
                            bottom:'2.5%',
                            left:0,
                        },
                        series: [{
                            type: 'liquidFill',
                            cursor: 'default',
                            radius: '50%',  // 半径大小
                            center: ['50%', '33%'],    // 布局位置
                            // data:[sparePro,sparePro,sparePro], // 水球波纹值
                            data:[0.36,0.36,0.36],
                            backgroundStyle: {
                                color: {
                                    type: 'linear',
                                    colorStops: [{
                                        offset: 1,
                                        color: '#193651'
                                    }],
                                    globalCoord: false
                                },
                            },
                            outline: { // 轮廓设置
                                show: true,
                                borderDistance: 2, // 轮廓间距
                                itemStyle: {
                                    borderColor: '#33b0bb', // 轮廓颜色
                                    borderWidth: 2, // 轮廓大小
                                    shadowBlur: 'none', // 轮廓阴影
                                }
                            },
                            color: [{
                                colorStops: [{
                                    offset: 1,
                                    color: 'rgba(36, 215, 217, 1)'
                                },{
                                    offset: 0,
                                    color: 'rgba(36, 215, 217, 1)'
                                }],
                                globalCoord: false
                            }],
                            label: {
                                normal: {
                                    // formatter: '{c}',
                                    color: '#fff', //波浪上文本颜色
                                    insideColor: '#fff', //波浪内部字体颜色
                                    fontSize: 30
                                }
                            }
                        }]
                    }
                }
            })
        },
        openCheckDailog() {
            this.isCheckShow = true
        },
        closeCheckDailog() {
            this.isCheckShow = false
        },
        openDailog(title) {
            this.title = title
            this.isShow = true
        },
        closeDailog() {
            this.isShow = false
        },
        toFacilitiesInfor(){
            this.$router.push('/facilitiesInfor')
        },
        getRaig(){
            if(this.elderCount/this.total*100>0){
                return (this.elderCount/this.total*100).toFixed(2)
            }else{
                return 0
            }
        },
        getBeds() {
            getBeds({
                areaCode: areaCode
            }).then(res =>{
                if (res.code === 0) {
                    this.total=res.data.pensionAgency.total+res.data.elderlyCareHome.total
                    // this.options.series[0].data = [res.data.pensionAgency.general, res.data.pensionAgency.cognition, res.data.pensionAgency.used, res.data.pensionAgency.spare]
                    this.options.series[0].data = [1782, res.data.pensionAgency.cognition, res.data.pensionAgency.used, res.data.pensionAgency.spare]
                    // this.options.series[1].data = [res.data.elderlyCareHome.general, res.data.elderlyCareHome.cognition, res.data.elderlyCareHome.used, res.data.elderlyCareHome.spare]
                    this.options.series[1].data = [1782, res.data.elderlyCareHome.cognition, res.data.elderlyCareHome.used, res.data.elderlyCareHome.spare]
                }
            })
        },
        getRatio() {
            getRatio({
                areaCode: areaCode
            }).then(res =>{
                if (res.code === 0) {
                    this.maintenanceRatio = String(res.data.maintenanceRatio).split("")
                }
            })
        },
        changeDate(num){
            this.index=num
        },
        getStreet(){
            getStreet({areaCode: areaCode}).then(res=>{
                if(res.code==0){
                    if(res.data.elderlyCareHomeList&&res.data.elderlyCareHomeList.length){
                        let data = res.data.elderlyCareHomeList
                        let pensionAgencyStreetVoList = res.data.pensionAgencyStreetVoList
                        pensionAgencyStreetVoList.forEach(item=>{
                            this.streetOption.series[0].data.push(item.number)
                        })
                        data.forEach(item=>{
                            this.streetOption.xAxis.data.push(item.streetName)
                            this.streetOption.series[1].data.push(item.number)
                        })
                    }
                }
            })
        },
        //养老机构
        getInstitution() {
            // 养老机构总数统计
            // getInstitutionCount({areaCode: areaCode,orgType:'1010'}).then(res => {
            //     if (res.code===0){
            //         this.institutions = res.data
            //     }
            // })
            getInstitutionNumber({areaCode: areaCode,orgType:'1011'}).then(res=>{
                if(res.code==0){
                    this.institutionsNumber = res.data
                }
            })
            getAssort({areaCode: areaCode,orgType:'service_10XX'}).then(res=>{
                if(res.code==0){
                    this.elderCount = res.data.total
                }
            })
            // 养老机构 图形 养老机构
            // 民建民营	op_mode_3
            // 公建民营	op_mode_2
            // 公建公营	op_mode_1
            getTotalNumberOfOperatingFormsPension({areaCode: areaCode, orgType: '1010'}).then(res => {
                if (res.code === 0) {
                    for (var prop in res.data) {
                        if (res.data.hasOwnProperty(prop)) {
                            // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
                            //alert("prop: " + prop + " value: " + res.data[prop])
                            // this.operateOptions.series[0].data.push(res.data[prop])
                        }
                    }
                }
            })
            // 养老机构 图形 长者照护
            // 民建民营	op_mode_3
            // 公建民营	op_mode_2
            // 公建公营	op_mode_1
            getTotalNumberOfOperatingFormsElderly({areaCode: areaCode, orgType: '1011'}).then(res => {
                if (res.code === 0) {
                    for (var prop in res.data) {
                        if (res.data.hasOwnProperty(prop)) {
                            // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
                            // alert("prop: " + prop + " value: " + res.data[prop])
                            // this.operateOptions.series[1].data.push(res.data[prop])
                        }
                    }
                }
            })
        }
    },
    mounted(){
        this.getInstitution()
        this.getRatio()
        this.getBeds()
        this.getStreet()
        this.getBed()
    }
}
</script>
<style lang="scss" scoped>
.gradeInfor{
    height:220px;
    margin-top:20px;
}
.yljg{
    display: flex;
}
.rzlr{
    color:#fc7a3c;
    font-family: Helvetica;
    // letter-spacing: 5px;
}
// .yellow{
//   color:#ffd535;
// }
.baseLeft{
    width:280px;height:305px;border-right:1px dashed #00fff8;
}
.baseRight{
    width:1167px;
    height:300px;
}
.operation{
    width:50%;
    height:305px;
    border-right:1px dashed #48ecf5;
}
.operationDW{
    position: relative;
    .dw{
        position: absolute;
        right:20px;
        bottom:-5px
    }
}
.badInfor{
    width:50%;
    padding-left:40px;
}
.institutionsInfor{
    height:100px;margin-bottom: 25px;
}
</style>
