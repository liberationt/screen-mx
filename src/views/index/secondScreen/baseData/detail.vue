<template>
  <div class="body-bg" style="position: absolute;top:0 ;left: 0">
    <div class="body-title">
    </div>
    <div class="body-content">
      <div class="od-body">
        <div class="od-back" @click="close">返回</div>
        <div class="od-left">
          <div class="od-base">
            <div class="content-title">基础信息</div>
            <div class="od-base-man" v-if="baseData.sex !== '女'">
              <img src="../../../../assets/images/nan.png" alt="">
            </div>
            <div class="od-base-man" v-if="baseData.sex === '女'">
              <img src="../../../../assets/images/nv.png" alt="">
            </div>
            <div class="od-base-mes">
              <span>姓名：{{baseData.fullName}}</span>
              <span>性别：{{baseData.sex}}</span>
              <span>年龄：{{baseData.age}}</span>
              <span>身份证号：{{baseData.idCard}}</span>
              <span>所属居委：{{baseData.area_name}}</span>
              <span>详细地址：{{baseData.censusAddr}}</span>
            </div>
          </div>
          <div class="od-tag">
            <div class="content-title">标签信息</div>
            <div class="od-tag-list">
              <div v-if="this.baseData.property">
                <span v-if="baseData.property.assessTypeName">{{baseData.property.assessTypeName}}\{{baseData.property.assessLevelName}}</span>
                <span v-if="baseData.property.ageLevelName">{{baseData.property.ageLevelName}}</span>
                <span v-if="baseData.property.categoryTypeName">{{baseData.property.categoryTypeName}}</span>
                <!--<span v-if="this.baseData.property.censusStatusName">{{this.baseData.property.censusStatusName}}</span>-->
                <span v-if="baseData.property.defoRelatedAttrName">{{baseData.property.defoRelatedAttrName}}</span>
                <span v-if="baseData.property.liveStatusName">{{baseData.property.liveStatusName}}</span>
                <span v-if="baseData.property.pensionAssistName">{{baseData.property.pensionAssistName}}</span>
                <span v-if="baseData.property.pensionModeName">{{baseData.property.pensionModeName}}</span>
              </div>
              <div v-else style="padding-left:220px;">
                <img  style="width:100px;height:100px;" src="../../../../assets/images/none.png" alt="">
              </div>
              </div>
          </div>
          <div class="od-bt">
            <div class="content-title"> 补贴信息</div>
            <div class="od-bt-list">
              <div class="od-bt-list-item">
                <div class="od-bt-list-name">
                  敬老卡津贴
                </div>
                <div class="od-bt-list-money">
                  <span>{{this.safeguardData.oldCardSubsidy==''||this.safeguardData.oldCardSubsidy==null?'---':this.safeguardData.oldCardSubsidy}}</span>
                  <i>元/月</i>
                </div>
              </div>
              <div class="od-bt-list-item">
                <div class="od-bt-list-name">
                  居家养老补贴
                </div>
                <div class="od-bt-list-money">
                  <span>{{this.safeguardData.homePensionSubsidy==""||this.safeguardData.homePensionSubsidy==null?"---":this.safeguardData.homePensionSubsidy}}</span>
                  <i>元/月</i>
                </div>
              </div>
              <div class="od-bt-list-item">
                <div class="od-bt-list-name">
                  助餐补贴
                </div>
                <div class="od-bt-list-money">
                  <span>{{this.safeguardData.mealSubsidy==""||this.safeguardData.mealSubsidy==null?'---':this.safeguardData.mealSubsidy}}</span>
                  <i>元/次</i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="od-right">
          <div class="content-title"> 服务信息</div>
          <div class="od-right-top">
            <div class="od-enjoy">
              <div class="od-enjoy-title">
                <img src="../../../../assets/images/fwxm_ico.png" alt="">
                <span>可享受的服务项目</span>
              </div>
              <div class="od-enjoy-list" v-if="exchangeList.length">
                <div v-for="(item,index) in exchangeList" :key="index"  class="od-enjoy-list-item">
                  <div>
                    <img class="imgNanp" src="@/assets/images/list.png" alt=""><span :title=item.serviceName>{{item.serviceName}}</span>
                  </div>
                </div>
              </div>
              <div v-else class="nonedatalist">
                <img src="../../../../assets/images/none.png" alt="">
              </div>
              <el-pagination
                  class="od-pagination"
                  @current-change="handleCurrentItemChange"
                  :current-page="itemPageNum"
                  :pager-count="5"
                  :page-size="12"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="->,total,prev, pager, next, jumper"
                  hide-on-single-page
                  :total="itemTotal">
              </el-pagination>
            </div>
            <div class="od-enjoy" style="width: 50%; margin-right: 0">
              <div class="od-enjoy-title">
                <img src="../../../../assets/images/fwjl_ico.png" alt="">
                <span>服务记录</span>
              </div>
              <div class="tableList" style="margin-top: 20px;margin-bottom: 20px">
                <el-table :data="serviceItems" style="width: 100%">
                  <el-table-column prop="serviceName" label="服务项目" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="serviceDate" label="服务日期" show-overflow-tooltip  align="center"></el-table-column>
                  <el-table-column prop="fullName" label="服务人员" show-overflow-tooltip width="130" align="center"></el-table-column>
                  <el-table-column prop="orgName" label="服务商" show-overflow-tooltip  align="center"></el-table-column>
                </el-table>
              </div>
              <el-pagination
                  class="od-pagination"
                  @current-change="handleCurrentServiceChange"
                  :current-page="serviceItemsPageNum"
                  :pager-count="5"
                  :page-size="5"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="->,total,prev, pager, next, jumper"
                  hide-on-single-page
                  :total="serviceItemsTotal">
              </el-pagination>
            </div>
          </div>
          <div class="order-right-bottom">
            <div class="order-record" >
              <span
                  v-for="(item, index) in tabs"
                  :key="index"
                  :class="[isTab === item.type ? 'choose-tab' : '']"
                  @click="changeTab(item.type)"
              >{{ item.name }}</span>
            </div>
            <div v-if="isTab === 'process'">
              <div class="tableList" style="margin-top: 1px;margin-bottom: 20px">
                <el-table :data="serviceSheetList" style="width: 100%; ">
                  <el-table-column prop="ORDER_NO" label="服务工单" show-overflow-tooltip align="center">
                    <template slot-scope="{row}">
                      <span v-if="row.SERVICE=='优抚项目'||row.SERVICE=='牵线搭桥'" style='color:#ffc600' @click="open(row.UUID)">{{row.ORDER_NO}}</span>
                      <span v-else>{{row.ORDER_NO}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="SERVICE" label="服务项目" show-overflow-tooltip  align="center"></el-table-column>
                  <el-table-column prop="ORDER_DATE" label="服务日期" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="SERVICEUSER" label="服务人员" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="SUPPLIER_NAME" label="服务商" show-overflow-tooltip align="center"></el-table-column>
                </el-table>
              </div>
              <el-pagination
                  class="od-pagination"
                  @current-change="handleCurrentSheetChange"
                  :current-page="serviceSheetPageNum"
                  :pager-count="5"
                  :page-size="5"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="->,total,prev, pager, next, jumper"
                  hide-on-single-page
                  :total="serviceSheetTotal">
              </el-pagination>
            </div>
            <div v-if="isTab === 'record'">
              <div class="tableList" style="margin-top: 1px;margin-bottom: 20px">
                <el-table :data="cardRecordList" style="width: 100%; " >
                  <el-table-column label="时间" show-overflow-tooltip  align="center">
                    <template slot-scope="{row}">
                      <span>{{setDateTime(row.buid_time)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="bank_account" label="卡号" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="org_name" label="刷卡地点" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="money" label="金额" show-overflow-tooltip align="center">
                    <template slot-scope="{row}">
                      <span style="color:#ffc600;display:block;">{{row.money}}元</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-pagination
                  class="od-pagination"
                  @current-change="handleCurrentRecordChange"
                  :current-page="cardRecordPageNum"
                  :pager-count="5"
                  :page-size="5"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="->,total,prev, pager, next, jumper"
                  hide-on-single-page
                  :total="cardRecordTotal">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { olderPeopleBaseMsg, safeguardMsg, enjoyServiceProject,creditCardRecords,creditCardStatistics,serviceRecords,serviceSheetTabel} from "@/api/olderNumDetails";
  export default {
    name: "detailOlder",
    props: ['close', 'dataId', "dataIdCard"],
    data() {
      return {
        tabs: [
          {
            name: '服务过程',
            type: 'process'
          },{
            name: '刷卡记录',
            type: 'record'
          }
        ],
        isTab: 'process',
        baseData:{
          age: null,
          area_name: "",
          censusAddr: null,
          censusArea: "",
          fullName: "",
          id: "",
          idCard: "",
          property: {
            // ageLevelName:null,
            // assessLevelName:null,
            // assessTypeName:null,
            // categoryTypeName:null,
            /*censusStatusName:null,*/
            // defoRelatedAttrName:null,
            // liveStatusName:null,
            // pensionAssistName:null,
            // pensionModeName:null,
          },
          sex: "",
        },
        safeguardData:{
          homePensionSubsidy: 0,//居家养老补贴
          mealSubsidy: 0,//助餐补贴
          oldCardSubsidy: 0,//敬老卡津贴
        },
        //应享受的服务项目
        exchangeList:[],
        //应享受的服务项目的页码
        itemPageNum:1,
        itemPageSize: 12,
        itemTotal: 0,
        // 服务项目
        serviceItems: [],
        serviceItemsTotal: 0,
        serviceItemsPageNum: 1,
        // 服务过程
        serviceSheetList:[],
        serviceSheetTotal: 0,
        serviceSheetPageNum: 1,
        // 刷卡记录
        cardRecordList:[],
        cardRecordTotal: 0,
        cardRecordPageNum: 1,
      }
    },
    mounted() {
      this.olderPeopleBaseMsg()
      this.safeguardMsg()
      this.enjoyServiceProject()
      this.serviceRecords()
      this.serviceSheetTabel()
      this.creditCardRecords()
    },
    methods: {
      changeTab(type) {
        this.isTab = type
      },
      // 老人表格数据的详情：基础信息，标签信息
      olderPeopleBaseMsg() {
        olderPeopleBaseMsg(this.dataId).then(res => {
          if(res.code === 0){
            this.baseData = res.data;
            if(this.baseData.idCard!=null&&this.baseData.idCard!=""){
              let xing = '';
              for (var i=0;i<4;i++) {
                xing+='*';
              }
              this.baseData.idCard= this.baseData.idCard.substr(0, 4) +  xing +  this.baseData.idCard.substr(14);
            }
          }
          else{
            this.baseData = [];
          }
        });
      },
      setDateTime(date) {
          let time;
          if (date === '') {
              time = new Date();
          } else {
              time = new Date(date);
          }

          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          let h = time.getHours();
          let mm = time.getMinutes();
          let s = time.getSeconds();
          if (m < 10) {
              m = "0" + m;
          }
          if (d < 10) {
              d = "0" + d;
          }
          if (h < 10) {
              h = "0" + h;
          }
          if (mm < 10) {
              mm = "0" + mm;
          }
          if (s < 10) {
              s = "0" + s;
          }
          return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
      },
      // 老人表格数据的详情：保障信息
      safeguardMsg() {
        safeguardMsg(this.dataId).then(res => {
          if(res.code === 0){
            this.safeguardData = res.data;
          }
          else{
            this.safeguardData = [];
          }
        });
      },
      // 老人表格数据的详情：应享受的服务项目
      enjoyServiceProject() {
        enjoyServiceProject(this.dataIdCard,this.itemPageNum,this.itemPageSize).then(res => {
          if(res.code === 0){
            this.exchangeList = res.data.list;
            this.itemTotal = res.data.total;
          }
          else{
            this.exchangeList = [];
          }
        });
      },
      handleCurrentItemChange(val) {
        this.itemPageNum = val;
        this.enjoyServiceProject();
      },
      // 老人表格数据的详情：服务记录
      serviceRecords() {
        serviceRecords(this.dataId,this.serviceItemsPageNum).then(res => {
          if(res.code === 0){
            this.serviceItems = res.data.list;
            this.serviceItemsTotal = res.data.total;
          }
          else{
            this.serviceItems = [];
            this.serviceItemsTotal = 0;
          }
        });
      },
      handleCurrentServiceChange(val) {
        this.serviceItemsPageNum = val;
        this.serviceRecords();
      },
      // 服务过程
      //服务过程
      serviceSheetTabel() {
        serviceSheetTabel(this.dataIdCard,this.serviceSheetPageNum).then(res => {
          if(res.code === 0){
            this.serviceSheetList = res.data.list;
            this.serviceSheetTotal = res.data.total;
          }
          else{
            this.serviceSheetList = [];
            this.lastPage = 0;
          }
        });
      },
      handleCurrentSheetChange(val) {
        this.serviceSheetPageNum = val;
        this.serviceSheetTabel();
      },
      // 老人表格数据的详情：刷卡记录
      creditCardRecords() {
        creditCardRecords(this.dataId,this.cardRecordPageNum).then(res => {
          if(res.code === 0){
            this.cardRecordList = res.data.list;
            this.cardRecordTotal = res.data.total;
          }
          else{
            this.cardRecordList = [];
            this.cardRecordTotal = 0;
          }
        });
      },
      handleCurrentRecordChange(val) {
        this.cardRecordPageNum = val;
        this.creditCardRecords();
      },
    }
  };
</script>

<style lang="scss">
.od-body {
  width: 100%;
  position: relative;
  .od-back {
    position: absolute;
    font-size: 16px;
    width: 60px;
    line-height: 30px;
    border:  1px solid #0fa2ff;
    top: -45px;
    left: 10px;
    text-align: center;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .od-left {
    width: 610px;
    float: left;
    margin-right: 20px;
    margin-left: 10px;
    height: 900px;
    .od-base {
      width: 610px;
      height: 400px;
      background: url("../../../../assets/images/bg1.png") center no-repeat;
      background-size: 100% 100%;
      .od-base-man {
        width: 265px;
        text-align: center;
        line-height: 350px;
        float: left;
      }
      .od-base-mes {
        width: 330px;
        float: left;
        margin: 20px 0;
        font-size:16px;
        span {
          display: inline-block;
          width: 100%;
          margin: 10px 0;
        }
      }
    }
    .od-tag {
      width: 610px;
      height: 200px;
      margin: 19px 0;
      background: url("../../../../assets/images/bg2.png") center no-repeat;
      background-size: 100% 100%;
      .od-tag-list {
        width: 100%;
        padding: 25px 30px;
        span {
          width: 127px;
          line-height: 35px;
          text-align: center;
          border: 1px solid #0fa2ff;
          font-size: 16px;
          margin: 10px 5px;
          display: inline-block;
          color: #4cf9ff;
        }
      }
    }
    .od-bt {
      width: 610px;
      height: 300px;
      background: url("../../../../assets/images/bg3.png") center no-repeat;
      background-size: 100% 100%;
      .od-bt-list {
        width: 100%;
        padding: 20px 20px;
        .od-bt-list-item {
          width: 100%;
          padding-bottom: 25px;
          border-bottom: 1px solid #155d99;
          margin-bottom: 25px;
          .od-bt-list-name {
            width: 50%;
            display: inline-block;
            vertical-align: middle;
            font-size: 16px;
          }
          .od-bt-list-money {
            width: 50%;
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
            text-align: right;
            color: #4cf9ff;
          }
        }
      }
    }
  }
  .od-right {
    width: 1251px;
    float: left;
    height: 938px;
    background: url("../../../../assets/images/bg4.png") center no-repeat;
    background-size: 100% 100%;
    padding: 0px 15px;
    .od-right-top {
      width: 100%;
      height: 430px;
      border-bottom: 1px dashed #155d99;
      margin-top: 15px;
      .od-enjoy {
        width: 48%;
        float: left;
        padding-left: 10px;
        margin-right: 2%;
        .od-enjoy-title {
          width: 100%;
          img {
            margin-right: 10px;
          }
          span {
            display: inline-block;
            font-size: 18px;
            vertical-align: middle;
          }
        }
        .od-enjoy-list {
          width: 100%;
          padding: 10px 20px;
          height: 335px;
          .od-enjoy-list-item {
            width: 50%;
            float: left;
            font-size: 16px !important;
            div{
              display: flex;
              align-items: center;
              img{
                width:10px;height:10px;
              }
            }
            span {
              display: inline-block;
              width: 240px;
              padding: 12px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .order-right-bottom {
      width: 100%;
      height: 440px;
      .order-record {
        width: 100%;
        text-align: center;
        padding: 10px 0;
        & > span {
          width: 100px;
          padding: 5px 10px;
          height: 40px;
          font-size: 20px;
          line-height: 39px;
          cursor: pointer;
          position: relative;
          color: #4cf9ff;
          border: 1px solid #0fa2ff;
        }
        .choose-tab {
          color: #ffffff;
          background: #0fa2ff;
        }
      }
    }
  }
  .content-title {
    width: 100%;
    text-align: center;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .od-pagination {
    margin-top: 0px !important;
  }
  .od-pagination button{
    background-color: transparent !important;
    border:1px solid #517cb1 !important;
    color: #ffffff !important;
    height: 30px !important;
    padding: 0 10px !important;
    margin: 0 5px !important;
  }
  .tankModelPPaginationagination button span{
    font-size: 16px !important;
    vertical-align: middle !important;
  }
  .od-pagination button:first-child{
    margin-right: 10px !important;
  }
  .od-pagination .el-pagination__jump{
    color: #ffffff !important;
    font-size: 16px !important;
    height: 30px !important;
    line-height: 30px !important;
    margin-left: 10px !important;
  }
  .od-pagination .el-pagination__jump input{
    border-radius: 0px;
    background-color: transparent !important;
    border:1px solid #517cb1 !important;
    color: #ffffff !important;
    height: 30px !important;
    font-size: 16px !important;
    width: 45px;
  }
  .od-pagination .el-pagination__total{
    font-size: 16px !important;
    vertical-align: middle !important;
    line-height: 30px !important;
    color: #ffffff;
  }

  .od-pagination  .el-pager li {
    width: 30px !important;
    min-width: 30px !important;
    padding: 0 0 !important;
    background-color: transparent !important;
    border: 1px solid #517cb1 !important;
    color: #ffffff !important;
    height: 30px !important;
    text-align: center;
    margin: 0 5px !important;
    font-size: 16px !important;
    vertical-align: middle !important;
    line-height: 30px !important;
  }
  .od-pagination  .el-pager li.active {
    color: #ffffff !important;
    background-color: #0fa2ff !important;
    border: 1px solid #0fa2ff !important;
  }
  .nonedatalist{
    text-align: center;
    line-height:300px;
  }
}
</style>
