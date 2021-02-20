<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">社区养老信息列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop=""
                        label="姓名"
                        width="140">
                        <template slot-scope="scope">
                            <span class="cursorPointer orangeColor" @click="showDetails(scope.row.id,scope.row.idCard,scope.row.censusArea)">{{scope.row.fullName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="age"
                        label="年龄"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="idCard"
                        label="身份证号"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="streetName"
                        label="所属街镇"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="areaName"
                        label="所属居委"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="censusAddr"
                        label="地址"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="censusAddr"
                        label="机构名称"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                </el-table>
            </div>
            <div class="mt20 paginationStyle">
                <pagination
                    class="PaginationStyle"
                    v-show="total>0"
                    :total="total"
                    :page.sync="form.pageNum"
                    :limit.sync="form.pageSize"
                    @pagination="getData(form)"
                />
            </div>
        </div>
        <div class="elderInforDetail" v-if="isDetail">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg">老人详情</div>
                <div class="cursorPointer" @click="closeDetail"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="inforMain">
                <div class="inforLeft">
                    <div>
                        <h3 class="commonTitle font30">基础信息</h3>
                        <div class="display">
                            <div class="inforLeftImg">
                                <span v-if="inforDetail.sex==='男'"><img src="@/assets/images/nan.png" alt=""></span>
                                <span v-else><img src="@/assets/images/nv.png" alt=""></span>
                            </div>
                            <div>
                                <p>姓名：{{inforDetail.fullName}}</p>
                                <p>姓别：{{inforDetail.sex}}</p>
                                <p>年龄：{{inforDetail.age}}</p>
                                <p>身份证号：{{inforDetail.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,"\$1****\$2")}}</p>
                                <p>所属街镇：{{inforDetail.streetName}}</p>
                                <p>户籍居委：{{inforDetail.area_name}}</p>
                                <p>户籍详细地址：{{inforDetail.censusAddr}}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="commonTitle font30 mb50">标签信息</h3>
                        <div v-if="inforDetail.property" class="inforLabel">
                            <span v-if="inforDetail.property.assessTypeName">{{inforDetail.property.assessTypeName}}\{{inforDetail.property.assessLevelName}}</span>
                            <span v-if="inforDetail.property.ageLevelName">{{inforDetail.property.ageLevelName}}</span>
                            <span v-if="inforDetail.property.categoryTypeName">{{inforDetail.property.categoryTypeName}}</span>
                            <!--<span v-if="inforDetail.property.censusStatusName">{{inforDetail.property.censusStatusName}}</span>-->
                            <span v-if="inforDetail.property.defoRelatedAttrName">{{inforDetail.property.defoRelatedAttrName}}</span>
                            <span v-if="inforDetail.property.liveStatusName">{{inforDetail.property.liveStatusName}}</span>
                            <span v-if="inforDetail.property.pensionAssistName">{{inforDetail.property.pensionAssistName}}</span>
                            <span v-if="inforDetail.property.pensionModeName">{{inforDetail.property.pensionModeName}}</span>
                        </div>
                    </div>
                </div>
                <div class="inforCenter">
                    <div>
                        <h3 class="commonTitle font30">应享受服务</h3>
                        <div>
                            <div v-for="(item,i) in serveList" :key="i" class="inforCenterList">{{item.serviceName}}</div>
                        </div>
                        <div class="lookMore" @click="lookMore" v-if="lastPage>1">查看更多</div>
                    </div>
                </div>
                <div class="inforRight">
                    <div>
                        <h3 class="commonTitle font30">补贴信息</h3>
                        <div>
                            <div class="inforRightList displayFlex">
                                <span>敬老卡津贴</span>
                                <span>
                                    <span class="moneyInfor">{{this.safeguardData.oldCardSubsidy==''||this.safeguardData.oldCardSubsidy==null?'---':this.safeguardData.oldCardSubsidy}}</span>
                                    <span>元/月</span>
                                </span>
                            </div>
                            <div class="inforRightList displayFlex">
                                <span>居家养老补贴</span>
                                <span>
                                    <span class="moneyInfor">{{this.safeguardData.homePensionSubsidy==""||this.safeguardData.homePensionSubsidy==null?"---":this.safeguardData.homePensionSubsidy}}</span>
                                    <span>元/月</span>
                                </span>
                            </div>
                            <div class="inforRightList displayFlex">
                                <span>助餐补贴</span>
                                <span>
                                    <span class="moneyInfor">{{this.safeguardData.mealSubsidy==""||this.safeguardData.mealSubsidy==null?'---':this.safeguardData.mealSubsidy}}</span>
                                    <span>元/月</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="mt30">
                        <div class="display">
                            <div class="font28 mr30 cursorPointer" :class="index===1?'bolidColor':''" @click="changeTab(1)">刷卡统计</div>
                            <div class="font28 cursorPointer" :class="index===2?'bolidColor':''"  @click="changeTab(2)">刷卡记录</div>
                        </div>
                        <div v-if="index===1">
                            <Chart :option="streetOption" :height="height"/>
                        </div>
                        <div v-if="index===2">
                            <div class="elTableStyle mt20">
                                <el-table :data="cardRecordList">
                                    <el-table-column label="时间" show-overflow-tooltip align="center">
                                        <template slot-scope="{row}">
                                            <span>{{setDateTime(row.buid_time)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="bank_account" label="卡号" show-overflow-tooltip align="center" ></el-table-column>
                                    <el-table-column prop="org_name" label="刷卡地点" show-overflow-tooltip align="center"></el-table-column>
                                    <el-table-column prop="money" label="金额" show-overflow-tooltip align="center" >
                                        <template slot-scope="{row}">
                                            <span style="color:#ffc600;display:block;">{{row.money}}元</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="mt20">
                                <pagination
                                    class="PaginationStyle"
                                    v-show="totals>0"
                                    :total="totals"
                                    :page.sync="forms.pageNum"
                                    :limit.sync="forms.pageSize"
                                    @pagination="getDatas(forms)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from "../../Pagination"
import {getPersonInfoList,getPersonInfoDetail,getServiceInfo,safeguardMsg,creditCardStatistics,creditCardRecords} from "@/api/elderlyInforDetails"
import {areaCode} from '@/api/areaCode'
import echarts from "echarts"
import Chart from "@/components/Chart"
export default {
    components:{pagination,Chart},
    props:['close'],
    data(){
        return{
            loading:false,
            height:'600px',
            streetOption:{},
            index:1,
            isDetail:false,
            tableData:[],
            total:0,
            form:{
                pageNum:1,
                pageSize:12,
                areaCode:areaCode
            },
            inforDetail:{},
            ruleForm:{
                pageNum:1,
                pageSize:7,
                areaCode:'',
                idCard:''
            },
            serveList:[],
            lastPage:0,
            //保障信息
            safeguardData:{
                homePensionSubsidy: 0,//居家养老补贴
                mealSubsidy: 0,//助餐补贴
                oldCardSubsidy: 0,//敬老卡津贴
            },
            totals:0,
            forms:{
                pageNum:1,
                pageSize:7,
                pensionId:''
            }
        }
    },
    methods:{
        changeTab(num){
            this.index=num
        },
        cellStyle({ row, column, rowIndex, columnIndex }){
            if (columnIndex === 0) {
                return ''
            }
        },
        closeBg(){
            this.isShowBg = false
        },
        getData(form){
            this.getDateList()
        },
        getDatas(forms){
            this.creditCardRecord()
        },
        closeDetail(){
            this.isDetail = false
        },
        lookMore(){
            this.ruleForm.pageNum++
            this.ruleForm.pageNum = this.ruleForm.pageNum>this.lastPage?1:this.ruleForm.pageNum
            this.serviceInfo()
        },
        serviceInfo(){
            getServiceInfo(this.ruleForm).then(res=>{
                if(res.code==0){
                    this.serveList = res.data.list
                    this.lastPage = res.data.lastPage
                }
            })
        },
        creditCardRecord(){
            creditCardRecords(this.forms).then(res=>{
                if(res.code==0){
                    this.cardRecordList = res.data.list;
                    this.totals = res.data.total;
                }
            })
        },
        showDetails(id,idCard,areaCode){
            this.isDetail = true
            this.ruleForm.idCard = idCard
            this.ruleForm.areaCode = areaCode
            this.forms.pensionId = id
            getPersonInfoDetail({id:id}).then(res=>{
                if(res.code==0){
                    this.inforDetail = res.data
                }
            })
            this.serviceInfo()
            safeguardMsg(id).then(res=>{
                if(res.code==0){
                    this.safeguardData = res.data;
                }else{
                    this.safeguardData = [];
                }
            })
            creditCardStatistics(this.dataId).then(res => {
                if(res.code === 0 && res.data){
                    let xAxisData = [ ]
                    let seriesData = []
                    res.data.forEach(item => {
                        xAxisData.push(item.key)
                        seriesData.push(item.value)
                    });
                    this.streetOption={
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            top: '15%',
                            right:'2%',
                            left:'5%',
                            bottom:'10%'
                        },                // legend: {
                        title:[
                            {
                                text: '设施街道分布',
                                left: '0%',
                                top: '5%',
                                textStyle: {
                                    fontSize: 22,
                                    color:'#fff'
                                }
                            },
                            {
                                text: '单位:次',
                                left: '92%',
                                top: '7%',
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
                                    fontSize: 16
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
                                data: seriesData,
                                lineStyle: {
                                    normal: {
                                        width: 3,
                                        color: {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: '#08fff8' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#08fff8' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#08fff8',
                                        borderWidth: 8,
                                        borderColor: "#08fff8"
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#0dc2c5'
                                        },
                                            {
                                                offset: 1,
                                                color: '#173650'
                                            }
                                        ], false)
                                    }
                                },
                            }
                        ]
                    }
                }
            });
            this.creditCardRecord()
        },
        getDateList(){
            this.loading = true
            getPersonInfoList(this.form).then(res=>{
                if(res.code==0){
                    this.loading = false
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
        },
        setDateTime(date) {
            let time;
            if (date === '') {
                time = new Date();
            } else {
                time = new Date(date.replace('+0000', ''));
            }

            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            let h = time.getHours();
            let mm = time.getMinutes();
            let s = time.getSeconds();
            if (m < 10) {
                m = "0" + m;
            }
            if (d < 10) {
                d = "0" + d;
            }
            if (h < 10) {
                h = "0" + h;
            }
            if (mm < 10) {
                mm = "0" + mm;
            }
            if (s < 10) {
                s = "0" + s;
            }
            return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
        },
    },
    mounted(){
        this.getDateList()
    }
}
</script>
<style lang="scss" scoped>
    .toast{
        width:1710px;
        height:1160px;
        background:url("../../../../../assets/images/dialog_bg1.png");
        background-size:100% 100%;
        background-repeat: no-repeat;
        padding: 0 30px;
    }
    .elderInforDetail{
        margin-left: 30px;
        width:3030px;
        height: 1160px;
        background:url("../../../../../assets/images/dialog_bg2.png");
        background-size:100% 100%;
        background-repeat: no-repeat;
        padding: 0 30px;
    }
    .inforMain{
        padding:0 0 30px 0;
        display: flex;
    }
    .inforLeft{
        width:955px;
        border-right:1px dashed #0eaeb4;
        height:1090px;
        font-size:26px;
        padding-right:30px;
        padding-top:30px;
        .inforLeftImg{
            text-align: center;
            width:360px;
            line-height: 420px;
        }
        p{
            font-size: 26px;
            margin-bottom: 20px;
        }
        .inforLabel{
            display: flex;
            flex-wrap: wrap;
            span{
                width:164px;height:58px;
                line-height: 58px;
                text-align: center;
                color:#02f2ed;
                border:1px solid #02f2ed;
                border-radius: 25px;
                margin-right: 20px;
                margin-bottom: 30px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
    .inforCenter{
        position: relative;
        padding:30px;
        width:1030px;
        border-right:1px dashed #0eaeb4;
        .inforCenterList{
            line-height: 115px;
            height:114px;
            border-bottom:1px dashed #137685;
            font-size: 26px;
        }
        .lookMore{
            color:#00fff8;
            font-size: 20px;
            text-align: center;
            position: absolute;
            bottom:60px;
            left:50%;
            margin-left:-40px;
            cursor: pointer;
        }
    }
    .inforRight{
        width:980px;
        height:1090px;
        padding:30px 0 30px 30px;
        .inforRightList{
            line-height: 115px;
            height:114px;
            border-bottom:1px dashed #137685;
            font-size: 26px;
            .moneyInfor{
                color:#19fff8;
            }
        }
        .bolidColor{
            font-weight: 900;
        }
    }
</style>
