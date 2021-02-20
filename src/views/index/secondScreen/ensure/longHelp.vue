<template>
  <div >
    <div class="maskToast" v-if="!showList" @click.self="close()">
      <div class="toastList">
        <div class="toastListTittle">{{type}}列表 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
          <div class="tableList">
            <el-table v-loading="loading" :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="姓名" width="200" align="center" >
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="180" align="center" >
              </el-table-column>
              <el-table-column prop="idCard" label="身份证号" align="center"  >
                <template slot-scope="{row}">
                  <span v-if="row.idCard">{{row.idCard.replace(/^(.{4})(?:\d+)(.{4})$/,  "\$1****\$2")}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="assessType" label="评估类型" align="center"  >
              </el-table-column>
              <el-table-column prop="assessLevel" label="评估等级" align="center" >
              </el-table-column>
              <el-table-column prop="nurseType" label="护理类型" align="center" >
              </el-table-column>
              <el-table-column prop="nurseOrgName" label="护理机构" show-overflow-tooltip align="center" >
              </el-table-column>
              <el-table-column
                  prop="inDate"
                  label="申请日期"
                  align="center"
              >
                <template slot-scope="scope">
                  <span>{{setDateTime(scope.row.applyDate)}}</span>
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
  import { getlongHelp, getlongHelpForH11 } from "@/api/secondeScreen"
  import areaCode from '@/api/areaCode'
  export default {
    name: "longHelp",
    props:['close', 'type'],
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
          pageSize: 10,
          applyResultType: '',
          type: ''
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
        if (this.type === "长护险申请") {
          this.form.applyResultType = '';
          this.form.type = '';
          getlongHelp(this.form).then(res => {
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false
            }
          });
        } else if (this.type === "长护险通过人数") {
          this.form.applyResultType = '1';
          this.form.type = '';
          getlongHelp(this.form).then(res => {
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false
            }
          });
        } else if (this.type === "长护险未通过人数") {
          this.form.applyResultType = '2';
          this.form.type = '';
          getlongHelp(this.form).then(res => {
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false
            }
          });
        }else if (this.type === "养老机构照护") {
          this.form.type = '1';
          this.form.applyResultType = '';
          getlongHelpForH11(this.form).then(res => {
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false
            }
          });
        } else if (this.type === "社区居家照护") {
          this.form.type = '2';
          this.form.applyResultType = '';
          getlongHelpForH11(this.form).then(res => {
            if (res.code === 0) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.loading = false
            }
          });
        }
      },
      // 身份证格式
      idCard (str) {    //str：要进行隐藏的变量  frontLen: 前面需要保留几位    endLen: 后面需要保留几位
        if (str === null) {
          return ''
        } else {
          var len = str.length-8;
          var xing = '';
          for (var i=0;i<len;i++) {
            xing+='*';
          }
          return str.substring(0,4)+xing+str.substring(str.length - 4);
        }
      },
      // 时间
      setDateTime(date) {
        let time;
        if (date === '') {
          time = new Date();
        } else {
          time = new Date(date);
        }

        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        if (m < 10) {
          m = "0" + m;
        }
        if (d < 10) {
          d = "0" + d;
        }
        return y + '-' + m + '-' + d;
      },
      isInteger(obj) {
        return obj%1 === 0
      }
    },
    mounted(){
      this.getData()
    }
  };
</script>

<style scoped>

</style>
