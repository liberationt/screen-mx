<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">服务老人列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle" v-loading="loading">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    >
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        width="80">
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
                        prop="committeeName"
                        label="所属居委"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="censusAddr"
                        label="地址"
                        min-width="120"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="grade"
                        label="等级"
                        width="150"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="subsidy"
                        label="补贴金额"
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
    </div>
</template>
<script>
import pagination from "../../Pagination"
import {getHomeList} from "@/api/elderlyInforDetails"
import {areaCode} from '@/api/areaCode'
export default {
    components:{pagination},
    props:['close','orgTypes'],
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
                areaCode:''
            },
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
        getDateList(){
            this.loading = true
            getHomeList(this.form).then(res=>{
                if(res.code==0){
                    this.loading = false
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
        },
    },
    mounted(){
        this.form.areaCode = this.orgTypes
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
</style>
