<template>
  <div >
    <div class="maskToast" v-if="!showList" @click.self="close()">
      <div class="toastList">
        <div class="toastListTittle">养老顾问点列表 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
          <div class="tableList">
            <el-table v-loading="loading" :data="tableData" style="width: 100%">
              <el-table-column prop="orgName" label="顾问点名称" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="typeName" label="顾问点类型"  show-overflow-tooltip align="center" width="200"></el-table-column>
              <el-table-column prop="phone" label="咨询电话" align="center" show-overflow-tooltip width="200"></el-table-column>
              <el-table-column prop="addr" label="详细地址" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="empCount" label="顾问员数量"  show-overflow-tooltip align="center" width='200'>
                <template slot-scope="{row}">
                  <span style="color:#ffc600;cursor: pointer;display:block;" @click="openDetails(row)">{{row.empCount}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
              class="Pagination"
              @current-change="handleCurrentChange"
              :current-page="this.form.pageNum"
              :pager-count="5"
              :page-size="10"
              prev-text="上一页"
              next-text="下一页"
              layout="->,total,prev, pager, next, jumper"
              hide-on-single-page
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="showList">
      <conMan :close="closeIt" :dataId="orgId"></conMan>
    </div>
  </div>
</template>
<script>
  import { consultantPointTable } from "@/api/pensionAdvisersDetails";
  import conMan from './conMan'
  import areaCode from '@/api/areaCode'
  export default {
    name: "point",
    props:['close'],
    components:{
      conMan
    },
    data(){
      return{
        loading:true,
        tableData:[],
        total:0,
        form: {
          areaCode: areaCode.areaCode,
          pageNum: 1,
          pageSize: 10
        },
        orgId:'',
        showList:false,
      }
    },
    methods:{
      //查看详情，打开养老顾问员列表
      openDetails(row){
        this.showList = true;
        this.orgId = row.id;
        this.$emit("openDetails",row.id);
      },
      closeIt() {
        this.showList = false
      },
      handleCurrentChange(val){
        this.loading = true;
        this.form.pageNum = val;
        this.getData();
      },
      getData(){
        consultantPointTable(this.form).then(res => {
          if(res.code === 0){
            this.tableData = res.data.list;
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
