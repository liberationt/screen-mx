<template>
    <div class="toastList">
        <div class="toastListTittle">主动关爱列表 <img @click="closeactivecareList()" src="../../../../assets/images/close_dialog.png" alt=""></div> 
        <div class="toastcontent">
            <div class="tableList">
               <el-table v-loading="loading" :data="tableData" style="width: 100%">
                    <el-table-column prop="WORKORDERNO" label="工单编号" align="center" >
                    </el-table-column>
                    <el-table-column prop="WORKORDERSTATES" label="工单状态"  align="center">
                    </el-table-column>
                    <el-table-column prop="ID" label="客户编号" align="center">
                    </el-table-column>
                    <el-table-column prop="NAME" label="客户姓名" align="center">
                    </el-table-column>
                    <el-table-column prop="LMD" label="关爱日期" align="center">
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
import { getLoveList } from "@/api/order"
export default {
    props:['closeactivecareList','id'],
    data(){
        return{
            form: {
                area: '',
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
            this.form.area = this.id;
            getLoveList(this.form).then(res => {
            if (res.code === 0) {
                this.tableData = res.data.list;
                this.tableData.forEach((item, index) => {
                switch (item.WORKORDERSTATES) {
                    case "0":
                    this.tableData[index].WORKORDERSTATES = "待申领";
                    break;
                    case "1":
                    this.tableData[index].WORKORDERSTATES = "待处理";
                    break;
                    case "2":
                    this.tableData[index].WORKORDERSTATES = "完成关爱";
                    break;
                    case "3":
                    this.tableData[index].WORKORDERSTATES = "完成电话联系人";
                    break;
                    case "4":
                    this.tableData[index].WORKORDERSTATES = "完成短信联系人";
                    break;
                    case "5":
                    this.tableData[index].WORKORDERSTATES = "未接通待后续处理";
                    break;
                    case "6":
                    this.tableData[index].WORKORDERSTATES = "待联系居委";
                    break;
                    case "7":
                    this.tableData[index].WORKORDERSTATES = "无手机未发送短信";
                    break;
                    case "8":
                    this.tableData[index].WORKORDERSTATES = "次日跟进";
                    break;
                    case "9":
                    this.tableData[index].WORKORDERSTATES = "主动来电报平安";
                    break;
                }
                });
                this.total = res.data.total;
                this.loading = false;
            }
            });
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    
</style>