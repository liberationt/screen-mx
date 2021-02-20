<template>
    <div class="detailHeader">
        <div class="displayFlex headerInfor">
            <div>
                <h4>综合为老服务中心(家)</h4>
                <div>
                    <!-- <span class="headerInforNumber greenColor cursorPointer" @click="showTable(1)">{{typeData.comprehensiveServiceCenter.agencyCount}}</span> -->
                    <span class="headerInforNumber greenColor cursorPointer" @click="showTable(1)">79</span>
                </div>
            </div>
            <div>
                <h4>助餐点(社区食堂(家))</h4>
                <div>
                    <span class="headerInforNumber beigeColor" >
                        <!-- <span class="cursorPointer" @click="showTable(2)">{{typeData.meals.agencyCount}}</span> -->
                        <span class="cursorPointer" @click="showTable(2)">99</span>
                        <span>(26)</span>
                    </span>
                </div>
            </div>
            <div>
                <h4>日间照护机构(家)</h4>
                <div>
                    <span class="headerInforNumber pinkColor" >
                        <!-- <span>{{typeData.dayCareAgency.bracket}}/</span> -->
                        <!-- <span class="cursorPointer" @click="showTable(3)">{{typeData.dayCareAgency.agencyCount}}</span> -->
                        <span>539/</span>
                        <span class="cursorPointer" @click="showTable(3)">73</span>
                    </span>
                    <p class="font22 lightGreenColor">托位/机构</p>
                </div>
            </div>
            <div>
                <h4>睦邻点(家)</h4>
                <div>
                    <!-- <span class="headerInforNumber orangeYellowColor cursorPointer" @click="showTable(4)">{{typeData.goodNeighbor.agencyCount}}</span> -->
                    <span class="headerInforNumber orangeYellowColor" @click="showTable(4)">144</span>
                </div>
            </div>
            <div>
                <h4>养老顾问点(个)</h4>
                <div>
<!--                    <span class="headerInforNumber skyBlueColor cursorPointer" @click="showTable(5)">{{typeData.communityPensionOrganization.agencyCount}}</span>-->
                    <span class="headerInforNumber skyBlueColor cursorPointer" @click="showTable(5)">584</span>
                </div>
            </div>
            <div>
                <h4>老年活动室(银龄之家)</h4>
                <div>
                    <span class="headerInforNumber orangeColor cursorPointer" @click="showTable(6)">{{typeData.elderlyActivityRoom.agencyCount}}</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg">
                <communityTable :close="closeTab" :titleName="titleName" :orgTypes="orgTypes" :type="type"/>
            </div>
        </div>
    </div>
</template>
<script>
import { getTypeList } from "@/api/sq";
import {areaCode} from "@/api/areaCode";
import  communityTable from "./secondScreen/communityTable"
export default {
    components:{communityTable},
    data(){
        return{
            isShowBg:false,
            titleName:'',
            orgTypes:'',
            type:'',
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
            }
        }
    },
    methods:{
        showTable(num){
            switch(num){
                case 1:
                    this.type = 1
                    this.orgTypes = "2011"
                    this.titleName = "综合为老服务中心"
                    break
                case 2:
                    this.type = 1
                    this.orgTypes = "2014,2015"
                    this.titleName = "助餐点"
                    break
                case 3:
                    this.type = 1
                    this.orgTypes = "2010"
                    this.titleName = "日间照护机构"
                    break
                case 4:
                    this.type = 1
                    this.orgTypes = ""
                    this.titleName = "睦邻点"
                    break
                case 5:
                    this.type = 2
                    this.orgTypes = ""
                    this.titleName = "养老顾问点机构"
                    break
                case 6:
                    this.type = 1
                    this.orgTypes = "2013"
                    this.titleName = "老年活动室"
                    break

            }
            if(num!=4){
                this.isShowBg = true
            }
        },
        closeTab(){
            this.isShowBg = false
        },
        getDate(){
            getTypeList({ areaCode:areaCode }).then(res=>{
                if(res.code==0){
                    this.typeData =res.data
                }
            })
        }
    },
    mounted(){
        this.getDate()
    }
}
</script>
<style lang="scss" scoped>

</style>
