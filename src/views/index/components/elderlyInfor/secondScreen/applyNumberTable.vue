<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">{{titleName}}信息列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="120"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        width="80"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="idCard"
                        label="身份证号"
                        >
                        <template slot-scope="{row}">
                            <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="assessType"
                        label="评估类型"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="assessLevel"
                        label="评估等级"
                        width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="nurseType"
                        label="护理类型"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="nurseOrgName"
                        label="护理机构"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="applyDate"
                        label="申请日期"
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
                    layout="->,prev, pager, next, jumper"
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
import {getlongHelp,getlongHelpForH11} from "@/api/secondeScreen"
import {areaCode} from '@/api/areaCode'
export default {
    components:{pagination},
    props:['close','type','orgTypes','titleName'],
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
            if(this.type == 1){
                getlongHelp(this.form).then(res=>{
                    if(res.code==0){
                        this.loading = false
                        this.tableData = res.data.list
                        this.total = res.data.total
                    }
                })
            }else{
                getlongHelpForH11(this.form).then(res=>{
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
        if(this.type == '1'){
            this.form.applyResultType = this.orgTypes
        }else{
            this.form.type = this.orgTypes
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
