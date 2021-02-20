<template>
  <div class="long-width my-width">
<!--    <div class="olderMap-title">-->
<!--      <span-->
<!--        v-for="(item, index) in tabs"-->
<!--        :key="index"-->
<!--        :class="[isTab === item.type ? 'choose-tab' : '']"-->
<!--        @click="changeTab(item.type)"-->
<!--      >-->
<!--        {{ item.name }}-->
<!--      </span>-->
<!--    </div>-->
    <div v-show="isTab === 'mes'" class="older">
      <div class="older-num">
        <p>老人总数（人）</p>
        <span @click="openIt">39323</span>
      </div>
      <div class="older-per">
        <div>
          <span class="older-per-title">老龄化</span>
          <span class="older-per-num">31.65%</span>
        </div>
        <div>
          <span class="older-per-title">男</span>
          <span class="older-per-num-blue">{{men}}</span>
          <span class="older-per-num-blue">283082</span>
          <span class="older-per-title">女</span>
          <span class="older-per-num-blue">{{women}}</span>
          <span class="older-per-num-blue">304966</span>
        </div>
      </div>
      <div class="older-tab">
        <span
            v-for="(item, index) in olderTabs"
            :key="index"
            :class="[isOlderTab === item.type ? 'choose-older-tab' : '']"
            @click="changeOlderTab(item.type)"
        >
        {{ item.name }}
      </span>
      </div>
      <div style="float: left;width: 98%; overflow: hidden">
        <span v-if="isOlderTab === 'jw'" style="display: inline-block;width: 100%">
           <ve-histogram
               :data="chartData"
               :settings="chartSettings"
               :extend="chartExtend"
               :xAxis="xAxis"
               :yAxis="yAxis"
               :height="'305px'"
               :legend-visible="false"
               :data-zoom="dataZoom"
               :colors="colorType"
           ></ve-histogram>
        </span>
        <span v-if="isOlderTab === 'age'">
          <ve-line
              :data="chartDataAge"
              :settings="chartSettingsAge"
              :xAxis="xAxisAge"
              :yAxis="yAxisAge"
              :height="'300px'"
              :extend="chartExtendAge"
              :legend-visible="false"
              :colors="['#00c9fc']"
          ></ve-line>
        </span>
        <span v-if="isOlderTab === 'older'">
          <ve-histogram
              :data="chartDataOlder"
              :settings="chartSettingsOlder"
              :extend="chartExtendOlder"
              :xAxis="xAxisOlder"
              :yAxis="yAxisOlder"
              :height="'305px'"
              :legend-visible="false"
              :colors="colorType"
          ></ve-histogram>
        </span>
      </div>
    </div>
    <div class="jc-map">
      <div class="map" v-show="isTab === 'map'">
        <div id="container" style="width:100%; height:100%" v-show="isTab === 'map'"></div>

      </div>
    </div>
    <baseDataList :close="closeIt" v-if="isShow"></baseDataList>
    <jgDetail :close="closeJg" v-if="isJgShow" :id="olderListId"></jgDetail>
    <div class="maskToast" v-show="isMapShow">
      <div class="map-pic">
        <div class="map-pic-bd">
          <div class="map-close" @click="closeMap"><img src="../../../assets/images/close.png" alt=""></div>
          <div class="map-point map-one" style="left: 535px; top:210px">
            <div class="map-point-list">
              <img src="../../../assets/images/zzzh.png" alt="">
            </div>
            <div class="map-point-list list-one">
              <p>功能： </p>
              <p>认知症照护专区</p>
            </div>
          </div>
          <div class="map-point map-two" style="left: 860px; top:16px">
            <div class="map-point-list">
              <img src="../../../assets/images/zhwl.png" alt="">
            </div>
            <div class="map-point-list list-two map-word">
              <p>功能： </p>
              <p>街道智慧平台</p>
              <p>社区医疗站</p>
              <p>社区护理站</p>
              <p>社区康复站</p>
              <p>辅具租赁点</p>
            </div>
          </div>
          <div class="map-point map-three" style="left: 165px; top:550px">
            <div class="map-point-list">
              <img src="../../../assets/images/lnhd.png" alt="">
            </div>
            <div class="map-point-list list-three">
              <p>功能： </p>
              <p>智能健康小屋</p>
              <p>体医乐活空间</p>
              <p>便民生活服务</p>
              <p>综合文体娱乐</p>
              <p>居家照护支援</p>
            </div>
          </div>
          <div class="map-point map-four" style="left: 920px; top:455px">
            <div class="map-point-list">
              <img src="../../../assets/images/sqst.png" alt="">
            </div>
            <div class="map-point-list list-four">
              <p>功能： </p>
              <p>健康饮食文化传播</p>
              <p>代际融合平台</p>
            </div>
          </div>
          <div class="map-point map-five" style="left: 820px; top:735px">
            <div class="map-point-list">
              <img src="../../../assets/images/xqgc.png" alt="">
            </div>
            <div class="map-point-list list-five">
              <p>功能： </p>
              <p>社区融合平台</p>
              <p>孝亲敬老宣传</p>
              <p>江川文化宣传</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { olderNum, sexIs, ageRange, committeeRange } from "@/api/olderNum";
  import baseDataList from '../secondScreen/baseData/baseDataList'
  import areaCode from '@/api/areaCode'
  import latitudeArray from '@/api/latitude'
  import dataList from '../secondScreen/json/older.json'
  import olderList from '../secondScreen/json/olderType.json'
  import AMap from "AMap";
  import AMapUI from "AMapUI";
  import { getMapList, getMapLife } from "@/api/map";
  import yljg from "@/assets/images/yljg_map.png";
  import hlz from "@/assets/images/hlz_map.png";
  import sqylzz from "@/assets/images/sqzz_map.png";
  import zhwlfwzx from "@/assets/images/wlfw_map.png";
  import lnhds from "@/assets/images/hds_map.png";
  import rjzhjg from "@/assets/images/rjzh_map.png";
  import zcd from "@/assets/images/zcd_map.png";
  import jgDetail from "../secondScreen/baseData/jgDetail"
  export default {
    name: "elderMap",
    components: {
      baseDataList,
      jgDetail
    },
    data() {
      return {
        isMapShow: false,
        isLong: null,
        isMove: true,
        men: 0,
        women: 0,
        isTab: 'map',
        isOlderTab: 'jw',
        tabs: [
          {
            name: '老人信息',
            type: 'mes',
          },{
            name: '养老地图',
            type: 'map',
          }
        ],
        olderTabs: [
          {
            name: '居委分布',
            type: 'jw',
          },{
            name: '年龄分布',
            type: 'age',
          },{
            name: '老人分类',
            type: 'older',
          }
        ],
        colorType: ["#01a9ff"],
        // 居委
        chartSettings: {},
        chartExtend: {},
        yAxis: {},
        xAxis: {},
        dataZoom: [{
          type: 'slider',
          show: false,
          start: 0,
          end: 40,
          handleSize: 8
        },
          {
            type: 'inside',
            start: 0,
            end: 40
          }
        ],
        chartData: {
          columns: ["年龄", "老人数量"],
          rows: []
        },
        // older
        chartSettingsOlder: {},
        chartExtendOlder: {},
        yAxisOlder: {},
        xAxisOlder: {},
        chartDataOlder: {
          columns: ["年龄", "老人数量"],
          rows: []
        },
        // age
        chartSettingsAge: {},
        chartExtendAge: {},
        yAxisAge: {},
        xAxisAge: {},
        chartDataAge: {
          columns: ["年龄", "老人数量"],
          rows: []
        },
        form: {
          areaCode: areaCode.areaCode
        },
        isShow: false,
        isJgShow: false,
        olderListId: '',
        // 地图
        isLife: true,
        list: [
          {
            name: "养老机构",
            type: "yljg"
          },
          {
            name: "护理站",
            type: "hlz"
          },
          {
            name: "社区养老组织",
            type: "sqylzz"
          },
          {
            name: "综合为老服务中心" ,
            type: "zhwlfwzx"
          },
          {
            name: "老年活动室",
            type: "lnhds"
          },
          {
            name: "日间照护机构",
            type: "rjzhjg"
          },
          {
            name: "助餐点",
            type: "zcd"
          }
        ],
        map: '',
        centerCo: [],
        posArr: [],
        pointOne: [],
        pointTwo: [],
        beiArr: [], // 备用
        Zero:'',
        typeColor: '',
        isSecond: false,
        hospArr: []
      }
    },
    mounted() {
      this.committeeRange();
      this.getSexIs();
      this.getData()
      this.mapList();
    },
    methods: {
      openMap() {
        this.isMapShow = true
      },
      closeMap() {
        this.isMapShow = false
      },
      enter(){
        this.isLong = true;
        // if (this.isMove === true) {
        //   this.isMove = false;
        //
        //   setTimeout(() => {
        //     this.isMove = true;
        //   }, 500)
        // }
      },
      leave(){
        this.isLong = false;
        // if (this.isMove === true) {
        //   this.isMove = false;
        //   this.isLong = false;
        //   setTimeout(() => {
        //     this.isMove = true;
        //   }, 500)
        // }
      },
      openIt() {
        this.isShow = true
      },
      closeIt() {
        this.isShow = false
      },
      openJg() {
        this.isJgShow = true
      },
      closeJg() {
        this.isJgShow = false
      },
      changeTab(type) {
        this.isTab = type
        if (this.isTab === 'mes') {
          this.isLong = null
        }
      },
      changeOlderTab(type) {
        this.isOlderTab = type
        if (this.isOlderTab === 'age') {
          this.ageRange();
        } else if (this.isOlderTab === 'jw') {
          this.committeeRange();
        } else if (this.isOlderTab === 'older') {
          this.olderRange();
        }
      },
      olderRange() {
        this.isBtn = false;
        this.colorType[0] = "#ffba10";
        this.chartDataOlder.rows = [];
        this.chartSettingsOlder = {
          metrics: ["老人数量"],
          dimension: ["类别"],
          yAxisName: ["（人）"],
          legendName: {
            老人数量: ""
          }
        };
        this.chartExtendOlder = {
          'series.0.barWidth': 40,
          "series.0.itemStyle.color": {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#00c9fc" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0095e9" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        };
        this.yAxisOlder = [
          {
            name: "（人）",
            textStyle: {
              color: "#ffffff"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ffffff"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ffffff"
              }
            }
          }
        ];
        this.xAxisOlder = [
          {
            data: [],
            axisLabel: {
              interval: 0,
              show: true,
              textStyle: {
                color: "#ffffff"
              }
            }
          }
        ];
        olderList.olderType.forEach((item, index) => {
          this.xAxisOlder[0].data.push(item.key.replace("类别", ""));
          const data = {};
          data["类别"] = item.key;
          data["老人数量"] = item.value;
          this.chartDataOlder.rows.push(data);
        });
        this.isBtn = true;
        // committeeRange(this.form).then(res => {
        //   if (res) {
        //
        //   }
        // });
      },
      committeeRange() {
        this.isBtn = false;
        this.colorType[0] = "#ffba10";
        this.chartData.rows = [];
        this.chartSettings = {
          metrics: ["老人数量"],
          dimension: ["居委会"],
          yAxisName: ["（人）"],
          legendName: {
            老人数量: ""
          }
        };
        this.chartExtend = {
          'series.0.barWidth': 28,
          "series.0.itemStyle.color": {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#00c9fc" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0095e9" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        };
        this.yAxis = [
          {
            name: "（人）",
            textStyle: {
              color: "#ffffff"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ffffff"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ffffff"
              }
            }
          }
        ];
        this.xAxis = [
          {
            data: [],
            axisLabel: {
              show: true,
              rotate:50 ,
              textStyle: {
                color: "#ffffff"
              }
            }
          }
        ];
        dataList.jw.forEach((item, index) => {
          this.xAxis[0].data.push(item.key.replace("居委会", ""));
          const data = {};
          data["居委会"] = item.key;
          data["老人数量"] = item.value;
          this.chartData.rows.push(data);
        });
        this.isBtn = true;
        // committeeRange(this.form).then(res => {
        //   if (res) {
        //
        //   }
        // });
      },
      ageRange() {
        this.isBtn = false;
        ageRange(this.form).then(res => {
          if (res.code === 0) {
            // this.colorTypeAge[0] = "#01a9ff";
            this.chartDataAge.rows = [];
            this.chartSettingsAge = {
              metrics: ["老人数量"],
              dimension: ["年龄"],
              yAxisName: ["（人）"],
              legendName: {
                老人数量: ""
              }
            };
            this.chartExtendAge = {
              series: {
                smooth: false, //这个是把线变成曲线
                itemStyle: {
                  normal: {
                    color: "#00c9fc",
                    borderColor: "#00c9fc",
                    areaStyle: {
                      type: "default",
                      opacity: 0.3
                    }
                  }
                }
              }
            };
            this.yAxisAge = [
              {
                name: "（人）",
                textStyle: {
                  color: "#ffffff"
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#ffffff"
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#ffffff"
                  }
                }
              }
            ];
            this.xAxisAge = [
              {
                boundaryGap: false,
                data: [],
                axisLabel: {
                  interval: 0,
                  show: true,
                  textStyle: {
                    color: "#ffffff"
                  }
                }
              }
            ];
            res.data.forEach((item, index) => {
              const data = {};
              if (index === 8) {
                this.xAxisAge[0].data.push(item.key + "              ");
                data["年龄"] = item.key + "              ";
              } else {
                data["年龄"] = item.key;
                this.xAxisAge[0].data.push(item.key);
              }
              data["老人数量"] = item.value;
              this.chartDataAge.rows.push(data);
            });
            this.isBtn = true;
          }
        });
      },
      getSexIs() {
        sexIs(this.form).then(res => {
          if (res.code === 0) {
            this.men = res.data.men;
            this.women = res.data.women;
          }
        });
      },
      async getData() {
        await this.mapList();
        await this.init();
      },
      init() {
        return new Promise((resolve, reject) => {
          var map = new AMap.Map("container", {
            center: this.centerCo,
            resizeEnable: true,
            zoom: 16,
            scrollWheel: true,
            mapStyle: "amap://styles/3d915d095fc95c2112f17c5c5122f446"
          });


          //// 区划down
          var district = null;
          var polygons=[];
          function drawBounds() {
            //加载行政区划插件
            if(!district){
              //实例化DistrictSearch
              var opts = {
                subdistrict: 0,   //获取边界不需要返回下级行政区
                extensions: 'all',  //返回行政区边界坐标组等具体信息
                level: 'district'  //查询行政级别为 市
              };
              district = new AMap.DistrictSearch(opts);
            }
            //行政区查询
            district.setLevel("district")
            district.search("闵行区", function(status, result) {
              map.remove(polygons)//清除上次结果
              polygons = [];
              var bounds = result.districtList[0].boundaries;
              if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                  //生成行政区划polygon
                  var polygon = new AMap.Polygon({
                    strokeWeight: 5,
                    path: bounds[i],
                    // fillOpacity: 0.1,
                    // fillColor: '#000000',
                    strokeColor: '#19ffff'
                  });
                  polygons.push(polygon);
                }
              }
              map.add(polygons)
              map.setFitView(polygons);//视口自适应
            });
          }
          drawBounds();
          latitudeArray.latitudeArray.forEach(item =>{
            let data = new AMap.Polygon({
              path: item.list,
              strokeColor: "#0bdaff",
              strokeWeight: 3,
              strokeOpacity: 0.2,
              fillOpacity: 1,
              fillColor: '#2b29ff',
              zIndex: 50,
            })
            map.add(data)
            // 缩放地图到合适的视野级别
            map.setFitView([ data ])
            let text = new AMap.Text({
              text: item.name,
              anchor:'center', // 设置文本标记锚点
              draggable: false,
              cursor:'pointer',
              angle:10,
              style:{
                'padding': '.55rem 0.75rem',
                'margin-bottom': '1rem',
                'border-radius': '.25rem',
                'background-color': ' rgba(114, 124, 245, 0.3)',
                'width': '10rem',
                'border-width': 0,
                'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                'text-align': 'center',
                'font-size': '16px',
                'color': 'yellow'
              },
              position: item.center
            });

            text.setMap(map);
          })

          // var path = latitudeArray.latitudeArray[0].list
          //
          //
          // var polygon = new AMap.Polygon({
          //   path: path,
          //   strokeColor: "#ff0000",
          //   strokeWeight: 4,
          //   strokeOpacity: 0.2,
          //   fillOpacity: 0.4,
          //   fillColor: '#ffffff',
          //   zIndex: 50,
          // })

          // map.add(polygon)
          // // 缩放地图到合适的视野级别
          // map.setFitView([ polygon ])

          //// 区划up

          //
          // function showInfoClick(){
          //   closeInfoWindow()
          // }
          // map.on('click', showInfoClick);
          // this.posArr.forEach(item => {
          //   const marker = new AMap.Marker({
          //     map: map,
          //     icon: item.type,
          //     offset: new AMap.Pixel(-5, -50),
          //     position: new AMap.LngLat(item.arr[0], item.arr[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //     title: "江川"
          //   });
          //   AMap.event.addListener(marker, 'click', function () {
          //     infoWindow.open(map, marker.getPosition());
          //   });
          //   var title = '',
          //     contents = [];
          //   var data = `<div style='padding: 3px 10px;font-size: 14px;height: 25px' onclick="closeIt('${item.id}')">机构名称：${item.name}</div>`;
          //   contents.push(data);
          //   contents.push("<div style='padding: 3px 10px; font-size: 14px;height: 25px'>咨询电话：" + item.phone + "</div>");
          //   contents.push("<div style='padding: 3px 10px; font-size: 14px;height: 40px'>详细地址：" + item.address + "</div>");
          //   var infoWindow = new AMap.InfoWindow({
          //     isCustom: true, //使用自定义窗体
          //     content: createInfoWindow(title, contents.join("")),
          //     offset: new AMap.Pixel(16, -45)
          //   });
          // });
          // this.posArr = JSON.parse(JSON.stringify(this.beiArr));
          // window['closeIt'] = (val, vals) => {
          //   this.myCloseIt(val, vals)
          // }
          // //构建自定义信息窗体
          // function createInfoWindow(title, content) {
          //   var info = document.createElement("div");
          //   info.className = "custom-info input-card content-window-card";
          //
          //   //可以通过下面的方式修改自定义窗体的宽高
          //   //info.style.width = "400px";
          //   // 定义顶部标题
          //
          //   // 定义中部内容
          //   var middle = document.createElement("div");
          //   middle.className = "info-middle";
          //   middle.innerHTML = content;
          //   info.appendChild(middle);
          //   return info;
          // }
          //
          // //关闭信息窗体
          // function closeInfoWindow() {
          //   map.clearInfoWindow();
          // }
          this.map = map
        });
      },
      mapList() {
        return new Promise((resolve, reject) => {
          getMapList(this.form).then(res => {
            if (res) {
              this.centerCo[0] = res.data.centerPosition.longitude;
              this.centerCo[1] = res.data.centerPosition.latitude;
              res.data.list.forEach((item, index) => {
                const data = {};
                if (item.longitude !== null && item.latitude !== null) {
                  data.arr = [item.longitude, item.latitude];
                  data.name = item.org_name;
                  data.address = item.addr;
                  data.phone = item.phone;
                  data.id = item.org_id;
                  switch (item.org_type) {
                    case "1010":
                      data.type = yljg;
                      data.color = "yljg";
                      break;
                    case "2016":
                      data.type = hlz;
                      data.color = "hlz";
                      break;
                    case "2017":
                      data.type = sqylzz;
                      data.color = "sqylzz";
                      break;
                    case "2011":
                      data.type = zhwlfwzx;
                      data.color = "zhwlfwzx";
                      break;
                    case "2013":
                      data.type = lnhds;
                      data.color = "lnhds";
                      break;
                    case "2010":
                      data.type = rjzhjg;
                      data.color = "rjzhjg";
                      break;
                    case "2014":
                      data.type = zcd;
                      data.color = "zcd";
                      break;
                  }
                  this.posArr.push(data);
                }
              })
              this.beiArr = JSON.parse(JSON.stringify(this.posArr));
              resolve();
            }
          });
        });
      },
      changePoint(type) {
        this.typeColor = type;
        var map = this.map;
        this.map.clearMap();
        this.posArr = JSON.parse(JSON.stringify(this.beiArr));
        const arr = [];
        this.posArr.forEach(item => {
          if (item.color === type) {
            arr.push(item);
          }
        });
        this.posArr = arr;
        let arrs = JSON.parse(JSON.stringify(this.posArr));
        arrs.forEach(item => {
          const marker = new AMap.Marker({
            map: map,
            icon: item.type,
            offset: new AMap.Pixel(-10, -50),
            position: new AMap.LngLat(item.arr[0], item.arr[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "江川"
          });
          AMap.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker.getPosition());
          });
          var title = '',
            contents = [];
          var data = `<div style='padding: 3px 10px;font-size: 14px;height: 25px' onclick="closeIt('${item.id}')">机构名称：${item.name}</div>`;
          contents.push(data);
          contents.push("<div style='padding: 3px 10px; font-size: 14px;height: 25px'>咨询电话：" + item.phone + "</div>");
          contents.push("<div style='padding: 3px 10px; font-size: 14px;height: 40px'>详细地址：" + item.address + "</div>");
          var infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: createInfoWindow(title, contents.join("")),
            offset: new AMap.Pixel(16, -45)
          });
        });
        window['closeIt'] = (val, vals) => {
          this.myCloseIt(val, vals)
        }
        //构建自定义信息窗体
        function createInfoWindow(title, content) {
          var info = document.createElement("div");
          info.className = "custom-info input-card content-window-card";

          //可以通过下面的方式修改自定义窗体的宽高
          //info.style.width = "400px";
          // 定义顶部标题

          // 定义中部内容
          var middle = document.createElement("div");
          middle.className = "info-middle";
          middle.innerHTML = content;
          info.appendChild(middle);


          return info;
        }

        //关闭信息窗体
        function closeInfoWindow() {
          map.clearInfoWindow();
        }

      },
      mapLife() {
        getStation(this.form).then(res => {
          if (res) {
            res.data.forEach((item, index) => {
              const data = {};
              if (item.longitude !== null && item.latitude !== null) {
                data.arr = [item.longitude, item.latitude];
                data.name = item.name;
                data.address = item.address;
                data.phone = item.phone == null ? "" : item.phone;
                data.id = item.id;
                this.hospArr.push(data);
              }
            })
          }
        });
      },
      cl() {
        this.isLife = !this.isLife;
      },
      myCloseIt(val) {
        this.openJg()
        this.olderListId = val
      },
      closeOrgDetail() {
        this.closeJg()
      },
    }
  };
</script>

<style lang="scss">
.info-middle {
  width: 300px;
  height:110px;
  background: #062d68;
  padding: 5px 0;
  border: 1px solid #0fa2ff;
}
.jc-map {
  position: relative;
  height: 100%;
  .map-life {
    position: absolute;
    cursor: pointer;
    width: 240px;
    height: 80px;
    border:3px solid #4cf9ff;
    font-size: 24px;
    background: #1561a2;
    color: #a9fcff;
    text-align: center;
    line-height: 80px;
    right: -952px;
    bottom: -62px;
    z-index: 99;
  }
  .base-data-tabs {
    width: 400px;
    margin: 40px auto;
    position: relative;
    z-index: 99;
    span {
      display: inline-block;
      font-size: 40px;
      width: 200px;
      border: 1px solid #4cf9ff;
      text-align: center;
      color: #4cf9ff;
      line-height: 60px;
      cursor: pointer;
      background: #112f79;
    }
    .tab-change {
      color: #ffffff;
      background: #1968be;
    }
  }
  .base-data-item {
    width: 100%;
    .base-img-bg {
      width: 100%;
      margin-top: 40px;
      float: left;
      .base-img-bg-item {
        width: 50%;
        float: left;
        .num-img-bg-list {
          display: inline-block;
          vertical-align: middle;
          span {
            display: inline-block;
            width: 78px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 76px;
            color: #fed000;
            margin-right: 7px;
          }
        }
      }
      .base-img-bg-item:first-of-type {
        padding-left: 150px;
      }
      .base-img-bg-item:last-of-type {
        padding-left: 50px;
      }
    }
    .base-border-bg {
      width: 100%;
      margin-top: -10px;
      float: left;
      .base-border-item {
        width: 33.3%;
        float: left;
        padding-left: 40px;
        .num-border-bg-list {
          display: inline-block;
          vertical-align: middle;
          margin-left: 20px;
          span {
            display: inline-block;
            width: 68px;
            height: 90px;
            line-height: 90px;
            text-align: center;
            font-size: 48px;
            color: #fed000;
            border: 1px solid #4cf9ff;
            margin-right: 10px;
          }
        }
      }
    }
    .base-sex {
      width: 40%;
      float: left;
      padding-left: 40px;
      margin-top: 50px;
      & > span {
        font-size: 28px;
        padding-top: 10px;
        display: inline-block;
        margin-bottom: 20px;
      }
      .older-num-list {
        span {
          display: inline-block;
          font-size: 48px;
          text-align: center;
          background: #29768e;
          padding: 24px 12px;
          margin-right: 10px;
          margin-top: 20px;
          line-height: 50px;
        }
      }
      .man-bl {
        padding-left: 40px;
        margin-top: 40px;
        width: 45%;
        float: left;
        position: relative;
        .man-zs {
          position: absolute;
          left: 62.5px;
          top: 22px;
        }
        .man-word {
          position: absolute;
          left: 40px;
          width: 220px;
          text-align: center;
          top: 252px;
          font-size: 22px;
        }
      }
      .man-sex {
        .el-progress__text {
          color: #3ccaff;
          font-size: 32px !important;
        }
      }
      .woman-sex {
        .el-progress__text {
          color: #ffc600;
          font-size: 32px !important;
        }
      }
    }
    .base-older {
      width: 60%;
      float: left;
      margin-top: 50px;
      .older-btns {
        width: 95%;
        text-align: right;
        position: relative;
        z-index: 99;
        span {
          cursor: pointer;
          padding: 10px 10px;
          background: transparent;
          border: 1px solid #4cf9ff;
          font-size: 20px;
          color: #4cf9ff;
        }
        .choose-btn {
          color: #ffffff;
          background: #1968bf;
        }
      }
    }
  }
  .map {
    width: 100%;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 1px;
    .map-color {
      width: 150px;
      padding: 5px 10px;
      position: absolute;
      left: 0px;
      bottom: 0px;
      background: rgba(9, 78, 148 , 0.8);
      .map-color-list {
        width: 100%;
        margin: 10px 0;
        span {
          display: inline-block;
          vertical-align: middle;
          color: #c4f9fb;
        }
        span:last-of-type {
          cursor: pointer;
        }
        span:first-of-type {
          margin-right: 5px;
        }
      }
    }
  }
}
.olderMap-title {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  span{
    font-size: 20px;
    padding: 0 10px;
    cursor: pointer;
  }
  span:first-of-type {
    border-right: 1px solid #ffffff;
  }
  .choose-tab {
    color: #4cf9ff;
  }
}
.older {
  width: 100%;
  .older-num {
    width: 44%;
    float: left;
    padding-left: 160px;
    margin-top: 20px;
    border-right:1px solid #226783;
    p {
      font-size: 20px;
      margin: 3px 0 10px 0;
    }
    span {
      font-size: 40px;
      color: #ffc600;
      letter-spacing: 2px;
      cursor: pointer;
    }
  }
  .older-per {
    width: 55%;
    float: left;
    padding-left: 40px;
    margin-top: 20px;
    span {
      display: inline-block;
      vertical-align: bottom;
    }
    .older-per-title {
      font-size: 18px;
      padding-bottom: 3px;
    }
    .older-per-num {
      font-size: 30px;
      color: #ffc600;
      margin-left: 20px;

    }
    .older-per-num-blue {
      font-size: 24px;
      color: #4cf9ff;
      margin-top: 20px;
      margin-left: 15px;
      margin-right: 40px;
    }
  }
  .older-tab {
    margin-top: 20px;
    margin-left: 110px;
    text-align: center;
    float: left;
    & > span {
      display: block;
      width: 100px;
      float: left;
      height: 40px;
      font-size: 20px;
      line-height: 39px;
      cursor: pointer;
      position: relative;
      color: #4cf9ff;
      border: 1px solid #0fa2ff;
    }
    .choose-older-tab {
      color: #ffffff;
      background: #0fa2ff;
    }
  }
}
.map-in {
  position: absolute;
  background: #ffffff;
  width: 52px;
  height: 45px;
  bottom: 15px;
  right: 15px;
  background: #0f9cf6;
  line-height: 35px;
  padding: 5px 10px;
  cursor: pointer;
  overflow: hidden;
  span {
    vertical-align: middle;
    font-size: 20px;
    padding-left: 10px;
    display: none;
  }
}
.map-long {
  animation: long 500ms linear 1 forwards;
  span {
    display: inline-block;
  }
}
@keyframes long {
  0%   { width: 52px }
  100% { width: 245px}
}
.map-short {
  animation: short 500ms linear 1 forwards;
  span {
    display: none;
  }
}
@keyframes short {
  0%   { width: 245px }
  100% { width: 52px}
}
.no-mouse {
  pointer-events: none
}
.map-pic {
  width: 1472px;
  height: 928px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  background: url("../../../assets/images/yqsf_bg.png") no-repeat center;
  background-size: 100% 100%;
  .map-pic-bd {
    width: 1472px;
    height: 928px;
    position: relative;
    .map-close {
      position: absolute;
      bottom: -55px;
      left: 50%;
      margin-left: -20px;
      cursor: pointer;
    }
    .map-point {
      position: absolute;
      .map-point-list {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        p {
          font-size: 18px;
        }
      }
      .list-one {
        width: 248px;
        height: 84px;
        background: url("../../../assets/images/zzzh_bg.png") no-repeat center;
        background-size: 100% 100%;
        margin-left: 20px;
        padding: 10px 0 0 30px;
        display: none;
      }
      .list-two {
        width: 248px;
        height: 239px;
        background: url("../../../assets/images/zhwl_bg.png") no-repeat center;
        background-size: 100% 100%;
        margin-left: 20px;
        padding: 10px 0 0 30px;
        display: none;
        p {
          margin: 11px 0;
        }
      }
      .list-three {
        width: 248px;
        height: 209px;
        background: url("../../../assets/images/lnhd_bg.png") no-repeat center;
        background-size: 100% 100%;
        margin-left: 20px;
        padding: 10px 0 0 30px;
        display: none;
      }
      .list-four {
        width: 248px;
        height: 115px;
        background: url("../../../assets/images/sqst_bg.png") no-repeat center;
        background-size: 100% 100%;
        margin-left: 20px;
        padding: 10px 0 0 30px;
        display: none;
      }
      .list-five {
        width: 248px;
        height: 148px;
        background: url("../../../assets/images/xqgc_bg.png") no-repeat center;
        background-size: 100% 100%;
        margin-left: 20px;
        padding: 10px 0 0 30px;
        display: none;
      }
    }
    .map-one:hover {
      .list-one {
        display: inline-block;
      }
    }
    .map-two:hover {
      .list-two {
        display: inline-block;
      }
    }
    .map-three:hover {
      .list-three {
        display: inline-block;
      }
    }
    .map-four:hover {
      .list-four {
        display: inline-block;
      }
    }
    .map-five:hover {
      .list-five {
        display: inline-block;
      }
    }
  }

}
.my-width {
  position: absolute;
  width: 100% !important;
  background-image: none !important;
  height: 100% !important;
  margin: 0 !important;
}


</style>
