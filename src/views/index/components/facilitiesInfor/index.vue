<template>
    <div class="mhContent detailInforCom">
        <elderHeader :headerTitle="title"/>
        <facilitiesHeader />
        <div class="elderContent">
            <div>
                <jjyl />
                <yyrh style="margin-top:-2px"/>
            </div>
            <div>
                <jjtj />
            </div>
            <div>
                <cwf />
                <ssf style="margin-top:-2px"/>
            </div>
        </div>
    </div>
</template>
<script>
import elderHeader from "../header/secondHeader"
import facilitiesHeader from "./facilitiesHeader"
import jjyl from "./jjyl"
import yyrh from "./yyrh"
import jjtj from "./jjtj"
import cwf from "./cwf"
import ssf from "./ssf"
export default {
    components:{
        elderHeader,
        facilitiesHeader,
        jjyl,
        yyrh,
        jjtj,
        cwf,
        ssf
    },
    data(){
        return{
            title:'养老机构'
        }
    }
}
</script>
<style lang="scss" scoped>
    .elderContent{
        display: flex;
    }
</style>