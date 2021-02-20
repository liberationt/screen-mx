<template>
  <div class="displayFlex">
    <div class="toast">
      <div class="elderInforTitle displayFlex">
        <div class="inforTitleImg" style="cursor: inherit">录音记录</div>
        <div class="cursorPointer" @click="close">
          <img src="@/assets/images/guanbi.png" alt />
        </div>
      </div>
      <div class="elTableStyle">
        <el-table :data="tableData" :cell-style="cellStyle" v-loading="loading">
          <el-table-column align="center" prop="ANSWERTIME" width="350" label="开始时间"></el-table-column>
          <el-table-column align="center" prop="WARPUPTIME" width="350" label="结束时间"></el-table-column>
          <el-table-column align="center" prop="EXTENSION" label="分机号"></el-table-column>
          <el-table-column align="center" prop="ACNUM" label="主叫号"></el-table-column>
          <el-table-column align="center" prop="DCNUM" label="被叫号"></el-table-column>
        </el-table>
      </div>
      <div class="mt20 paginationStyle">
        <pagination
          class="PaginationStyle"
          v-show="total>0"
          :total="total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getData(form)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import pagination from "../../Pagination";
import { getPhoneList } from "@/api/thirdScreen";
import { areaCode } from "@/api/areaCode";
export default {
  components: { pagination },
  props: ["close"],
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
    changeTab(num) {
      this.index = num;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "";
      }
    },
    closeBg() {
      this.isShowBg = false;
    },
    getData(form) {
      this.getDateList();
    },
    getDateList() {
      this.loading = true;
      getPhoneList(this.form).then(res => {
        if (res.code == 0) {
          this.loading = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
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
