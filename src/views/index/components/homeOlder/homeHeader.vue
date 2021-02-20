<template>
  <div class="detailHeader">
    <div class="displayFlex headerInfor">
      <div>
        <h4>服务人员总数(人)</h4>
        <div>
          <span class="headerInforNumber orangeColor" @click="openManShow" style="cursor: pointer">{{ serveNumber }}</span>
<!--          <span class="font22 mr10 ml5">较上年</span>-->
<!--          <span class="brightColor font28 mr5">0</span>-->
<!--          <span><img src="@/assets/img/up.png" alt=""></span>-->
        </div>
      </div>
      <div>
        <h4>服务老人总数(人)</h4>
        <div>
          <span class="headerInforNumber greenColor" @click="openShow" style="cursor: pointer ">{{ serveOldNumber }}</span>
<!--          <span class="font22 mr10 ml5">较上年</span>-->
<!--          <span class="brightColor font28 mr5">0</span>-->
<!--          <span><img src="@/assets/img/up.png" alt=""></span>-->
        </div>
      </div>
      <div>
        <h4>服务工单总数(单)</h4>
        <div>
<!--          <span class="headerInforNumber orangeYellowColor" @click="idList = true" style="cursor: pointer ">{{ serveOrderNumber }}</span>-->
          <span class="headerInforNumber orangeYellowColor" @click="idList = true" style="cursor: pointer ">822621</span>
<!--          <span class="font22 mr10 ml5">较上年</span>-->
<!--          <span class="brightColor font28 mr5">0</span>-->
<!--          <span><img src="@/assets/img/up.png" alt=""></span>-->
        </div>
      </div>
      <div>
        <h4>服务类型(个)</h4>
        <div>
          <span class="headerInforNumber skyBlueColor">11</span>
<!--          <span class="font22 mr10 ml5">较上年</span>-->
<!--          <span class="brightColor font28 mr5">0</span>-->
<!--          <span><img src="@/assets/img/up.png" alt=""></span>-->
        </div>
      </div>
      <div>
        <h4>服务商总数(家)</h4>
        <div>
<!--          <span class="headerInforNumber pinkColor" @click="openOrderShow" style="cursor: pointer ">{{ serveOrganNumber }}</span>-->
          <span class="headerInforNumber pinkColor" @click="openOrderShow" style="cursor: pointer ">16</span>
<!--          <span class="font22 mr10 ml5">较上年</span>-->
<!--          <span class="brightColor font28 mr5">0</span>-->
<!--          <span><img src="@/assets/img/up.png" alt=""></span>-->
        </div>
      </div>
    </div>
    <orderList v-if="idList" :close="close"></orderList>
    <serviceOlder v-if="isShow" :close="closeShow"></serviceOlder>
    <serviceManList v-if="isManShow" :close="closeManShow"></serviceManList>
    <serviceOrder v-if="isOrderShow" :close="closeOrderShow"></serviceOrder>
  </div>
</template>

<script>
  import orderList from "./dailog/orderList";
  import {getServeNumber,getServeOldNumber,getOrderNumber, getProjectType, getOrganNum} from "@/api/homeCare"
  import {areaCode} from '@/api/areaCode'
  import serviceOlder from "./dailog/serviceOlder";
  import serviceManList from "./dailog/serviceManList";
  import serviceOrder from "./dailog/serviceOrder";
  export default {
    name: "homeHeader",
    components: {
      orderList,
      serviceOlder,
      serviceManList,
      serviceOrder
    },
    data() {
      return {
        idList: false,
        isShow: false,
        isManShow: false,
        isOrderShow: false,
        form: {areaCode:areaCode},
        serveNumber: "", // 服务人员总数
        serveOldNumber: "", // 服务老人总数
        serveOrderNumber: "", // 服务工单总数
        serveTypeNumber: "", // 服务项目类型
        serveOrganNumber: "" // 服务商总数
      }
    },
    mounted() {
      this.getServe();
      this.getOlder();
      this.getOrder();
      this.getProjectTypes();
      this.getOrganNums();
    },
    methods: {
      openOrderShow() {
        this.isOrderShow = true;
      },
      closeOrderShow() {
        this.isOrderShow = false;
      },
      openManShow() {
        this.isManShow = true;
      },
      closeManShow() {
        this.isManShow = false;
      },
      openShow() {
        this.isShow = true;
      },
      closeShow() {
        this.isShow = false;
      },
      close() {
        this.idList = false;
      },
      //服务人员
      getServe(){
        getServeNumber(this.form).then(res=>{
          if(res.code === 0){
            this.serveNumber = res.data
          }
        })
      },
      //老人
      getOlder(){
        getServeOldNumber(this.form).then(res=>{
          if(res.code === 0){
            this.serveOldNumber = res.data
          }
        })
      },
      // 工单
      getOrder(){
        getOrderNumber(this.form).then(res=>{
          if(res.code === 0){
            this.serveOrderNumber = res.data
          }
        })
      },
      // 项目类型总数
      getProjectTypes() {
        getProjectType(this.form).then(res=>{
          if(res.code === 0){
            this.serveTypeNumber = res.data
          }
        })
      },
      // 服务商总数
      getOrganNums() {
        getOrganNum(this.form).then(res=>{
          if(res.code === 0){
            this.serveOrganNumber = res.data.count
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.headerInforNumber {
  font-family: Helvetica !important;
}
</style>
