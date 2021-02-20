<template>
  <div class="dailog-bd">
    <div class="dailog-content" @click.self="close">
      <div class="home-dailog-list">
        <div class="inforTitle">
          <div class="inforTitleImg" style="cursor: inherit">
            居家养老工单列表
            <img src="../../../../../assets/imgYu/guanbi.png" alt="" @click="close">
          </div>
        </div>
        <div class="home-dailog-list-bd" v-loading="loading">
          <el-table
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    align="center"
                    show-overflow-tooltip
                    prop="name"
                    label="工单编号">
              <template slot-scope="scope">
                <span class="orangeColor" @click="getOrderDetail(scope.row.id, scope.row)" style="cursor: pointer">{{ scope.row.orderNo }}</span>
              </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    show-overflow-tooltip
                    prop="streetName"
                    label="所属街镇">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="organName"
                    show-overflow-tooltip
                    width="350"
                    label="所属机构">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    show-overflow-tooltip
                    label="老人姓名">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="serviceMen"
                    show-overflow-tooltip
                    label="服务员工姓名">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="programName"
                    show-overflow-tooltip
                    label="照护方案名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="objectName"
                    show-overflow-tooltip
                    label="服务项目名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    show-overflow-tooltip
                    label="服务时长">
              <template slot-scope="scope">
                <span>{{ scope.row.timeCount }}'</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
                  class="Page"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="->,total,prev, pager, next, jumper"
                  :page-size="13"
                  :pager-count="5"
                  :total="total"
                  :hide-on-single-page="hideOnSinglePage">
          </el-pagination>
        </div>
      </div>
      <div class="home-dailog-list" style="margin-left: 20px" v-if="isDetail">
        <div class="inforTitle">
          <div class="inforTitleImg">
            工单详情
            <img src="../../../../../assets/imgYu/guanbi.png" alt="" @click="closeDetail">
          </div>
        </div>
        <div class="home-dailog-list-bd">
          <div class="home-dailog-detail-top">
            <div class="font28 mb20" style="font-weight: bold">基本信息</div>
            <div class="home-dailog-detail">
              <p>
                工单编号：{{ orderDetail.orderNo }}
              </p>
              <p>
                老人姓名：{{ detail.name }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                工单状态：{{ detail.orderStatus }}
              </p>
              <p>
                户籍地址：{{ detail.censusAddr }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                居住地址：{{ detail.liveAddr }}
              </p>
            </div>
          </div>
          <div class="home-dailog-detail-list">
            <div class="font28 mb20" style="font-weight: bold">服务信息</div>
            <div class="home-dailog-detail">
              <p>
                所属街道：{{ orderDetail.streetName }}
              </p>
              <p>
                预计服务时间：{{ detail.serviceTime }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                所属机构：{{ detail.organName }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                照护方案：{{ detail.programName }}
              </p>
            </div>
          </div>
          <div class="home-dailog-detail-list">
            <div class="home-dailog-detail">
              <p>
                签到时间：{{ detail.signInTime }}
              </p>
              <p>
                签退地址：{{ detail.signOutAddr }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                签到地址：{{ detail.signInAddr }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                签退时间：{{ detail.signOutTime }}
              </p>
            </div>
          </div>
          <div class="home-dailog-detail-list">
            <div class="home-dailog-detail">
              <p>
                服务详细地址：{{ detail.serviceAddr }}
              </p>
              <p>
                服务项目金额：{{ detail.serviceAmount }}
              </p>
              <p>
                是否异常：{{ detail.abnormal }}
              </p>
              <p>
                预计服务时长：{{ detail.estimateTimeCount }}'
              </p>
              <p>
                订单金额：{{ detail.amount }}元
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                服务员工姓名：{{ detail.serviceName }}
              </p>
              <p>
                服务质量：{{ detail.serviceQuality }}
              </p>
              <p>
                异常类别：{{ detail.abnormalCategory }}
              </p>
              <p>
                实际服务时长：{{ detail.actualTimeCount }}'
              </p>
              <p>
                实际结算金额：{{ detail.settlementAmount }}
              </p>
            </div>
            <div class="home-dailog-detail">
              <p>
                服务项目名称：{{ detail.objectName }}
              </p>
              <p>
                服务态度：{{ detail.serviceAttitude }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getOrderList, getOrderDetail } from "@/api/homeCare"
  import { areaCode } from '@/api/areaCode'
  export default {
    name: "orderList",
    props: ["close"],
    data() {
      return {
        tableData: [],
        form: {
          areaCode: areaCode,
          pageNum: 1,
          pageSize: 13
        },
        total: 0,
        currentPage:1,
        hideOnSinglePage:true,
        loading: true,
        orderDetail: "",
        detail: "",
        isDetail: false
      }
    },
    mounted() {
      this.getOrderList();
    },
    methods: {
      getOrderList() {
        this.loading = true;
        getOrderList(this.form).then(res =>{
          if (res.code === 0) {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.loading = false;
          }
        })
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.form.pageNum = val;
        this.getOrderList();
      },
      getOrderDetail(id, no) {
        this.orderDetail = no;
        this.isDetail = true;
        this.detail = "";
        getOrderDetail(id).then(res =>{
          if (res.code === 0) {
            this.detail = res.data
          }
        })
      },
      closeDetail() {
        this.isDetail = false;
      }
    }
  }
</script>

<style scoped lang="scss">
.dailog-bd {
  width: 4700px;
  height: 1566px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  .dailog-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% ;
    height: 100% ;
    .home-dailog-list {
      width: 2282px;
      height: 1161px;
      background: url("../../../../../assets/imgYu/home_dialog_bg2.png");
      background-size: 100% 100%;
      .inforTitleImg {
        line-height: 62px;
        img {
          float: right;
          margin-top: 14px;
          cursor: pointer;
        }
      }
      .home-dailog-list-bd {
        width: 100%;
        height: 1079px;
        padding: 0 25px;
        .home-dailog-detail {
          width: 33.33%;
          display: inline-block;
          vertical-align: top;
          padding-right: 40px;
          p {
            font-size: 22px;
            letter-spacing: 1px;
            margin-bottom: 30px;
          }
        }
        .home-dailog-detail-top {
          width: 100%;
          height: 200px;
          letter-spacing: 1px;
        }
        home-dailog-detail-list {
          width: 100%;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.dailog-bd {
  .cell {
    line-height: 75px;
  }
  .el-table th,.el-table tr{
    background: #193853;
    color:#00fff8;
    font-size: 28px !important;
    font-weight: normal;
    padding: 0 !important;
    height:70px;
  }
  .el-table__empty-block{
    background:#193853;
  }
  .el-table td,.el-table th.is-leaf {
    border-bottom:1px solid #0fafb6 !important;
    font-size:24px;
    padding: 0;
  }
  .el-table::before{
    background:none;
  }
  tr td{
    padding:0 !important;
    height:70px;
    color:#ffffff;
  }
  tr:hover {
    td {
      background: transparent !important;
      // border-bottom: 1px solid rgba(5, 253, 253, 0.3);
    }
  }
  .el-table--border, .el-table--group{
    border:none;
  }
  .el-table--border th{
    border-color:#0fafb6;
  }
  .el-table--group::after{
    background: #193853;
  }
  .el-table--border td{
    border:none;
  }
  .el-table th {
    .cell {
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
  .el-table th,.el-table tr{
    background: transparent !important;
    height:65px !important;
  }
  .cell {
    line-height: 70px !important;
  }
  tr td{
    height: 65px !important;
  }
  .el-table__empty-block{
    background: #ffffff !important;
  }
  .el-table {
    background: transparent !important;
  }
  .el-table__empty-block {
    background: transparent !important;
  }
  .el-loading-mask {
    height: 800px;
    background: transparent !important;
  }
}
</style>
