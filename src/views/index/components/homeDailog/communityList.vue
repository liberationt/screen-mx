<template>
  <div class="dailog-bd">
    <div class="dailog-content" v-show="!isDetail" @click.self="close">
      <div class="home-dailog-list">
        <div class="inforTitle">
          <div class="inforTitleImg" style="cursor: inherit">
            {{ title }}机构列表
            <img src="@/assets/imgYu/guanbi.png" alt="" @click="close">
          </div>
        </div>
        <div class="home-dailog-list-bd" v-loading="loading">
          <el-table
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    align="center"
                    prop="orgName"
                    show-overflow-tooltip
                    width="550"
                    label="机构名称">
              <template slot-scope="scope">
                <span class="orangeColor"
                      @click="getOrderDetail(scope.row.orgId, scope.row.orgType)"
                      style="cursor: pointer;position: relative;"
                      v-if="scope.row.orgType === '2014'">
                  {{ scope.row.orgName }}
                  <span style="position: absolute;color: #183651;background: #1ce8e3;line-height: 16px;font-size: 12px;
                  padding: 0 8px;border-radius: 10px;border-bottom-left-radius: 1px;right: -45px;top:-10px"
                  v-if="isTag(scope.row.orgName)">监控</span>
                </span>
                <span class="orangeColor" style="cursor: pointer;"
                      @click="getOrderDetail(scope.row.orgId, scope.row.orgType)" v-if="scope.row.orgType !== '2014' && title !== '养老顾问点'">{{ scope.row.orgName }}</span>
                <span v-if="title === '养老顾问点'">{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column
                    v-if="title !== '养老顾问点'"
                    align="center"
                    prop="orgTypeName"
                    show-overflow-tooltip
                    label="机构类型">
            </el-table-column>
            <el-table-column
                    v-if="title === '养老顾问点'"
                    align="center"
                    prop="advisorTypeName"
                    show-overflow-tooltip
                    label="顾问点类型">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="street"
                    width="350"
                    show-overflow-tooltip
                    label="所属街镇">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="committee"
                    show-overflow-tooltip
                    label="所属居委">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="addr"
                    show-overflow-tooltip
                    label="详细地址">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="phone"
                    show-overflow-tooltip
                    label="咨询电话">
            </el-table-column>
          </el-table>
          <el-pagination
                  class="Page"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="->,prev, pager, next, jumper"
                  :page-size="13"
                  :pager-count="5"
                  :total="total"
                  :hide-on-single-page="hideOnSinglePage">
          </el-pagination>
        </div>
      </div>
    </div>
    <jjDetail class="toastImg" :close="closeDetail" :id="detailId" :instituType='instituType' v-if="isDetail"/>
  </div>
</template>

<script>
  import { getPensionAgencyList } from "@/api/thirdScreen"
  import { getPointThere } from "@/api/communityInfor"
  import { areaCode } from '@/api/areaCode'
  import jjDetail from "../facilitiesInfor/jjDetail"
  export default {
    name: "communityList",
    props: ["close", "title"],
    components: {
      jjDetail
    },
    data() {
      return {
        tableData: [],
        form: {
          areaCode: areaCode,
          orgTypes: '',
          pageNum: 1,
          pageSize: 13
        },
        total: 0,
        currentPage:1,
        hideOnSinglePage:true,
        loading: true,
        isDetail: false,
        detailId:'',
        instituType: ''
      }
    },
    mounted() {
      switch (this.title) {
        case '社区综合为老服务中心':
          this.form.orgTypes = '2011'
          break;
        case '助餐点':
          this.form.orgTypes = '2014'
          break;
        case '日间照护机构':
          this.form.orgTypes = '2010'
          break;
        case '睦邻点':
          this.form.orgTypes = ''
          break;
        case '老年活动室':
          this.form.orgTypes = '2013'
          break;
        case '养老顾问点':
          this.form.orgTypes = ''
          break;
      }
      this.getOrderList();
    },
    methods: {
      isTag(name) {
        switch (name) {
          // case '江川路街道电机社区食堂':
          //   return true
          // case '天山西路综合为老服务中心助餐点':
          //   return true
          // case '古美路街道美乐汇社区食堂':
          //   return true
          // case '锦颐·浦瑞路社区长者食堂':
          //   return true
          // case '浦江镇一家人社区食堂':
          //   return true
          // case '吴泾镇村综合型助餐服务示范点':
          //   return true
          // case '马桥镇元松路综合型助餐服务点':
          //   return true
          // case '颛桥镇社区长者食堂':
          //   return true
          // case '莘庄镇万科社区食堂':
          //   return true
          case '莘庄镇莘城社区食堂':
            return true
          // case '莘庄镇沁馨社区食堂':
          //   return true
          case '莘庄镇康城社区食堂':
            return true
          case '莘庄镇新梅社区食堂':
            return true
          // case '航华综合型助餐服务示范点':
          //   return true
          // case '大上海国际花园社区食堂':
          //   return true
          // case '虹桥镇银馨助餐点':
          //   return true
          // case '虹桥镇青杉路龙柏为老助餐点':
          //   return true
          // case '繁兴路敬老院综合型助餐服务点':
          //   return true
          // case '继王敬老院综合型助餐服务点':
          //   return true
          // case '华漕综合为老服务中心助餐服务点':
          //   return true
          // case '华漕镇金丰邻里中心助餐服务点':
          //   return true
          // case '莘庄工业区申馨社区食堂':
          //   return true
        }
      },
      getOrderList() {
        this.loading = true;
        if (this.title === '养老顾问点') {
          getPointThere(this.form).then(res =>{
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false;
            }
          })
        } else {
          getPensionAgencyList(this.form).then(res =>{
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false;
            }
          })
        }
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.form.pageNum = val;
        this.getOrderList();
      },
      getOrderDetail(id, type) {
        this.detailId = id
        this.instituType = type
        this.isDetail = true;
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
        background: url("../../../../assets/imgYu/home_dialog_bg2.png");
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
  .toastImg{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
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
      font-size:26px;
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
