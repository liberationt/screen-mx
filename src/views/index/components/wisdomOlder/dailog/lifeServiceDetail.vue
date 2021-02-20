<template>
  <div class="life-detail">
    <div class="elderInforTitle displayFlex">
      <div class="inforTitleImg" style="cursor: inherit">生活服务工单详情</div>
      <div class="cursorPointer" @click="close"><img src="@/assets/images/guanbi.png" alt=""></div>
    </div>
    <div class="table-list" style="margin-top: 40px">
      <div style="width: 209px; height: 1009px; float: left;">
        <img src="@/assets/images/gdxq_bg.png" alt="">
      </div>
      <div class="order-list">
        <div class="order-list-item">
          <span>工单编号：{{create.ORDERNO}}</span>
          <span>用户名称：{{create.NAME}}</span>
          <span>联系地址：{{create.ADDRESS1}}</span>
          <span>来电电话：{{create.CULTEL}}</span>
          <span>供应商：{{create.SUPPLIERNAME}}</span>
          <span>服务类型：{{create.SUNAME}}</span>
          <span style="width: 100%">服务要求：{{create.SEVICECONTENT}}</span>
          <span>服务预约日期：{{create.RESERVEDATE}}</span>
          <span>工单处理时间：{{create.FCD}}</span>
        </div>
        <div class="order-list-item">
          <span>供应商：{{dispatch.SUPPLIER_NAME}}</span>
          <span>接单人电话：{{dispatch.TELEPHONE}}</span>
          <span>派单方式：
                <span v-if="dispatch.TYPE=='1'">电话</span>
                <span v-if="dispatch.TYPE=='2'">短信</span>
                <span v-if="dispatch.TYPE=='3'">QQ</span>
                <span v-if="dispatch.TYPE=='4'">邮件</span>
                <span v-if="dispatch.TYPE=='5'">电话</span>
                <span v-if="dispatch.TYPE=='6'">APP派单</span>
              </span>
          <span>供应商是否受理：{{isWork(dispatch.IS_WOKR)}}</span>
          <span>确定服务日期：{{dispatch.SERVE_TIME}}</span>
          <span>工单处理时间：{{myData.FCD}}</span>
        </div>
        <div class="order-list-item">
          <span>用户电话是否接通：{{isSure(myReturn.IS_CALL)}}</span>
          <span>供应商是否联系用户：{{sIsCall(myReturn.SUPILER_IS_CALL)}}</span>
          <span style="width: 100%">实际服务内容：{{myReturn.SERVER_CONTENT}}</span>
          <span>工单处理时间：{{myReturn.FCD}}</span>
        </div>
        <div class="order-list-item">
          <span>用户电话是否接通：{{isSure(confirm.IS_CALL)}}</span>
          <span>供应商是否联系用户：{{sIsCall(confirm.SUPPLIER_IS_CALL)}}</span>
          <span>供应商确认服务结果：{{isReason(confirm.SUPPLIER_REASON)}}</span>
          <span>确认方式：{{isConfirm(confirm.CONFIRM_TYPE)}}</span>
          <span>服务日期：{{confirm.SERVERTIME}}</span>
          <span>实际服务内容：{{confirm.SERVER_CONTENT}}</span>
          <span>工单处理时间：{{confirm.FCD}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDetail } from "@/api/order"
  export default {
    name: "lifeServiceDetail",
    props: ['close', 'id'],
    data() {
      return {
        create: {
          ORDERNO: '',
          NAME: '',
          ADDRESS1: '',
          CULTEL: '',
          SUPPLIERNAME: '',
          SUNAME: '',
          SEVICECONTENT: '',
          RESERVEDATE: '',
          FCD: ''
        },
        dispatch: {
          SUPPLIER_NAME: '',
          TELEPHONE: '',
          IS_WOKR: '',
          SERVE_TIME: ''
        },
        myReturn: {
          IS_CALL: '',
          SUPILER_IS_CALL: '',
          SERVER_CONTENT: '',
          FCD: ''
        },
        confirm: {
          IS_CALL: '',
          SUPPLIER_IS_CALL: '',
          SUPPLIER_REASON: '',
          CONFIRM_TYPE: '',
          SERVERTIME: '',
          SERVER_CONTENT: '',
          FCD: ''
        },
        myData: {
          FCD: ''
        }
      }
    },
    mounted() {
      this.getDetail(this.id)
    },
    methods: {
      // 是否受理
      isWork(type) {
        switch (type) {
          case "1":
            return "是";
            break;
          case "2":
            return "否";
            break;
          case "3":
            return "无人应答";
            break
        }
      },
      // 供应商是否联系用户
      sIsCall(type) {
        switch (type) {
          case "0":
            return "是";
            break;
          case "1":
            return "否";
            break;
        }
      },
      // 确认方式
      isConfirm(type) {
        switch (type) {
          case "1":
            return "电话";
            break;
          case "2":
            return "短信";
            break;
          case "3":
            return "QQ";
            break;
          case "4":
            return "邮件";
            break;
        }
      },
      // 用户确认
      isSure(type) {
        if (type !== undefined) {
          const arr = type.split(",");
          var mydatas = "";
          arr.forEach(item => {
            switch (item) {
              case "0":
                mydatas = mydatas + "是";
                break;
              case "1":
                mydatas = mydatas + "否";
                break;
              case "2":
                mydatas = mydatas + "多次联系用户均失败，回访供应商";
                break;
            }
          })
          return mydatas;
        }
      },
      // 供应商确认服务结果
      isReason(type) {
        switch (type) {
          case "1":
            return "完成服务";
            break;
          case "2":
            return "未完成服务,已约定服务日期  ";
            break;
          case "3":
            return "未完成服务,催促供应商";
            break;
          case "4":
            return "更换供应商";
            break;
          case "5":
            return "挂起有合适供应商再告知";
            break;
          case "6":
            return "服务失败";
            break;
          case "7":
            return "未联系到本人无法确认服务结果";
            break;
        }
      },
      // 获取详情
      getDetail(id) {
        getDetail({orderId: id}).then(res =>{
          if (res.code === 0) {
            if (res.data.create !== null) {
              this.create = res.data.create;
            }
            if (res.data.dispatch !== null) {
              this.dispatch = res.data.dispatch;
            }
            if (res.data.return !== null) {
              this.myReturn = res.data.return;
            }
            if (res.data.confirm !== null) {
              this.confirm = res.data.confirm
            }
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
.life-detail {
  margin-left: 30px;
  width:3230px;
  height: 1160px;
  background:url("../../../../../assets/images/dialog_bg2.png");
  background-size:100% 100%;
  background-repeat: no-repeat;
  padding: 0 30px;
}
.order-list {
  width: 90%;
  float: left;
  margin-left: 40px;
  .order-list-item {
    width: 100%;
    padding: 40px 0 25px 0;
    border-bottom: 1px dashed #05fdfd;
    span {
      display: inline-block;
      width: 50%;
      padding: 0 20px 30px 0;
      vertical-align: top;
      line-height:24px;
      font-size: 24px;
      letter-spacing: 2px;
    }
  }
  .order-list-item:first-of-type {
    padding-top: 0px
  }
  .order-list-item:last-of-type {
    border-bottom: 0;
  }
}
</style>
