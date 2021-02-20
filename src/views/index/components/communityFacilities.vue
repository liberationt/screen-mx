<template>
    <div class="shortWidth">
        <div class="inforTitle displayFlex">
            <div class="inforTitleImg" @click="toCommunityInfor">社区设施</div>
<!--            <div class="inforTitleRight">POS签到</div>-->
        </div>
        <div class="baseInfor">
            <div class="baseInforTop mb10">
                <div :class="index==1?'activeColor':''" @click="changeDate(1)">类型统计<span class="lineColor" v-if="index==1"></span></div>
                <div :class="index===2?'activeColor':''" @click="changeDate(2)">街镇分布<span class="lineColor" v-if="index==2"></span></div>
            </div>
            <div v-if="index==1">
                <div class="floatLeft mr60">
                    <div class="displayFlex borderBottom font26">
                        <div class="display">
                            <span><img src="@/assets/img/zhwl.png" alt=""></span>
                            <span class="ml12">社区综合为老服务中心</span>
                        </div>
                        <div class="displayColumn">
                            <span class="yellowColor zhwl" @click="openDailog('社区综合为老服务中心')" style="cursor: pointer">
<!--                                {{typeData.comprehensiveServiceCenter.agencyCount}}-->79
                            </span>
                        </div>
                    </div>
                    <div class="textAlgin font20 mt15" style="visibility: hidden">
                        <span>较上年</span>
                        <span class="mr10 ml10 blueColor font18">{{typeData.comprehensiveServiceCenter.growthNumber}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>
                <div class="floatLeft">
                    <div class="displayFlex borderBottom font26">
                        <div class="display">
                            <span><img src="@/assets/img/zcd.png" alt=""></span>
                            <span class="ml12">助餐点</span>
                        </div>
                        <div class="displayColumn">
                            <!-- <span class="yellowColor zcd" @click="openDailog('助餐点')" style="cursor: pointer">{{typeData.meals.agencyCount}}</span> -->
                            <span class="yellowColor zcd" @click="openDailog('助餐点')" style="cursor: pointer">99</span>
                        </div>
                    </div>
                    <div class="textAlgin font20 mt15" style="visibility: hidden">
                        <span>较上年</span>
                        <span class="mr10 ml10 blueColor font18">{{typeData.meals.growthNumber}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>
                <div class="floatLeft mr60">
                    <div class="displayFlex borderBottom font26">
                        <div class="display">
                            <span><img src="@/assets/img/rjzh.png" alt=""></span>
                            <span class="ml12">日间照护机构</span>
                        </div>
                        <div class="displayColumn">
                            <!-- <span class="yellowColor rjzh" @click="openDailog('日间照护机构')" style="cursor: pointer">{{typeData.dayCareAgency.bracket}}/{{typeData.dayCareAgency.agencyCount}}</span> -->
                            <span class="yellowColor rjzh" @click="openDailog('日间照护机构')" style="cursor: pointer">539/73</span>
                            <span class="font16 textAlgin" style="margin-bottom:-10px">(托位/机构)</span>
                        </div>
                    </div>
                    <div class="textAlgin font20 mt15" style="visibility: hidden">
                        <span>较上年</span>
                        <span class="mr10 ml10 blueColor font18">{{typeData.dayCareAgency.growthNumber}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>
                <div class="floatLeft">
                    <div class="displayFlex borderBottom font26">
                        <div class="display">
                            <span><img src="@/assets/img/mld.png" alt=""></span>
                            <span class="ml12">睦邻点</span>
                        </div>
                        <div class="displayColumn">
                            <span class="yellowColor mhd" style="cursor: pointer">144</span>
                        </div>
                    </div>
                    <div class="textAlgin font20 mt15" style="visibility: hidden">
                        <span>较上年</span>
                        <span class="mr10 ml10 blueColor font18">{{typeData.goodNeighbor.growthNumber}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>
                <div class="floatLeft mr60">
                    <div class="displayFlex borderBottom font26">
                        <div class="display">
                            <span><img src="@/assets/img/ylgw.png" alt=""></span>
                            <span class="ml12">养老顾问点</span>
                        </div>
                        <div class="displayColumn">
<!--                            <span class="yellowColor ylgw" @click="openDailog('养老顾问点')" style="cursor: pointer">{{typeData.communityPensionOrganization.agencyCount}}</span>-->
                            <span class="yellowColor ylgw" @click="openDailog('养老顾问点')" style="cursor: pointer">584</span>
                        </div>
                    </div>
                    <div class="textAlgin font20 mt15" style="visibility: hidden">
                        <span>较上年</span>
                        <span class="mr10 ml10 blueColor font18">{{typeData.communityPensionOrganization.growthNumber}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>

                <div class="floatLeft">
                    <div class="displayFlex borderBottom font26">
                        <div class="display">
                            <span><img src="@/assets/img/lnhd.png" alt=""></span>
                            <span class="ml12">老年活动室(银龄之家)</span>
                        </div>
                        <div class="displayColumn">
                            <span class="yellowColor" @click="openDailog('老年活动室')" style="cursor: pointer">{{typeData.elderlyActivityRoom.agencyCount}}</span>
                        </div>
                    </div>
                    <div class="textAlgin font20 mt15" style="visibility: hidden">
                        <span>较上年</span>
                        <span class="mr10 ml10 blueColor font18">{{typeData.elderlyActivityRoom.growthNumber}}</span>
                        <span><img src="@/assets/img/up.png" alt=""></span>
                    </div>
                </div>

            </div>
            <div v-if="index==2" class="sq-content">
                <div class="sq-tabs" :class="[num === 1 && isADD === true ? 'sq-left-one' : (num === 2 && isADD === true ? 'sq-left-two' : ( num === 1 && isADD === false ? 'sq-left-three' : (num === 0 && isADD === false ? 'sq-left-four' : '')))]">
                    <div class="sq-tabs-item">
                        <div class="sq-tabs-item-list">
                            <div class="sq-tabs-item-list-logo">
                                <img src="@/assets/img/zhwl.png" alt="">
                                <span>综合为老服务中心</span>
                            </div>
                            <div class="sq-tabs-list">
                                <div class="sq-tabs-list-item" v-for="item in allData.comprehensiveServiceCenter" :key="item.streetName">
                                    <span class="nums">{{item.number}}</span>
                                    <span></span>
                                    <span>{{item.streetName}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="sq-tabs-item-list">
                            <div class="sq-tabs-item-list-logo">
                                <img src="@/assets/img/zcd.png" alt="">
                                <span>助餐点</span>
                            </div>
                            <div class="sq-tabs-list">
                                <div class="sq-tabs-list-item" v-for="item in allData.meals" :key="item.streetName">
                                    <span class="nums">{{item.number}}</span>
                                    <span></span>
                                    <span>{{item.streetName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sq-tabs-item">
                        <div class="sq-tabs-item-list">
                            <div class="sq-tabs-item-list-logo">
                                <img src="@/assets/img/rjzh.png" alt="">
                                <span>日间照护机构</span>
                            </div>
                            <div class="sq-tabs-list">
                                <div class="sq-tabs-list-item" v-for="item in allData.dayCareAgency" :key="item.streetName">
                                    <span class="nums">{{item.number}}</span>
                                    <span></span>
                                    <span>{{item.streetName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="sq-tabs-item-list">
                            <div class="sq-tabs-item-list-logo">
                                <img src="@/assets/img/mld.png" alt="">
                                <span>睦邻点</span>
                            </div>
                            <div class="sq-tabs-list">
                                <div class="sq-tabs-list-item" v-for="item in allData.goodNeighbor" :key="item.streetName">
                                    <span class="nums">{{item.number}}</span>
                                    <span></span>
                                    <span>{{item.streetName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sq-tabs-item">
                        <div class="sq-tabs-item-list">
                            <div class="sq-tabs-item-list-logo">
                                <img src="@/assets/img/ylgw.png" alt="">
                                <span>养老顾问点</span>
                            </div>
                            <div class="sq-tabs-list">
                                <div class="sq-tabs-list-item" v-for="item in allData.communityPensionOrganization" :key="item.streetName">
                                    <span class="nums">{{item.number}}</span>
                                    <span></span>
                                    <span>{{item.streetName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="sq-tabs-item-list">
                            <div class="sq-tabs-item-list-logo">
                                <img src="@/assets/img/lnhd.png" alt="">
                                <span>老年活动室</span>
                            </div>
                            <div class="sq-tabs-list">
                                <div class="sq-tabs-list-item" v-for="item in allData.elderlyActivityRoom" :key="item.streetName">
                                    <span class="nums">{{item.number}}</span>
                                    <span></span>
                                    <span>{{item.streetName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sq-btn">
                    <div @click="moveDel" class="btns">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div class="sq-step">
                        <span class="sq-step-round bg-choose" ></span>
                        <span class="sq-step-line">
                            <i class="sq-step-line-choose" :class="[num !== 0 && isADD === true ? 'bg-choose sq-step-line-add' : (num === 0 && isADD === false ? 'bg-choose sq-step-line-del' : ''), isADD === false ? 'sq-step-line-del-one' : '']"></i>
                        </span>
                        <span class="sq-step-round" :class="[num !== 0 && isADD === true ? 'sq-step-round-add' : '', isADD === false && num !== 0 ? 'bg-choose' : '']"></span>
                        <span class="sq-step-line" >
                            <i class="sq-step-line-choose" :class="[num === 2 && isADD === true ? 'bg-choose sq-step-line-add' : (num === 1 && isADD === false ? 'bg-choose sq-step-line-del' : '')]"></i>
                        </span>
                        <span class="sq-step-round" :class="[num === 2 && isADD === true ? 'sq-step-round-add' : '']"></span>
                    </div>
                    <div @click="moveAdd" class="btns">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <communityList v-if="isShow" :close="closeDailog" :title="title" ></communityList>
    </div>
</template>
<script>
import { getJzList, getTypeList } from "@/api/sq";
import {areaCode} from "@/api/areaCode";
import communityList from "./homeDailog/communityList";
export default {
    components: {
        communityList
    },
    data(){
        return{
            index:1,
            allData: '',
            num:0,
            isADD: true,
            typeData:{
                communityPensionOrganization:{
                    agencyCount:'',
                    bracket:'',
                    growthNumber:''
                },
                comprehensiveServiceCenter:{
                    agencyCount:'',
                    bracket:'',
                    growthNumber:''
                },
                dayCareAgency:{
                    agencyCount:'',
                    bracket:'',
                    growthNumber:''
                },
                elderlyActivityRoom:{
                    agencyCount:'',
                    bracket:'',
                    growthNumber:''
                },
                goodNeighbor:{
                    agencyCount:'',
                    bracket:'',
                    growthNumber:''
                },
                meals:{
                    agencyCount:'',
                    bracket:'',
                    growthNumber:''
                }
            },
            isShow: false,
            title: ''
        }
    },
    mounted() {
        this.getJzList()
        this.getTypeList()
    },
    methods:{
        openDailog(title) {
            this.title = title
            this.isShow = true
        },
        closeDailog() {
            this.isShow = false
        },
        toCommunityInfor(){
            this.$router.push('/communityInfor')
        },
        changeDate(num){
            this.index=num
        },
        getJzList() {
            getJzList({areaCode:areaCode}).then(res =>{
                if (res) {
                   if (res.code === 0) {
                       this.allData = res.data
                       this.allData.goodNeighbor = [{
                           streetName: '浦江镇',
                           number: '16'
                       }, {
                           streetName: '吴泾镇',
                           number: '6'
                       }, {
                           streetName: '马桥镇',
                           number: '12'
                       }, {
                           streetName: '颛桥镇',
                           number: '6'
                       }, {
                           streetName: '梅陇镇',
                           number: '12'
                       }, {
                           streetName: '莘庄镇',
                           number: '6'
                       }, {
                           streetName: '七宝镇',
                           number: '8'
                       }, {
                           streetName: '虹桥镇',
                           number: '4'
                       }, {
                           streetName: '华漕镇',
                           number: '16'
                       }, {
                           streetName: '浦锦街道',
                           number: '6'
                       }, {
                           streetName: '江川路街道',
                           number: '6'
                       }, {
                           streetName: '古美街道',
                           number: '12'
                       }, {
                           streetName: '新虹街道',
                           number: '18'
                       }, {
                           streetName: '莘庄工业区',
                           number: '16'
                       }]
                   }
                }
            })
        },
        moveAdd() {
            if (this.num < 2) {
                this.num = this.num + 1;
                this.isADD = true;
            }
        },
        moveDel() {
            if (this.num > 0) {
                this.num = this.num - 1;
                this.isADD = false;
            }
        },
        getTypeList() {
            getTypeList({ areaCode:areaCode }).then(res =>{
                if (res.code === 0) {
                    this.typeData = res.data
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.borderBottom{
    border-bottom:5px solid #05fdfd;
    height:60px;padding-bottom:20px;
}
.floatLeft{
    float: left;
    width:660px;
    margin-bottom: 40px;
}
.zhwl{
    color:#46cba7;
}
.zcd{
    color:#69abf2;
}
.rjzh{
    color:#f852a0;
}
.mhd{
    color:#f9544a;
}
.ylgw{
    color:#50cef9;
}
.sq-content {
    width: 100%;
    overflow: hidden;
    .sq-tabs {
        width: 300%;
        position:relative;
        .sq-tabs-item {
            width: 33.33%;
            float: left;
            .sq-tabs-item-list {
                width: 100%;
                height: 160px;
                border: 1px solid #1cefe9;
                margin-top: 20px;
                .sq-tabs-item-list-logo {
                    width: 240px;
                    text-align: center;
                    float: left;
                    background: #264462;
                    height: 100%;
                    span {
                        width: 100%;
                        display: inline-block;
                        font-size: 22px;
                    }
                    img{
                        margin-top: 36px;
                        margin-bottom:20px;
                    }
                }
                .sq-tabs-list {
                    width: calc(100% - 240px);
                    float: left;
                    .sq-tabs-list-item {
                        width: 14.2857%;
                        float: left;
                        height: 80px;
                        border-left: 1px solid #1cefe9;
                        border-bottom: 1px solid #1cefe9;
                        text-align: center;
                        span {
                            width: 100%;
                            display: block;
                        }
                        span:first-of-type {
                            font-size: 20px;
                            padding-top: 12px;
                        }
                        span:nth-child(2) {
                            width: 10px;
                            height: 2px;
                            background: #e9d10f;
                            margin: 4px 0 4px 80px;
                        }
                        span:last-of-type {
                            font-size: 16px;
                        }
                    }
                    .sq-tabs-list-item:nth-child(n+8) {
                        border-bottom: 0px;
                    }
                }
            }
        }
    }
    .sq-btn {
        width: 100%;
        float: left;
        padding-top: 15px;
        padding-left: 640px;
        .btns {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 20px;
            border: 1px solid #1be5e1;
            color: #1be5e1;
            border-radius: 50%;
            float: left;
            cursor: pointer;
        }
        .sq-step {
            width: 165px;
            float: left;
            margin: 0 20px;
            span {
                display: inline-block;
                vertical-align: middle;
                background: #053f93;
            }
            .bg-choose{
                background: #00fff8;
            }
            .sq-step-round {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 1px solid #00fff8;
            }
            .sq-step-round-add {
                animation:addBg 1000ms linear forwards;
                -webkit-animation:addBg 1000ms linear forwards; /* Safari and Chrome */
            }
            @keyframes addBg
            {
                0%   {  background: #053f93;}
                99%   {  background: #053f93;}
                100% { background: #00fff8;}
            }

            @-webkit-keyframes addBg /* Safari and Chrome */
            {
                0%   {  background: #053f93;}
                99%   {  background: #053f93;}
                100% { background: #00fff8;}
            }
            .sq-step-line {
                width: 60px;
                height: 2px;
                position: relative;
                .sq-step-line-choose {
                    width: 0px;
                    height: 2px;
                    position: absolute;
                    top: 0 ;
                    left: 0;
                    display: inline-block;
                }
                .sq-step-line-add {
                    animation:addMove 1s linear forwards;
                    -webkit-animation:addMove 1s linear forwards; /* Safari and Chrome */
                }
                @keyframes addMove
                {
                    0%   { width: 0;}
                    100% { width: 60px;}
                }

                @-webkit-keyframes addMove /* Safari and Chrome */
                {
                    0%   {width: 0;}
                    100% { width: 60px;}
                }
                .sq-step-line-del {
                    animation:delMove 1s linear forwards;
                    -webkit-animation:delMove 1s linear forwards; /* Safari and Chrome */
                }
                @keyframes delMove
                {
                    0%   { width: 60px;}
                    100% { width: 0px;}
                }

                @-webkit-keyframes delMove /* Safari and Chrome */
                {
                    0%   {width: 60px;}
                    100% { width: 0px;}
                }
                .sq-step-line-del-one {
                    width: 60px;
                    background: #00fff8;
                }
            }
        }
    }
    .sq-left-one {
        animation:oneMove 1s forwards;
        -webkit-animation:oneMove 1s forwards; /* Safari and Chrome */
    }
    @keyframes oneMove
    {
        0%   { left: 0;}
        100% { left: -100%;}
    }

    @-webkit-keyframes oneMove /* Safari and Chrome */
    {
        0%   {left: 0;}
        100% { left: -100%;}
    }
    .sq-left-two {
        animation:twoMove 1s forwards;
        -webkit-animation:twoMove 1s forwards; /* Safari and Chrome */
    }
    @keyframes twoMove
    {
        0%   { left: -100%;}
        100% { left: -200%;}
    }

    @-webkit-keyframes twoMove /* Safari and Chrome */
    {
        0%   {left: -100%;}
        100% { left: -200%;}
    }
    .sq-left-three {
        animation:threeMove 1s forwards;
        -webkit-animation:threeMove 1s forwards; /* Safari and Chrome */
    }
    @keyframes threeMove
    {
        0%   { left: -200%;}
        100% { left: -100%;}
    }

    @-webkit-keyframes threeMove /* Safari and Chrome */
    {
        0%   {left: -200%;}
        100% { left: -100%;}
    }
    .sq-left-four {
        animation:fourMove 1s forwards;
        -webkit-animation:fourMove 1s forwards; /* Safari and Chrome */
    }
    @keyframes fourMove
    {
        0%   { left: -100%;}
        100% { left: 0;}
    }

    @-webkit-keyframes fourMove /* Safari and Chrome */
    {
        0%   {left: -100%;}
        100% { left: 0;}
    }
}
</style>
