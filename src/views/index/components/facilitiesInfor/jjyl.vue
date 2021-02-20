<template>
    <div class="shortWidthStyle shortWidthStyleImg onlyDisplay">
        <div class="halfWidth pr30">
            <div class="elderInforTitle">
                <div class="inforTitleImg" style="cursor: inherit">入住人员</div>
            </div>
            <div class="pt20">
                <div class="onlyDisplay">
                    <div class="mr160">
                        <div>
                            <span class="font26">入住人数</span>
                            <span class="font18">(养老机构)</span>
                        </div>
<!--                        <div class="font26 fontFamily orangeColor mt20 mb15 cursorPointer" @click="showTable(1)">{{service1010}}</div>-->
                        <div class="font26 fontFamily orangeColor mt20 mb15 cursorPointer" @click="showTable(1)">52</div>
                        <div class="font18 brightColor">闵行户籍</div>
                    </div>
                    <div>
                        <div>
                            <span class="font26">入住人数</span>
                            <span class="font18">(长者照护之家)</span>
                        </div>
<!--                        <div class="font26 fontFamily orangeColor  mt20 mb15 cursorPointer" @click="showTable(2)">{{service1011}}</div>-->
                        <div class="font26 fontFamily orangeColor  mt20 mb15 cursorPointer" @click="showTable(2)">274</div>
                        <div class="font18 brightColor">闵行户籍</div>
                    </div>
                </div>
                <div>
                    <Chart :option="ageOption" :height="height"/>
                </div>
            </div>
        </div>
        <div class="halfWidth pr30">
            <div class="elderInforTitle">
                <div class="inforTitleImg pl30" style="cursor: inherit">床位信息</div>
            </div>
            <div class="pt20">
                <div class="display">
                    <!-- <div class="halfWidth textAlignCenter">
                        <div class="font26 mb20">已用床位</div>
                        <span class="font26 skyRedColor fontFamily">{{bedUseNumber}}</span>
                    </div>
                    <div class="halfWidth textAlignCenter">
                        <div class="font26 mb20">空余床位</div>
                        <span class="font26 orangeColor fontFamily">{{bedSpareNumber}}</span>
                    </div> -->
                    <div class="halfWidth textAlignCenter">
                        <div class="font26 mb20">养老床位</div>
                        <span class="font26 skyRedColor fontFamily">15466</span>
                    </div>
                    <div class="halfWidth textAlignCenter">
                        <div class="font26 mb20">保基本床位</div>
                        <span class="font26 orangeColor fontFamily">8649</span>
                    </div>
                    <div class="halfWidth textAlignCenter">
                        <div class="font26 mb20">认知症床位</div>
                        <span class="font26 orangeColor fontFamily">557</span>
                    </div>
                </div>
                <div class="display">
                    <div class="halfWidth">
                        <Chart :option="badOneOption" width="350px"/>
                    </div>
                    <div class="halfWidth">
                        <Chart :option="badTwoOption" width="350px"/>
                    </div>
                </div>
                <!-- <div class="displayFlex">
                    <div>
                        <div class="font26 mb15">一般床位(张)</div>
                        <span class="font28 orangeColor fontFamily">{{bedTotal}}</span>
                    </div>
                    <div>
                        <div class="font26 mb15">认知症床位(张)</div>
                        <span class="font28 skyRedColor fontFamily">{{generalNum}}</span>
                    </div>
                    <div>
                        <div class="font26 mb15">政府核定床位(张)</div>
                        <span class="font28 skyBlueColor fontFamily">0</span>
                    </div>
                </div> -->
                <!-- <div>
                    <Chart :option="bedOption" :height="bedheight"/>
                </div> -->
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg">
                <checkinTable :close="closeTab" :orgType="orgType"/>
            </div>
        </div>
        <!-- <div>
            <div style="height:360px;" class="mt20 displayFlexNormal">
                <div class="elderInforLeft">
                    <Chart :option="streetOption" :height="height"/>
                </div>
                <div class="elderInforRight">
                    <Chart :option="ageOption" :height="height"/>
                </div>
            </div>
        </div> -->
        <!-- <div v-if="showDetail">
          <elderInforDetail />
        </div> -->
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getAgeRange,getAssort,getBeds,getBedNumber} from "@/api/pensionInstitutions"
import  checkinTable from "./secondScreen/checkinTable"

export default {
    // elderInforDetail
    components:{Chart,checkinTable},
    data(){
        var value = 0.2;
        var data = [value, value, value, ];
        var fontColor = '#fff'
        return{
            // showDetail:false,
            service1010:0,
            service1011:0,
            institutions:12845,
            index:1,
            subsidy:0,
            foodSubsidy:0,
            height:'340px',
            bedheight:'400px',
            ageOption:{},
            generalNum:0,
            cognitionNum:0,
            bedUseNumber:0,
            bedSpareNumber:0,
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
            bedTotal:0,
            isShowBg:false,
            orgType:'',
            badOneOption:{},
            badTwoOption:{},
        }
    },
    methods:{
        showTable(num){
            this.isShowBg = true
            switch(num){
                case 1 :
                    this.orgType = '1010'
                break
                case 2 :
                    this.orgType = '1011'
                break
            }
        },
        closeTab(){
            this.isShowBg = false
        },
        toDetail(){
            this.$router.push('/elderlyInfor')
        },
        getData(){
            //年龄分布
            getAgeRange({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let legendData=[]
                    let i = 0
                    let colorList = ['#ff3427', '#2f88e7', '#ffce14', '#ff2e90', '#13d9a3', '#9E87FF']
                    if(res.data&&res.data.length){
                        res.data.forEach(item=>{
                            legendData.push({
                                name:item.key,
                                per:item.per,
                                value:item.value
                            })
                        })
                    }
                    this.ageOption={
                        title: [
                            {
                                text: '单位:人',
                                top: '20%',
                                right: '0%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '闵行户籍年龄分布',
                                x: '0%',
                                y: '13%',
                                textStyle: {
                                    fontSize: 26,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '年龄分布',
                                top: '62%',
                                left: '23%',
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
                            right: 0,
                            bottom:30,
                            textStyle: {
                                color: 'red',
                                fontSize: 16,
                            },
                            data: legendData,
                            icon: 'roundRect',
                            formatter:function(name) {
                                i++
                                let res = legendData.filter(v => v.name === name);
                                res = res[0];
                                return `{uname|${name}}{unum1|${res.value}}`
                            },
                            textStyle: {
                                color: '#77899c',
                                rich: {
                                    uname: {
                                        width: 160,
                                        fontSize:16,
                                        color:'#fff',
                                        lineHeight:25
                                    },
                                    unum1: {
                                        color: '#fff',
                                        fontSize:16,
                                        width: 60,
                                        align: 'right'
                                    }
                                }
                            },
                        },
                        series: [{
                            width:'600',
                            height:'300',
                            cursor: 'default',
                            type: 'pie',
                            center: ['33%', '75%'],
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
            //入住人数
            getAssort({areaCode: areaCode}).then(res=>{
                if(res.code==0){
                    this.service1010 = res.data.service1010
                    this.service1011 = res.data.service1011
                }
            })
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
                            y: "88%",
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
                            radius: '50%',  // 半径大小
                            center: ['50%', '55%'],    // 布局位置
                            // data:[usePro,usePro,usePro], // 水球波纹值
                            data:[0.64,0.64,0.64], // 水球波纹值
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
                            y: "88%",
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
                            radius: '50%',  // 半径大小
                            center: ['50%', '55%'],    // 布局位置
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
            getBedNumber({areaCode:areaCode,orgTypes:'1010,1011'}).then(res=>{
                if(res.code==0){
                    this.bedTotal = res.data.bedTotal
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
</style>
