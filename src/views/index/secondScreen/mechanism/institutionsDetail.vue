<template>
    <div class="toastList">
        <div class="toastListTittle">机构详情 <img @click="closeinstitutionsDetail()" src="../../../../assets/images/close_dialog.png" alt=""></div> 
        <div class="toastcontent">
            <div class="toastinfor">
                <div class="inforleft">
                    <div>
                        <h3>基本信息</h3>
                        <div class="inforleftcon">
                            <div>
                                <span>机构名称：</span>
                                <span></span>
                                <span>{{mes.orgName}}</span>
                            </div>
                            <div>
                                <span>机构类型：</span>
                                <span>{{mes.orgTypeStr}}</span>
                            </div>
                            <div>
                                <span>成立时间：</span>
                                <span>{{mes.establishTime}}</span>
                            </div>
                            <div>
                                <span>咨询电话：</span>
                                <span>{{mes.phone}}</span>
                            </div>
                            <div>
                                <span>房屋产权：</span>
                                <span>{{mes.houseProperty}}</span>
                            </div>
                            <div>
                                <span>设置形式：</span>
                                <span>{{mes.setType}}</span>
                            </div>
                            <div>
                                <span>建筑面积(m²)：</span>
                                <span>{{mes.buildArea}}</span>
                            </div>
                            <div>
                                <span>楼层信息(层)：</span>
                                <span>{{mes.buildFloor}}</span>
                            </div>
                            <div>
                                <span>是否有电梯：</span>
                                <span>{{mes.isLift}}</span>
                            </div>
                            <div>
                                <span>所属居委：</span>
                                <span>{{mes.areaCodeStr}}</span>
                            </div>
                            <div>
                                <span>详细地址：</span>
                                <span>{{mes.addr}}</span>
                            </div>
                            <div>
                                <span>开放状态：</span>
                                <span>{{mes.openState}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="padding-top:30px;">
                        <h3>运营信息</h3>
                        <div class="inforleftbottom">
                            <div>
                                <span>法人性质：</span>
                                <span>{{mes.legalType}}</span>
                            </div>
                            <div>
                                <span>运营模式：</span>
                                <span>{{mes.opMode}}</span>
                            </div>
                            <div>
                                <span>运营单位：</span>
                                <span>{{mes.opOrg}}</span>
                            </div>
                            <div>
                                <span>运营方负责人：</span>
                                <span>{{mes.opLinkman}}</span>
                            </div>
                            <div>
                                <span>运营方联系方式：</span>
                                <span>{{mes.opPhone}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inforright">
                    <h3>服务信息</h3>
                    <div v-for="(item, index) in mes.serviceItems" :key="index" class="inforrightcon">
                        <div v-if="item.children !== null">
                            <div v-for="(list, indexs) in item.children" :key="indexs + 11" class="inforrighttit">
                                <span>{{list.serviceValue}}</span>
                                <div v-if="list.children !== null" class="inforrighttitcon">
                                    <div v-for="(myItems, indexss) in list.children" :key="indexss + 111">
                                        <span v-if="myItems.serviceValue !== undefined" class="inforserviceValue">{{myItems.serviceValue}}</span>
                                        <span v-if="myItems.children !== null && myItems.children.length !== 0">：</span>
                                        <span v-if="myItems.children !== null && myItems.children.length !== 0">
                                            <span v-for="(myLists, sindexss) in myItems.children" :key="sindexss + 1111">
                                                {{myLists.serviceValue}} <i v-if="sindexss !== myItems.children.length - 1">\ </i>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>
<script>
import { getFacilitiesDetail } from "@/api/secondeScreen"
export default {
    props:['closeinstitutionsDetail','id'],
    data(){
        return{
            mes:''
        }
    },
    methods:{
        getDetail(id){
            getFacilitiesDetail(id).then(res =>{
            if (res.code === 0) {
                // if (res.data.orgType === '2010' || res.data.orgType === '2011' || res.data.orgType === '1010') {
                //     this.isSmall = false
                // } else {
                //     this.isSmall = true
                // }
                this.mes = res.data;
                const arr = []
                res.data.serviceItems.forEach(item => {
                    if (item.serviceValue === "基本服务") {
                        arr.push(item)
                    }
                });
                this.mes.serviceItems = arr;
                }
            })
        }
    },
    mounted(){
        this.getDetail(this.id)
    }
}
</script>
<style lang="scss" scoped>
    .toastcontent{
        height:100%;
    }
    .toastinfor{
        display: flex;
        height:85%;
        .inforleft,.inforright{
            width:50%;
            h3{
                font-size:20px;
                margin:0;
            }
        };
        .inforleft{
            border-right:1px solid #3464a0;
            height:100%;
            .inforleftcon,.inforleftbottom{
                display: flex;
                flex-wrap: wrap;
                border-bottom: 1px solid #3464a0;
                padding:25px 0 30px;
                div{
                    width:50%;
                    margin-bottom: 16px;
                    font-size:16px;
                }
            }
            .inforleftbottom{
                border:none;
            }
        }
        .inforright{
            padding-left:20px;
            .inforrightcon{
                padding:25px 0 0;
                font-size:16px;
                .inforrighttit{
                    margin-bottom:20px;
                    .inforrighttitcon{
                        margin-left:30px;
                        .inforserviceValue{
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>