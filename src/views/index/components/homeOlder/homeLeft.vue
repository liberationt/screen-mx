<template>
  <div class="home-left">
    <div class="home-per">
      <div class="inforTitle">
        <div class="inforTitleImg" @click="openManShow" style="cursor: pointer">服务人员</div>
      </div>
      <div>
        <Chart :option="streetOption" :height="height"></Chart>
      </div>
    </div>
    <div class="home-per" style="margin-top: -2px">
      <div class="inforTitle">
        <div class="inforTitleImg" style="cursor: inherit">服务类型</div>
      </div>
      <div class="home-type">
        <Chart :option="typeOption" :height="typeHeight"></Chart>
      </div>
      <div class="home-type">
        <Chart :option="typeOptionTwo" :height="typeHeight"></Chart>
      </div>
    </div>
    <serviceManList v-if="isManShow" :close="closeManShow"></serviceManList>
  </div>
</template>

<script>
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { getStreetNumber } from '@/api/elderlyInfor'
  import { areaCode } from '@/api/areaCode'
  import { getServiceStreetNum, getProjectHot } from "@/api/homeCare"
  import serviceManList from "./dailog/serviceManList";
  export default {
    name: "person",
    components: {
      Chart,
      serviceManList
    },
    data() {
      return {
        isManShow: false,
        height: "480px",
        streetOption: {},
        typeHeight: "520px",
        typeOption: {},
        typeOptionTwo: {}
      }
    },
    mounted() {
      this.getStreet();
      this.getProjectHot();
    },
    methods: {
      openManShow() {
        this.isManShow = true;
      },
      closeManShow() {
        this.isManShow = false;
      },
      //街镇
      getStreet(){
        getServiceStreetNum({areaCode:areaCode}).then(res=>{
          if(res.code === 0){
            let xAxisData = []
            let seriesData = []
            let dataList = res.data
            if(dataList&&dataList.length){
              dataList.forEach(item=>{
                xAxisData.push(item.name)
                // item.value = (item.value/10000).toFixed(2)
                seriesData.push(item.value)
              })
            }
            this.streetOption={
              title:[
                {
                  text: '街镇分布',
                  left:'0%',
                  top:'1%',
                  textStyle: {
                    fontSize: 20,
                    color:'#fff',
                  }
                },
                {
                  text: '单位：人',
                  right: '0%',
                  top: '5%',
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
                right: '0%',
                left: '3.5%',
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
                cursor: 'default',
                type: 'bar',
                data: seriesData,
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
          }
        })
      },
      // 热度
      getProjectHot() {
        getProjectHot({
          areaCode:areaCode,
          sort: "desc"
        }).then(res=>{
          if(res.code === 0){
            const oneNames = [];
            const oneVal = [];
            const twoNames = [];
            const twoVal = [];
            res.data.forEach((item, index) =>{
              if (index < 6) {
                oneNames.push(item.xmCode);
                oneVal.push(item.count);
              } else {
                twoNames.push(item.xmCode);
                twoVal.push(item.count);
              }
            });
            this.typeOption = {
              title:[
                {
                  text: '服务项目热度排名',
                  left:'0%',
                  top:'2%',
                  textStyle: {
                    fontSize: 20,
                    color:'#fff',
                  }
                }
              ],
              color: ['#3e6591', '#eb7d22', '#d73f45'],
              grid: {
                left: '18.5%',
                top:40,
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
                  margin: 140,
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
                cursor: 'default',
                type: 'bar',
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
            };
            this.typeOptionTwo = {
              title:[
                {
                  text: '单位：人',
                  right: '0%',
                  top: '5%',
                  textStyle: {
                    fontSize: 16,
                    color:'#fff'
                  }
                }
              ],
              color: ['#3e6591', '#eb7d22', '#d73f45'],
              grid: {
                left: '22%',
                top:40,
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
                  margin: 140,
                  textStyle: {
                    fontSize: 18,
                    align:'left'
                  },
                  formatter: function (v, index) {
                    let i = index + 7
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
                color: '#13d9a3',
                cursor: 'default',
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
            };
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.home-left {
  width: 1548px;
  height: 1150px;
  float: left;
  .home-per {
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
    .home-type {
      width: 50%;
      float: left;
    }
  }
}
</style>
