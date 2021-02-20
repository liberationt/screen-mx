<template>
    <div class="toastList">
        <div class="toastListTittle">养老服务补贴 <img @click="closeSubsidyList()" src="../../../../assets/images/close_dialog.png" alt=""></div> 
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180" align="center">
                </el-table-column>
                <el-table-column prop="idcard" label="身份证号码" align="center">
                    <template slot-scope="{row}">
                        <span>{{idCard(row.idcard)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="护理等级"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="经济状况"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="style"
                    label="服务方式"
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
import dataList from "../json/subsidy"
export default {
    props:['closeSubsidyList'],
    data(){
        return{
            form: {
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
           this.tableData=dataList.dataList.slice((this.form.pageNum-1)*this.form.pageSize,this.form.pageNum*this.form.pageSize)
           this.total = dataList.dataList.length
           this.loading = false
        },
        idCard (str) {    //str：要进行隐藏的变量  frontLen: 前面需要保留几位    endLen: 后面需要保留几位
            if (str === null) {
            return ''
            } else {
            var xing = '';
            for (var i=0;i<4;i++) {
                xing+='*';
            }
            return str.substring(0,4)+xing+str.substring(str.length - 4);
            }
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    
</style>