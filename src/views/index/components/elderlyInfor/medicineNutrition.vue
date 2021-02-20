<template>
    <div class="shortWidthStyle">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">医养结合</div>
        </div>
        <div>
            <div class="baseInforTop">
                <div :class="index==1?'activeColor':''" @click="changeDate(1)">长护险<span class="lineColor" v-if="index==1"></span></div>
                <div :class="index===2?'activeColor':''" @click="changeDate(2)">家庭医生<span class="lineColor" v-if="index==2"></span></div>
            </div>
        </div>
        <div class="onlyDisplay" v-if="index==1">
            <div class="halfWidth medicineInfor">
                <div class="displayFlex">
                    <div>
                        <div class="font26 mb20">申请人数(人)</div>
                        <div class="display cursorPointer" @click="showTable(1)">
                            <div v-for="(item,i) in applyTotal" :key="i" class="applyNumList">{{item}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="font26 mb20">通过人数(人)</div>
                        <div class="display cursorPointer" @click="showTable(2)">
                            <div v-for="(item,i) in successCount" :key="i" class="applyNumList">{{item}}</div>
                        </div>
                    </div>
                </div>
                <div class="displayFlex mt80">
                    <div>
                        <div class="font26 mb20">养老机构照护(人)</div>
                        <div class="display cursorPointer" @click="showTable(3)">
                            <div v-for="(item,i) in yljgzh" :key="i" class="applyNumList beigeColor">{{item}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="font26 mb20">社区居家照护(人)</div>
                        <div class="display cursorPointer" @click="showTable(4)">
                            <div v-for="(item,i) in sqjjzh" :key="i" class="applyNumList beigeColor">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="halfWidth">
                <Chart :option="streetOption" :height="height" :width="width"/>
            </div>
        </div>
        <div class="onlyDisplay" v-else>
            <div class="halfWidth medicineInfor">
                <h4 class="font26 mb20">家庭医生</h4>
                <div class="displayFlex">
                    <div>
                        <div class="font26  mb20">签约人数(万人)</div>
                        <div class="display">
                            <div v-for="(item,i) in applyList" :key="i" class="applyNumList">{{item}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="font26 mb20">签约率(%)</div>
                        <div class="display">
                            <div v-for="(item,i) in adoptList" :key="i" class="applyNumList">{{item}}</div>
                        </div>
                    </div>
                </div>
                <div class="displayFlex mt50">
                    <div>
                        <div class="font26 mb20">应该体检人数(万人)</div>
                            <div class="display">
                                <div v-for="(item,i) in shouldList" :key="i" class="applyNumList beigeColor">{{item}}</div>
                        </div>
                    </div>
                    <div>
                        <div class="font26 mb20">实际体检人数(万人)</div>
                        <div class="display">
                            <div v-for="(item,i) in actualList" :key="i" class="applyNumList beigeColor">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="halfWidth mt25 pl50">
                <h4 class="font26 mb20">家庭支持</h4>
                <div>
                    <div class="display borderBottom">
                        <div class="displayCenterInfor">
                            <span><img src="@/assets/img/1.png" alt=""></span>
                            <span class="font18">老伙伴</span>
                        </div>
                        <div class="display mr60 ml70" style="width:240px;">
                            <span class="font22 mr10">服务对象(人)</span>
                            <span class="font28 fontFamily beigeColor cursorPointer" @click="showTable(5)">{{serviceCount}}</span>
                        </div>
                        <div class="display">
                            <span class="font22 mr10">志愿者(人)</span>
                            <span class="font28 fontFamily beigeColor cursorPointer" @click="showTable(6)">{{volunteerCount}}</span>
                        </div>
                    </div>
<!--                    <div class="display borderBottom">-->
<!--                        <div class="displayCenterInfor">-->
<!--                            <span><img src="@/assets/img/2.png" alt=""></span>-->
<!--                            <span class="font18">老吾老</span>-->
<!--                        </div>-->
<!--                        <div class="display mr60 ml70" style="width:240px;">-->
<!--                            <span class="font22 mr10">培训人数(人)</span>-->
<!--                            <span class="font28 fontFamily orangeYellowColor">23652</span>-->
<!--                        </div>-->
<!--                        <div class="display">-->
<!--                            <span class="font22 mr10">共计家庭(个)</span>-->
<!--                            <span class="font28 fontFamily orangeYellowColor">2365</span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="display borderBottom">-->
<!--                        <div class="displayCenterInfor">-->
<!--                            <span><img src="@/assets/img/3.png" alt=""></span>-->
<!--                            <span class="font18">适老化改造</span>-->
<!--                        </div>-->
<!--                        <div class="display mr60 ml35" style="width:240px;">-->
<!--                            <span class="font22 mr10">服务对象(人)</span>-->
<!--                            <span class="font28 fontFamily lightGreenColor">236520</span>-->
<!--                        </div>-->
<!--                        <div class="display">-->
<!--                            <span class="font22 mr10">共计家庭(个)</span>-->
<!--                            <span class="font28 fontFamily lightGreenColor">2365</span>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="display borderBottom borderNone">
                        <div class="displayCenterInfor">
                            <span><img src="@/assets/img/4.png" alt=""></span>
                            <span class="font18">辅具租赁</span>
                        </div>
                        <div class="display mr60 ml55" style="width:240px;">
                            <span class="font22 mr10">租赁点(个)</span>
                            <span class="font28 fontFamily orangeColor cursorPointer" @click="showTable(7)">{{storeCount}}</span>
                        </div>
                        <div class="display">
                            <span class="font22 mr10">合同签约(人)</span>
                            <span class="font28 fontFamily orangeColor cursorPointer" @click="showTable(8)">{{contractCount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="applyNumber">
                <applyNumberTable :close="closeTab" :orgTypes="orgTypes" :type="type" :titleName="titleName" />
            </div>
            <div class="toastImg" v-if="serverObject">
                <serverObjectTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="volunteer">
                <volunteerTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="rentalPoint">
                <rentalPointTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="rentalContract">
                <rentalContractTable :close="closeTab"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getPeopleNumber,getTypeNumber,getLevelNumber,getLeaseNumber,volunteerNumber,serviceObjectNumber} from "@/api/pensionServices"
import applyNumberTable from "./secondScreen/applyNumberTable"
import serverObjectTable from "./secondScreen/serverObjectTable"
import volunteerTable from "./secondScreen/volunteerTable"
import rentalPointTable from "./secondScreen/rentalPointTable"
import rentalContractTable from "./secondScreen/rentalContractTable"

export default {
    components:{Chart,applyNumberTable,serverObjectTable,volunteerTable,rentalPointTable,rentalContractTable},
    data(){
        return{
            index:1,
            height:'407px',
            width:"700px",
            streetOption:{},
            applyList:['3','4','.','4','6'],
            adoptList:['9','2','.','5'],
            shouldList:['3','7','.','2'],
            actualList:['2','7','.','0','9'],
            successCount:[],
            applyTotal:[],
            sqjjzh:[],
            yljgzh:[],
            storeCount:0,
            contractCount:0,
            volunteerCount:0,
            serviceCount:0,
            isShowBg:false,
            applyNumber:false,
            serverObject:false,
            volunteer:false,
            rentalPoint:false,
            rentalContract:false,
            orgTypes:'',
            type:'',
            titleName:''
        }
    },
    methods:{
        closeTab(){
            this.isShowBg=false
            this.applyNumber=false
            this.serverObject = false
            this.volunteer = false
            this.rentalPoint = false
            this.rentalContract = false
        },
        showTable(num){
            this.isShowBg = true
            switch(num){
                case 1:
                this.type=1
                this.orgTypes = ""
                this.titleName = '长护险申请人数'
                this.applyNumber = true
                break
                case 2:
                this.type=1
                this.orgTypes = '1'
                this.titleName = '长护险通过人数'
                this.applyNumber = true
                break
                case 3:
                this.type=2
                this.orgTypes = '1'
                this.titleName = '养老机构照护'
                this.applyNumber = true
                break
                case 4:
                this.type=2
                this.orgTypes = '2'
                this.titleName = '社区居家照护'
                this.applyNumber = true
                break;
                case 5:
                this.serverObject = true
                break;
                case 6:
                this.volunteer = true
                break;
                case 7:
                this.rentalPoint = true
                break;
                case 8:
                this.rentalContract = true
                break;

            }
        },
        changeDate(num){
            this.index=num
        },
        getData(){
            getPeopleNumber({areaCode:areaCode}).then(res=>{
                if(res.code===0){
                    const { successCount , applyTotal} = res.data
                    this.successCount = String(successCount).split('')
                    this.applyTotal = String(applyTotal).split('')
                    this.applyTotal = [3,0,1,2,7]
                    this.successCount = [2,4,6,5,3]
                }
            })
            getTypeNumber({areaCode:areaCode}).then(res=>{
                if(res.code ==0){
                    const {sqjjzh,yljgzh} = res.data[0]
                    this.sqjjzh = String(sqjjzh).split("")
                    this.yljgzh = String(yljgzh).split("")
                    this.yljgzh = [1,7,3,3,4]
                    this.sqjjzh = [7,3,1,9]
                }
            })
            getLevelNumber({areaCode:areaCode}).then(res=>{
                if(res.code== 0 ){
                    let xAxisData = []
                    let seriesData = []
                    if(res.data.length){
                        res.data.forEach(item=>{{
                            if(item.name!='建议送医'){
                                xAxisData.push(item.name+'级')
                            }else{
                                xAxisData.push(item.name)
                            }
                            seriesData.push(item.count)
                        }})
                    }
                    this.streetOption={
                        title:[
                            {
                                text: '街镇分布',
                                left:'2%',
                                top:'5%',
                                textStyle: {
                                    fontSize: 20,
                                    color:'#fff',
                                }
                            },
                            {
                                text: '单位:人',
                                left:'88%',
                                top:'12%',
                                textStyle: {
                                    fontSize: 12,
                                    color:'#fff',
                                }
                            }
                        ],
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top:'20%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,//坐标轴两边留白
                            data: xAxisData,
                            axisLabel: { //坐标轴刻度标签的相关设置。
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 14,
                                },
                            },
                            axisTick:{//坐标轴刻度相关设置。
                                show: false,
                            },
                            axisLine:{//坐标轴轴线相关设置
                                lineStyle:{
                                    color:'#E5E9ED',
                                }
                            },
                            splitLine: { //坐标轴在 grid 区域中的分隔线。
                                show: false,
                            }
                        },
                        yAxis: [
                            {
                                type: 'value',
                                splitNumber: 5,
                                axisLabel: {
                                    textStyle: {
                                        color: '#fff',
                                        fontStyle: 'normal',
                                        fontSize: 14,
                                    }
                                },
                                axisLine:{
                                    show: false
                                },
                                axisTick:{
                                    show: false
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#E5E9ED',
                                    }
                                }

                            }
                        ],
                        series: [
                            {
                                name: '2019',
                                cursor: 'default',
                                type: 'line',
                                itemStyle: {
                                    normal: {
                                        color:'#13d9a3',
                                        lineStyle: {
                                            color: "#13d9a3",
                                            width:2
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                                offset: 0,
                                                color: 'rgba(20,182,145,0.1)'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(20,182,145,.5)'
                                            }]),
                                        }
                                    }
                                },
                                data:seriesData
                            }
                        ]
                    }
                }
            }),
            getLeaseNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    const { storeCount , contractCount} =res.data
                    this.contractCount = contractCount
                    this.storeCount = storeCount
                }
            })
            volunteerNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.volunteerCount = res.data
                }
            })
            serviceObjectNumber({areaCode:areaCode}).then(res=>{
                if(res.code ==0){
                    this.serviceCount = res.data
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
.medicineInfor{
    border-right:1px dashed #0eafb5;
    height:407px;
    padding-right:40px;
    margin-top: 25px;
}
    .applyNumList{
        width:48px;height:68px;
        border:1px solid #18ede7;
        text-align: center;
        line-height: 68px;
        color:#13d9a3;
        font-size:36px;
        font-weight: 500;
        margin-right: 10px;

    }
    .beigeColor{
        color:#69abf2;
    }
    .borderBottom{
        padding: 40px 0 50px 20px;
        border-bottom:1px dashed #127284;
    }
    .borderNone{
        border:none
    }
    .displayCenterInfor{
        display: flex;
        flex-direction: column;
        text-align: center;
    }
</style>
