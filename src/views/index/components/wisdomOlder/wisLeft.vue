<template>
  <div class="wis-left">
    <div class="wis-help">
      <div class="inforTitle">
        <div class="inforTitleImg" style="cursor: inherit">紧急救助</div>
      </div>
      <div class="wis-base-data">
        <span class="font26">话务量（通）</span>
        <span class="wis-base-data-num orangeColor" v-for="(item, index) in phoneNum" :key="item + index" @click="openDailog" style="cursor: pointer">{{ item }}</span>
      </div>
      <div class="wis-base-data">
        <span class="font26">服务老人数（人）</span>
        <span class="wis-base-data-num orangeColor" v-for="(item, index) in olderNum" :key="item + index" @click="openOlderDailog" style="cursor: pointer">{{ item }}</span>
      </div>
      <div style="clear: both"></div>
      <div class="wis-tab">
        <div class="wis-tab-list" @click="helpTabsType = item.type" v-for="item in helpTabs" :key="item.type" :class="[helpTabsType === item.type ? 'orangeColor' : '']">
          <span>
            {{ item.name }}
            <a></a>
          </span>
        </div>
      </div>
      <div style="clear: both"></div>
      <div v-if="helpTabsType === 1" class="wis-help-man">
        <div class="wis-help-tab-left">
          <div class="wis-help-tab-list">
            <div class="wis-help-tab-item">
              <span>今日求助人数</span>
              <span class="orange">{{ helpForm.todaySHelp }}</span>
            </div>
            <div class="wis-help-tab-line">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="wis-help-tab-list" style="margin-top: 90px">
            <div class="wis-help-tab-item">
              <span>今日援助人数</span>
              <span class="green">{{ helpForm.aidToday }}</span>
            </div>
            <div class="wis-help-tab-line">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="wis-help-tab-mid">
          <img src="../../../../assets/imgYu/jjjz_bg.png" alt="">
        </div>
        <div class="wis-help-tab-left">
          <div class="wis-help-tab-list">
            <div class="wis-help-tab-item">
              <span>累计求助人次</span>
<!--              <span class="orange">{{ helpForm.rescueTotal }}</span>-->
              <span class="orange">63344</span>
            </div>
            <div class="wis-help-tab-line">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="wis-help-tab-list" style="margin-top: 90px">
            <div class="wis-help-tab-item">
              <span>累计援助人次</span>
<!--              <span class="green">{{ helpForm.assistanceTotal }}</span>-->
              <span class="green">400</span>
            </div>
            <div class="wis-help-tab-line">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="helpTabsType === 2">
        <Chart :option="olderAgeOption" :height="height"></Chart>
      </div>
    </div>
    <div class="wis-help wis-love">
      <div class="inforTitle">
        <div class="inforTitleImg" style="cursor: inherit">主动关爱</div>
      </div>
      <div class="wis-base-data">
        <span class="font26">服务工单（单）</span>
        <span class="wis-base-data-num orangeColor" v-for="(item, index) in orderNum" :key="item + index" style="cursor: pointer" @click="openLoverDailog">{{ item }}</span>
      </div>
      <div class="wis-base-data">
        <span class="font26">服务人数（人）</span>
        <span class="wis-base-data-num orangeColor" v-for="(item, index) in orderManNum" :key="item + index" style="cursor: pointer" @click="openLoverOlderDailog">{{ item }}</span>
      </div>
      <div style="clear: both"></div>
      <div class="wis-tab">
        <div class="wis-tab-list" @click="loveTabsType = item.type" v-for="item in loveTabs" :key="item.type" :class="[loveTabsType === item.type ? 'orangeColor' : '']">
          <span>
            {{ item.name }}
            <a></a>
          </span>
        </div>
      </div>
      <div style="clear: both"></div>
      <div v-if="loveTabsType === 1">
        <Chart :option="streetOption" :height="height"></Chart>
      </div>
      <div v-if="loveTabsType === 2">
        <Chart :option="ageOption" :height="height"></Chart>
      </div>
    </div>
    <phoneList v-if="isShow" :close="closeDailog" ></phoneList>
    <phoneOlderList v-if="isOlderShow" :close="closeOlderDailog" ></phoneOlderList>
    <loveList v-if="isLoveShow" :close="closeLoveDailog" ></loveList>
    <loveOlderList v-if="isLoveOlderShow" :close="closeLoveOlderDailog" ></loveOlderList>
  </div>
</template>

<script>
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { getStreetNumber } from '@/api/elderlyInfor'
  import { areaCode } from '@/api/areaCode'
  import phoneList from "./dailog/phoneList";
  import phoneOlderList from "./dailog/phoneOlderList";
  import loveList from "./dailog/loveList";
  import loveOlderList from "./dailog/loveOlderList";
  import {
    getTrafficVolume
  } from "@/api/consultant";
  import {
    getServiceOlder,
    getHelpMans,
    getOlderAge,
    getCareFor,
    getCareForStreet,
    getCareForAge
  } from "@/api/wisdom";
  export default {
    name: "wisLeft",
    components: {
      Chart,
      phoneList,
      phoneOlderList,
      loveList,
      loveOlderList
    },
    data() {
      return {
        phoneNum: [],
        olderNum: [],
        orderNum: [],
        orderManNum: [],
        helpTabs: [{
          name: "求助人员统计",
          type: 1
        }, {
          name: "服务老人年龄分布",
          type: 2
        }],
        helpTabsType: 1,
        loveTabs: [{
          name: "工单街镇分布",
          type: 1
        }, {
          name: "工单年龄分布",
          type: 2
        }],
        loveTabsType: 1,
        height: "480px",
        streetOption:{},
        orderForm: {
          town: "闵行区",
          flag: 0
        },
        helpForm: "",
        olderAgeOption: {},
        streetArr: [],
        ageOption: {},
        isShow: false,
        isOlderShow: false,
        isLoveShow: false,
        isLoveOlderShow: false
      }
    },
    mounted() {
      this.getStreet();
        this.getTrafficVolume();
        this.getServiceOlder();
        this.getHelpMans();
        this.getOlderAge();
        this.getCareFor();
        this.streetList();
        this.getCareForAge();
    },
    methods: {
      openLoverOlderDailog() {
        this.isLoveOlderShow = true
      },
      closeLoveOlderDailog() {
        this.isLoveOlderShow = false
      },
      openLoverDailog() {
        this.isLoveShow = true
      },
      closeLoveDailog() {
        this.isLoveShow = false
      },
      openOlderDailog() {
        this.isOlderShow = true
      },
      closeOlderDailog() {
        this.isOlderShow = false
      },
      openDailog() {
        this.isShow = true
      },
      closeDailog() {
        this.isShow = false
      },
      getTrafficVolume() {
        getTrafficVolume(this.orderForm).then(res => {
          if (res.code === 0) {
            if (res.data) {
              let data = String(res.data.trafficVolume);
              let arr = data.split("");
              arr.forEach(item => {
                this.phoneNum.push(item);
              });
            }
          }
        });
      },
      //街镇
      getStreet(){
        return new Promise((resolve, reject) => {
          let xAxisData = [];
          let seriesData = [];
          let dataList = this.streetArr;
          if(dataList&&dataList.length){
            dataList.forEach(item=>{
              xAxisData.push(item.key);
              seriesData.push(item.value)
            })
          }
          this.streetOption={
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
                text: '单位：单',
                right: '1.5%',
                top: '2%',
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
              top: '12%',
              right: '1.5%',
              left: '5%',
              bottom: '19%'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              color: '#59588D',
              data: xAxisData,
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
              cursor: 'default',
              data: seriesData,
              symbol: 'circle',     //设定为实心点
              symbolSize: 3,   //设定实心点的大小
              lineStyle: {
                color: "#13d9a3" ,
              },
              itemStyle: {
                color: "#13d9a3",
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
                    offset: 0, color: 'rgb(19, 217, 163, 1)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgb(19, 217, 163, 0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          resolve()
        })
      },
      getServiceOlder() {
        getServiceOlder(this.orderForm).then(res =>{
          if (res.code === 0) {
            if (res.data) {
              let data = String(res.data.servingTheElderly);
              let arr = data.split("");
              arr.forEach(item => {
                this.olderNum.push(item);
              });
            }
          }
        })
      },
      getHelpMans() {
        getHelpMans(this.orderForm).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.helpForm = res.data;
            }
          }
        })
      },
      getOlderAge() {
        getOlderAge(this.orderForm).then(res => {
          if (res.code === 0) {
            if (res.data) {
              let xAxisData = [];
              let seriesData = [];
              let dataList = res.data;
              for (let i in dataList) {
                seriesData.push(dataList[i].value); //属性
                if (dataList[i].key === '100') {
                  xAxisData.push(dataList[i].key + '岁以上')
                } else {
                  xAxisData.push(dataList[i].key + '岁')
                }
              }
              this.olderAgeOption={
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
                    text: '单位：人',
                    right: '0%',
                    top: '2%',
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
                  top: '12%',
                  right: '2%',
                  left: '3.5%',
                  bottom: '19%'
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  color: '#59588D',
                  data: xAxisData,
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
                  cursor: 'default',
                  data: seriesData,
                  symbol: 'circle',     //设定为实心点
                  symbolSize: 3,   //设定实心点的大小
                  lineStyle: {
                    color: "#50cef9" ,
                  },
                  itemStyle: {
                    color: "#50cef9",
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
                        offset: 0, color: 'rgb(80, 206, 249, 1)' // 0% 处的颜色
                      }, {
                        offset: 1, color: 'rgb(80, 206, 249, 0)' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                }]
              }
            }
          }
        });
      },
      getCareFor() {
        getCareFor(this.orderForm).then(res =>{
          if (res.code === 0) {
            if (res.data) {
              let data = String(res.data.activeCareOrder);
              let arr = data.split("");
              arr.forEach(item => {
                this.orderNum.push(item);
              });
              let datas = String(res.data.activeCarePension);
              // let arrs = datas.split("");
              let arrs = [8,5,7,3,2,9];
              arrs.forEach(item => {
                this.orderManNum.push(item);
              });
            }
          }
        })
      },
      getStreetData(area) {
        return new Promise((resolve, reject) => {
          getCareForStreet({
            area: area,
            flag: 0
          }).then(res =>{
            if (res.code === 0) {
              const data = {};
              data.key = area;
              data.value = res.data.statistics;
              this.streetArr.push(data);
              resolve()
            } else {
              reject()
            }
          })
        })
      },
      async streetList() {
        await this.getStreetData("新浦江镇");
        await this.getStreetData("吴泾镇");
        await this.getStreetData("马桥镇");
        await this.getStreetData("颛桥镇");
        await this.getStreetData("梅陇镇");
        await this.getStreetData("莘庄镇");
        await this.getStreetData("七宝镇");
        await this.getStreetData("虹桥镇");
        await this.getStreetData("华漕镇");
        await this.getStreetData("浦锦街道");
        await this.getStreetData("江川路街道");
        await this.getStreetData("古美街道");
        await this.getStreetData("新虹街道");
        await this.getStreetData("莘庄工业区");
        await this.getStreet();
      },
      getCareForAge() {
        getCareForAge(this.orderForm).then(res => {
          if (res.code === 0) {
            if (res.data) {
              let xAxisData = [];
              let seriesData = [];
              let dataList = res.data;
              for (let i in dataList) {
                seriesData.push(dataList[i].value); //属性
                if (dataList[i].key === '100') {
                  xAxisData.push(dataList[i].key + '岁以上')
                } else {
                  xAxisData.push(dataList[i].key + '岁')
                }
              }

              if (xAxisData[1] === "100以上岁") {
                let key = xAxisData[1]
                let val = seriesData[1]
                seriesData.splice(1,1)
                xAxisData.splice(1,1)
                seriesData.push(val)
                xAxisData.push("100岁以上")
              }
              this.ageOption={
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
                    text: '单位：人',
                    right: '0%',
                    top: '2%',
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
                  top: '12%',
                  right: '2.1%',
                  left: '3.5%',
                  bottom: '19%'
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  color: '#59588D',
                  data: xAxisData,
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
                  cursor: 'default',
                  data: seriesData,
                  symbol: 'circle',     //设定为实心点
                  symbolSize: 3,   //设定实心点的大小
                  lineStyle: {
                    color: "#13d9a3" ,
                  },
                  itemStyle: {
                    color: "#13d9a3",
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
                        offset: 0, color: 'rgb(19, 217, 163, 1)' // 0% 处的颜色
                      }, {
                        offset: 1, color: 'rgb(19, 217, 163, 0)' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                  }
                }]
              }
            }
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.wis-left {
  width: 1462px;
  height: 1330px;
  float: left;
  .wis-help {
    width: 100%;
    height: 666px;
    background: url("../../../../assets/imgYu/con_bg1.png") center no-repeat;
    background-size: 100% 100%;
    padding: 0 30px;
    .inforTitle {
      padding: 0;
      .inforTitleImg {
        line-height: 62px;
      }
    }
    .wis-base-data {
      width: 50%;
      float: left;
      margin-top: 20px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .wis-base-data-num {
        width: 48px;
        height: 68px;
        border: 1px solid #18ede7;
        line-height: 70px;
        margin-right: 9px;
        font-size: 36px;
        text-align: center;
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
    .wis-help-man {
      width: 100%;
      padding: 0 30px;
      margin-top: 80px;
      .wis-help-tab-left {
        width: 515px;
        float: left;
        padding: 20px 0;
        .wis-help-tab-list {
          width: 100%;
          .wis-help-tab-item {
            width: 100%;
            padding: 0 25px;
            span {
              display: inline-block;
              width: 50%;
              vertical-align: middle;
            }
            span:first-of-type {
              font-size: 18px;
              line-height: 43px;
            }
            span:last-of-type {
              font-size: 28px;
              font-weight: 500;
              font-family: Helvetica;
              // letter-spacing: 5px;
              text-align: right;
            }
            .orange {
              color: #fc7a3c;
            }
            .green {
              color: #46cba7;
            }
          }
          .wis-help-tab-line {
            width: 100%;
            position: relative;
            top: -5px;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            span:first-of-type {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #18ede7;
            }
            span:nth-child(2) {
              width: 518px;
              height: 1px;
              background: #18ede7;
            }
            span:last-of-type {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 1px solid #18ede7;
            }
          }
        }
      }
      .wis-help-tab-mid {
        width: 280px;
        float: left;
        margin: 0 10px;
        img {
          width: 100%;
        }
      }
    }
  }
  .wis-love {
    position: relative;
    top: -2px;
  }
}
</style>
