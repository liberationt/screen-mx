<template>
  <div class="home-right">
    <div class="home-per">
      <div class="inforTitle">
        <div class="inforTitleImg" @click="openShow" style="cursor: pointer">服务工单</div>
      </div>
      <div>
        <Chart :option="streetOption" :height="height"></Chart>
      </div>
    </div>
    <div class="home-per" style="margin-top: -2px">
      <div class="inforTitle">
        <div class="inforTitleImg" @click="openShopShow('310112000000')">服务商</div>
      </div>
      <div class="home-title">
        街镇分布
      </div>
      <div class="home-shop">
        <div class="home-shop-list" v-for="(item, index) in list" :key="index">
          <span>{{ item.value }}</span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <orderList v-if="isShow" :close="closeShow" ></orderList>
    <serviceOrder v-if="isShopShow" :close="closeShopShow" :code="code"></serviceOrder>
  </div>
</template>

<script>
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { areaCode } from '@/api/areaCode'
  import { getProjectOrderForRange, getProjectOrganForAssort } from "@/api/homeCare"
  import orderList from "./dailog/orderList";
  import serviceOrder from "./dailog/serviceOrder";
  export default {
    name: "homeRight",
    components: {
      Chart,
      orderList,
      serviceOrder
    },
    data() {
      return {
        height: "480px",
        streetOption: {},
        list: [],
        isShow: false,
        isShopShow: false,
        code: ''
      }
    },
    mounted() {
      this.getStreet()
      this.getProjectOrganForAssort()
    },
    methods: {
      openShopShow(row) {
        this.code = row
        this.isShopShow = true;
      },
      closeShopShow() {
        this.isShopShow = false;
      },
      openShow() {
        this.isShow = true;
      },
      closeShow() {
        this.isShow = false;
      },
      // 工单街镇
      getStreet(){
        getProjectOrderForRange({areaCode:areaCode}).then(res=>{
          if(res.code==0){
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
                  text: '单位：单',
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
                left: '5%',
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
                      color: '#13d9a3' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#13d9a3' // 100% 处的颜色
                    }], false),
                    barBorderRadius: [30, 30, 0, 0],
                  }
                }
              }]
            }
          }
        })
      },
      // 服务商街镇
      getProjectOrganForAssort() {
        getProjectOrganForAssort({
          areaCode:areaCode,
          sort: "asc"
        }).then(res =>{
          if (res.code === 0) {
            this.list = res.data;
            this.list.forEach((item, index) => {
              switch (item.name) {
                case '浦江镇':
                  this.list[index].value = 3
                  break
                case '吴泾镇':
                  this.list[index].value = 1
                  break
                case '马桥镇':
                  this.list[index].value = 1
                  break
                case '颛桥镇':
                  this.list[index].value = 1
                  break
                case '梅陇镇':
                  this.list[index].value = 1
                  break
                case '莘庄镇':
                  this.list[index].value = 1
                  break
                case '七宝镇':
                  this.list[index].value = 1
                  break
                case '虹桥镇':
                  this.list[index].value = 1
                  break
                case '华漕镇':
                  this.list[index].value = 1
                  break
                case '浦锦街道':
                  this.list[index].value = 1
                  break
                case '江川路街道':
                  this.list[index].value = 1
                  break
                case '古美街道':
                  this.list[index].value = 1
                  break
                case '新虹街道':
                  this.list[index].value = 1
                  break
                case '莘庄工业区':
                  this.list[index].value = 1
                  break
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .home-right {
    width: 1548px;
    height: 1150px;
    float: left;
    margin-left: -3px;
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
      .home-title {
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .home-shop {
        width: 100%;
        .home-shop-list {
          width: 14.28%;
          display: inline-block;
          border-left: 1px solid #1aa5ac;
          border-top: 1px solid #1aa5ac;
          border-bottom: 1px solid #1aa5ac;
          margin: 20px 0;
          height: 180px;
          span {
            text-align: center;
            display: inline-block;
            width: 100%;
          }
          span:first-of-type {
            height: 120px;
            line-height: 120px;
            color: #ffd535;
            font-size: 54px;
          }
          span:last-of-type {
            height: 58px;
            line-height: 58px;
            border-top: 1px solid #1aa5ac;
            background: #2f4e6e;
            font-size: 24px;
          }
        }
        .home-shop-list:nth-child(7n) {
          border-right: 1px solid #1aa5ac;
        }
      }
    }
  }
</style>
