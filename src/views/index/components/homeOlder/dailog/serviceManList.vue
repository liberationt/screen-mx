<template>
  <div class="dailog-bd">
    <div class="dailog-content" @click.self="close">
      <div class="home-dailog-list">
        <div class="inforTitle">
          <div class="inforTitleImg" style="cursor: inherit">
            服务人员列表
            <img src="@/assets/imgYu/guanbi.png" alt="" @click="close">
          </div>
        </div>
        <div class="home-dailog-list-bd" v-loading="loading">
          <el-table
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    align="center"
                    prop="fullName"
                    show-overflow-tooltip
                    width="350"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="sex"
                    show-overflow-tooltip
                    width="350"
                    label="性别">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="idCard"
                    show-overflow-tooltip
                    label="身份证号">
                      <template slot-scope="{row}">
                          <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                      </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="mobile"
                    show-overflow-tooltip
                    label="联系方式">
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
    </div>
  </div>
</template>

<script>
  import { getHomeServiceManList } from "@/api/thirdScreen"
  import { areaCode } from '@/api/areaCode'
  export default {
    name: "serviceManList",
    props: ["close", "code"],
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
        loading: true
      }
    },
    mounted() {
      if (this.code !== undefined) {
        this.form.areaCode = this.code
      }
      this.getData();
    },
    methods: {
      getData() {
        this.loading = true;
        getHomeServiceManList(this.form).then(res =>{
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
        this.getData();
      },
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
        width: 1712px;
        height: 1161px;
        background: url("../../../../../assets/images/dialog_bg1.png");
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
