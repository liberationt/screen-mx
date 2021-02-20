<template>
    <div class="short_width">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">综合为老服务中心</div>
        </div>
        <div class="onlyDisplay">
            <div class="halfWidth homePensionLeft">
                <div>
                    <span class="font26">日均服务人次</span>
                    <div class="display mt20">
                        <div class="display">
                            <div v-for="(item,i) in ['8','1','3','7']" :key="i" class="communityList">{{item}}</div>
                        </div>
                        <!-- <div class="display cursorPointer">
                            <div v-for="item in pensionNum" :key="item" class="communityList">{{item}}</div>
                        </div> -->
                        <div class="mt15 ml30">
                            <!-- <p class="font18">较上年</p>
                            <span>
                                <span class="font22 brightColor">11562</span>
                                <span><img src="@/assets/img/up.png" alt=""></span>
                            </span> -->
                        </div>
                    </div>
                </div>
                <div class="pr26 mt20">
                    <div class="font26">机构建造形式</div>
                    <div class="displayFlex zhwlStyle">
                        <span class="font20" style="width:150px">单独门户(家)</span>
                        <span class="font24 fontFamily greenColor cursorPointer" @click="showTable(2)">{{singleDoor}}</span>
                        <span>
                            <span class="font20">占比</span>
                            <span class="font22 brightColor mr10 ml10">{{singleDoorProportion}}</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span>
                    </div>
                    <div class="displayFlex zhwlStyle">
                        <span class="font20" style="width:150px">按片区(家)</span>
                        <span class="font24 fontFamily greenColor cursorPointer" @click="showTable(3)">{{byArea}}</span>
                        <span>
                            <span class="font20">占比</span>
                            <span class="font22 brightColor mr10 ml10">{{byAreaProportion}}</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span>
                    </div>
                    <div class="displayFlex zhwlStyle">
                        <span class="font20" style="width:150px">1+X形式(家)</span>
                        <span class="font24 fontFamily greenColor cursorPointer" @click="showTable(4)">{{onEXForm}}</span>
                        <span>
                            <span class="font20">占比</span>
                            <span class="font22 brightColor mr10 ml10">{{onEXFormProportion}}</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="halfWidth homePensionRight">
                <div class="font26">内部功能设置</div>
                <div>
                    <div class="displayFlex homePensionRightStyle">
                        <span class="displayFlex">
                            <span><img src="@/assets/img/zong.png" alt=""></span>
                            <span class="font20 pl20">长者照护之家服务</span>
                        </span>
                        <span class="font24 fontFamily orangeColor cursorPointer" @click="showTable(5)">{{elderCare}}</span>
                    </div>
                    <div class="displayFlex homePensionRightStyle">
                        <span class="displayFlex">
                            <span><img src="@/assets/img/can.png" alt=""></span>
                            <span class="font20 pl20">助餐服务</span>
                        </span>
                        <span class="font24 fontFamily orangeColor cursorPointer" @click="showTable(6)">{{foodAid}}</span>
                    </div>
                    <div class="displayFlex homePensionRightStyle">
                        <span class="displayFlex">
                            <span><img src="@/assets/img/ri.png" alt=""></span>
                            <span class="font20 pl20">日间照料服务</span>
                        </span>
                        <span class="font24 fontFamily orangeColor cursorPointer" @click="showTable(7)">{{daytime}}</span>
                    </div>
                    <div class="displayFlex homePensionRightStyle">
                        <span class="displayFlex">
                            <span><img src="@/assets/img/hu.png" alt=""></span>
                            <span class="font20 pl20">护理站居家上门服务</span>
                        </span>
                        <span class="font24 fontFamily orangeColor cursorPointer" @click="showTable(8)">{{nursingStation}}</span>
                    </div>
                    <div class="displayFlex homePensionRightStyle">
                        <span class="displayFlex">
                            <span><img src="@/assets/img/wei.png" alt=""></span>
                            <span class="font20 pl20">卫生服务中心\站点服务</span>
                        </span>
                        <span class="font24 fontFamily orangeColor cursorPointer" @click="showTable(9)">{{healthServices}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="elder">
                <elderTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="buildStyle">
                <buildStyleTable :close="closeTab" :titleName="titleName" :orgTypes='orgTypes' :type="type"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import {getIntegrated} from '@/api/communityInfor'
import elderTable from "./secondScreen/elderTable"
import buildStyleTable from "./secondScreen/buildStyleTable"
export default {
    components:{elderTable,buildStyleTable},
    data(){
        return{
            optionHeight:"400px",
            pensionNum:[],
            singleDoor:'',
            singleDoorProportion:'',
            byArea:'',
            byAreaProportion:'',
            onEXForm:'',
            onEXFormProportion:'',
            elderCare:'',
            foodAid:'',
            daytime:'',
            nursingStation:'',
            healthServices:'',
            isShowBg:false,
            elder:false,
            buildStyle:false,
            titleName:'',
            orgTypes:'',
            type:''
        }
    },
    methods:{
        showTable(num){

            switch(num){
                case 1:
                    this.titleName = '服务老人'
                    this.orgTypes = ''
                    this.elder = true
                    break
                case 2:
                    this.titleName = '单独门户'
                    this.orgTypes = "single_door"
                    this.type = 1
                    this.buildStyle = true
                    break
                case 3:
                    this.titleName = '按片区'
                    this.orgTypes = "by_area"
                    this.type = 1
                    this.buildStyle = true
                    break
                case 4:
                    this.titleName = '1+x形式'
                    this.orgTypes = "one_x_form"
                    this.type = 1
                    this.buildStyle = true
                    break
                case 5:
                    this.titleName = '内设长者照护之家'
                    this.orgTypes = "zhwlfwzx_nbgnsz_tgzzzhzjfw "
                    this.type = 2
                    this.buildStyle = true
                    break
                case 6:
                    this.titleName = '助餐服务'
                    this.orgTypes = "zhwlfwzx_nbgnsz_tgzcfw"
                    this.type = 2
                    this.buildStyle = true
                    break
                case 7:
                    this.titleName = '日间照料服务'
                    this.orgTypes = "zhwlfwzx_nbgnsz_tgrjzlfw"
                    this.type = 2
                    this.buildStyle = true
                    break
                case 8:
                    this.titleName = '护理站居家上门'
                    this.orgTypes = "zhwlfwzx_nbgnsz_tghlzjjsmfw"
                    this.type = 2
                    this.buildStyle = true
                    break
                case 9:
                    this.titleName = '卫生服务中心\站点服务上门'
                    this.orgTypes = "zhwlfwzx_nbgnsz_tgwsfwzxhzdfw"
                    this.type = 2
                    this.buildStyle = true
                    break
            }
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
            this.elder = false
            this.buildStyle = false
        },
        getData(){
            getIntegrated({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    const {pensionNum,singleDoor,singleDoorProportion,byArea,byAreaProportion,onEXForm,onEXFormProportion,elderCare,foodAid,daytime,nursingStation,healthServices} = res.data
                    // this.pensionNum = String(pensionNum).split('')
                    this.pensionNum = String(4980).split('')
                    this.singleDoor = singleDoor
                    this.singleDoorProportion = singleDoorProportion
                    this.byArea = byArea
                    this.byAreaProportion = byAreaProportion
                    this.onEXForm = onEXForm
                    this.onEXFormProportion = onEXFormProportion
                    this.elderCare = elderCare
                    this.foodAid = foodAid
                    this.daytime = daytime
                    this.nursingStation = nursingStation
                    this.healthServices = healthServices
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
    .homePensionLeft{
        border-right:1px dashed #0eafb5;
        height:500px;
        padding:20px 0 0 0 ;
        .elderInforList{
            width:666px;
            display: flex;
            flex-wrap: wrap;
            border-left:1px solid #1ce0dd;
            border-bottom:1px solid #1ce0dd;
        }
        .zhwlStyle{
            line-height: 86px;
            border-bottom: 1px dashed #0eafb5;
        }

    }
    .homePensionRight{
        padding:20px 0 0 30px;
        .homePensionRightStyle{
            line-height: 80px;
            border-bottom:3px solid #50cef9;
        }
    }
</style>
