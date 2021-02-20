<template>
    <div class="longWidth" style="position: relative;height: 1203px">
        <div class="map-btn" v-show="isDetail === false">
            <div class="btn-list" v-for="item in brtnTab" :key="item.type" :class="[btnType === item.type ? 'btn-choose' : '']" @click="chooseBtn(item.type)">{{item.name}}</div>
        </div>
        <div v-show="mapType === 'big' && isDetail === false" class="map-bd">
            <div id="container" ></div>
        </div>
        <div v-show="mapType === 'small'&& isDetail === false" class="map-bd" style="border: 1px solid #19ffff">
            <div id="containerTwo" ></div>
        </div>
        <div v-show="mapType === 'small'&& isDetail === false" >
            <div id="smallmap" class="small-map" @click="outMap"></div>
        </div>
        <div style="width: 100%;position: absolute; top: 0; z-index: 999;left:-30px;" v-if="isDetail === true">
            <organizationDetails :instituType="detailType" :id="detailId" :close="close"></organizationDetails>
        </div>
    </div>
</template>
<script>
import latitudeArray from '@/api/latitude';
import minhang from '@/api/getJson';
import AMap from "AMap";
import echarts from "echarts"
import { getStreetNumber, getOrgList, getMapList } from '@/api/elderlyInfor'
import {areaCode} from '@/api/areaCode'
import lnhd from "../../../assets/img/lnhd_map.png";
import mld from "../../../assets/img/mld_map.png";
import rjzh from "../../../assets/img/rjzh_map.png";
import ylgw from "../../../assets/img/ylgw_map.png";
import zcd from "../../../assets/img/zcd_map.png";
import zhwl from "../../../assets/img/zhwl_map.png";
import sqws from "../../../assets/img/sqws_map.png";
import sqyl from "../../../assets/img/sqyl_map.png";
import yljg from "../../../assets/img/yljg_map.png";
import zzzh from "../../../assets/img/zzzh_map.png";
import organizationDetails from "./organizationDetails";
import ms from "../../../assets/imgYu/ms.png"
export default {
    components: {
        organizationDetails
    },
    data(){
        return{
            mapType: 'big',
            centerCo: [121.430226,31.102306],
            brtnTab: [{
                name: "机构分布图",
                type: 1,
            }, {
                name: "老人热力图",
                type: 0,
            }],
            btnType: 0,
            map: "",
            mapTwo: "",
            typeName: "",
            name: "",
            lastName: "",
            isDetail: false,
            detailType: '',
            detailId: ''
        }
    },
    watch: {
        mapType() {
            if (this.mapType === 'small') {
                this.smallMap()
            } else {
                this.isOut = "1"
            }
        },
        name() {
            if (this.name !== this.lastName) {
                this.changeMapTwo(this.name)
                setTimeout(() => {
                    this.lastName = ""
                },10)
            }
        }
    },
    mounted() {
        this.getData()
        this.initTwo()
        this.getOrg()
        // this.smallMap()
    },
    methods: {
        close() {
          this.isDetail = false;
        },
        outMap() {
            if (this.lastName === "") {
                this.mapType = 'big'
            }
        },
        async getData() {
            await this.getOlder();
            await this.init();
        },
        chooseBtn(type) {
            if (this.btnType === type ) {
                return false
            }
            this.btnType = type;
            if (type === 0) {
                this.mapType = 'big';
            }
            this.map.remove(this.map.getAllOverlays("marker"));
            var map = this.map

            latitudeArray.latitudeArray.forEach(item =>{
                var num = type === 0 ? item.old : item.org
                var content = "<div class=\"round\">\n" +
                  "\t<div class=\"round-one\"></div>\n" +
                  "\t<div class=\"round-two\"></div>\n" +
                  "\t<div class=\"round-line\"></div>\n" +
                  "\t<div class=\"round-word\">\n" + num + "\t</div>\n" +
                  "\t<div class=\"round-name\">\n" + item.name +"\t</div>\n" +
                  "</div>"
                const marker = new AMap.Marker({
                    map: map,
                    content: content,
                    offset: new AMap.Pixel(-10, -50),
                    position: item.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: ""
                });
                marker.setMap(map);
            })
            this.map = map
        },
        getOlder() {
            return new Promise((resolve, reject) => {
                getStreetNumber({areaCode:areaCode}).then(res =>{
                    if(res.code === 0){
                        res.data.forEach(item =>{
                            latitudeArray.latitudeArray.forEach((list, index) =>{
                                if (item.key === list.name) {
                                    latitudeArray.latitudeArray[index].old = item.value
                                }
                            })
                        })
                        resolve();
                    }
                })
            })
        },
        getOrg() {
            return new Promise((resolve, reject) => {
                getOrgList().then(res =>{
                    if(res.code === 0){
                        res.data.forEach(item =>{
                            latitudeArray.latitudeArray.forEach((list, index) =>{
                                if (item.area_name === list.name) {
                                    latitudeArray.latitudeArray[index].org = item.count
                                }
                            })
                        })
                    }
                })
            })
        },
        init() {
            return new Promise((resolve, reject) => {
                var map;
                //// 区划down
                var district = null;
                var polygons=[];
                let _this = this;
                var imageLayer = new AMap.ImageLayer({
                    url: ms,
                    bounds: new AMap.Bounds(
                            [121.238498,30.963131],
                            [121.579503,31.256563]
                    ),
                    zooms: [12, 15]
                });
                function drawBounds() {
                    //加载行政区划插件
                    if(!district){
                        //实例化DistrictSearch
                        var opts = {
                            subdistrict: 0,   //获取边界不需要返回下级行政区
                            extensions: 'all',  //返回行政区边界坐标组等具体信息
                            level: 'city'  //查询行政级别为 市
                        };
                        district = new AMap.DistrictSearch(opts);
                    }
                    //行政区查询
                    district.setLevel("city")
                    district.search("闵行区", function(status, result) {
                        polygons = [];
                        var bounds = result.districtList[0].boundaries;
                        var mask = [];
                        if (bounds) {
                            for (var i = 0, l = bounds.length; i < l; i++) {
                                mask.push([bounds[i]])
                            }
                            map = new AMap.Map("container", {
                                mask: mask,
                                center: _this.centerCo,
                                disableSocket:true,
                                viewMode:'3D',
                                showLabel:false,
                                labelzIndex:130,
                                pitch:30,
                                zoom: 12.3,
                                mapStyle: "amap://styles/0c30a46b1f647207e8ad9c5dcdad18d8",
                                layers:[
                                    new AMap.TileLayer(),
                                    imageLayer
                                ]
                            });
                            for (var i = 0, l = bounds.length; i < l; i++) {

                                //生成行政区划polygon
                                var polygon = new AMap.Polygon({
                                    strokeWeight: 5,
                                    path: bounds[i],
                                    fillOpacity: 0,
                                    fillColor: '#ffffff',
                                    strokeColor: "#02e3ec",
                                    strokeWeight: 2,
                                    strokeOpacity: 1
                                });
                                polygons.push(polygon);
                            }
                        }

                        //添加高度面
                        var object3Dlayer = new AMap.Object3DLayer({zIndex:1});
                        map.add(object3Dlayer)
                        var height = -12000;
                        var color = '#0f2d55';//rgba
                        var wall = new AMap.Object3D.Wall({
                            path:bounds,
                            height:height,
                            color:color
                        });
                        wall.transparent = true
                        object3Dlayer.add(wall)
                        //添加描边
                        for(var i =0;i<bounds.length;i+=1){
                            new AMap.Polyline({
                                path:bounds[i],
                                strokeColor:'#02e3ec',
                                strokeWeight:4,
                                map:map
                            })
                        }
                        map.add(polygons)
                        map.setFitView(polygons);//视口自适应
                        latitudeArray.latitudeArray.forEach(item =>{
                            let data = new AMap.Polygon({
                                path: item.list,
                                strokeColor: "#02e3ec",
                                strokeWeight: 2,
                                strokeOpacity: 1,
                                fillOpacity: 0,
                                fillColor: '#0a70bb',
                                zIndex: 50,
                            })

                            map.add(data)
                            // 缩放地图到合适的视野级别
                            map.setFitView([ data ])

                            var content = "<div class=\"round\">\n" +
                              "\t<div class=\"round-one\"></div>\n" +
                              "\t<div class=\"round-two\"></div>\n" +
                              "\t<div class=\"round-line\"></div>\n" +
                              "\t<div class=\"round-word\">\n" + item.old + "\t</div>\n" +
                              "\t<div class=\"round-name\">\n" + item.name +"\t</div>\n" +
                              "</div>"
                            const marker = new AMap.Marker({
                                map: map,
                                content: content,
                                offset: new AMap.Pixel(-10, -50),
                                position: item.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                title: ""
                            });
                            marker.setMap(map);
                            AMap.event.addListener(data, 'mouseover', function () {
                                let changeStyle = {
                                    fillColor: '#000000',
                                    fillOpacity: 0.1,
                                }
                                data.setOptions(changeStyle)
                            });
                            AMap.event.addListener(data, 'click', function () {
                                if (_this.btnType === 1) {
                                    _this.mapType = "small";
                                    _this.typeName = item.name;
                                    _this.changeMapTwo(_this.typeName)
                                    _this.name = item.name
                                }
                            });
                            AMap.event.addListener(data, 'mouseout', function () {
                                let changeStyle = {
                                    fillColor: '#0a70bb',
                                    fillOpacity: 0,
                                }
                                data.setOptions(changeStyle)
                            });
                        })

                        map.setZoom(12.3)
                        map.setStatus({
                            dragEnable: false,
                            doubleClickZoom: false,
                            zoomEnable: false,
                            rotateEnable: true
                        });
                        setTimeout(() => {
                            map.setCenter([121.430226,31.102306])
                        }, 10)
                        _this.map = map
                    });
                }
                drawBounds();
            });
        },
        initTwo() {
            return new Promise((resolve, reject) => {
                var mapTwo = new AMap.Map("containerTwo", {
                    center: this.centerCo,
                    resizeEnable: true,
                    zoom: 12.5,
                    scrollWheel: true,
                    mapStyle: "amap://styles/8675607c66741359c348b98c5ada4375"
                });
                this.mapTwo = mapTwo
            })
        },
        smallMap() {
            /////
            echarts.registerMap('minhang', minhang.minhang);
            var chart = echarts.init(document.getElementById('smallmap'));
            var option = {
                backgroundColor: '#192e42',
                title: {
                    text: '',
                    x:'left',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    },
                    extraCssText:"height:20px;"
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x:'right',
                    data:['pm2.5'],
                    textStyle: {
                        color: '#fff'
                    }
                },

                geo: {
                    map: 'minhang',
                    roam:false,
                    aspectScale:1,
                    label: {
                        emphasis: {
                            show: true,
                            color:"#fff"

                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#0968af',
                            borderColor: '#00fff8'
                        },
                        emphasis: {
                            areaColor: '#0968af',
                            opacity: 0.7,
                        }
                    },
                    regions: [{
                        name: this.name, //区块名称
                        itemStyle: {
                            normal: {
                                areaColor: '#ffd535'
                            }
                        }
                    }]
                }
            };
            chart.setOption(option);
            let _this = this;
            chart.on('click', function (params) {
                _this.lastName = _this.name;
                // this.changeMapTwo(params.name);
                setTimeout(() => {
                    _this.name = params.name;
                }, 10)
                option.geo.regions[0].name = params.name;
                chart.setOption(option);
            })
        },
        changeMapTwo(name) {
            this.mapTwo .clearMap();
            var mapTwo = this.mapTwo
            var arr = [];
            var center = [];
            latitudeArray.latitudeArray.forEach(item =>{
                if (item.name === name) {
                    arr = item.list
                    center = item.center
                }
            })
            this.mapTwo.setCenter(center);
            this.mapTwo.setZoom(12.5)
            let data = new AMap.Polygon({
                path: arr,
                strokeColor: "#02e3ec",
                strokeWeight: 2,
                strokeOpacity: 1,
                fillOpacity: 0.7,
                fillColor: '#0a70bb',
                zIndex: 50,
            })

            this.mapTwo.add(data)
            this.getPointList(name)
        },
        getPointList(name) {
            let code = "";
            switch (name) {
                case "华漕镇":
                    code = "310112106000";
                    break;
                case "新虹街道":
                    code = "310112008000";
                    break;
                case "七宝镇":
                    code = "310112102000";
                    break;
                case "虹桥镇":
                    code = "310112107000";
                    break;
                case "古美街道":
                    code = "310112006000";
                    break;
                case "莘庄镇":
                    code = "310112101000";
                    break;
                case "梅陇镇":
                    code = "310112108000";
                    break;
                case "莘庄工业区":
                    code = "310112501000";
                    break;
                case "颛桥镇":
                    code = "310112103000";
                    break;
                case "马桥镇":
                    code = "310112112000";
                    break;
                case "江川路街道":
                    code = "310112001000";
                    break;
                case "吴泾镇":
                    code = "310112110000";
                    break;
                case "浦锦街道":
                    code = "310112009000";
                    break;
                case "浦江镇":
                    code = "310112114000";
                    break;
            }
            var map = this.mapTwo;
            getMapList(code).then(res => {
                if (res) {
                    res.data.forEach(item => {
                        let pic = "";
                        switch (item.org_type) {
                            case "2013":
                                pic = lnhd;
                                break;
                            case "2010":
                                pic = rjzh;
                                break;
                            case "2014":
                                pic = zcd;
                                break;
                            case "1010":
                                pic = yljg;
                                break;
                            case "1011":
                                pic = zzzh;
                                break;
                            case "2011":
                                pic = zhwl;
                                break;
                            case "2020":
                                pic = sqws;
                                break;
                            case "2017":
                                pic = sqyl;
                                break;
                            // case "2011":
                            //     pic = mld;
                            //     break;
                        }
                        let _this = this;
                        if (item.longitude !== null && item.longitude !== '') {
                            const marker = new AMap.Marker({
                                map: map,
                                icon: pic,
                                position: new AMap.LngLat(item.longitude, item.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                title: item.org_name
                            });
                            AMap.event.addListener(marker, 'click', function () {
                                _this.toDetail(item.org_type, item.org_id)
                            });
                            marker.setMap(map);
                        }
                    })
                    this.mapTwo = map
                }
            })
        },
        toDetail(type, id) {
            this.isDetail = true;
            this.detailType = type;
            this.detailId = id;
        }
    }
}
</script>

<style lang="scss">
.map-btn {
    width: 40%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    .btn-list {
        width: 251px;
        height: 68px;
        background: url("../../../assets/img/mapBtn_bg.png") no-repeat center;
        background-size: 100% 100%;
        float: right;
        margin-left: 20px;
        text-align: center;
        line-height: 68px;
        color: #1be5e1;
        font-size: 28px;
        cursor: pointer;
    }
    .btn-choose {
        color: #e9d10f;
    }
}
.small-map {
    width: 252px;
    height: 252px;
    box-sizing: content-box;
    position: absolute;
    background: #192e42;
    border:1px solid #1be5e1;
    left: 20px;
    bottom: 20px
}
.map-bd {
    width: 100%;
    height: 100%;
}
#container {
    width:100%;
    height:100%;
    background: transparent!important;
}
#containerTwo {
    width: 100%;
    height: 100%;
}
.round {
    width:20px;
    height:20px;
    border-radius: 50%;
    margin:0 auto;
    background: #FFFF00;
    cursor: auto;
    display:block;
    position:relative;
    opacity: 0.8;
}
.round-one {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0);
    background: rgba(255, 255, 255, 0.5);
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    z-index: 3;
    -webkit-animation: haloone 1s infinite ease-out;
    -moz-animation: haloone 1s infinite ease-out;
    animation: haloone 1s infinite ease-out;
}
.round-two {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.8);
    top: 50%;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);
    -webkit-animation: halotwo 1s infinite ease-out;
    -moz-animation: halotwo 1s infinite ease-out;
    animation: halotwo 1s infinite ease-out;
}
.round-three {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.8);
    top: 50%;
    left: 50%;
    margin-top: -45px;
    margin-left: -45px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);
    -webkit-animation: halothree 1s infinite ease-out;
    -moz-animation: halothree 1s infinite ease-out;
    animation: halothree 1s infinite ease-out;
}
@-webkit-keyframes haloone {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
    }
}
@-moz-keyframes haloone {
    0% {
        opacity: 0;
        -moz-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -moz-transform: scale(1.2);
    }
}
@-ms-keyframes haloone {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@-o-keyframes haloone {
    0% {
        opacity: 0;
        -o-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -o-transform: scale(1.2);
    }
}
@keyframes haloone {
    0% {
        opacity: 0;
        transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: scale(1.2);
    }
}
@-webkit-keyframes halotwo {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
    }
}
@-moz-keyframes halotwo {
    0% {
        opacity: 0;
        -moz-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -moz-transform: scale(1.2);
    }
}
@-ms-keyframes halotwo {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@-o-keyframes halotwo {
    0% {
        opacity: 0;
        -o-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -o-transform: scale(1.2);
    }
}
@keyframes halotwo {
    0% {
        opacity: 0;
        transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: scale(1.2);
    }
}
@-webkit-keyframes halothree {
    0% {
        opacity: 0;
        -webkit-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.2);
    }
}
@-moz-keyframes halothree {
    0% {
        opacity: 0;
        -moz-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -moz-transform: scale(1.2);
    }
}
@-ms-keyframes halothree {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@-o-keyframes halothree {
    0% {
        opacity: 0;
        -o-transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -o-transform: scale(1.2);
    }
}
@keyframes halothree {
    0% {
        opacity: 0;
        transform: scale(0.1);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: scale(1.2);
    }
}
.round-line {
    width: 1px;
    height: 13px;
    border-left: 1px dashed #FFFF00;
    position: absolute;
    top: -18px;
    left: 10px;
}
.round-word {
    width: 60px;
    font-size: 16px;
    color: #FFFF00;
    border: 1px solid #FFFF00;
    line-height: 25px;
    text-align: center;
    position: absolute;
    top: -50px;
    left: -20px;
    border-radius: 2px;
    background: #062d68;
}
.round-name {
    position: absolute;
    width: 160px;
    text-align: center;
    bottom: -40px;
    left: -70px;
    color: #4cf9ff;
    font-size: 22px;
}
.amap-logo {
    right: 0 !important;
    left: auto !important;
    display: none !important;
}

.amap-copyright {
    right: 70px !important;
    left: auto !important;
    opacity:0 !important;
}
</style>
