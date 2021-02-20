<template>
    <div class="long_width">
        <div class="elderInforTitle displayFlex">
            <div class="inforTitleImg" style="cursor: inherit">养老顾问点</div>
        </div>
        <div class="onlyDisplay">
            <div class="gwdLeft">
                <div>
                    <span class="font26">服务老人数</span>
                    <div class="display mt20" @click="showTable(1)">
                        <div v-for="item in serveNum" :key="item" class="communityList">{{item}}</div>
                    </div>
                    <div class="mt15">
                        <!-- <p class="font18">较上年</p>
                        <span>
                            <span class="font22 brightColor">11562</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span> -->
                    </div>
                </div>
                <div class="mt150">
                    <span class="font26">养老顾问员</span>
                    <div class="display mt20 ">
                        <div v-for="item in serveNumList" :key="item" class="communityList">{{item}}</div>
                    </div>
                    <div class="mt15">
                        <!-- <p class="font18">较上年</p>
                        <span>
                            <span class="font22 brightColor">11562</span>
                            <span><img src="@/assets/img/up.png" alt=""></span>
                        </span> -->
                    </div>
                </div>
            </div>
            <div class="gwdCenter">
                <Chart :option="streetOption" :width="streetWisth" :height="streetHeight"/>
            </div>
            <div class="gwdRight">
                <div class="font26">机构列表</div>
                <div class="elTableStyle" style="height:380px;">
                    <el-table
                        :data="tableData"
                        :cell-style="cellStyle"
                        style="width:380">
                        <el-table-column
                            prop="streetName"
                            label="所属街镇"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            prop="orgName"
                            label="机构名称"
                            show-overflow-tooltip
                            min-width="200">
                            <template slot-scope="scope">
                                <span class="cursorPointer" @click="showDetails(scope.row.orgId,scope.row.orgType)">{{scope.row.orgName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="addr"
                            label="详细地址"
                            min-width="150"
                            show-overflow-tooltip
                            >
                        </el-table-column>
                    </el-table>
                </div>
                <div class="loadMore" @click="loadMore">加载更多</div>
            </div>
        </div>
        <div class="detailsMain"  v-if="isShow">
            <jjDetail class="toastImg" :close="closeTabs" :id="detailId" :instituType='instituType'/>
        </div>
         <div class="bg" v-if="isShowBg" @click.self="closeTab">
            <div class="toastImg">
                <consultantTable :close="closeTab"/>
            </div>
        </div>
    </div>
</template>
<script>
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
import {getDayCare,getDayStreet,getInstitutions,getDayNumber} from '@/api/communityInfor'
import consultantTable from "./secondScreen/consultantTable"
import jjDetail from "../facilitiesInfor/jjDetail"
export default {
    components:{Chart,consultantTable,jjDetail},
    data(){
        return{
            streetWisth:"930px",
            streetHeight:'500px',
            optionHeight:"400px",
            rainWisth:'740px',
            rainHeight:'370px',
            streetOption:{},
            tableData: [],
            form:{
                pageSize:4,
                pageNum:1,
                areaCode:areaCode
            },
            lastPage:0,
            serveNum:['5','9','2','0'],
            serveNumList:[],
            isShowBg:false,
            isShow:false,
            instituType:'',
            detailId:''
        }
    },
    methods:{
        showTable(num){
            if(num==2){
                this.isShowBg = true
            }
        },
        cellStyle({row, column, rowIndex, columnIndex}){
            if(columnIndex==1){
                return `color:#ffd535`
            }else{
                return `color:#fff`
            }
        },
        closeTab(){
            this.isShowBg = false
        },
        closeTabs(){
            this.isShow = false
        },
        showDetails(id,type){
            this.isShow = true
            this.instituType = type
            this.detailId = id
        },
        loadMore(){
            this.form.pageNum++
            if(this.form.pageNum>this.lastPage){
                this.form.pageNum = 1
                this.getTabList()
            }else{
                this.getTabList()
            }
        },
        getDate(){
            // getDayCare({areaCode:areaCode}).then(res=>{
            //     if(res.code==0){
            //         this.serveNum = String(res.data).split('')
            //     }
            // })
            getDayNumber({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    // this.serveNumList = String(res.data).split('')
                    this.serveNumList = [5, 8, 4]
                }
            })
            getDayStreet({areaCode:areaCode}).then(res=>{
                if(res.code==0){
                    let xAxisData=[]
                    let seriesData = []
                    if(res.data.length){
                        res.data.forEach(item=>{
                            xAxisData.push(item.streetName)
                            seriesData.push(item.number)
                        })
                    }
                    this.streetOption={
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            top: '15%',
                            right:'6%',
                            left:'5%',
                            bottom:'20%'
                        },                // legend: {
                        title:[
                            {
                                text: '街道分布',
                                left: '0%',
                                top: '5%',
                                textStyle: {
                                    fontSize: 22,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '单位:个',
                                left: '90%',
                                top: '5%',
                                textStyle: {
                                    fontSize: 16,
                                    color:'#fff'
                                }
                            }
                        ],
                        toolbox: {
                            show: true,
                        },
                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: xAxisData,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "#ffffff", //X轴文字颜色
                                    fontSize: 16,
                                    marginTop: 10,
                                    padding:[40,0,0,-10]
                                },
                                interval: 0,
                                rotate:-40
                            },
                            axisLine:{
                                show: true,
                                lineStyle: {
                                    color: "#ccc"
                                },
                            }

                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} ',
                                color: '#ffffff',
                                textStyle: {
                                    fontSize: 20
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "#ccc"
                                },
                            },
                        }],
                        series: [
                            {
                                type: 'line',
                                cursor: 'default',
                                data: seriesData,
                                lineStyle: {
                                    normal: {
                                        width: 3,
                                        color: {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: '#dfb92a' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#dfb92a' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#dfb92a',
                                        borderWidth: 8,
                                        borderColor: "#dfb92a"
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#dfb92a'
                                        },
                                            {
                                                offset: 1,
                                                color: 'rgba(48,71,80,0)'
                                            }
                                        ], false)
                                    }
                                },
                            }
                        ]
                    }
                }
            })
        },
        getTabList(){
             getInstitutions(this.form).then(res=>{
                if(res.code==0){
                    this.tableData = res.data.list
                    this.lastPage = res.data.lastPage
                }
            })
        }
    },
    mounted(){
        this.getDate()
        this.getTabList()
    }
}
</script>
<style lang="scss" scoped>
    .homePensionLeft{
        border-right:1px dashed #0eafb5;
        height:500px;
    }
    .gwdLeft{
        width:335px;
        height:500px;
        padding:20px 30px 0 0;
        border-right: 1px dashed #19dcdb;
    }
    .gwdCenter{
        width:1000px;
        border-right: 1px dashed #19dcdb;
        padding:0 30px;
    }
    .gwdRight{
        padding:20px 0 0 30px;
        width:1000px;
    }
    .zcdRight{
        width:760px;
        padding:20px 0 0 30px;
    }
    .detailsMain{
        position: absolute;
        width:4700px;
        height:1566px;
        top:0;
        left: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99999;
        .toastImg{
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
   }
</style>
