<template>
    <div class="detailHeader">
        <div class="displayFlex headerInfor">
            <div>
                <h4>老人数量(人)</h4>
                <div>
                    <span class="headerInforNumber orangeColor cursorPointer" @click="showTab(1)">372127</span>
                    <!-- <span class="headerInforNumber orangeColor cursorPointer" @click="showTab(1)">{{elderNum}}</span> -->
                    <!-- <span class="font22 mr10 ml5">较上年</span>
                    <span class="brightColor font28 mr5">25</span>
                    <span><img src="@/assets/img/up.png" alt=""></span> -->
                </div>
            </div>
            <div>
                <h4>机构养老(人)</h4>
                <div>
                    <span class="headerInforNumber greenColor cursorPointer" @click="showTab(2)">{{elderCount}}</span>
                    <!-- <span class="font22 mr10 ml5">较上年</span>
                    <span class="brightColor font28 mr5">25</span>
                    <span><img src="@/assets/img/up.png" alt=""></span> -->
                </div>
            </div>
            <!-- <div>
                <h4>社区养老(人)</h4>
                <div>
                    <span class="headerInforNumber orangeYellowColor cursorPointer" @click="showTab(3)">{{communityCount}}</span>
                    <span class="font22 mr10 ml5">较上年</span>
                    <span class="brightColor font28 mr5">25</span>
                    <span><img src="@/assets/img/up.png" alt=""></span>
                </div>
            </div> -->
            <div>
                <h4>居家养老(人)</h4>
                <div>
                    <span class="headerInforNumber skyBlueColor cursorPointer" @click="showTab(4)">{{serveOldNumber}}</span>
                    <!-- <span class="font22 mr10 ml5">较上年</span>
                    <span class="brightColor font28 mr5">25</span>
                    <span><img src="@/assets/img/up.png" alt=""></span> -->
                </div>
            </div>
<!--            <div>-->
<!--                <h4>智慧养老(人)</h4>-->
<!--                <div>-->
<!--                    <span class="headerInforNumber pinkColor cursorPointer" @click="showTab(5)">{{smartNamber}}</span>-->
<!--                    &lt;!&ndash; <span class="font22 mr10 ml5">较上年</span>-->
<!--                    <span class="brightColor font28 mr5">25</span>-->
<!--                    <span><img src="@/assets/img/up.png" alt=""></span> &ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->
            <!-- <div>
                <h4>支付保障(元)</h4>
                <div>
                    <span class="headerInforNumber lightGreenColor cursorPointer">378321</span>
                    <span class="font22 mr10 ml5">较上年</span>
                    <span class="brightColor font28 mr5">25</span>
                    <span><img src="@/assets/img/up.png" alt=""></span>
                </div>
            </div> -->
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="elderTable">
                <elderTab :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="instituTable">
                <institutionalTable :close="closeTab" :titleName="titleName" :orgTypes="orgTypes" />
            </div>
            <!-- <div class="toastImg" v-if="communiTable">
                <communityTable :close="closeTab"/>
            </div> -->
            <div class="toastImg" v-if="homeCare">
                <homeCareTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="smart">
                <smartTable :close="closeTab"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import {getElderNumber} from '@/api/elderlyInfor'
import {getOldNumber} from "@/api/pensionInstitutions"
import {getServeOldNumber } from '@/api/homeCare'
import elderTab from "./elderTable"
import institutionalTable from "./secondScreen/institutionalTable"
// import communityTable from "./secondScreen/communityTable"
import homeCareTable from "./secondScreen/homeCareTable"
import smartTable from "./secondScreen/smartTable"
import {getLift,getCareFor,getHelp,getSmartPension} from '@/api/elderlyInforDetails'
import { wisOlder } from '@/api/thirdScreen'
export default {
    components:{elderTab,institutionalTable,homeCareTable,smartTable},
    // props:{
    //     isShowBg:{
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data(){
        return{
            elderNum:0,
            elderCount:0,
            communityCount:0,
            serveOldNumber:0,
            isShow:true,
            isShowBg:false,
            activeCarePension:0,
            activeCareNum:0,
            servingTheElderly:0,
            elderTable:false,
            instituTable:false,
            communiTable:false,
            homeCare:false,
            smart:false,
            titleName:'',
            orgTypes:'',
            smartNamber:0
        }
    },
    methods:{
        showTab(num){
            this.isShowBg = true
            switch(num){
                case 1:
                    this.elderTable = true
                break;
                case 2:
                    this.titleName = '机构养老信息'
                    this.orgTypes = 'service_10XX'
                    this.instituTable = true
                    break;
                case 3:
                    this.titleName = '社区养老信息'
                    this.orgTypes = 'service_20XX'
                    this.instituTable = true
                break;
                case 4:
                    this.homeCare = true
                break;
                 case 5:
                    this.smart = true
                break;
            }

        },
        closeTab(){
            this.isShowBg = false
            this.elderTable = false
            this.instituTable = false
            this.communiTable = false
            this.homeCare = false
            this.smart = false
        },
        getNumber(){
            wisOlder({
                town: "闵行区"
            }).then(res =>{
                if(res.code === 0){
                    this.smartNamber = res.data
                }
            })
            //老人总数
            // getElderNumber({areaCode:areaCode}).then(res=>{
            //     this.elderNum = res.data
            // })
            //机构养老
            getOldNumber({areaCode: areaCode,orgType:'service_10XX'}).then(res=>{
                if(res.code==0){
                    this.elderCount = res.data
                }
            })
            //社区
            getOldNumber({areaCode: areaCode,orgType:'service_20XX'}).then(res=>{
                if(res.code==0){
                    this.communityCount = res.data
                }
            })
            //居家养老
            getServeOldNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.serveOldNumber=res.data
                }
            })
            //智慧养老人数 --- 服务总人数
            //生活服务
            getLift({town:'闵行区'}).then(res=>{
                if(res.code==0){
                    this.activeCarePension = res.data.orderCount
                }
            })
            //关爱
            getCareFor({town:'闵行区'}).then(res=>{
                if(res.code==0){
                    this.activeCareNum = res.data.activeCarePension
                }
            })
            //救助
            getHelp({town:'闵行区'}).then(res=>{
                if(res.code==0){
                   this.activeCareNum = res.data.servingTheElderly
                }
            })
            getSmartPension({
                pageNum:1,
                pageSize:12,
                town: "闵行区"
            }).then(res=>{
                if(res.code==0){
                    // this.smartNamber = res.data.total
                }
            })
        },
        // getTotal(){
        //     return this.activeCarePension+this.activeCareNum+this.activeCareNum
        // }
    },
    mounted(){
        this.getNumber()
    }
}
</script>
<style lang="scss" scoped>
   .toast{
        width:1710px;
        height:1160px;
        // background:url("../../../../../assets/images/dialog_bg1.png");
        background-size:100% 100%;
        background-repeat: no-repeat;
        padding: 0 30px;
    }
</style>
