<template>
  <div>
    <div class="maskToast" @click.self="close()">
      <div class="toastList">
        <div class="toastListTittle">养老顾问员列表 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
          <div class="tableList">
            <el-table v-loading="loading" :data="tableData" style="width: 100%">
              <el-table-column prop="fullName" label="姓名" show-overflow-tooltip align="center" width='200'></el-table-column>
              <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center" width='200'></el-table-column>
              <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="orgName" label="所属顾问点" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="workTypeName" label="劳动关系" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="serviceNumber" label="本月咨询记录数"  show-overflow-tooltip align="center" width='200'>
                <template slot-scope="{row}">
                  <span style="color:#ffc600;display:block;cursor:pointer;" @click="openDetails(row)">{{row.serviceNumber}}</span>
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
    <div>
      <conDetails v-if="showDeatil" :dataId="id" :close="closeDetails"></conDetails>
    </div>
  </div>
</template>

<script>
  import { consultantMemberTable } from "@/api/pensionAdvisersDetails";
  import areaCode from '@/api/areaCode'
  import conDetails from './details'
  export default {
    name: "conMan",
    props:['close', 'dataId'],
    components: {
      conDetails
    },
    watch:{
      dataId:{
        handler() {
          this.form.id = this.dataId;
          this.consultantMemberTable();
        }
      },
    },
    data(){
      return{
        loading:true,
        tableData: [],
        total: 0,
        form: {
          id:'',
          pageNum:1,
          pageSize:10
        },
        orgId: '',
        showList: false,
        showDeatil: false
      }
    },
    methods:{
      //关闭弹框
      closeDetails(){
        this.showDeatil = false;
      },
      //查看详情，打开咨询记录列表
      openDetails(row){
        this.showDeatil = true;
        this.id = row.id
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.form.pageNum = val;
        this.getData();
      },
      getData() {
        consultantMemberTable(this.form).then(res => {
          if(res.code === 0){
            this.tableData = res.data.list;
            this.tableData.forEach(item => {
              item.idCard = item.idCard.substr(0, 6) + '****' + item.idCard.substr(14);
            });
            this.total = res.data.total;
            this.loading = false;
          }
        });
      }
    },
    mounted(){
      this.form.id = this.dataId;
      if(!this.dataId){
        this.form.areaCode = areaCode.areaCode;
      }
      this.getData()
    }
  };
</script>

<style scoped>

</style>
