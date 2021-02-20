<template>
  <div class="displayFlex">
    <div class="toast">
      <div class="elderInforTitle displayFlex">
        <div class="inforTitleImg" style="cursor: inherit">服务老人信息列表</div>
        <div class="cursorPointer" @click="close">
          <img src="@/assets/images/guanbi.png" alt />
        </div>
      </div>
      <div class="elTableStyle">
        <el-table :data="tableData" v-loading="loading" style="width: 100%">
          <el-table-column align="center" prop="NAME" min-width="120" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="GENDER" width="150" label="性别"></el-table-column>
          <el-table-column align="center" prop="SID" width="250" label="身份证号"></el-table-column>
          <el-table-column align="center" width="200" prop="TELPHONE" label="联系方式"></el-table-column>
          <el-table-column align="center" prop="ADDRESS" width="150" label="所属街镇"></el-table-column>
          <el-table-column align="center" prop="COMMITTEE" label="所属居委" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="ADDRESS1" label="详细地址" min-width="120" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="mt20 paginationStyle">
        <!-- <pagination
          class="PaginationStyle"
          v-show="total>0"
          :total="total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getData(form)"
        /> -->
        <el-pagination
            class="Page"
            @current-change="currentChange"
            :current-page="form.pageNum"
            layout="->,prev, pager, next, jumper"
            :page-size="form.pageSize"
            :total="total"
            :hide-on-single-page="true">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// import pagination from "../../Pagination";
import { getLifeOlderList, getOlderPhoneList,getloveOlderList } from "@/api/thirdScreen";
import { areaCode } from "@/api/areaCode";
export default {
  // components: { pagination },
  props: ["close",'type'],
  data() {
    return {
      loading: false,
      height: "600px",
      streetOption: {},
      index: 1,
      isDetail: false,
      tableData: [],
      total: 0,
      form: {
        pageNum: 1,
        pageSize: 12,
        town: "闵行区"
      }
    };
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "";
      }
    },
    currentChange(val){
      this.form.pageNum = val
      this.getData(this.form)
    },
    closeBg() {
      this.isShowBg = false;
    },
    getData(form) {
      this.getDateList();
    },
    getDateList() {
      this.loading = true;
      if(this.type==1){
        getLifeOlderList(this.form).then(res => {
            if (res.code == 0) {
            this.loading = false;
            this.tableData = res.data.list;
            this.total = res.data.total;
            }
        });
      }else if(this.type==2){
        getOlderPhoneList(this.form).then(res => {
            if (res.code == 0) {
            this.loading = false;
            this.tableData = res.data.list;
            this.total = res.data.total;
            }
        });
      }else if(this.type==3){
          getloveOlderList(this.form).then(res => {
            if (res.code == 0) {
            this.loading = false;
            this.tableData = res.data.list;
            this.total = res.data.total;
            }
        });
      }
    }
  },
  mounted() {
    this.getDateList();
  }
};
</script>
<style lang="scss" scoped>
.toast {
  width: 1710px;
  height: 1160px;
  background: url("../../../../../assets/images/dialog_bg1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 0 30px;
}
</style>
