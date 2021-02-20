<template>
  <div class="wis-right">
    <div class="inforTitle">
      <div class="inforTitleImg" style="cursor: inherit">生活服务</div>
    </div>
    <div class="wis-base-data">
      <span class="font26">服务工单数（单）</span>
      <span class="wis-base-data-num orangeColor" v-for="(item, index) in orderNum" :key="item + index" @click="openLifeDailog" style="cursor: pointer">{{ item }}</span>
    </div>
    <div class="wis-base-data">
      <span class="font26">服务老人数（人）</span>
      <span class="wis-base-data-num orangeColor" v-for="(item, index) in orderOldNum" :key="item + index" @click="openLifeOlderDailog" style="cursor: pointer">{{ item }}</span>
    </div>
    <div style="clear: both"></div>
    <div style="width: 100%;">
      <Chart :option="streetOption" :height="height"/>
    </div>
    <div style="width: 100%;">
      <Chart :option="streetTypeOption" :height="height"/>
    </div>
    <liftServiceList v-if="isLifeShow" :close="closeLifeDailog" ></liftServiceList>
    <lifeOlderList v-if="isLifeOlderShow" :close="closeLifeOlderDailog" ></lifeOlderList>
  </div>
</template>

<script>
  import {areaCode} from '@/api/areaCode'
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { getStreetNumber } from '@/api/elderlyInfor'
  import {
    getMarket, getType, getServiceStreet
  } from "@/api/wisdom";
  import liftServiceList from "./dailog/liftServiceList";
  import lifeOlderList from "./dailog/lifeOlderList";
  export default {
    components: { Chart,liftServiceList,
      lifeOlderList },
    name: "wisRight",
    data() {
      return {
        orderNum: [],
        orderOldNum: [],
        height:'570px',
        streetOption: {},
        streetTypeOption: {},
        orderForm: {
          town: "闵行区",
          flag: 0
        },
        typeArr: [],
        streetArr: [],
        isLifeShow: false,
        isLifeOlderShow: false
      }
    },
    mounted() {
      this.getStreetList();
      this.getMarket();
      this.serviceList();
    },
    methods: {
      openLifeOlderDailog() {
        this.isLifeOlderShow = true
      },
      closeLifeOlderDailog() {
        this.isLifeOlderShow = false
      },
      openLifeDailog() {
        this.isLifeShow = true
      },
      closeLifeDailog() {
        this.isLifeShow = false
      },
      //街镇
      async getStreetList() {
        await this.getServiceStreet("新浦江镇");
        await this.getServiceStreet("吴泾镇");
        await this.getServiceStreet("马桥镇");
        await this.getServiceStreet("颛桥镇");
        await this.getServiceStreet("梅陇镇");
        await this.getServiceStreet("莘庄镇");
        await this.getServiceStreet("七宝镇");
        await this.getServiceStreet("虹桥镇");
        await this.getServiceStreet("华漕镇");
        await this.getServiceStreet("浦锦街道");
        await this.getServiceStreet("江川路街道");
        await this.getServiceStreet("古美街道");
        await this.getServiceStreet("新虹街道");
        await this.getServiceStreet("莘庄工业区");
        await this.getStreet();
      },
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
              {
                text: '服务老人街镇分布',
                left:'0%',
                top:'10%',
                textStyle: {
                  fontSize: 20,
                  color:'#fff',
                }
              },
              {
                text: '单位：人',
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
              left: '2.8%',
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
                    color: '#f9544a' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#f9544a' // 100% 处的颜色
                  }], false),
                  barBorderRadius: [30, 30, 0, 0],
                }
              }
            }]
          }
          resolve()
        })
      },
      getServiceStreet(area) {
        return new Promise((resolve, reject) => {
          getServiceStreet({
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
      getTypeList() {
        return new Promise((resolve, reject) => {
          let xAxisData = [];
          let seriesData = [];
          let dataList = this.typeArr;
          if(dataList&&dataList.length){
            dataList.forEach(item=>{
              xAxisData.push(item.key);
              seriesData.push(item.value)
            })
          }
          this.streetTypeOption = {
            title:[
              {
                text: '服务分类统计',
                left:'0%',
                top:'10%',
                textStyle: {
                  fontSize: 20,
                  color:'#fff',
                }
              },
              {
                text: '单位：人',
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
              left: '2.5%',
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
                    color: '#dab62c' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#dab62c' // 100% 处的颜色
                  }], false),
                  barBorderRadius: [30, 30, 0, 0],
                }
              }
            }]
          }
          resolve()
        })
      },
      getType(name) {
        return new Promise((resolve, reject) => {
          getType({
            town: "闵行区",
            name: name,
            flag: 0
          }).then(res =>{
            if(res.code==0){
              const data = {};
              data.key = name;
              data.value = res.data.statistics;
              this.typeArr.push(data);
              resolve()
            } else {
              reject()
            }
          })
        })
      },
      async serviceList() {
        await this.getType("医疗健康");
        await this.getType("家电维修");
        await this.getType("开锁修锁");
        await this.getType("家政保洁");
        await this.getType("房屋维修");
        await this.getType("爬楼机预约");
        await this.getType("公共事业保修");
        await this.getType("代叫代办");
        await this.getType("理发服务");
        await this.getType("家庭保洁");
        await this.getType("衣被清洗");
        await this.getType("订单");
        await this.getType("居家护理");
        await this.getType("居家养老");
        await this.getTypeList();
      },
      getMarket() {
        getMarket(this.orderForm).then(res => {
          if (res.code === 0) {
            if (res.data) {
              let data = String(res.data.orderCount);
              let arr = data.split("");
              arr.forEach(item => {
                this.orderNum.push(item);
              });
              let datas = String(res.data.peopleCount);
              let arrs = datas.split("");
              arrs.forEach(item => {
                this.orderOldNum.push(item);
              });
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.wis-right {
  width: 1542px;
  height: 1330px;
  float: left;
  background: url("../../../../assets/imgYu/con_bg2.png") center no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
  margin: 0 45px;
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
}
</style>
