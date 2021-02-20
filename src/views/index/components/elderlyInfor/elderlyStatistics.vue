<template>
    <div class="longWidthStyle">
        <div class="elderInforTitle pl30 pr30">
            <div class="inforTitleImg" style="cursor: inherit">老人统计</div>
        </div>
        <div class="pt20">
            <div class="displayFlex  pl30 pr10 mb50">
                <div>
                    <h4 class="font26 mb15">老龄化占比(%)</h4>
                    <div class="onlyDisplay">
                        <div v-for="(item,i) in list" :key="i" class="numberList">{{item}}</div>
                    </div>
                    <div class="mt20 textAlgin mr20">
                        <!-- <span class="font22">较上年</span>
                        <span class="font28 brightColor ml20 mr10">0.68%</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </div>
                </div>
                <div>
                    <h4 class="font26 mb15">男</h4>
                    <div class="onlyDisplay cursorPointer" @click="showTable(1)">
                        <!-- <div v-for="(item,i) in form.menCount" :key="i" class="numberList">{{item}}</div> -->
                        <div v-for="(item,i) in ['1','7','5','1','9','0']" :key="i" class="numberList">{{item}}</div>
                    </div>
                    <div class="mt20 textAlgin mr20">
                        <!-- <span class="font22">较上年</span>
                        <span class="font28 brightColor ml20 mr10">0.68%</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </div>
                </div>
                <div>
                    <h4 class="font26 mb15">女</h4>
                    <div class="onlyDisplay cursorPointer" @click="showTable(2)">
                        <!-- <div v-for="(item,i) in form.womenCount" :key="i" class="numberList">{{item}}</div> -->
                        <div v-for="(item,i) in ['1','9','6','9','7','7']" :key="i" class="numberList">{{item}}</div>
                    </div>
                    <div class="mt20 textAlgin mr20">
                        <!-- <span class="font22">较上年</span>
                        <span class="font28 brightColor ml20 mr10">0.68%</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </div>
                </div>
            </div>
            <div class="pl30 pr30 onlyDisplay" style="border-bottom:1px dashed #0aaeb5">
                <div class="halfWidth" style="border-right:1px dashed #0aaeb5">
                    <Chart :option="option" :height="optionHeight"/>
                </div>
                <div class="halfWidth">
                    <div class="baseInforTop">
                        <div :class="index==1?'activeColor':''" @click="changeDate(1)">年龄分布<span class="lineColor" v-if="index==1"></span></div>
                        <div :class="index===2?'activeColor':''" @click="changeDate(2)">街镇分布<span class="lineColor" v-if="index==2"></span></div>
                        <div :class="index===3?'activeColor':''" @click="changeDate(3)">老人分类<span class="lineColor" v-if="index==3"></span></div>
                    </div>
                    <div>
                        <div v-if="index==1">
                            <Chart :option="ageOption" :height="height" :isClick="true" @showAgeToast="showAgeToast"/>
                        </div>
                        <div v-if="index==2">
                            <Chart :option="streetOption" :height="height"/>
                        </div>
                        <div v-if="index==3">
                            <Chart :option="elderOption" :height="height"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pl30 pr30 pt30">
                <div class="displayFlex mb50">
                    <h3 class="font26">支付保障</h3>
                    <!-- <div class="font26 onlyDisplay">
                        <span class="mr20 cursorPointer" :class="typeMoney=='money'?'activeColor':''" @click="changeTab('money')">金额统计</span>
                        <span class="cursorPointer" :class="typeMoney=='number'?'activeColor':''" @click="changeTab('number')">人数统计</span>
                    </div> -->
                </div>
                <div class="displayFlex">
                    <div>
                        <div class="displayFlex">
                            <span><img src="@/assets/img/zhjt_icon.png" alt=""></span>
                            <div class="ml20">
                                <span class="font22 mb20" v-if="typeMoney=='money'">老年综合津贴(人)</span>
                                <!-- <span class="font22 mb20" v-else>老年综合津贴(人)</span> -->
                                <!-- <p class="font26 fontFamily orangeYellowColor mt20" v-if="typeMoney=='money'">{{subsidy}}</p> -->
                                <p class="font26 fontFamily orangeYellowColor mt20" v-if="typeMoney=='money'">264144</p>
                                <!-- <p class="font26 fontFamily orangeYellowColor mt20" v-else>98536</p> -->
                            </div>
                        </div>
                        <div class="textAlgin mt30">
                            <!-- <span class="font18">较上年</span>
                            <span class="font22 brightColor ml20 mr10" >2356</span>
                            <span><img src="@/assets/img/up.png" alt=""></span> -->
                        </div>
                    </div>
                    <div>
                        <div class="displayFlex">
                            <span><img src="@/assets/img/jjjt_icon.png" alt=""></span>
                            <div class="ml20">
                                <span class="font22 mb20" v-if="typeMoney=='money'">居家养老津贴(人)</span>
                                <!-- <span class="font22 mb20" v-else>居家养老津贴(人)</span> -->
                                <!-- <p class="font26 fontFamily orangeYellowColor mt20" v-if="typeMoney=='money'">{{olderSubsidyNumber}}</p> -->
                                <p class="font26 fontFamily orangeYellowColor mt20" v-if="typeMoney=='money'">5694</p>
                                <!-- <p class="font26 fontFamily orangeYellowColor mt20" v-else>98536</p> -->
                            </div>
                        </div>
                        <div class="textAlgin mt30">
                            <!-- <span class="font18">较上年</span>
                            <span class="font22 brightColor ml20 mr10" >2356</span>
                            <span><img src="@/assets/img/up.png" alt=""></span> -->
                        </div>
                    </div>
                    <div>
                        <div class="displayFlex">
                            <span><img src="@/assets/img/chx_icon.png" alt=""></span>
                            <div class="ml20">
                                <span class="font22">长护险津贴(人)</span>
                                <p class="font26 fontFamily orangeYellowColor mt20">7857</p>
                            </div>
                        </div>
                        <div class="textAlgin mt30">
                            <!-- <span class="font18">较上年</span>
                            <span class="font22 brightColor ml20 mr10" >2356</span>
                            <span><img src="@/assets/img/up.png" alt=""></span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg">
                <elderSexTable :close="closeTab" :orgTypes="orgTypes" />
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getAgeDistribution,getStreetNumber,getFoodSubsidyNumber,getSubsidyNumber,getOlderSubsidyNumber} from '@/api/elderlyInfor'
import {getSex,getGrowth} from "@/api/elderlyInforDetails"
import elderSexTable from "./secondScreen/elderSexTable"

export default {
    components:{Chart,elderSexTable},
    data(){
        return{
            isShowBg:false,
            index:1,
            typeMoney:'money',
            list:['3','1','.','7'],
            option:{},
            optionHeight:'500px',
            ageOption:{},
            streetOption:{},
            elderOption:{
                title:[
                    {
                        text: '单位：万人',
                        left: '85%',
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
                    data: ["高龄","独居","孤老","低保","残疾","失独","优抚"],
                    axisLabel: {
                        margin: 10,
                        color: '#fff',
                        textStyle: {
                            fontSize: 12
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
                    data: [5.6,7.8,2.4,7.9,3.6,2.1,4.9],
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
            },
            height:'430px',
            form:{
                menCount:0,
                womenCount:0
            },
            subsidy:0,
            olderSubsidyNumber:0,
            foodSubsidy:0,
            orgTypes:''
        }
    },
    methods:{
        showTable(num){
            switch(num){
                case 1:
                   this.orgTypes  = '0'
                break
                case 2:
                   this.orgTypes  = '1'
                break
            }
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
        },
        changeDate(num){
            this.index=num
        },
        changeTab(type){
            this.typeMoney = type
        },
        showAgeToast(params){
            this.isShowBg = true
        },
        //比例
        getGrowthNum(){
            getGrowth({areaCode:areaCode,fewYear:7,year:2017}).then(res=>{
                if(res.code===0){
                    let xAxisData=[]
                    let menCountList=[['-','-','-','-'],[]]
                    let womenCountList=[['-','-','-','-'],[]]
                    let totalList=[['-','-','-','-'],[]]
                    if(res.data.length){
                        res.data.forEach((item,i)=>{
                            xAxisData.push(item.year)
                            menCountList.push(item.menCount)
                            womenCountList.push(item.womenCount)
                            if(i>3){
                                menCountList[0].push(item.menCount)
                                totalList[0].push(item.total)
                                womenCountList[0].push(item.womenCount)
                            }
                            if(i<=4){
                                womenCountList[1].push(item.womenCount)
                                menCountList[1].push(item.menCount)
                                totalList[1].push(item.total)
                            }
                        })
                    }
                    totalList[1].push("-","-")
                    menCountList[1].push("-","-")
                    womenCountList[1].push("-","-")
                    this.option={
                        title:[
                            {
                                text: '增长趋势',
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
                                top: '10%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            }
                        ],
                        grid: {
                            left: '0%',
                            right: '10%',
                            top:'20%',
                            bottom: '5%',
                            containLabel: true
                        },
                        tooltip : {
                            show: true,
                            trigger: 'item'
                        },
                        legend: {
                            show:true,
                            selectedMode: false,
                            x:'center',
                            y:'60',
                            icon: 'stack',
                            itemWidth:10,
                            itemHeight:10,
                            textStyle:{
                                color:'#fff',
                                fontSize:16
                            },
                            data:['总数','男','女']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                axisLabel:{
                                    color: '#fff',
                                    fontSize:16
                                },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        color:'#fff'
                                    }
                                },
                                axisTick:{
                                    show:false,
                                },
                                splitLine:{
                                    show:false,
                                    lineStyle:{
                                        color:'#195384'
                                    }
                                },
                                data : xAxisData
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name : '',
                                min:0,
                                axisLabel : {
                                    formatter: '{value}',
                                    textStyle:{
                                        color:'#fff'
                                    }
                                },
                                axisLine:{
                                    show:false,
                                    lineStyle:{
                                        color:'#27b4c2'
                                    }
                                },
                                axisTick:{
                                    show:false,
                                },
                                splitLine:{
                                    show:true,
                                    lineStyle:{
                                        color:'#7a9ba8'
                                    }
                                }
                            },

                        ],
                        series : [
                            {
                                name:'总数',
                                type:'line',
                                cursor: 'default',
                                symbol:'circle',
                                symbolSize: 8,
                                itemStyle: {
                                    normal: {
                                        color:'#0092f6',
                                        lineStyle: {
                                            color: "#0092f6",
                                            width:2,
                                            type:'dotted'
                                        }
                                    }
                                },
                                markPoint:{
                                    itemStyle:{
                                        normal:{
                                            color:'red'
                                        }
                                    }
                                },
                                data:totalList[0]
                            },
                            {
                                name:'总数',
                                type:'line',
                                cursor: 'default',
                                symbol:'circle',
                                symbolSize: 8,
                                itemStyle: {
                                    normal: {
                                        color:'#0092f6',
                                        lineStyle: {
                                            color: "#0092f6",
                                            width:2,
                                        },
                                    }
                                },
                                markPoint:{
                                    itemStyle:{
                                        normal:{
                                            color:'red'
                                        }
                                    }
                                },
                                // data:[60,50,41,20,15,'-','-']
                                data:totalList[1]
                            },
                            {
                                name:'男',
                                type:'line',
                                cursor: 'default',
                                symbol:'circle',
                                symbolSize: 8,
                                itemStyle: {
                                    normal: {
                                        color:'#fc7a3c',
                                        lineStyle: {
                                            color: "#fc7a3c",
                                            width:2,
                                            type:'dotted'
                                        },
                                    }
                                },
                                data:menCountList[0]
                            },
                            {
                                name:'男',
                                type:'line',
                                symbol:'circle',
                                symbolSize: 8,
                                cursor: 'default',
                                itemStyle: {
                                    normal: {
                                        color:'#fc7a3c',
                                        lineStyle: {
                                            color: "#fc7a3c",
                                            width:2
                                        },
                                    }
                                },
                                data:menCountList[1]
                            },
                            {
                                name:'女',
                                type:'line',
                                symbol:'circle',
                                cursor: 'default',
                                symbolSize: 8,
                                itemStyle: {
                                    normal: {
                                        color:'#50cef9',
                                        lineStyle: {
                                            color: "#50cef9",
                                            width:2,
                                            type:'dotted'
                                        },
                                    }
                                },
                                data:womenCountList[0]
                            },
                            {
                                name:'女',
                                type:'line',
                                symbol:'circle',
                                symbolSize: 8,
                                cursor: 'default',
                                itemStyle: {
                                    normal: {
                                        color:'#50cef9',
                                        lineStyle: {
                                            color: "#50cef9",
                                            width:2
                                        },
                                    }
                                },
                                data:womenCountList[1]
                            }
                        ]
                    }

                }
            })
        },
        //年龄分布
        getAge(){
            getAgeDistribution({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let legendData=[
                        {name:'60-64岁',per:'29.83%',value:'111009'},
                        {name:'65-69岁',per:'26.93%',value:'100231'},
                        {name:'70-79岁',per:'26.98%',value:'100411'},
                        {name:'80-89岁',per:'13.70%',value:'51024'},
                        {name:'90-99岁',per:'2.49%',value:'9276'},
                        {name:'100岁以上',per:'0.07%',value:'176'}
                    ]
                    let i = 0
                    let colorList = ['#ff3427', '#2f88e7', '#ffce14', '#ff2e90', '#13d9a3', '#9E87FF']
                    // if(res.data&&res.data.length){
                    //     res.data.forEach(item=>{
                    //         legendData.push({
                    //             name:item.key,
                    //             per:item.per,
                    //             value:item.value
                    //         })
                    //     })
                    // }
                    this.ageOption={
                        title: [
                            {
                                text: '年龄分布',
                                x: '31%',
                                y: '49%',
                                textStyle: {
                                    fontSize: 20,
                                    color:'#fff'
                                }
                            }
                        ],
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            selectedMode: false,
                            right: '10',
                            top: '20%',
                            right: 30,
                            textStyle: {
                                color: 'red',
                                fontSize: 25,
                            },
                            data: legendData,
                            icon: 'roundRect',
                            formatter:function(name) {
                                i++
                                let res = legendData.filter(v => v.name === name);
                                res = res[0];
                                return `{uname|${name}}`
                            },
                            textStyle: {
                                color: '#77899c',
                                rich: {
                                    uname: {
                                        width: 100,
                                        fontSize:20,
                                        color:'#fff',
                                        lineHeight:30
                                    },
                                }
                            },
                        },
                        series: [{
                            cursor: 'default',
                            width:'600',
                            height:'300',
                            type: 'pie',
                            center: ['51%', '76%'],
                            radius: ['70%', '100%'],
                            clockwise: true,
                            avoidLabelOverlap: true,
                            hoverOffset: 15,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            label: {
                                show: true,
                                normal: {
                                    formatter: function(params, ticket, callback) {
                                        // return '{white|' +  params.data.per + '}\n{hr|}\n{yellow|' +params.data.name + '}'
                                        return '{white|' +  '占'+params.data.per + '}\n{hr|}'
                                    },
                                    rich:{
                                        yellow: {
                                            color: "#ffc72b",
                                            fontSize: 20,
                                            padding: [5, 4],
                                            align: 'center'
                                        },
                                        total: {
                                            color: "#ffc72b",
                                            fontSize: 20 ,
                                            align: 'center'
                                        },
                                        white: {
                                            color: "#fff",
                                            align: 'center',
                                            fontSize: 14 ,
                                            padding: [5, 0]
                                        },
                                        hr: {
                                            borderColor: '#50689f',
                                            width: '100%',
                                            borderWidth: 1,
                                            height: 0,
                                        }
                                    }
                                },
                            },
                            labelLine: {
                                normal: {
                                    length: 20,
                                    length2:10
                                }
                            },
                            data: legendData,
                        }]
                    };
                }
            })
        },
        // getSexNum(){
        //     getSex({areaCode:areaCode}).then(res=>{
        //         if(res.code===0){
        //             this.form = res.data
        //             this.form.menCount = this.form.menCount?this.form.menCount.toString().split(''):0
        //             this.form.womenCount = this.form.womenCount?this.form.womenCount.toString().split(''):0

        //         }
        //     })
        // },
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
                    this.streetOption={
                        title:[
                            {
                                text: '单位：万人',
                                left: '85%',
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
                            bottom: '18%'
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
                            barWidth: '20px',
                            cursor: 'default',
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
        },
         //综合
        // getSubsidy(){
        //     getSubsidyNumber({areaCode:areaCode,year:'2019,2018'}).then(res=>{
        //         // this.elderNum = res.data
        //         if(res.code==0){
        //             this.subsidy = res.data.subsidy
        //         }
        //     })
        // },
        //居家养老津贴
        // getOlderSubsidy(){
        //     getOlderSubsidyNumber({areaCode:areaCode}).then(res=>{
        //         if(res.code ==0){
        //             this.olderSubsidyNumber=parseInt(res.data)
        //         }
        //     })
        // },
        //助餐
        // getFoodSubsidy(){
        //     getFoodSubsidyNumber({areaCode:areaCode}).then(res=>{
        //         if(res.code==0){
        //             this.foodSubsidy= res.data.subsidy
        //         }
        //     })
        // }
    },
    async mounted(){
        // await this.getSubsidy()
        // await this.getOlderSubsidy()
        // await this.getFoodSubsidy()
        await this.getAge()
        await this.getStreet()
        // await this.getSexNum()
        await this.getGrowthNum()
    }
}
</script>
<style lang="scss" scoped>
    .numberList{
        width:48px;height:68px;border:1px solid #18ede7;
        line-height: 68px;text-align: center;margin-right: 20px;
        font-size: 44px;color:#ffd535;
    }
</style>
