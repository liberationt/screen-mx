<template>
    <div class="toastList">
        <div class="toastListTittle">关爱老人健康生活 <img @click="closeCareforList()" src="../../../../assets/images/close_dialog.png" alt=""></div> 
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180" align="center">
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center">
                </el-table-column>
                <el-table-column prop="id_card" label="服务项目" align="center">
                <el-table-column
                    prop="kt"
                    label="空调清洗"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="bx"
                    label="冰箱清洗"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="xyj"
                    label="洗衣机清洗"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="tp"
                    label="脱排清洗"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="xl"
                    label="线路安全检查"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                </el-table-column>
                </el-table>
            </div>
          <el-pagination
            class="Pagination"
            @current-change="handleCurrentChange"
            :current-page="this.form.pageNum"
            prev-text="上一页"
            :page-size="10"
            :pager-count="5"
            next-text="下一页"
            layout="->,total,prev, pager, next, jumper"
            hide-on-single-page
            :total="total">
          </el-pagination>
        </div>
    </div>
</template>
<script>
import { getOlderList } from "@/api/secondeScreen"
import dataList from "../json/carefor"
export default {
    props:['closeCareforList'],
    data(){
        return{
            form: {
                orgId: '',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            loading:false,
            tableData:[]
        }
    },
    methods:{
        handleCurrentChange(val){
            this.form.pageNum = val
            this.getData()
        },
        getData() {
            this.tableData = dataList.dataList.slice((this.form.pageNum-1)*this.form.pageSize,this.form.pageNum*this.form.pageSize)
            this.total = dataList.dataList.length
            this.loading = false;
        },
    },
    mounted(){
        this.form.orgId = this.orgId
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    
</style>