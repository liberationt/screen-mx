<template>
    <div class="detailHeader">
        <div class="displayFlex headerInfor">
            <div>
                <h4>养老机构数量(家)</h4>
                <div>
                    <!-- <span class="headerInforNumber greenColor cursorPointer" @click="showTable(1)">{{institutions}}</span> -->
                    <span class="headerInforNumber greenColor cursorPointer" @click="showTable(1)">52</span>
                </div>
            </div>
            <div>
                <h4>长者照护之家数量(家)</h4>
                <div>
<!--                    <span class="headerInforNumber beigeColor cursorPointer"  @click="showTable(2)">{{institutionsNumber}}</span>-->
                    <span class="headerInforNumber beigeColor cursorPointer"  @click="showTable(2)">15</span>
                </div>
            </div>
            <div>
                <h4>护理员数量(人)</h4>
                <div>
                    <span class="headerInforNumber pinkColor">5075</span>
                    <!-- <span class="headerInforNumber pinkColor cursorPointer"  >{{nursingCount}}</span> -->
                    <!-- <p class="font22 lightGreenColor cursorPointer">托位/机构</p> -->
                </div>
            </div>
            <div>
                <h4>入住人员数量(人)</h4>
                <div>
<!--                    <span class="headerInforNumber orangeYellowColor cursorPointer"  @click="showTable(4)">{{serviceNum}}</span>-->
                  <span class="headerInforNumber orangeYellowColor cursorPointer"  @click="showTable(4)">8462</span>
                </div>
            </div>
            <div>
                <h4>护理费(元)</h4>
                <div>
                    <span class="headerInforNumber skyBlueColor">{{nursingExpensesNum}}</span>
                </div>
            </div>
            <div>
                <h4>床位费(元)</h4>
                <div>
                    <span class="headerInforNumber orangeColor">{{bedChargeNum}}</span>
                </div>
            </div>
            <div>
                <h4>膳食费(元)</h4>
                <div>
                    <span class="headerInforNumber orangeColor">{{mealExpensesNum}}</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg" v-if="facilitiesInfor">
                <facilitiesInforTable :close="closeTab" :titleName="titleName" :orgTypes="orgTypes" :type="type"/>
            </div>
            <div class="toastImg" v-if="nursing">
                <nursingTable :close="closeTab"/>
            </div>
            <div class="toastImg" v-if="checkin">
                <checkinTable :close="closeTab" :orgType="orgTypes"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import {getInstitutionCount,getInstitutionNumber,getMealCost,getBedCharge,getNursingExpenses,getAssort,getNumberOfNursingCount} from "@/api/pensionInstitutions"
import  facilitiesInforTable from "./secondScreen/facilitiesInforTable"
import  nursingTable from "./secondScreen/nursingTable"
import  checkinTable from "./secondScreen/checkinTable"

export default {
    components:{facilitiesInforTable,nursingTable,checkinTable},
    data(){
        return{
            institutions:0,
            institutionsNumber:0,
            mealExpensesNum:0,
            bedChargeNum:0,
            nursingExpensesNum:0,
            serviceNum:0,
            nursingCount:0,
            isShowBg:false,
            facilitiesInfor:false,
            nursing:false,
            checkin:false,
            orgTypes:'',
            titleName:'',
            type:''
        }
    },
    methods:{
        showTable(num){
            switch(num){
                case 1:
                    this.orgTypes = '1010'
                    this.titleName = '养老机构'
                    this.type = 1
                    this.facilitiesInfor = true
                    break
                case 2:
                    this.orgTypes = '1011'
                    this.titleName = '长者照护之家'
                    this.type = 1
                    this.facilitiesInfor = true
                    break
                case 3:
                    this.nursing = true
                    break
                case 4:
                    this.orgTypes = ""
                    this.checkin = true
                    break
            }
            this.isShowBg = true
        },
        closeTab(){
            this.isShowBg = false
            this.facilitiesInfor = false
            this.nursing = false
            this.checkin = false
        },
        getData(){
            // getInstitutionCount({areaCode: areaCode,orgType:'1010'}).then(res => {
            //     if (res.code===0){
            //         this.institutions = res.data
            //     }
            // })
            getInstitutionNumber({areaCode: areaCode,orgType:'1011'}).then(res=>{
                if(res.code==0){
                    this.institutionsNumber = res.data
                }
            })
            getMealCost({areaCode: areaCode}).then(res=>{
                if(res.code==0){
                    this.mealExpensesNum = res.data.mealExpensesNumOne+res.data.mealExpensesNumTwo
                }
            })
            getBedCharge({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.bedChargeNum = res.data.bedChargeNumOne+res.data.bedChargeNumTwo
                }
            })
            getNursingExpenses({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    this.nursingExpensesNum = res.data.nursingExpensesNumOne+res.data.nursingExpensesNumTwo
                }
            })
            getAssort({areaCode: areaCode}).then(res=>{
                if(res.code==0){
                    this.serviceNum = res.data.service1010+res.data.service1011
                }
            })
            getNumberOfNursingCount({areaCode: areaCode,orgType:'1010,1011'}).then(res=>{
                if(res.code==0){
                    this.nursingCount = res.data
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

</style>
