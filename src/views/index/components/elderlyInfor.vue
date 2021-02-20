<template>
    <div class="shortWidth">
        <div class="inforTitle displayFlex">
            <div class="inforTitleImg" @click="toDetail">老人信息</div>
            <div class="inforTitleRight cursorPointer" @click="toWisdom">智慧养老</div>
        </div>
        <div class="longBaseInfor">
            <div class="display">
                <div class="elderlyNumber" style="padding-right:30px">
                    <div class="display">
                        <div style="line-height:30px;">
                            <span>老人数量（人）</span>
<!--                            <span class="font30 yellowColor mr20" style="cursor: pointer" @click="showTab">{{elderNum}}</span>-->
                            <span class="font29 yellowColor mr20" style="cursor: pointer" @click="showTab">372127</span>
                            <!-- <span  class="font30 yellowColor mr20">363513</span> -->
                        </div>
                        <!-- <span class="font18">较上年</span>
                        <span class="mr10 ml15 font22 blueColor">0.55%</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </div>
                    <div class="display">
                        <div style="line-height:30px;">
                            <span>老龄化占比（%）</span>
                            <span class="font29 yellowColor mr20 fontNormal">31.7</span>
                        </div>
                        <!-- <span class="font18">较上年</span>
                        <span class="mr10 ml15 font22 blueColor">0.55%</span>
                        <span><img src="@/assets/img/up.png" alt=""></span> -->
                    </div>
                </div>
                <div class="elderlyNumber pl60 noBorder">
                    <div class="displayNormal">
                        <div style="line-heigt:30px;width:450px;">
                            <span class="width220 mr10">老年综合津贴(亿元)</span>
                            <!-- <span class="fontColor">{{subsidy}}</span> -->
                            <span class="fontColor">3.2</span>
                        </div>
                        <div style="line-height:30px;width:450px;">
                            <span class="width220 mr10">居家养老津贴(万元)</span>
<!--                            <span class="fontColor">{{olderSubsidyNumber}}</span>-->
                            <span class="fontColor">1583</span>
                        </div>
                    </div>
                    <div class="displayNormal">
                        <div class="display" style="line-height:30px;width:450px;">
                            <span class="width220 mr10">助餐补贴(元)</span>
                            <!--  <span class="fontColor">{{foodSubsidy}}</span>-->
                            <span class="fontColor">425552</span>
                        </div>
                        <div class="display" style="line-height:30px;width:450px;">
                            <span class="width220 mr10">长护险津贴(元)</span>
                            <span class="fontColor">23620</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 老人统计图 -->
            <div style="height:360px;" class="mt20 displayFlexNormal">
                <!-- 街镇分布 -->
                <div class="elderInforLeft">
                    <Chart :option="streetOption" :height="height"/>
                </div>
                <!-- 年龄分布 -->
                <div class="elderInforRight">
                    <Chart :option="ageOption" :height="height" :toMethod="getAgeData" :clickIt="true"/>
                </div>
            </div>
        </div>
        <!-- <div v-if="showDetail">
          <elderInforDetail />
        </div> -->
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg">
                <elderTab :close="closeTab" :begin="beginAge" :end="endAge"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import elderTab from "./elderlyInfor/elderTable"
// import elderInforDetail from "./elderlyInfor/index"
//引入js
import {getElderNumber,getAgeDistribution,getStreetNumber,getOlderSubsidyNumber,getSubsidyNumber,getFoodSubsidyNumber} from '@/api/elderlyInfor'
export default {
    // elderInforDetail
    components:{Chart, elderTab},
    data(){
        var value = 0.2;
        var data = [value, value, value, ];
        var fontColor = '#fff'
        return{
            // showDetail:false,
            institutions:12845,
            index:1,
            subsidy:0,
            foodSubsidy:0,
            height:'340px',
            streetOption:{},
            ageOption:{},
            sexForm:{
                menCount:0,
                womenCount:0,
                women:0,
                men:0
            },
            olderSubsidyNumber:0,
            elderNum:0, //老人总数
            form: {
                specialPersonCount: 0,
                lowIncomeCount: 0,
                specialPersonPer: "0",
                lowIncomePer: "0",
            },
            isShowBg: false,
            beginAge: '',
            endAge: ''
        }
    },
    methods:{
        getAgeData(data) {
            if (data.name !== '100岁以上') {
                this.beginAge = data.name.slice(0, 2)
                this.endAge = data.name.slice(3, 5)
            } else {
                this.beginAge = '100'
                this.endAge = ''
            }
            this.isShowBg = true
        },
        showTab(){
            this.beginAge = undefined
            this.endAge = undefined
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
        },
        toWisdom() {
            this.$router.push('/wisdomOlder')
        },
        toDetail(){
            // this.showDetail = true
            this.$router.push('/elderlyInfor')
        },
        //获取老人总数
        // getNumber(){
        //     getElderNumber({areaCode:areaCode}).then(res=>{
        //         this.elderNum = res.data
        //     })
        // },
        //综合
        // getSubsidy(){
        //     getSubsidyNumber({areaCode:areaCode,year:'2019,2018'}).then(res=>{
        //         // this.elderNum = res.data
        //         if(res.code==0){
        //             this.subsidy = Math.round(res.data.subsidy/10000)
        //         }
        //     })
        // },
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
                    if(res.data&&res.data.length){
                        // res.data.forEach(item=>{
                        //     legendData.push({
                        //         name:item.key,
                        //         per:item.per,
                        //         value:item.value
                        //     })
                        // })
                    }
                    //8-24  死数据替换
                    // let obj = {
                    //     name:'100岁以上',
                    //     per:'0.27',
                    //     value:152
                    // }
                    // legendData.splice(legendData.length-1,1,obj)
                    this.ageOption={
                        title: [
                            {
                                text: '年龄分布',
                                x: '26%',
                                y: '62%',
                                textStyle: {
                                    fontSize: 20,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '年龄分布',
                                x: '6%',
                                y: '13%',
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
                            top: 'center',
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
                                        color: '#fff',
                                        fontSize:20,
                                        width: 60,
                                        align: 'right'
                                    }
                                }
                            },
                        },
                        series: [{
                            width:'600',
                            height:'300',
                            type: 'pie',
                            center: ['38%', '75%'],
                            radius: ['40%', '60%'],
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
                                text: '街镇分布',
                                left:'-0.5%',
                                top:'13%',
                                textStyle: {
                                    fontSize: 20,
                                    color:'#fff',
                                }
                            },
                            {
                                text: '单位：万人',
                                left: '78%',
                                top: '20%',
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
                            top: '30%',
                            right: '10%',
                            left: '5%',
                            bottom: '20%'
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
        //居家养老津贴
        getOlderSubsidy(){
            getOlderSubsidyNumber({areaCode:areaCode}).then(res=>{
                if(res.code ==0){
                    this.olderSubsidyNumber=Math.round(res.data/10000)
                }
            })
        },
        //助餐
        getFoodSubsidy(){
            getFoodSubsidyNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.foodSubsidy= res.data.subsidy
                }
            })
        }
    },
    mounted(){
        // this.getNumber()
        this.getAge()
        this.getStreet()
        this.getOlderSubsidy()
        // this.getSubsidy()
        this.getFoodSubsidy()
        this.institutions=String(this.institutions).split("")
    }
}
</script>
<style lang="scss" scoped>
   .elderlyNumber{
       height:115px;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       border-right:1px dashed #00fff8;
   }
   .width220{
       width:220px;
   }
   .noBorder{
       border:none;
   }
   .serveLeft,.serveRight{
       width:50%;
   }
   .serveLeft{
       border-right:1px dashed #1cefe9;
   }
   .serveRight{
       padding-left:55px;
       .serveRight-title {
           width: 100%;
           font-size: 20px;
           color: #999;
           padding-top: 20px;
           span {
               padding-right: 125px;
           }
           span:last-of-type {
               padding-right: 10px;
           }
       }
       .serveRight-list {
           width: 100%;
           font-size: 22px;
           border-bottom: 1px solid #3ccaff;
           padding-bottom: 20px;
           padding-top: 20px;
           height: 119px;
           line-height: 89px;
           span {
               font-size: 22px !important;
               width: 213px;
               display: inline-block;
               i {
                   font-style: normal;
                   font-size: 14px;
               }
           }
           span:last-of-type {
               width: 150px;
           }
       }
   }
   .serveNumber{
       padding-right:30px;
   }
   .serveCont{
       border-left:1px solid #05fdfd;
       padding-left:30px;
   }
   .elderInforLeft{
       width:50%;
   }
   .elderInforRight{
       width:50%;
   }
   .bg{
       position: absolute;
       width:4700x;
       height:1566px;
       top:0;
       left: 0;
       background: rgba(0,0,0,0.5);
       z-index: 999;
       .toastImg{
           position: absolute;
           top:50%;
           left:50%;
           transform:translate(-50%,-50%);
       }

   }
</style>
