<template>
  <div class="home-mid" style="margin-left: -3px">
    <div class="home-old">
      <div class="inforTitle">
        <div class="inforTitleImg" @click="openShow" style="cursor: pointer">服务老人</div>
      </div>
      <div class="home-list">
        <Chart :option="typeOption" :height="typeHeight"></Chart>
        <div class="home-line"></div>
      </div>
    </div>
    <div class="home-old" style="margin-top: -2px">
      <div class="inforTitle">
        <div class="inforTitleImg" style="cursor: inherit">街镇居家养老列表</div>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            align="center"
            prop="name"
            label="街镇">
          </el-table-column>
          <el-table-column
            align="center"
            label="服务人员">
            <template slot-scope="scope">
              <span class="orangeColor" style="cursor: pointer" @click="openManShow(scope.row.areaCode)">{{ scope.row.fwryCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="政府补贴老人">
            <template slot-scope="scope">
              <span class="orangeColor" style="cursor: pointer" @click="openShowList(scope.row.areaCode)">{{ scope.row.subsidyOlderCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="补贴金额">
            <template slot-scope="scope">
              <span>{{ scope.row.subsidyCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="服务商">
            <template slot-scope="scope">
              <span>{{ scope.row.organCount }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%; margin-top: 40px">
          <el-pagination
                  class="Page"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="->,total,prev, pager, next, jumper"
                  :page-size="4"
                  :pager-count="5"
                  :total="total"
                  :hide-on-single-page="hideOnSinglePage">
          </el-pagination>
        </div>
      </div>
    </div>
    <serviceOlder v-if="isShow" :close="closeShow" :code="code"></serviceOlder>
    <serviceManList v-if="isManShow" :close="closeManShow" :code="code"></serviceManList>
    <serviceOrder v-if="isShopShow" :close="closeShopShow" :code="code"></serviceOrder>
  </div>
</template>

<script>
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { getProjectSex, getProjectHodgepodge } from "@/api/homeCare"
  import { areaCode } from '@/api/areaCode'
  import serviceOlder from "./dailog/serviceOlder";
  import serviceManList from "./dailog/serviceManList";
  import serviceOrder from "./dailog/serviceOrder";
  export default {
    name: "homeMid",
    components: {
      Chart,
      serviceOlder,
      serviceManList,
      serviceOrder
    },
    data() {
      return {
        isManShow: false,
        isShow: false,
        isShopShow: false,
        man: [],
        woman: [],
        tableData: [],
        typeOption: {},
        typeHeight: "500px",
        form: {
          areaCode:areaCode,
          pageNum: 1,
          pageSize: 4
        },
        currentPage:1,
        hideOnSinglePage:true,
        total: 0,
        code: ''
      }
    },
    mounted() {
      this.getProjectSex();
      this.getProjectHodgepodge();
    },
    methods: {
      openShopShow(row) {
        this.code = row
        this.isShopShow = true;
      },
      closeShopShow() {
        this.isShopShow = false;
      },
      openManShow(row) {
        this.code = row
        this.isManShow = true;
      },
      closeManShow() {
        this.isManShow = false;
      },
      openShowList(row) {
        this.code = row
        this.isShow = true;
      },
      openShow() {
        this.code = undefined
        this.isShow = true;
      },
      closeShow() {
        this.isShow = false;
      },
      // 性别
      getProjectSex() {
        var promise1 = new Promise((resolve, reject) =>{
          getProjectSex({
            areaCode: areaCode,
            sexType: "1"
          }).then(res =>{
            if (res.code === 0) {
              this.man = res.data;
              resolve()
            }
          }).catch(err =>{
            reject()
          })
        });

        var promise2 = new Promise((resolve, reject) =>{
          getProjectSex({
            areaCode: areaCode,
            sexType: "2"
          }).then(res =>{
            if (res.code === 0) {
              this.woman = res.data;
              resolve()
            }
          }).catch(err =>{
            reject()
          })
        });
        Promise.all([promise1, promise2]).then((value) =>{
          const data = [
            ['sex', 'man', 'woman'],
            ['60-64岁', 0, 0],
            ['65-69岁', 0, 0],
            ['70-79岁', 0, 0],
            ['80-89岁', 0, 0],
            ['90-99岁', 0, 0],
            ['100岁以上', 0, 0]
          ];
          data.forEach((item, index) =>{
            this.man.forEach(list =>{
              if (item[0] === list.key) {
                data[index][1] = list.value
              }
            });
            this.woman.forEach(i =>{
              if (item[0] === i.key) {
                data[index][2] = i.value
              }
            });
          });
          this.typeOption = {
            title:[
              {
                text: '男',
                left:'23.5%',
                top:'50%',
                textStyle: {
                  fontSize: 40,
                  color:'#fff',
                  fontWeight: 'normal'
                }
              },
              {
                text: '女',
                left:'73.5%',
                top:'50%',
                textStyle: {
                  fontSize: 40,
                  color:'#fff',
                  fontWeight: 'normal'
                }
              }
            ],
            legend: {
              selectedMode: false,
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
              }
            },
            tooltip: {},
            dataset: {
              source: data
            },
            series: [{
              cursor: 'default',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['25%', '55%'],
              encode: {
                itemName: 'sex',
                value: 'man'
              },
              label: {
                color: '#ffffff',
                formatter: '{b} ({d}%)',
                fontSize: 16
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 30,
                length2: 50
              },
              normal:{
                label:{
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    let colorList = ['#f9544a', '#2f88e7', '#ffce14', '#f852a0', '#50cef9', '#46cba7']
                    return colorList[params.dataIndex]
                  }
                }
              }
              // No encode specified, by default, it is '2012'.
            }, {
              type: 'pie',
              cursor: 'default',
              radius: ['50%', '70%'],
              center: ['75%', '55%'],
              encode: {
                itemName: 'sex',
                value: 'woman'
              },
              label: {
                color: '#ffffff',
                formatter: '{b} ({d}%)',
                fontSize: 16
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 30,
                length2: 50
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    let colorList = ['#f9544a', '#2f88e7', '#ffce14', '#f852a0', '#50cef9', '#46cba7']
                    return colorList[params.dataIndex]
                  }
                }
              }
            }]
          }
        });
      },
      // 居家养老列表
      getProjectHodgepodge() {
        getProjectHodgepodge(this.form).then(res =>{
          if (res.code === 0) {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.tableData.forEach((item, index) => {
              switch (item.name) {
                case '浦江镇':
                  this.tableData[index].organCount = 3
                  break
                case '吴泾镇':
                  this.tableData[index].organCount = 1
                  break
                case '马桥镇':
                  this.tableData[index].organCount = 1
                  break
                case '颛桥镇':
                  this.tableData[index].organCount = 1
                  break
                case '梅陇镇':
                  this.tableData[index].organCount = 1
                  break
                case '莘庄镇':
                  this.tableData[index].organCount = 1
                  break
                case '七宝镇':
                  this.tableData[index].organCount = 1
                  break
                case '虹桥镇':
                  this.tableData[index].organCount = 1
                  break
                case '华漕镇':
                  this.tableData[index].organCount = 1
                  break
                case '浦锦街道':
                  this.tableData[index].organCount = 1
                  break
                case '江川路街道':
                  this.tableData[index].organCount = 1
                  break
                case '古美街道':
                  this.tableData[index].organCount = 1
                  break
                case '新虹街道':
                  this.tableData[index].organCount = 1
                  break
                case '莘庄工业区':
                  this.tableData[index].organCount = 1
                  break
              }
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.form.pageNum = val;
        this.getProjectHodgepodge();
      },
    }
  }
</script>

<style scoped lang="scss">
  .home-mid {
    width: 1548px;
    height: 1150px;
    float: left;
    .home-old {
      width: 1548px;
      height: 575px;
      background: url("../../../../assets/imgYu/home_bg.png") center no-repeat;
      background-size: 100% 100%;
      padding: 0 20px;
      .inforTitle {
        padding: 0;
        .inforTitleImg {
          line-height: 62px;
        }
      }
      .home-list {
        width: 100%;
        position: relative;
        .home-line {
          width: 1px;
          height: 450px;
          position: absolute;
          bottom: 2px;
          left: 50%;
          border-left: 1px dashed #1cefe9;
        }
      }
    }
  }
</style>

<style lang="scss">
  .home-mid {
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
  }
</style>
