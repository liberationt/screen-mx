<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">服务工单列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop="orderNo"
                        label="工单编号"
                        min-width="160"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="streetName"
                        label="所属街镇"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="organName"
                        label="所属机构"
                        min-width="120"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="老人姓名"
                        width="140"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="serviceMen"
                        label="服务员工姓名"
                        width="180"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="programName"
                        label="照护方案名称"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="objectName"
                        label="服务项目名称"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="timeCount"
                        label="服务时长"
                        width="140"
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
// import {getPersonInfoList} from "@/api/elderlyInforDetails"
import {getOrderList} from "@/api/homeCare"
import {areaCode} from '@/api/areaCode'
export default {
    components:{pagination},
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
            getOrderList(this.form).then(res=>{
                if(res.code==0){
                    this.loading = false
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
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
</style>
