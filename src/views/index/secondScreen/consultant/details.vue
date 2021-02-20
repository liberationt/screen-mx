<template>
  <div  class="maskToast" @click.self="close()">
    <div class="toastList">
      <div class="toastListTittle">咨询记录 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
      <div class="record-bd">
        <div class="record-list">
          <div  class="record-list-title">服务事项</div>
          <div v-for="(item,index) in CRSData[0]" :key="index" class="record-list-content">
            <div>{{item.Label}}</div>
            <div>{{item.service_event_count}}</div>
          </div>
        </div>
        <div class="record-list">
          <div  class="record-list-title">服务结果</div>
          <div v-for="(item,index) in CRSData[1]" :key="index" class="record-list-content">
            <div>{{item.Label}}</div>
            <div>{{item.service_result_count}}</div>
          </div>
        </div>
        <div class="record-list">
          <div  class="record-list-title">来访人</div>
          <div v-for="(item,index) in CRSData[2]" :key="index" class="record-list-content">
            <div>{{item.Label}}</div>
            <div>{{item.visitor_type_count}}</div>
          </div>
        </div>
      </div>

      <div class="toastcontent" style="float: left;width: 100%">
        <div class="tableList">
          <el-table v-loading="loading" :data="tableData" style="width: 100%">
            <el-table-column prop="visitorTime" label="来访时间" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="visitorName" label="来访人" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="visitorTypeName" label="来访人类型" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="serviceEventName" label="服务事项" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="serviceResultName" label="服务结果" show-overflow-tooltip align="center">
              <template slot-scope="{row}">
                <span style="color:#ffc600;display:block;">{{row.serviceResultName}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
            class="Pagination"
            @current-change="handleCurrentChange"
            :current-page="this.form.pageNum"
            :pager-count="5"
            :page-size="5"
            prev-text="上一页"
            next-text="下一页"
            layout="->,total,prev, pager, next, jumper"
            hide-on-single-page
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { consultingRecordStatistics,consultingRecordTable} from "@/api/pensionAdvisersDetails";
  export default {
    name: "conDetails",
    props:['close', 'dataId'],
    data() {
      return {
        loading:true,
        tableData:[],
        total:0,
        form:{
          id:'',
          pageNum:1,
          pageSize:5
        },
        CRSData:[
          [
            {
              Label: "提供个性化养老建议",
              service_event: "provide_bardian",
              service_event_count: 0,
            },
            {
              Label: "养老设施或资源介绍",
              service_event: "introduction",
              service_event_count: 0,
            },
            {
              Label: "养老政策介绍",
              service_event: "pension_policy",
              service_event_count: 0,
            }
          ],
          [
            {
              Label: "当场解决",
              service_result: "spot_solve",
              service_result_count: 0,
            },
            {
              Label: "事后答复",
              service_result: "wait_reply",
              service_result_count: 0,
            },
            {
              Label: "无法答复",
              service_result: "reply_you",
              service_result_count: 0,
            }
          ],
          [
            {
              Label: "老人",
              visitor_type: "old_People",
              visitor_type_count: 0,
            },
            {
              Label: "家属",
              visitor_type: "family",
              visitor_type_count: 0,
            }
          ]
        ],
      }
    },
    mounted() {
      this.consultingRecordStatistics();
      this.form.id = this.dataId;
      this.consultingRecordTable();
    },
    methods: {
      handleCurrentChange(val){
        this.loading = true;
        this.form.pageNum = val;
        this.consultingRecordTable();
      },
      // 咨询记录统计
      consultingRecordStatistics() {
        consultingRecordStatistics(this.dataId).then(res => {
          if(res.code === 0){
            this.CRSData = res.data;
          }
        });
      },
      // 咨询记录列表
      consultingRecordTable() {
        consultingRecordTable(this.form).then(res => {
          if(res.code === 0){
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.loading = false;
          }
        });
      },
    }
  };
</script>

<style scoped lang="scss">
.record-bd {
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  .record-list {
    width: 30%;
    margin-right: 5%;
    float: left;
    .record-list-title {
      font-size: 20px;
      margin-bottom: 15px;
    }
    .record-list-content {
      width: 100%;
      padding-bottom: 10px;
      height: 35px;
      border-bottom: 6px solid #46e7f2;
      margin-bottom: 20px;
      div:first-of-type {
        width: 70%;
        font-size: 16px;
        float: left;
      }
      div:last-of-type {
        width: 30%;
        text-align: right;
        color: rgb(255, 198, 0);
        font-size: 20px;
        float: left;
      }
    }
  }
  .record-list:last-of-type {
    margin-right: 0;
  }
}
</style>
