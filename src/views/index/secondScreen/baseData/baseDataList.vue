<template>
  <div >
    <div class="maskToast" v-if="!showList" @click.self="close()">
      <div class="toastList">
        <div class="toastListTittle">老人基础信息 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
          <div class="tableList">
            <el-table v-loading="loading" :data="tableData" style="width: 100%">
              <el-table-column prop="fullName" label="姓名" width="150" align="center">
                <template slot-scope="{row}">
                  <span style="color:#ffc600;display:block;cursor:pointer" @click="openDetails(row)">{{row.fullName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sex" label="性别" show-overflow-tooltip width="120" align="center"></el-table-column>
              <el-table-column prop="age" label="年龄" show-overflow-tooltip width="120" align="center"></el-table-column>
              <el-table-column label="身份证号" show-overflow-tooltip width="230" align="center">
                <template slot-scope="{row}">
                  <span>{{id_card(row.idCard)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="areaName" label="所属居委" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="censusAddr" label="户籍详细地址" show-overflow-tooltip align="center"></el-table-column>
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
      <detailOlder  :close="closeIt" :dataId="orgId" :dataIdCard="idCard"></detailOlder>
    </div>
  </div>
</template>

<script>
  import { olderNumTable } from "@/api/olderNumDetails";
  import detailOlder from "./detail"
  import areaCode from '@/api/areaCode'
  export default {
    name: "baseDataList",
    props:['close'],
    components:{
      detailOlder
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
        idCard: '',
        showList:false,
      }
    },
    methods: {
      //查看详情，打开养老顾问员列表
      openDetails(row) {
        this.showList = true;
        this.orgId = row.id;
        this.idCard = row.idCard
      },
      closeIt() {
        this.showList = false
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.form.pageNum = val;
        this.getData();
      },
      id_card (str) {
          if (str === null) {
          return ''
          } else {
          var xing = '';
          for (var i=0;i<4;i++) {
              xing+='*';
          }
          return str.substring(0,4)+xing+str.substring(str.length - 4);
          }
      },
      getData() {
        olderNumTable(this.form).then(res => {
          if (res.code === 0) {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.loading = false;
          }
        });
      }
    },
    mounted() {
      this.getData()
    }
  };
</script>

<style scoped>

</style>
