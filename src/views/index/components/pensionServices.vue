<template>
    <div class="shortWidth yyjhyyfw">
        <div class="floatLeft jjyl">
            <div class="inforTitle displayFlex">
                <div class="inforTitleImg" @click="toSecond">居家养老</div>
            </div>
            <div class="serveInfor">
                <div class="displayFlexNormal serveBorderBottom">
                    <div>
                        <div class="font26 mb30">服务老人数（人）</div>
                        <span class="font32 letterSpacing institutionColor" style="cursor: pointer" @click="openDailog">{{serveOldNumber}}</span>
                    </div>
                    <div style="visibility: hidden">
                        <div class="font18 mt38 mb10">较上年</div>
                        <span>
                            <span class="yearInfo mr5">21</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span>
                    </div>
                </div>
                <div class="displayFlexNormal serveBorderBottom">
                    <div>
                        <div class="font26 mb30">服务人员（人）</div>
                        <span class="font32 letterSpacing fontColor" style="cursor: pointer" @click="openPersonDailog">{{serveNumber}}</span>
                    </div>
                    <div style="visibility: hidden">
                        <div class="font18 mt38 mb10">较上年</div>
                        <span>
                            <span class="yearInfo mr5">21</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span>
                    </div>
                </div>
                <div class="displayFlexNormal serveBorderBottom serveBorderBottomNone">
                    <div>
                        <div class="font26 mb30">服务工单数（单）</div>
<!--                        <span class="font32 letterSpacing gdColor" style="cursor: pointer" @click="openOrderDailog">{{serveOrderNumber}}</span>-->
                        <span class="font32 letterSpacing gdColor" style="cursor: pointer" @click="openOrderDailog">822621</span>
                    </div>
                    <div style="visibility: hidden">
                        <div class="font18 mt38 mb10">较上年</div>
                        <span>
                            <span class="yearInfo mr5">21</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="floatLeft yyjh">
            <div class="inforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">医养结合</div>
            </div>
            <div class="baseInfor">
                <div class="baseInforTop">
                    <div :class="index==1?'activeColor':''" @click="changeDate(1)">长护险<span class="lineColor" v-if="index==1"></span></div>
                    <div :class="index===2?'activeColor':''" @click="changeDate(2)">家庭医生<span class="lineColor" v-if="index==2"></span></div>
                   <div :class="index===3?'activeColor':''" @click="changeDate(3)">健康小屋<span class="lineColor" v-if="index==3"></span></div>
                    <div :class="index===4?'activeColor':''" @click="changeDate(4)">辅具租赁<span class="lineColor" v-if="index==4"></span></div>
                </div>
                <div>
                    <!-- 长护险 -->
                    <div v-show="index==1">
                        <div class="display">

                            <div class="halfWidth display">
                                <span style="margin-top:-3px">申请总人数（人）</span>
<!--                                <span class="font36 yellowColor" style="cursor: pointer" @click="openLongDailog('长护险申请人数')">{{applyTotal}}</span>-->
                                <span class="font36 yellowColor" style="cursor: pointer" @click="openLongDailog('长护险申请人数')">30127</span>
                            </div>
                            <div class="halfWidth display">
                                <span style="margin-top:-3px">申请通过人数（人）</span>
<!--                                <span class="font36 yellowColor" style="cursor: pointer" @click="openLongDailog('长护险申请通过人数')">{{successCount}}</span>-->
                                <span class="font36 yellowColor" style="cursor: pointer" @click="openLongDailog('长护险申请通过人数')">24653</span>
                            </div>
                        </div>
                        <div class="crile">
                            <el-progress type="circle" :percentage="29.69" :stroke-width="15" :width="210" color="#50cef9" :show-text="false"></el-progress>
                            <div class="crile-text" style="color: #50cef9">
                                7319
                            </div>
                            <div class="crile-title">养老机构照护(人)</div>
                        </div>
                        <div class="crile">
                            <el-progress type="circle" :percentage="70.31" :stroke-width="15" :width="210" color="#13d9a3" :show-text="false"></el-progress>
                            <div class="crile-text" style="color: #13d9a3">
                                17334
                            </div>
                            <div class="crile-title">社区居家照护(人)</div>
                        </div>
                        <div class="crile">
                            <el-progress type="circle" :percentage="70.44" :stroke-width="15" :width="210" color="#fc7a3c" :show-text="false"></el-progress>
                            <div class="crile-text" style="color: #fc7a3c">
                                6751
                            </div>
                            <div class="crile-title">等级统计(2-6级)(人次)</div>
                        </div>
<!--                        <div class="mt45" style="height:120px">-->
<!--                            <div class="floatLeft halfWidth">-->
<!--                                <div class="mb15">养老机构照护（人）</div>-->
<!--                                <div class="display" style="cursor: pointer" @click="openLongDailog('养老机构照护')">-->
<!--                                    <div class="listInfor institutionColor font36" v-for="(item,i) in yljgzh" :key="i">{{item}}</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="floatLeft halfWidth">-->
<!--                                <div class="mb15"><span>社区居家照护（人）</span></div>-->
<!--                                <div class="display" style="cursor: pointer" @click="openLongDailog('社区居家照护')">-->
<!--                                    <div class="listInfor institutionColor font36" v-for="(item,i) in sqjjzh" :key="i">{{item}}</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="mt35">-->
<!--                            <div class="font26 mb25">等级统计</div>-->
<!--                            <div class="greedInforList">-->
<!--                                <div class="display">-->
<!--                                    <div v-for="(item,i) in dataList" :key="i" class="itemStyle">-->
<!--                                        {{item}}-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="display borderTop">-->
<!--                                    <div v-for="(item,i) in greedList" :key="i" class="itemStyle twoItemStyle">-->
<!--                                        {{item}}-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                    <div v-show="index==2" class="displayFlex">
                        <div class="borderRigth">
                            <span class="font24">家庭医生</span>
                            <div class="bgImg qyNumber mt20">
                                <span class="mr20"><img src="@/assets/img/jtys_icon.png" alt=""></span>
                                <div>
                                    <p class="font22">签约人数（人）</p>
                                    <span class="font36 yellowColor">344600</span>
                                </div>
                            </div>
                            <div class="bgImg qyNumber mt35">
                                <span class="mr20"><img src="@/assets/img/jtys_icon.png" alt=""></span>
                                <div>
                                    <p class="font22">签约率（%）</p>
                                    <span class="font36 yellowColor">92.5%</span>
                                </div>
                            </div>
                        </div>
                        <div class="borderRigth borderRigthNone">
                            <span class="font24">健康体检</span>
                            <div class="bgImg qyNumber mt20">
                                <span class="mr20"><img src="@/assets/img/jktj_icon.png" alt=""></span>
                                <div>
                                    <p class="font22">应体检人数（人）</p>
                                    <!-- <span class="font36 yellowColor">{{dataCount}}</span> -->
                                    <span class="font36 yellowColor">372000</span>

                                </div>
                            </div>
                            <div class="bgImg qyNumber mt35">
                                <span class="mr20"><img src="@/assets/img/jktj_icon.png" alt=""></span>
                                <div>
                                    <p class="font22">实际体检人数（人）</p>
                                    <span class="font36 yellowColor">270900</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="index===3">
                        <div class="jkxwBg">
                            <span class="font24">总计(家)</span>
                            <p class="font46 totilNumber">5</p>
                        </div>
                    </div>
                    <!-- 家庭支付 -->
                    <div v-show="index==4" class="display">
                        <div class="pt40 pl10">
                            <img src="@/assets/img/fjzl_bg.png" alt="">
                        </div>
                        <div class="ml30">
                            <div class="fzzl displayFlex">
                                <div class="display ml80" style="visibility: hidden">
                                    <span class="font20 mr10">较上年</span>
                                    <span class="font22 blueColor mr5">0.3%</span>
                                    <span><img src="@/assets/img/up.png" alt=""></span>
                                </div>
                                <div class="fjzzImg">
                                    <img src="@/assets/img/fjzlf_bg.png" alt="">
                                </div>
                                <div class="displayCenter">
                                    <span class="mb38 fontColor" style="cursor: pointer" @click="openRentDailog">{{contractCount.storeCount}}</span>
                                    <span>租赁点个数（个）</span>
                                </div>
                            </div>
                            <div class="fzzl displayFlex mt60">
                                <div class="display ml80" style="visibility: hidden">
                                    <span class="font20 mr10">较上年</span>
                                    <span class="font22 blueColor mr5">0.3%</span>
                                    <span><img src="@/assets/img/up.png" alt=""></span>
                                </div>
                                <div class="fjzzImg">
                                    <img src="@/assets/img/fjzlf_bg.png" alt="">
                                </div>
                                <div class="displayCenter">
                                    <span class="mb38 institutionColor" style="cursor: pointer" @click="openContractDailog">{{contractCount.contractCount}}</span>
                                    <span>合同签约人数（人）</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <serviceOlder v-if="isShow" :close="closeDailog" ></serviceOlder>
        <servicePerson v-if="isPersonShow" :close="closePersonDailog" ></servicePerson>
        <orderList v-if="isOrderShow" :close="closeOrderDailog" ></orderList>
        <longHelpList v-if="isLongShow" :close="closeLongDailog" :title="longTitle"></longHelpList>
        <rentList v-if="isRentShow" :close="closeRentDailog" ></rentList>
        <contractList v-if="isContractShow" :close="closeContractDailog" ></contractList>
    </div>
</template>
<script>
import echarts from "echarts"
// import Chart from "@/components/Chart"
import {getPeopleNumber,getTypeNumber,getLevelNumber,getServeNumber,getServeOldNumber,getOrderNumber,getLeaseNumber,getNumber} from "@/api/pensionServices"
import {volunteerCount,serviceObjectCount} from "@/api/volunteer"
import {areaCode} from '@/api/areaCode'
import serviceOlder from "./homeOlder/dailog/serviceOlder";
import servicePerson from "./homeOlder/dailog/serviceManList"
import orderList from "./homeOlder/dailog/orderList";
import longHelpList from "./homeDailog/longHelpList";
import rentList from "./homeDailog/rentList";
import contractList from "./homeDailog/contractList";
export default {
    components:{ serviceOlder, servicePerson, orderList, longHelpList, rentList, contractList },
    data(){
        var fontColor = '#fff'
        return{
            index:1,
            institutions:589854,
            insuranceOptions:{},
            applyTotal:0,
            successCount:0,
            successRate:0,
            sqjjzh:0,
            yljgzh:0,
            width:"630px",
            numberOfVolunteers:0,
            numberOfServiceObject:0,
            dataList:[],
            greedList:[],
            serveNumber:0,
            serveOldNumber:0,
            serveOrderNumber:0,
            contractCount:{},
            dataCount:0,
            isShow: false,
            isPersonShow: false,
            isOrderShow: false,
            isLongShow: false,
            isRentShow: false,
            isContractShow: false,
            longTitle: ''
        }
    },
    methods:{
        openContractDailog() {
            this.isContractShow = true
        },
        closeContractDailog() {
            this.isContractShow = false
        },
        openRentDailog() {
            this.isRentShow = true
        },
        closeRentDailog() {
            this.isRentShow = false
        },
        openLongDailog(title) {
            this.longTitle = title
            this.isLongShow = true
        },
        closeLongDailog() {
            this.isLongShow = false
        },
        openDailog() {
            this.isShow = true
        },
        closeDailog() {
            this.isShow = false
        },
        openPersonDailog() {
            this.isPersonShow = true
        },
        closePersonDailog() {
            this.isPersonShow = false
        },
        openOrderDailog() {
            this.isOrderShow = true
        },
        closeOrderDailog() {
            this.isOrderShow = false
        },
        toSecond() {
            this.$router.push("/homeOlder")
        },
        changeDate(num){
            this.index=num
        },
        getPeople(){
            getPeopleNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    const {applyTotal,successCount,successRate } = res.data
                    this.applyTotal = applyTotal
                    this.successCount = successCount
                    this.successRate = successRate
                }
            })
        },
        getType(){
            getTypeNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    const {sqjjzh,yljgzh} = res.data[0]
                    this.sqjjzh = String(sqjjzh).split("")
                    this.yljgzh = String(yljgzh).split("")
                }
            })
        },
        getLevel(){
            getLevelNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                   if(res.data&&res.data.length){
                       res.data.forEach(item=>{
                           this.dataList.push(item.count)
                           if(item.name!='建议送医'){
                               this.greedList.push(item.name+'级')
                           }else{
                                this.greedList.push(item.name)
                           }
                       })
                   }
                }
            })
        },
        getVolunteerCount() {
            volunteerCount({areaCode:areaCode}).then(res => {
                    if (res.code === 0) {
                        this.numberOfVolunteers = res.data

                    }

                }
            )
            serviceObjectCount({areaCode:areaCode}).then(res => {
                    if (res.code === 0) {
                        this.numberOfServiceObject = res.data

                    }

                }
            )


        },
         //服务人员
        getServe(){
            getServeNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveNumber = res.data
                }
            })
        },
        //老人
        getOlder(){
            getServeOldNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveOldNumber=res.data
                }
            })
        },
        // 工单
        getOrder(){
            getOrderNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveOrderNumber = res.data
                }
            })
        },
        getgetLease(){
            getLeaseNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                   this.contractCount = res.data
                }
            })
        },
        getNumber(){
            getNumber({areaCode:areaCode,age:'65'}).then(res=>{
                if(res.code==0){
                    this.dataCount = res.data
                }
            })
        }
    },
    mounted(){
        this.getVolunteerCount()
        this.institutions = String(this.institutions).split("")
        this.getPeople()
        this.getType()
        this.getLevel()
        this.getServe()
        this.getOlder()
        this.getOrder()
        this.getgetLease()
        this.getNumber()
    }
}
</script>
<style lang="scss" scoped>
.crile {
    display: inline-block;
    width: 33.3%;
    padding-left: 40px;
    margin-top: 60px;
    position: relative;
    vertical-align: top;
    .crile-text {
        width: 210px;
        text-align: center;
        line-height: 210px;
        font-size: 40px;
        position: absolute;
        top: 0;
        letter-spacing: 3px;
    }
    .crile-title {
        width: 210px;
        text-align: center;
        font-size: 20px;
        margin-top: 20px;
    }
}
.floatLeft{
    float: left;
}
.jjyl{
    width:480px;
}
.yyjh{
    width:980px;
}
.serveInfor{
    padding:10px 30px;
}
.serveBorderBottom{
    border-bottom:1px dashed #0aafb5;
    padding:35px 0;
}
.serveBorderBottomNone{
    border:none;
}
.letterSpacing{
    letter-spacing: 4px;
}
.gdColor{
    color:#fc7a3c;
    font-family: Helvetica;
    // letter-spacing: 5px;
}
.borderBottom{
    padding:20px 80px 15px 20px;
    border-bottom:1px dashed #065a84;
}
.borderBottomNone{
    border:none;
}
.bgImg{
    width:430px;height:150px;background:url("../../../assets/img/yyjh_bg.png");
    background-size:100% 100%;
}
.jkxwBg{
    width:900px;height:420px;background:url("../../../assets/img/jkxw_bg.png");
    background-size:100% 100%;text-align: center;padding-top:157px;
    .totilNumber{
        font-size: 42px;
        font-weight: bold;
        color:#ffce14;
        // letter-spacing: 10px;
    }
}
.fzzl{
    position: relative;
    width:541px;
    .fjzzImg{
        position: absolute;
        top:38px;
    }
}
.qyNumber{
    display: flex;
    align-items: center;
    padding-left:60px;
}
.greedInforList{
    height:103px;
    width:918px;
    border:1px solid #1ceee8;
}
.borderTop{
    border-top:1px solid #1ceee8;
    background:#2f4e6e;
}
.itemStyle{
    width:118px;height:62px;
    text-align: center;
    line-height: 62px;
    color:#13d9a3;
    font-weight: 500;
    border-right: 1px solid #1ceee8;
}
.twoItemStyle{
    height:38px;
    font-size: 18px;
    color:#fff;
    line-height: 38px;
}
.itemStyle:nth-of-type(8){
    border:none
}
</style>
