<template>
    <div class="toastList">
        <div class="toastListTittle">入住老人 <img @click="closeOldpeopleList()" src="../../../../assets/images/close_dialog.png" alt=""></div> 
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                <el-table-column prop="fullName" label="姓名" width="180" align="center">
                </el-table-column>
                <el-table-column prop="sex"  label="性别" width="180" align="center">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="180" align="center">
                </el-table-column>
                <el-table-column prop="id_card" label="身份证号码" align="center">
                </el-table-column>
                <el-table-column
                    prop="roomBedNo"
                    label="房间床位号"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="inDate"
                    label="入住时间"
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
import { getOlderList } from "@/api/secondeScreen"
export default {
    props:['closeOldpeopleList','orgId'],
    data(){
        return{
            form: {
                orgId: '',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            loading:true,
            tableData:[]
        }
    },
    methods:{
        handleCurrentChange(val){
            this.form.pageNum = val
            this.getData()
        },
        getData() {
            getOlderList(this.form).then(res => {
                if (res.code === 0) {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                }
            });
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