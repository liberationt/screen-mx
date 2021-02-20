<template>
    <div class="shortWidthStyle">
        <div class="elderInforTitle">
            <div class="inforTitleImg" style="cursor: inherit">机构养老</div>
        </div>
        <div class="shortWidthConStyle onlyDisplay">
            <div class="elderInforLeft">
                <div class="displayColumn mb77">
                    <div class="font26 mb20">入住养老机构(人)</div>
                    <div class="onlyDisplay">
                        <div class="display mr30 cursorPointer" @click="showTable(1)">
                            <div v-for="(item,i) in form.service1010" :key="i" class="numberList">{{item}}</div>
                        </div>
                        <div class="displayColumn">
                            <!-- <span class="font18 mt20 mb5">较上年</span>
                            <span>
                                <span class="font20 brightColor mr5">666</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span> -->
                        </div>
                    </div>
<!--                    <div class="mt30">-->
<!--                        <span class="font18 mr10">入住占比</span>-->
<!--                        <span class="font20 orangeColor mr5">{{form.service1010Per}}</span>-->
<!--                        <span><img src="@/assets/img/up.png" alt=""></span>-->
<!--                    </div>-->
                </div>
                <div class="displayColumn">
                    <div class="font26 mb20">入住长者照护之家(人)</div>
                    <div class="onlyDisplay">
                        <div class="display mr30 cursorPointer" @click="showTable(2)">
                            <div v-for="(item,i) in form.service1011" :key="i" class="numberList">{{item}}</div>
                        </div>
                        <div class="displayColumn">
                            <!-- <span class="font18 mt20 mb5">较上年</span>
                            <span>
                                <span class="font20 brightColor mr5">36</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span> -->
                        </div>
                    </div>
                    <div class="mt30">
                        <span class="font18 mr10">入住占比</span>
                        <span class="font20 orangeColor mr5">{{form.service1011Per}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>
            </div>
            <div class="elderInforRight">
                <Chart :option="streetOption" :height="height" :width="width"/>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="moveNursing">
                <moveNursTable :close="closeTab" :titleName="titleName" :orgTypes="orgTypes" />
            </div>
             <div class="toastImg" v-if="elderHome">
                <elderHomeTable :close="closeTab"/>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts"
import Chart from "@/components/Chart"
import {areaCode} from '@/api/areaCode'
import moveNursTable from "./secondScreen/moveNursTable"
import elderHomeTable from "./secondScreen/elderHomeTable"

import {getProvideAged,getStreet} from "@/api/elderlyInforDetails"
export default {
    components:{Chart,moveNursTable,elderHomeTable},
    data(){
        return{
            streetOption:{
                grid: {
                    left: '7%',
                    bottom:'15%',
                    right:"3%"
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
                        text: '单位:人',
                        left:'91%',
                        top:'5%',
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
                    selectedMode: false,
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
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#1cefe9' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#1cefe9' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                        }
                    },
                    data: []
                    },
                    {
                    name: "长者照护之家",
                    type: "bar",
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#ffe640' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#ffe640' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                        }
                    },
                    data: []
                    }
                ]
            },
            isShowBg:false,
            moveNursing:false,
            elderHome:false,
            form:{
                service1010:'',
                service1010Per:'',
                service1011:'',
                service1011Per:''
            },
            height:'480px',
            width:'980px',
            titleName:'',
            orgTypes:''
        }
    },
    methods:{
        showTable(num){
            switch(num){
                case 1 :
                    this.titleName = '入住养老机构'
                    // this.moveNursing = true
                    this.orgTypes = '1010'
                break;
                case 2 :
                    this.titleName = '入住长者照护之家'
                    this.orgTypes = '1011'
                    // this.elderHome = true
                break;
            }
            this.moveNursing = true
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
            this.moveNursing = false
            this.elderHome = false
        },
        getStreetNum(){
            getStreet({areaCode: areaCode}).then(res=>{
                if(res.code==0){
                    if(res.data.length){
                        res.data.forEach(item=>{
                            this.streetOption.xAxis.data.push(item['key'])
                            this.streetOption.series[0].data.push(item.value)
                            this.streetOption.series[1].data.push(item.value1)
                        })
                    }
                }
            })
        },
        //养老统计
        getProvideAgedNum(){
            getProvideAged({areaCode: areaCode}).then(res=>{
                if(res.code===0){
                    this.form = res.data
                    if(this.form.service1010){
                        this.form.service1010 = this.form.service1010.toString().split('')
                    }
                    if(this.form.service1011){
                        this.form.service1011 = this.form.service1011.toString().split('')
                    }
                }
            })
        }
    },
    mounted(){
        this.getStreetNum()
        this.getProvideAgedNum()
    }
}
</script>
<style lang="scss" scoped>
  .numberList{
      width:48px;height:68px;
      border:1px solid #18ede7;
      line-height: 70px;
      margin-right:9px;
      font-size:36px;
      color:#13d9a3;
      text-align: center;
  }
  .elderInforLeft{
      padding-top:30px;
      width:463px;height:100%;
      height:500px;
      border-right:1px dashed #0eafb5;
  }
  .elderInforRight{
      padding-top:30px;
  }
</style>
