<template>
  <div class="displayFlex">
    <div class="toast">
      <div class="elderInforTitle displayFlex">
        <div class="inforTitleImg" style="cursor: inherit">主动关爱工单列表</div>
        <div class="cursorPointer" @click="close">
          <img src="@/assets/images/guanbi.png" alt />
        </div>
      </div>
      <div class="elTableStyle">
        <el-table :data="tableData" :cell-style="cellStyle" v-loading="loading">
          <el-table-column align="center" prop="WORKORDERNO" label="工单编号" min-width="100" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="WORKORDERSTATES" label="工单状态"></el-table-column>
          <el-table-column align="center" prop="ID" width="200" label="客户编号"></el-table-column>
          <el-table-column align="center" width="240" prop="NAME" label="客户姓名"></el-table-column>
          <el-table-column align="center" prop="ADDRESS" width="150" label="所属街镇"></el-table-column>
          <el-table-column align="center" prop="COMMITTEE" label="所属居委" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="FCD" label="关爱日期" min-width="100"></el-table-column>
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
import { getloveList } from "@/api/thirdScreen";
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
      getloveList(this.form).then(res => {
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
