<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">{{titleName}}列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop="orgName"
                        label="机构名称"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-if="type==2"
                        prop="advisorTypeName"
                        label="顾问点类型"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        v-else
                        prop="orgTypeName"
                        label="机构类型"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="street"
                        label="所属街镇"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="committee"
                        label="所属居委"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="addr"
                        label="详细地址"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="咨询电话"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                </el-table>
            </div>
            <div class="mt20 paginationStyle">
                <!-- <pagination
                    class="PaginationStyle"
                    v-show="total>0"
                    :total="total"
                    :page.sync="form.pageNum"
                    :limit.sync="form.pageSize"
                    @pagination="getData(form)"
                /> -->
                <el-pagination
                    class="Page"
                    @current-change="currentChange"
                    :current-page="form.pageNum"
                    layout="->,prev, pager, next, jumper"
                    :page-size="form.pageSize"
                    :total="total"
                    :hide-on-single-page="true">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
// import pagination from "../../Pagination"
import {getDataListThere,getPointThere} from "@/api/communityInfor"
import {areaCode} from '@/api/areaCode'
export default {
    // components:{pagination},
    props:['close','titleName','orgTypes','type'],
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
                areaCode:areaCode,
                orgTypes:''
            },
        }
    },
    methods:{
        currentChange(val){
            this.form.pageNum = val
            this.getData(this.form)
        },
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
            if(this.type==1){
                getDataListThere(this.form).then(res=>{
                    if(res.code==0){
                        this.loading = false
                        this.tableData = res.data.list
                        this.total = res.data.total
                    }
                })
            }else{
                getPointThere(this.form).then(res=>{
                    if(res.code==0){
                        this.loading = false
                        this.tableData = res.data.list
                        this.total = res.data.total
                    }
                })
            }

        },
    },
    mounted(){
        if(this.type==1){
            this.form.orgTypes = this.orgTypes
        }
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
