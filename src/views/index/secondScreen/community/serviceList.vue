<template>
    <div class="toastList">
        <div class="toastListTittle">服务对象列表 <img @click="closeserviceList()" src="../../../../assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                    <el-table-column prop="fullName" label="姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="sexName" label="性别" align="center">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" align="center">
                    </el-table-column>
                    <el-table-column prop="idCard" label="身份证号" align="center">
                        <template slot-scope="{row}">
                            <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="liveStatusName" label="标签" align="center">
                    </el-table-column>
                    <el-table-column prop="volunteerName" label="志愿者" align="center">
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
import { getVolunteerIdList } from "@/api/secondeScreen"
export default {
    props:['closeserviceList','id'],
    data(){
        return{
            form: {
                id: '',
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
            getVolunteerIdList(this.form).then(res => {
                if (res.code === 0) {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                }
            });
        },
    },
    mounted(){
        this.form.id = this.id
        this.getData()
    }
}
</script>
<style lang="scss" scoped>

</style>
