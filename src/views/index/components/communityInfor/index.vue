<template>
    <div class="mhContent detailInforCom">
        <communityHeader :headerTitle="title"/>
        <communityHeaderNum />
        <div class="elderContent">
            <div>
                <zhwl />
                <mld style="margin-top:-1px"/>
            </div>
            <div style="margin-left:-5px">
                <zcd />
                <yygw style="margin-top:-1px"/>
            </div>
            <div style="margin-left:-10px;">
                <rjzh />
                <lnhds style="margin-top:-1px"/>
            </div>
        </div>
    </div>
</template>
<script>
import communityHeader from "../header/secondHeader"
import communityHeaderNum from "./communityHeader"
import zhwl from "./zhwl"
import zcd from "./zcd"
import mld from "./mld"
import rjzh from "./rjzh"
import lnhds from "./lnhds"
import yygw from "./yygw"
export default {
    components:{
        communityHeader,
        communityHeaderNum,
        zhwl,
        zcd,
        mld,
        rjzh,
        lnhds,
        yygw
    },
    data(){
        return{
            title:'社区设施'
        }
    }
}
</script>
<style lang="scss" scoped>
    .elderContent{
        display: flex;
        // position: relative;
    }
</style>