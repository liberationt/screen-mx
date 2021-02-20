<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">智慧养老信息列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop="NAME"
                        label="姓名"
                        width="140"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="GENDER"
                        label="性别"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="AGE"
                        label="年龄"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="SID"
                        label="身份证号"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span v-if="row.SID">{{row.SID.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ADDRESS"
                        label="所属街镇"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="COMMITTEE"
                        label="所属居委"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="ADDRESS1"
                        label="户籍详细地址"
                        align="center"
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
import {areaCode} from '@/api/areaCode'
import {getSmartPension} from "@/api/elderlyInforDetails"
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
                town: "闵行区"
            },
        }
    },
    methods:{
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
            getSmartPension(this.form).then(res=>{
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
