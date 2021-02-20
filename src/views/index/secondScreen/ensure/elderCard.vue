<template>
  <div >
    <div class="maskToast" v-if="!showList" @click.self="close()">
      <div class="toastList">
        <div class="toastListTittle">敬老卡信息列表 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
          <div class="tableList">
            <el-table v-loading="loading" :data="tableData" style="width: 100%">
              <el-table-column prop="fullName" label="姓名" show-overflow-tooltip width="200" align="center" ></el-table-column>
              <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip align="center" >
                <template slot-scope="{row}">
                  <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="openBank" label="发卡银行" show-overflow-tooltip align="center" ></el-table-column>
              <el-table-column prop="bankAccount" label="银行卡号" show-overflow-tooltip align="center" ></el-table-column>
              <el-table-column prop="ecCode" label="敬老卡号" show-overflow-tooltip align="center" >
              </el-table-column>
              <el-table-column prop="subsidy" label="津贴标准" show-overflow-tooltip width="220" align="center" >
                <template slot-scope="scope">
                  <span v-if="scope.row.subsidy != null">{{scope.row.subsidy}}元/月</span>
                  <span v-else>--</span>
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
    <div class="maskToast" v-if="showList">

    </div>
  </div>
</template>

<script>
  import { getOlderCard } from "@/api/secondeScreen"
  import areaCode from '@/api/areaCode'
  export default {
    name: "elderCard",
    props:['close'],
    components:{
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
        getOlderCard(this.form).then(res => {
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
  };
</script>

<style scoped>

</style>
