<template>
  <div class="adv-right">
    <div class="adv-help">
      <div class="inforTitle" >
        <div class="inforTitleImg" style="cursor: inherit">服务统计</div>
      </div>
      <div style="width: 50%;float:left; padding-right: 30px;height: 600px;margin-top: -15px;border-right: 1px dashed #1cefe9">
        <Chart :option="streetOption" :height="height"/>
      </div>
      <div style="width: 50%;float:left; padding-left: 30px;margin-top: -15px">
        <Chart :option="streetOptionType" :height="height"/>
      </div>
    </div>
    <div class="adv-help adv-love">
      <div class="inforTitle" style="margin-bottom: 0">
        <div class="inforTitleImg" style="cursor: inherit">咨询信息</div>
      </div>
      <div class="adv-mes-list">
        <div class="adv-mes-list-title">咨询列表</div>
        <div class="adv-mes-list-qus">
          <div class="adv-mes-list-qus-item" v-for="(item, index) in recordList" :key="index">
            <div style="display: inline-block;vertical-align: top;height: 77px;line-height: 77px"><img src="../../../../assets/imgYu/wen.png" alt=""></div>
            <div style="display: inline-block;vertical-align: top;width: 620px;height: 77px;line-height: 77px;position: relative">
              <span>{{ item.visitingReason }}</span>
              <div class="fud">{{ item.visitingReason }}</div>
            </div>
          </div>
        </div>
        <div class="adv-mes-list-more" v-if="total > 6">
          <span @click="loadMore">加载更多</span>
        </div>
      </div>
      <div class="adv-mes-notes">
        <div class="adv-mes-list-title">咨询记录</div>
        <div>
          <Chart :option="notesOption" :height="notesHeight"></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import Chart from "@/components/Chart"
  import { getServiceAllNum } from '@/api/pensionAdvisor';
  import {areaCode} from '@/api/areaCode'
  import {
    getRecordList, getRecordWeek
  } from "@/api/consultant";
  export default {
    name: "advRight",
    components: {
      Chart
    },
    data() {
      return {
        streetOption: {
          title:[
            // {
            //   text: '服务量区域分布',
            //   left:'0%',
            //   top:'10%',
            //   textStyle: {
            //     fontSize: 20,
            //     color:'#fff',
            //   }
            // },
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
          // legend: {
          //   padding: 30,
          //   itemGap: 30,
          //   textStyle: {
          //     color: '#ffffff',
          //     fontSize: 14,
          //   },
          //   data: ["养老政策介绍", "提供个性化养老建议", "养老设施和资源介绍", "当场解决", "无法回复", "事后解决"],
          // },
          tooltip: {
            trigger: 'item'
          },
          grid: {
            top: '20%',
            right: '0%',
            left: '3%',
            bottom: '5%'
          },
          xAxis: {
            type: 'category',
            color: '#59588D',
            data: ["养老政策介绍", "提供个性化养老建议", "养老设施和资源介绍"],
            axisLabel: {
              margin: 10,
              color: '#fff',
              textStyle: {
                fontSize: 14
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
            cursor: 'default',
            type: 'bar',
            name: '养老政策介绍',
            data: [0,0,0],
            barWidth: '30px',
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#f9544a',
                barBorderRadius: [30, 30, 0, 0],
              }
            }
          }, {
            type: 'bar',
            name: '提供个性化养老建议',
            data: [0,0,0],
            barWidth: '30px',
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#fc7a3c',
                barBorderRadius: [30, 30, 0, 0],
              }
            }
          }, {
            type: 'bar',
            name: '养老设施和资源介绍',
            data: [0,0,0],
            barWidth: '30px',
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#50cef9',
                barBorderRadius: [30, 30, 0, 0],
              }
            }
          }]
        },
        streetOptionType: {},
        height: "580px",
        notesHeight: "610px",
        notesOption: {},
        recordList: [],
        total: 0,
        pageNum:1,
        lastPage:0,
      }
    },
    mounted() {
      this.getServiceAllNum();
      this.getRecordList();
      this.getRecordWeek();
    },
    methods: {
      getServiceAllNum() {
        getServiceAllNum({areaCode: areaCode}).then(res =>{
          if (res.code === 0) {
            const dataOne = [0, 0, 0];
            dataOne[0] = res.data.pension_policy;
            dataOne[1] = res.data.provide_bardian;
            dataOne[2] = res.data.introduction;
            this.streetOption = {
              title:[
                {
                  text: '服务分类',
                  left:'0%',
                  top:'5%',
                  textStyle: {
                    fontSize: 20,
                    color:'#fff',
                  }
                }
                // {
                //   text: '单位：人',
                //   right: '0%',
                //   top: '12%',
                //   textStyle: {
                //     fontSize: 16,
                //     color:'#fff'
                //   }
                // }
              ],
              // legend: {
              //   padding: 30,
              //   itemGap: 30,
              //   textStyle: {
              //     color: '#ffffff',
              //     fontSize: 14,
              //   },
              //   data: ["养老政策介绍", "提供个性化养老建议", "养老设施和资源介绍", "当场解决", "无法回复", "事后解决"],
              // },
              tooltip: {
                trigger: 'item'
              },
              grid: {
                top: '15%',
                right: '0%',
                left: '0%',
                bottom: '5%'
              },
              xAxis: {
                type: 'category',
                color: '#59588D',
                data: ["养老政策介绍", "提供个性化养老建议", "养老设施和资源介绍"],
                axisLabel: {
                  margin: 10,
                  color: '#fff',
                  textStyle: {
                    fontSize: 14
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
                cursor: 'default',
                type: 'bar',
                data: [68, 31, 18],
                barWidth: '30px',
                barGap: '-100%',
                itemStyle: {
                  normal: {
                    color: function(params) {
                      var colorList = [
                        '#f9544a','#fc7a3c','#50cef9'
                      ];
                      return colorList[params.dataIndex]
                    },
                    barBorderRadius: [30, 30, 0, 0],
                    label: {
                      show: true, //开启显示
                      position: 'top', //在上方显示
                      textStyle: { //数值样式
                        color: function(params) {
                          var colorList = [
                            '#f9544a','#fc7a3c','#50cef9'
                          ];
                          return colorList[params.dataIndex]
                        },
                        fontSize: 22
                      }
                    }
                  }
                }
              }]
            }
            const dataTwo = [112, 0, 5];
            // dataTwo[0] = 62;
            // dataTwo[1] = res.data.reply_you;
            // dataTwo[2] = res.data.wait_reply;
            this.streetOptionType = {
              title:[
                {
                  text: '结果统计',
                  left:'0%',
                  top:'5%',
                  textStyle: {
                    fontSize: 20,
                    color:'#fff',
                  }
                }
                // {
                //   text: '单位：人',
                //   right: '0%',
                //   top: '12%',
                //   textStyle: {
                //     fontSize: 16,
                //     color:'#fff'
                //   }
                // }
              ],
              // legend: {
              //   padding: 30,
              //   itemGap: 30,
              //   textStyle: {
              //     color: '#ffffff',
              //     fontSize: 14,
              //   },
              //   data: ["养老政策介绍", "提供个性化养老建议", "养老设施和资源介绍", "当场解决", "无法回复", "事后解决"],
              // },
              tooltip: {
                trigger: 'item'
              },
              grid: {
                top: '15%',
                right: '0%',
                left: '0%',
                bottom: '5%'
              },
              xAxis: {
                type: 'category',
                color: '#59588D',
                data: ["当场解决", "无法回复", "事后解决"],
                axisLabel: {
                  margin: 10,
                  color: '#fff',
                  textStyle: {
                    fontSize: 14
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
                cursor: 'default',
                type: 'bar',
                data: dataTwo,
                barWidth: '30px',
                barGap: '-100%',
                itemStyle: {
                  normal: {
                    color: function(params) {
                      var colorList = [
                        '#ffd535','#08fff8','#13d9a3'
                      ];
                      return colorList[params.dataIndex]
                    },
                    barBorderRadius: [30, 30, 0, 0],
                    label: {
                      show: true, //开启显示
                      position: 'top', //在上方显示
                      textStyle: { //数值样式
                        color: function(params) {
                          var colorList = [
                            '#ffd535','#08fff8','#13d9a3'
                          ];
                          return colorList[params.dataIndex]
                        },
                        fontSize: 22
                      }
                    }
                  }
                }
              }]
            }

          }
        })
      },
      getRecordList() {
        let data={
          areaCode: areaCode,
          pageNum:this.pageNum,
          pageSize:6
        };
        getRecordList(data).then(res => {
          if (res.code === 0) {
            this.recordList = res.data.list;
            this.total = res.data.total;
            this.lastPage = res.data.lastPage
          }
        });
      },
      loadMore(){
        if(this.lastPage === this.pageNum){
          this.pageNum=1
        }else{
          this.pageNum++
        }
        // this.pageNum++
        this.getRecordList()
      },
      getRecordWeek() {
        getRecordWeek({areaCode:areaCode}).then(res =>{
          if (res.code === 0) {
            const nameArr = [];
            const valArr = [];
            for (let i in res.data) {
              valArr.push(res.data[i]); //属性
              nameArr.push(i); //值
            }
            this.notesOption = {
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
                  text: '单位：次',
                  right: '2%',
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
                left: '5.5%',
                bottom: '19%'
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                color: '#59588D',
                data: nameArr,
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
                cursor: 'default',
                type: 'line',
                // data: valArr,
                data: [52, 13, 17 , 23 , 9, 2, 1],
                symbol: 'circle',     //设定为实心点
                symbolSize: 3,   //设定实心点的大小
                lineStyle: {
                  color: "#ffd535" ,
                },
                itemStyle: {
                  color: "#ffd535",
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
                      offset: 0, color: 'rgb(255, 213, 53, 1)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgb(255, 213, 53, 0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              }]
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.adv-right {
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
    .adv-mes-list {
      width: 50%;
      display: inline-block;
      height: 600px;
      border-right: 1px dashed #1be5e1;
      padding: 20px 30px 20px 0;
      vertical-align: top;
      .adv-mes-list-title {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1px;
      }
      .adv-mes-list-qus {
        width: 100%;
        height: 462px;
        .adv-mes-list-qus-item {
          width: 100%;
          height: 77px;
          line-height: 77px;
          border-bottom: 1px dashed #1be5e1;
          font-size: 22px;
          padding: 0 10px;
          span {
            width: 600px;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            vertical-align: top;
            margin-left: 10px;
          }
        }
      }
      .adv-mes-list-more {
        width: 100%;
        line-height: 80px;
        color: #1cefe9;
        text-align: center;
        font-size: 24px;
        span {
          cursor: pointer;
        }
      }
    }
    .adv-mes-notes {
      width: 50%;
      display: inline-block;
      height: 600px;
      padding: 20px 0 20px 30px;
      vertical-align: top;
      .adv-mes-list-title {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }
  }
  .adv-love {
    position: relative;
    top: -2px;
  }
  .fud {
    display: none;
    width: 98%;
    position: absolute;
    border: 1px solid #05fdfd;
    background: rgba(5, 253, 253, 0.2);
    padding: 5px 5px;
    border-radius: 5px;
    top: -60px;
    left: 40px;
    font-size: 18px;
  }
  .adv-mes-list-qus-item:hover {
    .fud {
      display: block;
    }
  }
}
</style>
