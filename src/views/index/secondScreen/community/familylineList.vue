<template>
    <div class="toastList">
        <div class="toastListTittle">居家环境适老化改造<img @click="closeFamilylineList()" src="../../../../assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180" align="center">
                </el-table-column>
                <el-table-column prop="breathday"  label="出生年月" width="180" align="center">
                </el-table-column>
                <el-table-column prop="address" label="家庭住址" width="180" align="center">
                </el-table-column>
                <el-table-column
                    prop="committee"
                    label="所属居委"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column prop="cf" label="室/厅/卫/厨" width="180" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话" width="180" align="center">
                </el-table-column>
                <el-table-column
                    prop="bq"
                    label="标签"
                    align="center"
                    show-overflow-tooltip
                >
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
import dataList from "../json/oldhome"
export default {
    props:['closeFamilylineList'],
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
            this.total=dataList.dataList.length
            this.loading = false;
        },
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>

</style>
