<template>
    <div class="shortWidthStyle">
        <div>
            <div class="elderInforTitle">
                <div class="inforTitleImg" style="cursor: inherit">医养融合</div>
            </div>
            <div class="pt20">
                <div class="displayFlex">
                    <div class="display">
                        <span class="font26">医(家)</span>
                        <div class="display ml20">
                            <div v-for="(item,i) in yiList" :key="i" class="communityList skyBlueColor">{{item}}</div>
                        </div>
                    </div>
                    <div class="display">
                        <span class="font26">养(家)</span>
                        <div class="display ml20">
                            <div v-for="(item,i) in yangList" :key="i" class="communityList skyBlueColor">{{item}}</div>
                        </div>
                    </div>
                    <div class="display">
                        <span class="font26">康(家)</span>
                        <div class="display ml20">
                            <div v-for="(item,i) in kangList" :key="i" class="communityList skyBlueColor">{{item}}</div>
                        </div>
                    </div>
                    <div class="display">
                        <span class="font26">护(家)</span>
                        <div class="display ml20">
                            <div v-for="(item,i) in huList" :key="i" class="communityList skyBlueColor">{{item}}</div>
                        </div>
                    </div>
                </div>
                <div class="mt40">
                    <div class="displayFlex inforList ">
                        <div v-for="(item,i) in streetList" :key="i" class="inforListItem brightColor">{{item.streetName}}</div>
                    </div>
                    <div class="displayFlex inforList">
                        <div v-for="(item,i) in streetYiList" :key="i" class="inforListItem beigeColor">{{item}}</div>
                    </div>
                    <div class="displayFlex inforList">
                        <div v-for="(item,i) in streetYangList" :key="i" class="inforListItem skyRedColor">{{item}}</div>
                    </div>
                    <div class="displayFlex inforList">
                        <div v-for="(item,i) in streetKangList" :key="i" class="inforListItem greenColor">{{item}}</div>
                    </div>
                    <div class="displayFlex inforList inforListBor">
                        <div v-for="(item,i) in streetHuList" :key="i" class="inforListItem orangeColor">{{item}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
// import elderInforDetail from "./elderlyInfor/index"
//引入js
import {getAgeDistribution,getStreetNumber} from '@/api/elderlyInfor'
import {getMedicalCare} from "@/api/pensionInstitutions"
export default {
    // elderInforDetail
    data(){
        var value = 0.2;
        var data = [value, value, value, ];
        var fontColor = '#fff'
        return{
            // showDetail:false,
            institutions:12845,
            index:1,
            subsidy:0,
            yiList:[0],
            yangList:[0],
            kangList:[0],
            huList:[0],
            streetList:[],
            streetYiList:["医"],
            streetYangList:["养"],
            streetKangList:["康"],
            streetHuList:["护"]
        }
    },
    methods:{
        getData(){
            getMedicalCare({areaCode:areaCode,orgTypes:'1010,1011'}).then(res=>{
                if(res.code==0){
                    this.yiList = String(res.data.yiNum ).split("")
                    this.yangList = String(res.data.yangNum ).split("")
                    this.kangList = String(res.data.kangNum ).split("")
                    this.huList = String(res.data.huNum ).split("")
                    this.streetList =  JSON.parse(JSON.stringify(res.data.hu))
                    this.streetList.unshift(
                        {
                            streetName:'闵行区'
                        }
                    )
                    res.data.yi.forEach(item=>{
                        this.streetYiList.push(item.number)
                    })
                    res.data.yang.forEach(item=>{
                        this.streetYangList.push(item.number)
                    })
                    res.data.kang.forEach(item=>{
                        this.streetKangList.push(item.number)
                    })
                    res.data.hu.forEach(item=>{
                        this.streetHuList.push(item.number)
                    })
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
   .inforList{
       border-left:1px solid #19fff8;
       .inforListItem{
            width:95px;height:67px;text-align: center;line-height: 67px;
            font-size: 17px;
            border-top: 1px solid #19fff8;
            border-right:1px solid #19fff8;
       }

   }
   .inforListBor{
       border-bottom:1px solid #19fff8;
   }
</style>
