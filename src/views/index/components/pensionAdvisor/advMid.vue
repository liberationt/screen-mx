<template>
  <div class="adv-mid">
    <div class="inforTitle" >
      <div class="inforTitleImg" style="cursor: inherit">智能养老顾问</div>
      <div class="gw-bd">
        <div class="gw-bd-input">
          <input type="text" v-model.trim="idCard" placeholder="请输入老人身份证查询">
          <span @click="handleSearch"><img src="../../../../assets/imgYu/jiansuo_icon.png" alt=""></span>
          <div class="gw-dailog" v-if="isTs">
            <img src="../../../../assets/imgYu/ts.png" alt="">
            <a>{{ tsTitle }}</a>
            <span class="gw-gb" @click="closeTs"><img src="../../../../assets/images/guanbi.png" alt=""></span>
          </div>
        </div>
        <div class="gw-bd-mes">
          <span>姓名：{{ name }}</span>
          <span>|</span>
          <span>年龄：{{ age }}</span>
          <span>|</span>
          <span>性别：{{ sex }}</span>
          <span>|</span>
          <span>所属街道：{{ jiedao }}</span>
          <span>|</span>
          <span>所属居委：{{ juwei }}</span>
        </div>
        <div class="gw-bd-mes">
          <span>住址：{{ address }}</span>
        </div>
        <div class="gw-bd-mes">
          标签：
          <div style="display: inline-block" v-for="(item, index) in tags" :key="index" :title="item">
            <span>{{ item }}</span>
            <span v-if="tags.length - 1 !== index">|</span>
          </div>
        </div>
        <div class="gw-bd-tab">
          <span v-for="item in tabs" :key="item.type" :class="[isTab === item.type ? 'ischoose' : '']" @click="chooseTab(item.type)">{{ item.name }}</span>
        </div>
        <div class="gw-bd-list" v-if="isTab === '1'" >
          <div class="gw-bd-list-item" v-for="item in policyList" :key="item.id">
            <div class="gw-bd-list-item-bd" style="cursor: pointer" @click="openZc(item.id)">
              <div class="gw-bd-list-title" :title=item.title>{{ item.title }}</div>
              <div class="gw-bd-list-type">
                <span style="padding-right: 30px">政策类型：{{ item.classify1 }}</span>
                <span>发布日期：{{ getDate(item.pubDate) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="gw-bd-list" v-if="isTab === '2'" >
          <div class="gw-bd-list-item" v-for="item in serviceList" :key="item.id">
            <div class="gw-bd-list-item-bd" >
              <div class="gw-bd-list-title" :title=item.serviceName>{{ item.serviceName }}</div>
              <div class="gw-bd-list-type">
                <span style="padding-right: 30px">服务范围：{{ item.minAge }} - {{ item.maxAge }}</span>
                <span>申请方式：{{ item.applyWay }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isTab === '3'" class="older-tab-content">
          <el-table
            :data="institutionList"
            style="width: 100%; "
            tooltip-effect="dark"
          >
            <el-table-column
              prop="orgName"
              label="机构名称"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="orangeColor"  style="cursor: pointer"
                      @click="getOrderDetail(scope.row.orgId, scope.row.orgType)">{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>F
            <el-table-column
              prop="orgType"
              label="机构类型"
            ></el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
            ></el-table-column>
            <el-table-column
              prop="addr"
              label="地址"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div>
        <div v-if="isTab === '4'" class="older-tab-content">
          <el-table :data="facilityList" style="width: 100%; ">
            <el-table-column
                    prop="orgName"
                    label="机构名称"
                    show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="orangeColor" style="cursor: pointer"
                      @click="getOrderDetail(scope.row.orgId, scope.row.orgType)">{{ scope.row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column
                    prop="orgType"
                    label="机构类型"
            ></el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话"
            ></el-table-column>
            <el-table-column
                    prop="addr"
                    label="地址"
                    show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div>
        <div style="clear: both"></div>
        <div class="gw-bd-list-more" v-if="total > 10">
          <span @click="changeList">加载更多</span>
        </div>
      </div>
    </div>
    <zcDeatail v-if="isDetailZc" :id="zcId" :close="closeZc"></zcDeatail>
    <jjDetail class="toastImg" :close="closeDetail" :id="detailId" :instituType='instituType' v-if="isDetail"/>
  </div>
</template>

<script>
  import { areaCode } from '@/api/areaCode'
  import { getPensionAdvices } from "@/api/pensionAdviser";
  import zcDeatail from "./zcDeatail";
  import jjDetail from "../facilitiesInfor/jjDetail"
  export default {
    name: "advMid",
    components: {
      zcDeatail,
      jjDetail
    },
    data() {
      return {
        isDetailZc: false,
        form: {
          name: "刘秀",
          age: "61",
          sex: "女",
          addOne: "浦锦街道",
          addTwo: "的时间里",
        },
        tabs: [{
          name: "政策咨询",
          type: "1"
        },{
          name: "服务项目",
          type: "2"
        },{
          name: "养老机构",
          type: "3"
        },{
          name: "社区设施",
          type: "4"
        }],
        isTab: "1",
        idCard: "",
        // 政策咨询
        policyList: [],
        policyPage: 1,
        policyPageSize: 10,
        policyTotal: 0,
        // 服务项目
        serviceList: [],
        servicePage: 1,
        servicePageSize: 10,
        serviceTotal: 0,
        // 养老机构
        institutionList: [],
        institutionPage: 1,
        institutionPageSize: 10,
        institutionTotal: 0,
        // 社区设施
        facilityList: [],
        facilityPage: 1,
        facilityPageSize: 10,
        facilityTotal: 0,
        name: "",
        sex: "",
        age: "",
        address: "",
        juwei: "",
        jiedao: "",
        tags: [],
        tableData: [],
        total: 0,
        tsTitle: '',
        isTs: false,
        zcId: '',
        isDetail: false,
        detailId:'',
        instituType: ''
        // orderForm: {
        //   area: "闵行区",
        //   flag: 0
        // }
      }
    },
    methods: {
      openZc(id) {
        this.isDetailZc = true
        this.zcId = id
      },
      closeZc() {
        this.isDetailZc = false
      },
      closeTs() {
        this.isTs = false
      },
      chooseTab(type) {
        this.isTab = type;
        this.isTs = false
        if (this.idCard === "") {
          this.isTs = true
          this.tsTitle = '身份证号不能为空, 请输入身份证号!'
          return false;
        }
        if (this.isTab === "1") {
          this.getPolicyList("1");
        } else if (this.isTab === "2") {
          this.getServiceList("1");
        } else if (this.isTab === "3") {
          this.getInstitutionList("1");
        } else if (this.isTab === "4") {
          this.getFacilityList("1");
        }
      },
      changeList() {
        this.isTs = false
        if (this.idCard === "") {
          this.isTs = true
          this.tsTitle = '身份证号不能为空, 请输入身份证号!'
          return false;
        }
        if (this.isTab === "1") {
          this.getPolicyList();
        } else if (this.isTab === "2") {
          this.getServiceList();
        } else if (this.isTab === "3") {
          this.getInstitutionList();
        } else if (this.isTab === "4") {
          this.getFacilityList();
        }
      },
      // 搜索
      handleSearch() {
        this.isTs = false
        if (this.idCard === "") {
          this.isTs = true
          this.tsTitle = '身份证号不能为空, 请输入身份证号!'
          return false;
        }
        if (this.isTab === "1") {
          this.getPolicyList("1");
        } else if (this.isTab === "2") {
          this.getServiceList("1");
        } else if (this.isTab === "3") {
          this.getInstitutionList("1");
        } else if (this.isTab === "4") {
          this.getFacilityList("1");
        }
      },
      getPolicyList(num) {
        let params = {
          selectType: 1,
          idCard: this.idCard,
          pageNum: num
            ? num
            : this.getPage(
              this.policyPage,
              this.policyPageSize,
              this.policyTotal,
              this.policyList.length
            ),
          areaCode: areaCode,
          pageSize: this.policyPageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.isTs = false
              if(!res.data.name){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码系统中不存在，请添加老人信息后进行查询!'
                return false
              }
              if(res.data.name && res.data.areaData.areaLevel.area !== '闵行区'){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码非闵行区户籍老人，仅精准匹配政策咨询和服务项目!'
              }
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              this.tags = res.data.tag;
              if (res.data.areaData !== null) {
                this.jiedao = res.data.areaData.areaLevel.street;
                this.juwei = res.data.areaData.areaLevel.committee;
              }
              this.total = res.data.policyInformation.total;
              let policyInformation = res.data.policyInformation;
              if (policyInformation) {
                if(policyInformation.total>=10){
                  this.showBtn=true
                }else{
                  this.showBtn=false
                }
                this.policyList = policyInformation.list;
                this.policyPage = policyInformation.pageNum;
                this.policyPageSize = policyInformation.pageSize;
                this.policyTotal = policyInformation.total;
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      getServiceList(num) {
        let params = {
          selectType: 2,
          idCard: this.idCard,
          pageNum: num
            ? num
            : this.getPage(
              this.servicePage,
              this.servicePageSize,
              this.serviceTotal,
              this.serviceList.length
            ),
          areaCode: areaCode,
          pageSize: this.servicePageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.isTs = false
              if(!res.data.name){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码系统中不存在，请添加老人信息后进行查询!'
                return false
              }
              if(res.data.name && res.data.areaData.areaLevel.area !== '闵行区'){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码非闵行区户籍老人，仅精准匹配政策咨询和服务项目!'
              }
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              let serviceItems = res.data.serviceItems;
              this.total = res.data.serviceItems.total;
              if (res.data.areaData !== null) {
                this.jiedao = res.data.areaData.areaLevel.street;
                this.juwei = res.data.areaData.areaLevel.committee;
              }
              if (serviceItems) {
                if(serviceItems.total>=10){
                  this.showBtn=true
                }else{
                  this.showBtn=false
                }
                this.serviceList = serviceItems.list;
                this.servicePage = serviceItems.pageNum;
                this.servicePageSize = serviceItems.pageSize;
                this.serviceTotal = serviceItems.total;
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      getInstitutionList(num) {
        let params = {
          selectType: 3,
          idCard: this.idCard,
          pageNum: num
            ? num
            : this.getPage(
              this.institutionPage,
              this.institutionPageSize,
              this.institutionTotal,
              this.institutionList.length
            ),
          areaCode: areaCode,
          pageSize: this.institutionPageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.isTs = false
              if(!res.data.name){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码系统中不存在，请添加老人信息后进行查询!'
                return false
              }
              if(res.data.name && res.data.areaData.areaLevel.area !== '闵行区'){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码非闵行区户籍老人，仅精准匹配政策咨询和服务项目!'
              }
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              if (res.data.areaData !== null) {
                this.jiedao = res.data.areaData.areaLevel.street;
                this.juwei = res.data.areaData.areaLevel.committee;
              }
              let pensionAgency = res.data.pensionAgency;
              this.total = res.data.pensionAgency.total;
              if (pensionAgency) {
                if(pensionAgency.total>=10){
                  this.showBtn=true
                }else{
                  this.showBtn=false
                }
                this.institutionList = pensionAgency.list;
                this.institutionPage = pensionAgency.pageNum;
                this.institutionPageSize = pensionAgency.pageSize;
                this.institutionTotal = pensionAgency.total;
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      getFacilityList(num) {
        let params = {
          selectType: 4,
          idCard: this.idCard,
          pageNum: num
            ? num
            : this.getPage(
              this.facilityPage,
              this.facilityPageSize,
              this.facilityTotal,
              this.facilityList.length
            ),
          areaCode: areaCode,
          pageSize: this.facilityPageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.isTs = false
              if(!res.data.name){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码系统中不存在，请添加老人信息后进行查询!'
                return false
              }
              if(res.data.name && res.data.areaData.areaLevel.area !== '闵行区'){
                this.isTs = true
                this.tsTitle = '您输入的身份证号码非闵行区户籍老人，仅精准匹配政策咨询和服务项目!'
              }
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              if (res.data.areaData !== null) {
                this.jiedao = res.data.areaData.areaLevel.street;
                this.juwei = res.data.areaData.areaLevel.committee;
              }
              this.total = res.data.communityFacility.total;
              let communityFacility = res.data.communityFacility;
              if (communityFacility) {
                if(communityFacility.total>=10){
                  this.showBtn=true
                }else{
                  this.showBtn=false
                }
                this.facilityList = communityFacility.list;
                this.facilityPage = communityFacility.pageNum;
                this.facilityPageSize = communityFacility.pageSize;
                this.facilityTotal = communityFacility.total;
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      getPage(page, pageSize, total, count) {
        // 【换一批】分页递增，到达最后一页后，下一次调用返回第一页
        if (pageSize * (page - 1) + count < total) {
          return page + 1;
        } else {
          return 1;
        }
      },
      getDate(date) {
        if (date !== "" && date !== null) {
          return date.replace("00:00:00", "");
        } else {
          return date;
        }
      },
      getOrderDetail(id, type) {
        this.detailId = id
        this.instituType = type
        this.isDetail = true;
      },
      closeDetail() {
        this.isDetail = false;
      }
    }
  }
</script>

<style scoped lang="scss">
.adv-mid {
  width: 1640px;
  height: 1330px;
  float: left;
  background: url("../../../../assets/imgYu/gw_bg2.png") center no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
  margin: 0 28px;
  .inforTitle {
    padding: 0;
    .inforTitleImg {
      line-height: 62px;
    }
  }
  .gw-bd {
    width: 100%;
    .gw-bd-input {
      width: 700px;
      margin: 80px auto 20px auto;
      height: 50px;
      border: 1px solid #1cefe9;
      border-radius: 25px;
      position: relative;
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #1cefe9;
      }

      input:-moz-placeholder, textarea:-moz-placeholder {
        color: #1cefe9;
      }

      input::-moz-placeholder, textarea::-moz-placeholder {
        color: #1cefe9;
      }

      input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #1cefe9;
      }
      input {
        width: 640px;
        height: 44px;
        margin-top: 1px;
        background: transparent;
        border:0;
        outline: 0;
        font-size: 20px;
        text-indent: 20px;
        color: #1cefe9;
      }
      span {
        display: inline-block;
        width: 55px;
        vertical-align: middle;
        text-align: center;
        padding-bottom: 7px;
        cursor: pointer;
      }
    }
    .gw-bd-mes {
      width: 100%;
      text-align: center;
      color: #1cefe9;
      padding: 12px 0;
      font-size: 20px;
      span {
        padding: 0 15px;
      }
    }
    .gw-bd-tab {
      width: 100%;
      text-align: center;
      margin-top: 70px;
      margin-bottom: 60px;
      span {
        padding: 10px 35px;
        color: #1cefe9;
        font-size: 24px;
        border-top:1px solid #1cefe9;
        border-bottom:1px solid #1cefe9;
        border-left:1px solid #1cefe9;
        font-weight: 500;
        cursor: pointer;
      }
      span:last-of-type {
        border-right:1px solid #1cefe9;
      }
      .ischoose {
        background: #1cefe9;
        color: #062d68;
      }
    }
    .gw-bd-list {
      width: 100%;
      padding: 0 40px;
      .gw-bd-list-item {
        width: 50%;
        float: left;
        padding-right: 30px;
        height: 130px;
        .gw-bd-list-item-bd {
          width: 100%;
          border-bottom: 1px dashed #1cefe9;
          height: 130px;
          padding: 20px 0;
          .gw-bd-list-title {
            width: 100%;
            font-size: 30px;
          }
          .gw-bd-list-type {
            width: 100%;
            font-size: 20px;
            color: #d1d7dc;
            margin-top: 20px;
          }
        }
      }
      .gw-bd-list-item:nth-child(2n) {
        padding-right: 30px;
        padding-left: 0;
      }
    }
    .gw-bd-list-more {
      width: 100%;
      text-align: center;
      margin-top: 40px;
      font-size: 28px;
      color: #1cefe9;
      span {
        cursor: pointer;
      }
    }
  }
  .gw-dailog {
    width: 100%;
    border: 1px solid #1cefe9;
    position: absolute;
    line-height: 55px;
    height: 55px;
    background: rgba(24, 54, 81, 1);
    top: 70px;
    padding-left: 15px;
    a {
      color: #ffffff;
      display: inline-block;
      font-size: 18px;
      vertical-align: top;
      padding-left: 10px;
    }
  }
  .gw-dailog:before{
    content: '';
    border-right: 16px solid transparent;
    border-top: 0;
    border-bottom: 16px solid #1cefe9;
    border-left: 16px solid transparent;
    position: absolute;
    left: 50px;
    top: 4px;
    margin-left: -20px;
    margin-top: -20px;
  }
  .gw-dailog:after{
    content: '';
    border-right: 14px solid transparent;
    border-top: 0;
    border-bottom: 14px solid #183651;
    border-left: 14px solid transparent;
    position: absolute;
    left: 50px;
    top: 4px;
    margin-left: -18px;
    margin-top: -18px;
  }
  .gw-gb {
    position: absolute;
    right: 0px;
    cursor: pointer;
    top: -2px;
    img {
      width: 25px;
    }
  }
}
.toastImg{
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index: 999;
}
</style>

<style lang="scss">
  .older-tab-content {
    width: 100%;
    /*.el-table {*/
    /*  .cell {*/
    /*    line-height: 40px;*/
    /*  }*/
    /*  .el-table th,.el-table tr{*/
    /*    background: #193853 !important;*/
    /*    color:#00fff8;*/
    /*    font-size: 28px !important;*/
    /*    font-weight: normal;*/
    /*    padding: 0 !important;*/
    /*    height:65px !important;*/
    /*  }*/
    /*  .el-table__empty-block{*/
    /*    background:#193853;*/
    /*  }*/
    /*  .el-table td,.el-table th.is-leaf {*/
    /*    border-bottom:1px solid #0fafb6 !important;*/
    /*    font-size:18px;*/
    /*    padding: 0;*/
    /*  }*/
    /*  .el-table::before{*/
    /*    background:none;*/
    /*  }*/
    /*  tr td{*/
    /*    padding:0 !important;*/
    /*    height:62px !important;*/
    /*    color:#ffffff;*/
    /*  }*/
    /*  tr:hover {*/
    /*    td {*/
    /*      background: transparent !important;*/
    /*      // border-bottom: 1px solid rgba(5, 253, 253, 0.3);*/
    /*    }*/
    /*  }*/
    /*  .el-table--border, .el-table--group{*/
    /*    border:none;*/
    /*  }*/
    /*  .el-table--border th{*/
    /*    border-color:#0fafb6;*/
    /*  }*/
    /*  .el-table--group::after{*/
    /*    background: #193853;*/
    /*  }*/
    /*  .el-table--border td{*/
    /*    border:none;*/
    /*  }*/
    /*}*/
    .el-table {
      background: transparent;
      .cell {
        line-height: 40px !important;
      }
      &::before {
        height: 0;
      }
      th {
        background: transparent;
        color: #0ac6d1;
        font-size: 24px;
        font-weight: normal;
        text-align: center;
        border-bottom: 0;
        padding: 15px 0;
      }
      td {
        border-bottom: 1px solid #1cefe9;
        text-align: center;
        font-size: 22px;
        color: #ffffff;
        padding: 11px 0;
      }
      tr {
        background: transparent;
        border-bottom: 0;
        th {
          border: none;
          color: #05fdfd;
        }
      }
      tr:hover {
        td {
          background: transparent !important;
        }
      }
    }
  }
</style>
