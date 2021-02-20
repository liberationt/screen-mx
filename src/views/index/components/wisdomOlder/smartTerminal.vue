<template>
  <div class="wis-mid">
    <div class="inforTitle">
      <div class="inforTitleImg" style="cursor: inherit">智能终端</div>
      <div class="zd">终端<span>0001</span></div>
    </div>
    <div style="width: 100%; text-align: center">
<!--      <img src="../../../../assets/imgYu/jqqd.png" alt="" style="margin-top: 400px">-->
<!--      <p style="font-size: 32px; margin-top: 40px; font-family: SansCN-Bold">-->
<!--        开发中，敬请期待。。。-->
<!--      </p>-->
    </div>
    <div class="zd-bd">
      <div class="zd-bd-list" style="margin-right: 30px">
        <Chart :option="optionXin" :height="height"></Chart>
      </div>
      <div class="zd-bd-list" style="margin-left: 30px">
        <Chart :option="optionXue" :height="height"></Chart>
      </div>
    </div>
    <div class="zd-bd">
      <div class="wis-tab">
        <div style="position: relative; z-index: 99" class="wis-tab-list" @click="helpTabsType = item.type" v-for="item in helpTabs" :key="item.type" :class="[helpTabsType === item.type ? 'orangeColor' : '']">
          <span>
            {{ item.name }}
            <a style="height: 2.5px"></a>
          </span>
        </div>
        <div v-if="helpTabsType === 1">
          <Chart :option="optionStep" :height="'420px'"></Chart>
        </div>
        <div class="dailog-bd" style="padding-top: 50px" v-if="helpTabsType === 2">
          <el-table
                  :data="tableData"
                  v-loading="loading"
                  style="width: 100%">
            <el-table-column
                    align="center"
                    show-overflow-tooltip
                    prop="name"
                    label="人员名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="adress"
                    width="380"
                    show-overflow-tooltip
                    label="地址">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="lon"
                    show-overflow-tooltip
                    label="经度">
            </el-table-column>
            <el-table-column
                    align="center"
                    show-overflow-tooltip
                    prop="lat"
                    label="纬度">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="ltype"
                    show-overflow-tooltip
                    label="类型">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="collectTime"
                    width="280"
                    show-overflow-tooltip
                    label="采集时间">
            </el-table-column>
          </el-table>
          <div v-if="total > 3" style="width: 100%; line-height: 70px; font-size: 22px; text-align: center;color: #1be5e1; cursor: pointer" @click="loadMore">
            加载更多
          </div>
        </div>
      </div>
    </div>
    <div class="zd-bd">
      <div class="zd-bd-list" style="margin-right: 30px">
        <span class="font26" style="font-weight: bold">睡眠质量</span>
        <div class="zd-last-list">
          <span>浅</span>
          <span>浅睡（天）</span>
          <span class="orangeColor" style="font-size: 40px">{{ sleepData['浅睡(小时)']}}</span>
        </div>
        <div class="zd-last-list">
          <span>中</span>
          <span>中睡（天）</span>
          <span class="orangeColor" style="font-size: 40px">{{ sleepData['中睡(小时)']}}</span>
        </div>
        <div class="zd-last-list">
          <span>深</span>
          <span>深睡（天）</span>
          <span class="orangeColor" style="font-size: 40px">{{ sleepData['深睡(小时)']}}</span>
        </div>
      </div>
      <div class="zd-bd-list" style="margin-left: 30px">
        <span class="font26" style="font-weight: bold">报警信息</span>
        <div class="zd-last-list">
          <span style="font-size: 28px">S</span>
          <span>SOS（次）</span>
          <span class="orangeColor" style="font-size: 40px; color: #f9544a">{{ sosData['SOS(次)']}}</span>
        </div>
        <div class="zd-last-list">
          <span>久</span>
          <span>久坐报警（次）</span>
          <span class="orangeColor" style="font-size: 40px; color: #f9544a">{{ sosData['久坐报警(次)']}}</span>
        </div>
        <div class="zd-last-list">
          <span>设</span>
          <span>设备低电（次）</span>
          <span class="orangeColor" style="font-size: 40px; color: #f9544a">{{ sosData['设备低电(次)']}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from "@/components/Chart"
  import echarts from "echarts"
  import { getWisdom, getWz } from "@/api/thirdScreen"
  import { areaCode } from "@/api/areaCode";

  export default {
    name: "smartTerminal",
    components: {Chart},
    data() {
      return {
        optionXin: {},
        optionXue: {},
        height: '420px',
        helpTabs: [{
          name: "步数检测",
          type: 1
        }, {
          name: "位置信息",
          type: 2
        }],
        helpTabsType: 1,
        optionStep: {},
        tableData: [],
        form: {
          areaCode: areaCode,
          dataType: 'locations',
          pageNum: 1,
          pageSize: 3,
          sensorId: '05D6FF353937584D43105519_1'
        },
        total: 0,
        currentPage:1,
        hideOnSinglePage:true,
        loading: true,
        sleepData: '',
        sosData: '',
        lastPage: '',
        clearTimeSet: ''
      }
    },
    mounted() {
      this.getWisdom()
      this.getWz()
      this.setTime()
    },
    beforeDestroy() {    //页面关闭时清除定时器
      clearInterval(this.clearTimeSet);
    },
    methods: {
      setTime() {
        this.clearTimeSet = setInterval(() =>{
          this.getWisdom()
          this.getWz()
        }, 1800000)
      },
      clearTime() {
        clearInterval(this.clearTimeSet);
      },
      handleCurrentChange() {},
      getWisdom() {
        getWisdom({
          areaCode: areaCode,
          sensorId: '05D6FF353937584D43105519_1'
        }).then(res => {
          if (res.code === 0) {
            //  心率 --------------------------------------------------------------
            const xinKey = []
            const xinVal = []
            res.data.heartbeatRatesList.forEach(item => {
              for(var key in item){
                xinKey.push(key)
                if (item[key][0]) {
                  xinVal.push(item[key][0].heartrate)
                } else {
                  xinVal.push(0)
                }
              }
            })
            this.optionXin = {
              title:[
                {
                  text: '心率检测',
                  left:'0.5%',
                  top:'5%',
                  textStyle: {
                    fontSize: 28,
                    color:'#fff',
                  }
                },
                {
                  text: '单位：次/分',
                  right: '1.5%',
                  top: '12%',
                  textStyle: {
                    fontSize: 16,
                    color:'#fff'
                  }
                }
              ],
              tooltip: {
                trigger: 'item'
              },
              grid: {
                top: '22%',
                right: '3.5%',
                left: '11%',
                bottom: '12%'
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                color: '#59588D',
                data: xinKey,
                axisLabel: {
                  margin: 20,
                  color: '#fff',
                  textStyle: {
                    fontSize: 16,
                  },
                  interval: 0,
                  // rotate:-40
                },
                axisLine: {
                  lineStyle: {
                    color: '#fff',
                  }
                },
                axisTick: {
                  show: false
                },
              },
              yAxis: {
                color: "#fff",
                min: 60,
                max: 220,
                splitNumber: 2,
                // data: ['上限（100）', '实时数据', '下限（60）'],
                axisLabel: {
                  color: '#fff',
                  textStyle: {
                    fontSize: 16
                  },
                  formatter: function (value) {
                    var texts = [];
                    if(value === 60){
                      texts.push('下限(60)');
                    }
                    else if (value === 140) {
                      texts.push('实时数据');
                    }
                    else if (value === 220) {
                      texts.push('上限(220)');
                    }
                    return texts;
                  }
                },
                interval: 80,
                axisLine: {
                  show:false,
                  lineStyle: {
                    color: '#fff',
                  }
                },
                axisTick: {
                  show: false
                }
              },
              series: [{
                type: 'line',
                cursor: 'default',
                data: xinVal,
                symbol: 'circle',     //设定为实心点
                symbolSize: 3,   //设定实心点的大小
                lineStyle: {
                  color: "#13d9a3" ,
                  shadowColor: 'rgba(19, 217, 163, 0.4)',
                  shadowBlur: 5,
                  shadowOffsetY: 5
                },
                itemStyle: {
                  color: "#13d9a3",
                  borderWidth: 0
                }
              }]
            }
            // 血压 ---------------------------------------------------------------
            const bloodKey = []
            const bloodHVal = []
            const bloodSVal = []
            res.data.bloodPressureList.forEach(item => {
              for(var key in item){
                bloodKey.push(key)
                if (item[key][0]) {
                  bloodHVal.push(item[key][0].sbp)
                } else {
                  bloodHVal.push(0)
                }
                if (item[key][0]) {
                  bloodSVal.push(item[key][0].dbp)
                } else {
                  bloodSVal.push(0)
                }
              }
            })
            this.optionXue = {
              title:[
                {
                  text: '血压监测',
                  left:'0.5%',
                  top:'5%',
                  textStyle: {
                    fontSize: 28,
                    color:'#fff',
                  }
                },
                {
                  text: '单位：mmHg',
                  right: '1.5%',
                  top: '12%',
                  textStyle: {
                    fontSize: 16,
                    color:'#fff'
                  }
                }
              ],
              tooltip: {
                trigger: 'item'
              },
              grid: {
                top: '22%',
                right: '3.2%',
                left: '25.5%',
                bottom: '12%'
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                color: '#59588D',
                data: bloodKey,
                axisLabel: {
                  margin: 20,
                  color: '#fff',
                  textStyle: {
                    fontSize: 16,
                  },
                  interval: 0,
                  // rotate:-40
                },
                axisLine: {
                  lineStyle: {
                    color: '#fff',
                  }
                },
                axisTick: {
                  show: false
                },
              },
              yAxis: {
                color: "#fff",
                min: 65,
                max: 140,
                splitNumber: 3,
                interval: 25,
                // data: ['上限（100）', '实时数据', '下限（60）'],
                axisLabel: {
                  color: '#fff',
                  textStyle: {
                    fontSize: 16
                  },
                  formatter: function (value) {
                    var texts = [];
                    if(value === 65){
                      texts.push('舒张压');
                    }
                    else if (value === 90) {
                      texts.push('舒张压报警上限(90)');
                    }
                    else if (value === 115) {
                      texts.push('收缩压');
                    }
                    else if (value === 140) {
                      texts.push('收缩压报警上限(140)');
                    }
                    return texts;
                  }
                },
                axisLine: {
                  show:false,
                  lineStyle: {
                    color: '#fff',
                  }
                },
                axisTick: {
                  show: false
                }
              },
              series: [{
                type: 'line',
                data: bloodHVal,
                cursor: 'default',
                symbol: 'circle',     //设定为实心点
                symbolSize: 3,   //设定实心点的大小
                lineStyle: {
                  color: "#dab62c" ,
                  shadowColor: 'rgba(218, 182, 44, 0.4)',
                  shadowBlur: 5,
                  shadowOffsetY: 5
                },
                itemStyle: {
                  color: "#dab62c",
                  borderWidth: 0
                }
              }, {
                type: 'line',
                data: bloodSVal,
                symbol: 'circle',     //设定为实心点
                symbolSize: 3,   //设定实心点的大小
                lineStyle: {
                  color: "#f9544a" ,
                  shadowColor: 'rgba(249, 84, 74, 0.4)',
                  shadowBlur: 5,
                  shadowOffsetY: 5
                },
                itemStyle: {
                  color: "#f9544a",
                  borderWidth: 0
                }
              }]
            }
            // 步数 ---------------------------------------------------------------
            const stepKey = []
            const stepVal = []
            res.data.stepsList.forEach(item => {
              for(var key in item){
                stepKey.push(key)
                if (item[key][0]) {
                  stepVal.push(item[key][0].stepNumber)
                } else {
                  stepVal.push(0)
                }
              }
            })
            this.optionStep = {
              title:[
                // {
                //   text: '',
                //   left:'-0.5%',
                //   top:'13%',
                //   textStyle: {
                //     fontSize: 20,
                //     color:'#fff',
                //   }
                // },
                {
                  text: '单位：步',
                  right: '1.7%',
                  top: '12%',
                  textStyle: {
                    fontSize: 16,
                    color:'#fff'
                  }
                }
              ],
                tooltip: {
                trigger: 'item'
              },
              grid: {
                top: '20%',
                  right: '2%',
                  left: '4.5%',
                  bottom: '19%'
              },
              xAxis: {
                type: 'category',
                  boundaryGap: false,
                  color: '#59588D',
                  data: stepKey,
                  axisLabel: {
                  margin: 20,
                    color: '#fff',
                    textStyle: {
                    fontSize: 12,
                  },
                  interval: 0,
                  // rotate:-40
                },
                axisLine: {
                  lineStyle: {
                    color: '#fff',
                  }
                },
                axisTick: {
                  show: false
                },
              },
              yAxis: {
                color:"#fff",
                  splitNumber: 4,
                  axisLabel: {
                  color: '#fff',
                    textStyle: {
                    fontSize: 16
                  },
                },
                axisLine: {
                  show:false,
                    lineStyle: {
                    color: '#fff',
                  }
                },
                axisTick: {
                  show: false
                }
              },
              series: [{
                type: 'line',
                data: stepVal,
                cursor: 'default',
                symbol: 'circle',     //设定为实心点
                symbolSize: 3,   //设定实心点的大小
                lineStyle: {
                  color: "#19fff8" ,
                },
                itemStyle: {
                  color: "#19fff8",
                  borderWidth: 0
                },
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'rgb(25, 255, 248, 1)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgb(25, 255, 248, 0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              }]
            }
            // 睡眠 ----------------------------------------------------------------
            this.sleepData = res.data.sleepsList
            // sos ----------------------------------------------------------------
            this.sosData = res.data.sosMsgList
          }
        })
      },
      getWz() {
        getWz(this.form).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.list
            this.lastPage = res.data.lastPage
          }
        })
      },
      loadMore(){
        if(this.lastPage === this.form.pageNum){
          this.form.pageNum = 1
        }else{
          this.form.pageNum ++
        }
        // this.pageNum++
        this.getWz()
      },
    }
  }
</script>

<style scoped lang="scss">
.wis-mid {
  width: 1542px;
  height: 1330px;
  float: left;
  background: url("../../../../assets/imgYu/con_bg2.png") center no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
  .inforTitle {
    padding: 0;
    position: relative;
    .inforTitleImg {
      line-height: 62px;
    }
  }
  .zd {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 26px;
    line-height: 60px;
    letter-spacing: 2px;
  }
  .zd-bd {
    width: 100%;
    height: 420px;
    .zd-bd-list {
      width: 710px;
      float: left;
      height: 420px;
    }
  }
  .wis-tab {
    width: 100%;
    margin-top: 30px;
    .wis-tab-list {
      width: 50%;
      float: left;
      padding: 0 30px;
      font-size: 26px;
      cursor: pointer;
      letter-spacing: 3px;
    }
    .wis-tab-list:first-of-type {
      text-align: right;
    }
    .orangeColor {
      span {
        display: inline-block;
        position: relative;
        a {
          display: block;
          position: absolute;
          width: 40px;
          height: 2px;
          background: #ffd535;
          bottom: -10px;
          left: 50%;
          margin-left: -20px;
        }
      }
    }
  }
  .zd-last-list {
    width: 100%;
    border-bottom: 2px solid #50cef9;
    display:-webkit-box;
    display:-webkit-flex;
    display: flex;
    justify-content: center;/*----水平居中对齐*/
    align-items: center; /*-------垂直居中对齐*/
    padding-bottom: 22px;
    margin-top: 30px;
    span {
      line-height: 50px;
    }
    span:first-of-type {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #184a5b;
      color: #13d9a3;
      font-size: 22px;
      font-weight: bold;
      margin-right: 20px;
      text-align: center;
    }
    span:nth-of-type(2) {
      font-size: 20px;
    }
    span:last-of-type {
      flex: 1;
      text-align: right;
      padding-right: 10px;
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
