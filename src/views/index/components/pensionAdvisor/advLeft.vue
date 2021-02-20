<template>
  <div class="adv-left">
    <div class="adv-help">
      <div class="inforTitle">
        <div class="inforTitleImg" style="cursor: inherit">线下养老顾问</div>
      </div>
      <div class="adv-base-data">
        <span class="font26" style="margin-right: 15px">线下顾问</span>
        <span class="adv-base-data-num orangeColor" v-for="(item, index) in downAdv" :key="item + index">{{ item }}</span>
      </div>
      <div class="adv-base-data">
        <span class="font26" style="margin-right: 15px">服务量</span>
        <span class="adv-base-data-num orangeColor" v-for="(item, index) in olderNum" :key="item + index">{{ item }}</span>
      </div>
      <div style="clear: both"></div>
      <div class="adv-tab">
        <div class="adv-tab-list" @click="changeIt(item.type)" v-for="item in helpTabs" :key="item.type" :class="[helpTabsType === item.type ? 'orangeColor' : '']">
          <span>
            {{ item.name }}
            <a></a>
          </span>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="adv-point" >
        <div class="adv-point-list">
          <Chart :option="operateOptions" :height="optionHeight"/>
        </div>
        <div class="adv-point-list">
          <Chart :option="operateOptionsTwo" :height="optionHeight"/>
        </div>
      </div>
    </div>
    <div class="adv-help adv-love">
      <div class="inforTitle">
        <div class="inforTitleImg" style="cursor: inherit">线上养老顾问</div>
      </div>
      <div class="adv-base-data">
        <span class="font26" style="margin-right: 15px">线上顾问</span>
        <span class="adv-base-data-num orangeColor" v-for="item in upAdv" :key="item">{{ item }}</span>
      </div>
      <div class="adv-base-data">
        <span class="font26" style="margin-right: 15px">服务量</span>
        <span class="adv-base-data-num orangeColor" v-for="(item, index) in upAdvNum" :key="item + index">{{ item }}</span>
      </div>
      <div style="clear: both"></div>
      <div>
        <Chart :option="streetOption" :height="height"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {areaCode} from '@/api/areaCode'
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { getStreetNumber } from '@/api/elderlyInfor'
  import { getDownGw, getServiceNum, getGwPoints, getGwMans, getUpGw } from '@/api/pensionAdvisor';
  import {
    getTrafficVolume,
    getAdviserCount,
    getAdviserSiteCount
  } from "@/api/consultant";
  export default {
    components:{Chart},
    name: "advLeft",
    data() {
      return {
        downAdv: [],
        olderNum: [],
        upAdv: [1, 4],
        upAdvNum: [],
        helpTabs: [{
          name: "顾问点区域分布",
          type: 1
        }, {
          name: "顾问员区域分布",
          type: 2
        }],
        helpTabsType: 1,
        operateOptions: {},
        optionHeight: "420px",
        operateOptionsTwo: {},
        streetOption: {},
        height: '480px',
        form: {
          areaCode: areaCode
        },
        orderForm: {
          town: "闵行区",
          flag: 0
        },
        streetArr: []
      }
    },
    mounted() {
      // this.getStreet();
      this.getDownGw();
      this.getAdviserCount();
      // this.getTrafficVolume();
      this.getGwPoints();
      this.getUpGw();
      this.getStreetList()
    },
    methods: {
      // 切换
      changeIt(type) {
        this.helpTabsType = type
        if (type === 1) {
          this.getGwPoints();
        } else {
          this.getGwMans()
        }
      },
      //街镇
      async getStreetList() {
        await this.getUpGwArea("江川路街道");
        await this.getUpGwArea("新虹街道");
        await this.getUpGwArea("古美街道");
        await this.getUpGwArea("浦锦街道");
        await this.getUpGwArea("新浦江镇");
        await this.getUpGwArea("吴泾镇");
        await this.getUpGwArea("马桥镇");
        await this.getUpGwArea("梅陇镇");
        await this.getUpGwArea("七宝镇");
        await this.getUpGwArea("虹桥镇");
        await this.getUpGwArea("莘庄工业区");
        await this.getUpGwArea("华漕镇");
        await this.getUpGwArea("颛桥镇");
        await this.getUpGwArea("莘庄镇");
        await this.getStreet();
      },
      getStreet(){
        return new Promise((resolve, reject) => {
            let xAxisData = []
            let seriesData = []
            let dataList = this.streetArr
            if(dataList&&dataList.length){
              dataList.forEach(item=>{
                xAxisData.push(item.key)
                // item.value = (item.value/10000).toFixed(2)
                seriesData.push(item.value)
              })
            }
            this.streetOption = {
              title:[
                {
                  text: '服务量区域分布',
                  left:'0%',
                  top:'10%',
                  textStyle: {
                    fontSize: 20,
                    color:'#fff',
                  }
                },
                {
                  text: '单位：通',
                  right: '0%',
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
                right: '0%',
                left: '6%',
                bottom: '5%'
              },
              xAxis: {
                type: 'category',
                color: '#59588D',
                data: xAxisData,
                axisLabel: {
                  margin: 10,
                  color: '#fff',
                  textStyle: {
                    fontSize: 12
                  },
                  interval: 0
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
                    fontSize: 18
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
                type: 'bar',
                data: seriesData,
                cursor: 'default',
                barWidth: '30px',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#50cef9' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#50cef9' // 100% 处的颜色
                    }], false),
                    barBorderRadius: [30, 30, 0, 0],
                  }
                }
              }]
            }
            // this.streetTypeOption={
            //   title:[
            //     {
            //       text: '服务分类统计',
            //       left:'0%',
            //       top:'10%',
            //       textStyle: {
            //         fontSize: 20,
            //         color:'#fff',
            //       }
            //     },
            //     {
            //       text: '单位：通',
            //       right: '0%',
            //       top: '12%',
            //       textStyle: {
            //         fontSize: 16,
            //         color:'#fff'
            //       }
            //     }
            //   ],
            //   tooltip: {
            //     trigger: 'item'
            //   },
            //   grid: {
            //     top: '20%',
            //     right: '0%',
            //     left: '5%',
            //     bottom: '5%'
            //   },
            //   xAxis: {
            //     type: 'category',
            //     color: '#59588D',
            //     data: xAxisData,
            //     axisLabel: {
            //       margin: 10,
            //       color: '#fff',
            //       textStyle: {
            //         fontSize: 12
            //       },
            //       interval: 0
            //       // rotate:-40
            //     },
            //     axisLine: {
            //       lineStyle: {
            //         color: '#fff',
            //       }
            //     },
            //     axisTick: {
            //       show: false
            //     },
            //   },
            //   yAxis: {
            //     color:"#fff",
            //     axisLabel: {
            //       color: '#fff',
            //       textStyle: {
            //         fontSize: 18
            //       },
            //     },
            //     axisLine: {
            //       show:false,
            //       lineStyle: {
            //         color: '#fff',
            //       }
            //     },
            //     axisTick: {
            //       show: false
            //     }
            //   },
            //   series: [{
            //     type: 'bar',
            //     data: seriesData,
            //     barWidth: '20px',
            //     itemStyle: {
            //       normal: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //           offset: 0,
            //           color: '#ffd535' // 0% 处的颜色
            //         }, {
            //           offset: 1,
            //           color: '#ffd535' // 100% 处的颜色
            //         }], false),
            //         barBorderRadius: [30, 30, 0, 0],
            //       }
            //     }
            //   }]
            // }
          resolve()
        })
      },
      // 綫下顾问点
      getDownGw() {
        getDownGw(this.form).then(res => {
          if (res.code === 0) {
            let data = String(res.data);
            let arr = data.split("");
            arr.forEach(item => {
              this.downAdv.push(item);
            });
            this.downAdv = [5, 8, 4]
          }
        });
      },
      // 线下顾问员
      getAdviserCount() {
        getServiceNum(this.form).then(res => {
          if (res.code === 0) {
            let data = String(res.data);
            let arr = data.split("");
            arr.forEach(item => {
              // this.olderNum.push(item);
              this.olderNum = [5,9,2,0]
            });
          }
        });
      },
      // 顾问点分布
      getGwPoints() {
        getGwPoints(this.form).then(res => {
          if (res.code === 0) {
            const oneNames = [];
            const oneVal = [];
            const twoNames = [];
            const twoVal = [];
            res.data.forEach((item, index) =>{
              if (index < 7) {
                oneNames.push(item.streetName);
                oneVal.push(item.number);
              } else {
                twoNames.push(item.streetName);
                twoVal.push(item.number);
              }
            });
            this.operateOptions = {
              color: ['#3e6591', '#eb7d22', '#d73f45'],
              grid: {
                left: '24%',
                top:10,
                bottom:30,
              },
              xAxis: {
                show: false,
                type: 'value',
                splitLine: {
                  show: false
                },
              },
              yAxis: [{
                axisTick: {
                  show: false,
                  alignWithLabel: false,
                  length: 5,
                },
                type: 'category',
                inverse: true,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#ffffff',
                  }
                },
                axisLabel:{
                  interval:0,
                  margin: 160,
                  textStyle: {
                    fontSize: 18,
                    align:'left'
                  },
                  formatter: function (v, index) {
                    let i = index + 1
                    return "{a|NO.0" + i + "} {b|" + v + "}"
                  },
                  rich: {
                    a: {
                      color: '#1cefe9',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                    b: {
                      color: '#ffffff',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                  }
                },
                splitLine: {
                  show: false
                },
                data: ['梅陇镇', '浦江镇', '七宝镇', '莘庄镇', '江川路街道', '古美路街道', '　颛桥镇']
              }],
              series: [{
                type: 'bar',
                color: '#13d9a3',
                cursor: 'default',
                data: [78, 76, 62, 56, 48, 42, 40],
                barGap:"70%",
                barWidth: 20,
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {color: '#ffe640'},
                    formatter: '{c}',
                    fontSize: 20
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderRadius: [30, 30, 30, 30],
                    color: function(params) {
                      var colorList = [
                        '#f9544a','#fc7a3c','#ffd535','#13d9a3'
                      ];
                      return colorList[params.dataIndex]
                    }
                  }
                }
              }]
            }
            this.operateOptionsTwo = {
              color: ['#3e6591', '#eb7d22', '#d73f45'],
              grid: {
                left: '22%',
                top:10,
                bottom:30,
              },
              xAxis: {
                show: false,
                max: 78,
                type: 'value',
                splitLine: {
                  show: false
                },
              },
              yAxis: [{
                axisTick: {
                  show: false,
                  alignWithLabel: false,
                  length: 5,
                },
                type: 'category',
                inverse: true,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#ffffff',
                  }
                },
                axisLabel:{
                  interval:0,
                  margin: 160,
                  textStyle: {
                    fontSize: 18,
                    align:'left'
                  },
                  formatter: function (v, index) {
                    let i = index + 8
                    if (i < 10) {
                      return "{a|NO.0" + i + "} {b|" + v + "}"
                    } else {
                      return "{a|NO." + i + "} {b|" + v + "}"
                    }
                  },
                  rich: {
                    a: {
                      color: '#1cefe9',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                    b: {
                      color: '#ffffff',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                  }
                },
                splitLine: {
                  show: false
                },
                data: ['浦锦街道', '虹桥镇', '华漕镇', '吴泾镇', '马桥镇', '新虹街道', '莘庄工业区']
              }],
              series: [{
                type: 'bar',
                color: '#13d9a3',
                cursor: 'default',
                data: [35, 35, 30, 27, 24, 20, 11],
                barGap:"70%",
                barWidth: 20,
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {color: '#ffe640'},
                    formatter: '{c}',
                    fontSize: 20
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderRadius: [30, 30, 30, 30]
                  }
                }
              }]
            }
          }
        })
      },
      // 顾问员分布
      getGwMans() {
        getGwMans(this.form).then(res => {
          if (res.code === 0) {
            const oneNames = [];
            const oneVal = [];
            const twoNames = [];
            const twoVal = [];
            res.data.forEach((item, index) =>{
              if (index < 7) {
                oneNames.push(item.streetName);
                oneVal.push(item.number);
              } else {
                twoNames.push(item.streetName);
                twoVal.push(item.number);
              }
            });
            this.operateOptions = {
              color: ['#3e6591', '#eb7d22', '#d73f45'],
              grid: {
                left: '24%',
                top:10,
                bottom:30,
              },
              xAxis: {
                show: false,
                type: 'value',
                splitLine: {
                  show: false
                },
              },
              yAxis: [{
                axisTick: {
                  show: false,
                  alignWithLabel: false,
                  length: 5,
                },
                type: 'category',
                inverse: true,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#ffffff',
                  }
                },
                axisLabel:{
                  interval:0,
                  margin: 160,
                  textStyle: {
                    fontSize: 18,
                    align:'left'
                  },
                  formatter: function (v, index) {
                    let i = index + 1
                    return "{a|NO.0" + i + "} {b|" + v + "}"
                  },
                  rich: {
                    a: {
                      color: '#1cefe9',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                    b: {
                      color: '#ffffff',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                  }
                },
                splitLine: {
                  show: false
                },
                data: oneNames
              }],
              series: [{
                type: 'bar',
                cursor: 'default',
                color: '#13d9a3',
                data: oneVal,
                barGap:"70%",
                barWidth: 20,
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {color: '#ffe640'},
                    formatter: '{c}',
                    fontSize: 20
                  }
                },
                itemStyle: {

                  normal: {
                    barBorderRadius: [30, 30, 30, 30],
                    color: function(params) {
                      var colorList = [
                        '#f9544a','#fc7a3c','#ffd535','#13d9a3'
                      ];
                      return colorList[params.dataIndex]
                    }
                  }
                }
              }]
            }
            this.operateOptionsTwo = {
              color: ['#3e6591', '#eb7d22', '#d73f45'],
              grid: {
                left: '22%',
                top:10,
                bottom:30,
              },
              xAxis: {
                show: false,
                max: 981,
                type: 'value',
                splitLine: {
                  show: false
                },
              },
              yAxis: [{
                axisTick: {
                  show: false,
                  alignWithLabel: false,
                  length: 5,
                },
                type: 'category',
                inverse: true,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#ffffff',
                  }
                },
                axisLabel:{
                  interval:0,
                  margin: 160,
                  textStyle: {
                    fontSize: 18,
                    align:'left'
                  },
                  formatter: function (v, index) {
                    let i = index + 8
                    if (i < 10) {
                      return "{a|NO.0" + i + "} {b|" + v + "}"
                    } else {
                      return "{a|NO." + i + "} {b|" + v + "}"
                    }
                  },
                  rich: {
                    a: {
                      color: '#1cefe9',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                    b: {
                      color: '#ffffff',
                      lineHeight: 10,
                      fontSize: 18,
                      align:'left'
                    },
                  }
                },
                splitLine: {
                  show: false
                },
                data: twoNames
              }],
              series: [{
                type: 'bar',
                cursor: 'default',
                color: '#13d9a3',
                data: twoVal,
                barGap:"70%",
                barWidth: 20,
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    textStyle: {color: '#ffe640'},
                    formatter: '{c}',
                    fontSize: 20
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderRadius: [30, 30, 30, 30]
                  }
                }
              }]
            }
          }
        })
      },
      // 线上服务量
      // getTrafficVolume() {
      //   getTrafficVolume(this.orderForm).then(res => {
      //     if (res.code === 0) {
      //       let data = String(res.data.trafficVolume);
      //       let arr = data.split("");
      //       arr.forEach(item => {
      //         this.upAdvNum.push(item);
      //       });
      //     }
      //   });
      // },
      // 线上顾问服务量
      getUpGw() {
        getUpGw({
          town: "闵行区"
        }).then(res =>{
          if (res.code === 0) {
            let data = String(res.data.trafficVolume);
            let arr = data.split("");
            arr.forEach(item => {
              this.upAdvNum.push(item);
            });
            this.upAdvNum = [1,3,8,3]
          }
        })
      },
      // 线上服务量区域分布
      getUpGwArea(area) {
        return new Promise((resolve, reject) => {
          getUpGw({
            area: area
          }).then(res =>{
            if (res.code === 0) {
              const data = {};
              data.key = area;
              data.value = res.data.trafficVolume;
              this.streetArr.push(data);
              resolve()
            } else {
              reject()
            }
          })
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .adv-left {
    width: 1472px;
    height: 1330px;
    float: left;

    .adv-help {
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

      .adv-base-data {
        width: 50%;
        float: left;
        margin-top: 20px;

        span {
          display: inline-block;
          vertical-align: middle;
        }

        .adv-base-data-num {
          width: 48px;
          height: 68px;
          border: 1px solid #18ede7;
          line-height: 70px;
          margin-right: 9px;
          font-size: 36px;
          text-align: center;
        }
      }
      .adv-tab {
        width: 100%;
        margin-top: 30px;
        .adv-tab-list {
          width: 50%;
          float: left;
          padding: 0 30px;
          font-size: 26px;
          cursor: pointer;
          letter-spacing: 3px;
        }
        .adv-tab-list:first-of-type {
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
      .adv-point {
        width: 100%;
        margin-top: 20px;
        .adv-point-list {
          width: 50%;
          display: inline-block;
        }
      }
    }
    .adv-love {
      position: relative;
      top: -2px;
    }
  }
</style>
