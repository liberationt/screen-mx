<template>
    <div class="mhContent detailInforCom">
        <elderHeader :headerTitle="title"/>
        <elderHeaderNum />
        <div class="elderContent">
            <div>
                <pensionInstitutions />
                <communityPension style="margin-top:-1px"/>
            </div>
            <div>
                <elderlyStatistics />
            </div>
            <div>
                <homePension />
                <medicineNutrition style="margin-top:-1px"/>
            </div>
        </div>
    </div>
</template>
<script>
import elderHeader from "../header/secondHeader"
import elderHeaderNum from "./elderHeader"
import pensionInstitutions from "./pensionInstitutions"
import elderlyStatistics from "./elderlyStatistics"
import communityPension from "./communityPension"
import homePension from "./homePension"
import medicineNutrition from "./medicineNutrition"
export default {
    components:{
        elderHeader,
        elderHeaderNum,
        pensionInstitutions,
        elderlyStatistics,
        communityPension,
        homePension,
        medicineNutrition
    },
    data(){
        return{
            title:'老人信息'
        }
    }
}
</script>
<style lang="scss" scoped>
    .elderContent{
        display: flex;
    }
</style>