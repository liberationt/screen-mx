<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">租赁合同信息列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop="signDate"
                        label="签署日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="contractNo"
                        label="合同编号"
                        min-width="100"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="productName"
                        label="产品名称及型号"
                        min-width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="fullName"
                        label="承租人姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="idCard"
                        label="承租人身份证号"
                        min-width="100"
                        show-overflow-tooltip
                        >
                        <template slot-scope="{row}">
                            <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="storeName"
                        label="租赁点"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="statusName"
                        label="合同状态"
                        width="150"
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
import {getAssistiveContract} from "@/api/elderlyInforDetails"
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
            getAssistiveContract(this.form).then(res=>{
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
