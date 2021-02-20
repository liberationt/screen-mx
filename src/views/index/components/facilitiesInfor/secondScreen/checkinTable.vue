<template>
    <div class="displayFlex">
        <div class="toast">
            <div class="elderInforTitle displayFlex">
                <div class="inforTitleImg" style="cursor: inherit">入住老人信息列表</div>
                <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
            </div>
            <div class="elTableStyle">
                <el-table
                    :data="tableData"
                    :cell-style="cellStyle"
                    v-loading="loading"
                    >
                    <el-table-column
                        prop="fullName"
                        label="姓名"
                        width="200"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        width="200"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="age"
                        label="年龄"
                        width="200"
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
                            prop="roomBedNo"
                            label="房间床位号"
                            width="600"
                            show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orgName"
                        label="入住机构"
                        width="400"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column
                        prop="streetName"
                        label="所属街镇"
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
import {getOrgtype} from "@/api/elderlyInforDetails"
import {areaCode} from '@/api/areaCode'
export default {
    components:{pagination},
    props:['close','orgType'],
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
            getOrgtype(this.form).then(res=>{
                if(res.code==0){
                    this.loading = false
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
        },
    },
    mounted(){
        this.form.orgType = this.orgType
        this.getDateList()
    }
}
</script>
<style lang="scss" scoped>
    .toast{
        width:2282px;
        height:1160px;
        background:url("../../../../../assets/imgYu/home_dialog_bg2.png");
        background-size:100% 100%;
        background-repeat: no-repeat;
        padding: 0 30px;
    }
</style>
