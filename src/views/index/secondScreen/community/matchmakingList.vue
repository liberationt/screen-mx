<template>
    <div class="toastList toastLists">
        <div class="toastListTittle">牵线搭桥列表 <img @click="closematchmakingList()" src="../../../../assets/images/close_dialog.png" alt=""></div>
        <span style="color:#ffc600;cursor: pointer" ></span>
        <div class="toastcontent toastcontents">
            <div class="tableList tableLists" style="overflow: hidden;">
               <el-table v-loading="loading" :data="tableData" style="width: 100%"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @expand-change="toggleRowExpansion">
                <el-table-column type="expand" align="right">
                   <template slot-scope="scope">
                        <div class="orderDetails">
                            <div class="establish">
                              <h3>创建</h3>
                              <div>
                                <div class="itemListstyle">
                                  <span>工单编号：</span>
                                  <span>{{scope.row.details.create.ORDERNO}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>用户名称：</span>
                                  <span>{{scope.row.details.create.NAME}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>联系地址：</span>
                                  <span>{{scope.row.details.create.ADDRESS1}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>来电电话：</span>
                                  <span>{{scope.row.details.create.CULTEL}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>供应商：</span>
                                  <span>{{scope.row.details.create.SUPPLIERNAME}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>服务类型：</span>
                                  <span>{{scope.row.details.create.SUNAME}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>服务要求：</span>
                                  <span :title='scope.row.details.create.SEVICECONTENT'>{{scope.row.details.create.SEVICECONTENT}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>服务预约日期：</span>
                                  <span>{{scope.row.details.create.RESERVEDATE}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>工单处理时间：</span>
                                  <span>{{scope.row.details.create.FCD}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="distribute">
                              <h3>派单</h3>
                              <div>
                                <div class="itemListstyle">
                                  <span>供应商：</span>
                                  <span>{{dispatch.SUPPLIER_NAME}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>接单人电话：</span>
                                  <span>{{dispatch.TELEPHONE}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>派单方式：</span>
                                  <span v-if="dispatch.TYPE=='1'">电话</span>
                                  <span v-if="dispatch.TYPE=='2'">短信</span>
                                  <span v-if="dispatch.TYPE=='3'">QQ</span>
                                  <span v-if="dispatch.TYPE=='4'">邮件</span>
                                  <span v-if="dispatch.TYPE=='5'">电话</span>
                                  <span v-if="dispatch.TYPE=='6'">APP派单</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>供应商是否受理：</span>
                                  <span v-if="dispatch.IS_WOKR=='1'">是</span>
                                  <span v-if="dispatch.IS_WOKR=='2'">否</span>
                                  <span v-if="dispatch.IS_WOKR=='3'">无人应答</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>确定服务日期：</span>
                                  <span>{{dispatch.SERVE_TIME}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>工单处理时间：</span>
                                  <span>{{myData.FCD}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="return">
                              <h3>回访</h3>
                              <div>
                                <div class="itemListstyle">
                                  <span>用户电话是否接通：</span>
                                  <span v-if="myReturn.IS_CALL=='0'">是</span>
                                  <span v-if="myReturn.IS_CALL=='1'">否</span>
                                  <span v-if="myReturn.IS_CALL=='2'">多次联系用户均失败，回访供应商</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>供应商是否联系用户：</span>
                                  <span v-if="myReturn.SUPILER_IS_CALL=='0'">是</span>
                                  <span v-if="myReturn.SUPILER_IS_CALL=='1'">否</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>实际服务内容：</span>
                                  <span>{{myReturn.SERVER_CONTENT}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>工单处理时间：</span>
                                  <span>{{myReturn.FCD}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="confirm">
                              <h3>服务结果确认</h3>
                              <div>
                                <div class="itemListstyle">
                                  <span>用户电话是否接通：</span>
                                  <span v-if="confirm.IS_CALL=='0'">否</span>
                                  <span v-if="confirm.IS_CALL=='1'">是</span>
                                  <span v-if="confirm.IS_CALL=='2'">多次联系用户均失败，回访供应商</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>供应商是否联系用户：</span>
                                  <!-- <span>{{confirm.SUPPLIER_IS_CALL}}</span> -->
                                  <span v-if="confirm.SUPPLIER_IS_CALL=='0'">是</span>
                                  <span v-if="confirm.SUPPLIER_IS_CALL=='1'">否</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>供应商确认服务结果：</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='1'">完成服务</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='2'">未完成服务,已约定服务日期</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='3'">未完成服务,催促供应商</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='4'">更换供应商</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='5'">挂起有合适供应商再告知</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='6'">服务失败</span>
                                  <span v-if="confirm.SUPPLIER_REASON=='7'">未联系到本人无法确认服务结果</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>确认方式：</span>
                                  <span v-if="confirm.CONFIRM_TYPE=='1'">电话</span>
                                  <span v-if="confirm.CONFIRM_TYPE=='2'">短信</span>
                                  <span v-if="confirm.CONFIRM_TYPE=='3'">QQ</span>
                                  <span v-if="confirm.CONFIRM_TYPE=='4'">邮件</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>服务日期：</span>
                                  <span>{{confirm.SERVERTIME}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>实际服务内容：</span>
                                  <span>{{confirm.SERVER_CONTENT}}</span>
                                </div>
                                <div class="itemListstyle">
                                  <span>工单处理时间：</span>
                                  <span>{{confirm.FCD}}</span>
                                </div>
                              </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="工单编号">
                    <template slot-scope="scope">
                        <span style="color:#ffc600;cursor: pointer"  @click="open(scope.row)">{{scope.row.ORDER_NO}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="WORKFLOW_STATES" label="工单状态" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="ORDER_SOURCE" label="工单来源" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="ID" label="客户编号" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="NAME" label="客户姓名" align="center">
                </el-table-column>
                <el-table-column prop="SUNAME" label="服务类型" align="center">
                </el-table-column>
                <el-table-column prop="SUPPLIERNAME" label="供应商名称" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="FCD" label="工单创建时间" align="center">
                </el-table-column>
                </el-table>
            </div>
          <el-pagination
            class="Pagination"
            @current-change="handleCurrentChange"
            :current-page="this.form.pageNum"
            prev-text="上一页"
            :page-size="10"
            :pager-count="5"
            next-text="下一页"
            layout="->,total,prev, pager, next, jumper"
            hide-on-single-page
            :total="total">
          </el-pagination>
        </div>
    </div>
</template>
<script>
import _ from "lodash"
import { getFirstHelp,getDetail } from "@/api/order"
export default {
    props:['closematchmakingList','id'],
    data(){
        return{
            form: {
                area: '江川路街道',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            loading:true,
            tableData:[],
            getRowKeys(row) {
                return row.ROW_ID;
            },
            myData: '',
            create: {},
            dispatch: '',
            myReturn: '',
            confirm: '',
            expands: [],
            index:false,
            orderId:''
        }
    },
    methods:{
        handleCurrentChange(val){
            this.form.pageNum = val
            this.getData()
        },
        reset(){
          this.tableData.forEach((item, index) => {
              item.details = {
                create: {
                  ORDERNO:'',
                  NAME:'',
                  ADDRESS1:'',
                  CULTEL:'',
                  SUPPLIERNAME:'',
                  SUNAME:'',
                  SEVICECONTENT:'',
                  RESERVEDATE:'',
                  FCD:''
                },
                dispatch: {
                  SUPPLIER_NAME:'',
                  TELEPHONE:'',
                  TYPE:'',
                  IS_WOKR:'',
                  SERVE_TIME:'',
                  FCD:''
                },
                myReturn: {
                    IS_CALL:'',
                    SUPILER_IS_CALL:'',
                    SERVER_CONTENT:'',
                    FCD:'',
                },
                confirm: {
                  IS_CALL:'',
                  SUPPLIER_IS_CALL:'',
                  SUPPLIER_REASON:'',
                  CONFIRM_TYPE:'',
                  SERVERTIME:'',
                  SERVER_CONTENT:'',
                  FCD:'',
                }
              };
          })
        },
        open(row){
          this.index=!this.index;
          if(this.index){
            this.reset()
            this.getDetail(row.UUID)
            this.orderId=row.ROW_ID
            this.expands.push(row.ROW_ID);
          }else{
            this.expands=[]
          }
          // this.$forceUpdate()
        },
        getDetail(id) {
          getDetail({orderId: id}).then(res =>{
            if (res.code === 0) {
              this.tableData.forEach((item, index) => {
                item.details.create = res.data.create;
              })
              this.dispatch = res.data.dispatch;
              this.myReturn = res.data.return;
              if(this.myReturn.IS_CALL!=""&&this.myReturn.IS_CALL!=null){
                this.myReturn.IS_CALL=this.myReturn.IS_CALL.replace(",","")
              }
              this.confirm = res.data.confirm
              if(this.confirm.IS_CALL!=""&&this.confirm.IS_CALL!=null){
                this.confirm.IS_CALL=this.confirm.IS_CALL.replace(",","")
              }
              // _this.$forceUpdate()
            }
          })
        },
        toggleRowExpansion(row,index){
          this.index=!this.index
            this.expands = [];
            if(!index.length){
                this.expands = [];
            }else{
              this.expands.push(row.ROW_ID);
              this.reset()
              this.getDetail(row.UUID)
            }
        },
        getData() {
          this.form.area = this.id;
          this.form.type = '2'
          getFirstHelp(this.form).then(res => {
            if (res.code === 0) {
              let _obj_ = _.cloneDeep(res.data.list);
              _obj_.forEach((item, index) => {
                item.details={
                  create: {
                    ORDERNO:'',
                    NAME:'',
                    ADDRESS1:'',
                    CULTEL:'',
                    SUPPLIERNAME:'',
                    SUNAME:'',
                    SEVICECONTENT:'',
                    RESERVEDATE:'',
                    FCD:''
                  },
                  dispatch: {
                    SUPPLIER_NAME:'',
                    TELEPHONE:'',
                    TYPE:'',
                    IS_WOKR:'',
                    SERVE_TIME:'',
                    FCD:''
                  },
                  myReturn: {
                     IS_CALL:'',
                     SUPILER_IS_CALL:'',
                     SERVER_CONTENT:'',
                     FCD:'',
                  },
                  confirm: {
                    IS_CALL:'',
                    SUPPLIER_IS_CALL:'',
                    SUPPLIER_REASON:'',
                    CONFIRM_TYPE:'',
                    SERVERTIME:'',
                    SERVER_CONTENT:'',
                    FCD:'',
                  }
                }
              })
              this.tableData = _.cloneDeep(_obj_);
              this.tableData.forEach((item, index) => {
                switch (item.WORKFLOW_STATES) {
                  case "1":
                    this.tableData[index].WORKFLOW_STATES = "待派单";
                    break;
                  case "2":
                    this.tableData[index].WORKFLOW_STATES = "待回访";
                    break;
                  case "3":
                    this.tableData[index].WORKFLOW_STATES = "待催促";
                    break;
                  case "4":
                    this.tableData[index].WORKFLOW_STATES = "待确认";
                    break;
                  case "5":
                    this.tableData[index].WORKFLOW_STATES = "挂起";
                    break;
                  case "6":
                    this.tableData[index].WORKFLOW_STATES = "服务成功";
                    break;
                  case "7":
                    this.tableData[index].WORKFLOW_STATES = "服务失败";
                    break;
                  case "8":
                    this.tableData[index].WORKFLOW_STATES = "无法调查";
                    break;
                  case "9":
                    this.tableData[index].WORKFLOW_STATES = "无需调查";
                    break;
                  case "10":
                    this.tableData[index].WORKFLOW_STATES = "满意度跟进";
                    break;
                  case "11":
                    this.tableData[index].WORKFLOW_STATES = "更换供应商";
                    break;
                  case "12":
                    this.tableData[index].WORKFLOW_STATES = "取消待确认";
                    break;
                  case "13":
                    this.tableData[index].WORKFLOW_STATES = "服务取消";
                    break;
                  case "14":
                    this.tableData[index].WORKFLOW_STATES = "服务完成待评价";
                    break;
                  case "15":
                    this.tableData[index].WORKFLOW_STATES = "待取消";
                    break;
                  case "16":
                    this.tableData[index].WORKFLOW_STATES = "待外呼";
                    break;
                  case "17":
                    this.tableData[index].WORKFLOW_STATES = "联系用户";
                    break;
                  case "18":
                    this.tableData[index].WORKFLOW_STATES = "催促结果确认";
                    break;
                }
                switch (item.ORDER_SOURCE) {
                  case "1":
                    this.tableData[index].ORDER_SOURCE = "电话预约";
                    break;
                  case "2":
                    this.tableData[index].ORDER_SOURCE = "未预约补单";
                    break;
                  case "3":
                    this.tableData[index].ORDER_SOURCE = "APP预约4";
                    break;
                  case "4":
                    this.tableData[index].ORDER_SOURCE = "线下预约";
                    break;
                  case "5":
                    this.tableData[index].ORDER_SOURCE = "";
                    break;
                  case "6":
                    this.tableData[index].ORDER_SOURCE = "商城订单";
                    break;
                  case "7":
                    this.tableData[index].ORDER_SOURCE = "微信(小秘书)";
                    break;
                  case "8":
                    this.tableData[index].ORDER_SOURCE = "社区联络";
                    break;
                  case "9":
                    this.tableData[index].ORDER_SOURCE = "供应商推广";
                    break;
                  case "10":
                    this.tableData[index].ORDER_SOURCE = "SP活动";
                    break;
                  case "11":
                    this.tableData[index].ORDER_SOURCE = "广告宣传";
                    break;
                }
              });
              this.total = res.data.total;
              this.loading = false;
            }
          });
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    .orderDetails{
      width:100%;
      height:498px;
      display: flex;
      padding:10px;
      >div{
        padding:0 25px;
        border-right:1px solid #3464a0;
        .itemListstyle{
          margin-top:20px;
          font-size:16px;
        // 　overflow:hidden;
        //   -webkit-box-orient: vertical;
        // 　-webkit-line-clamp: 3;
        display:-webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        }
      }
      .establish{
        width:350px;

      }
      .distribute{
        width:310px;
      }
      .return{
        width:330px;
      }
      .confirm{
        width:310px;
        border:none;
      }
    }
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar{
      width: 0px;
      background-color: rgba(0,0,0,0);
    }
</style>
