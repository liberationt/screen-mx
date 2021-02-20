<template>
  <div class="second-body" @click.self="closeIt">
    <div class="zn-body">
      <div class="close-btn" @click="closeIt" style="cursor: pointer"></div>
      <div class="zn-title">
        <img src="@/assets/images/ylgwSmall.png" alt="">
      </div>
      <div class="zn-input">
        <input  v-model.trim="idCard" type="text" placeholder="请输入身份证查询" @keyup.enter="handleSearch"  @focus='openSearchList' @blur="closeSearchList">
        <img src="@/assets/images/query.png" alt=""  @click="handleSearch"/>
        <div class="older-input-history" v-if="isSearch">
          <span v-for="(item, index) in search" :key="index" @click="chooseIt(item)">{{item}}</span>
        </div>
      </div>
      <div class="zn-detail">
        <div class="zn-list">
          姓名：{{name}} <i>|</i> 性别：{{sex}} <i>|</i> 年龄： {{age}} <i>|</i> 住址：{{address}}
        </div>
        <div class="zn-list">
          标签：<span v-for="(item, index) in tags" :key="index" :title="item">{{ item }}<i>|</i> </span>
        </div>
      </div>
      <div>
        <div class="older-tab">
         <span
             v-for="(item, index) in tabList"
             :key="index"
             :class="[isTab === item.type ? 'choose-tab' : '']"
             @click="changeTab(item.type)"
         >{{ item.name }}</span>
        </div>
        <div v-if="isTab === 'zc'" class="older-tab-content">
          <div class="older-tab-content-list" v-for="item in policyList" :key="item.id">
            <p :title=item.title>{{ item.title }}</p>
            <span>政策类型：{{ item.classify1 }}</span>
            <span>发布日期：{{ getDate(item.pubDate) }}</span>
          </div>
        </div>
        <div v-if="isTab === 'fw'" class="older-tab-content">
          <div class="older-tab-content-list"  v-for="(item, index) in serviceList" :key="index">
            <p>{{ item.serviceName }}</p>
            <span>服务范围：{{ item.minAge }} - {{ item.maxAge }}</span>
            <span>申请方式：{{ item.applyWay }}</span>
          </div>
        </div>
        <div v-if="isTab === 'yl'" class="older-tab-content">
          <el-table
              :data="institutionList"
              style="width: 100%; "
              tooltip-effect="dark"
          >
            <el-table-column
                prop="orgName"
                label="机构名称"
                show-overflow-tooltip
                width="320"
            ></el-table-column>
            <el-table-column
                prop="orgType"
                label="机构类型"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="联系电话"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="screenAddr"
                label="地址"
                show-overflow-tooltip
                min-width="220"
            ></el-table-column>
          </el-table>
        </div>
        <div v-if="isTab === 'sq'" class="older-tab-content">
          <el-table :data="facilityList" style="width: 100%; ">
            <el-table-column
                prop="orgName"
                label="机构名称"
                show-overflow-tooltip
                width="320"
            ></el-table-column>
            <el-table-column
                prop="orgType"
                label="机构类型"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="联系电话"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="screenAddr"
                label="地址"
                min-width="220"
                show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div>
        <div class="zn-more" @click="changeList()" v-if="showBtn">
          加载更多
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getTrafficVolume,
    getAdviserCount,
    getAdviserSiteCount,
    getRecordList
  } from "@/api/consultant";
  import { getPensionAdvices } from "@/api/pensionAdviser";
  import areaCode from '@/api/areaCode'
  export default {
    name: "znConsultant",
    props: ["close"],
    data() {
      return {
        tabList: [
          {
            name: "政策资讯",
            type: "zc"
          },
          {
            name: "服务项目",
            type: "fw"
          },
          {
            name: "养老机构",
            type: "yl"
          },
          {
            name: "社区设施",
            type: "sq"
          }
        ],
        isSearch:false,
        isTab: "zc",
        form: {
          areaCode: areaCode.areaCode
        },
        idCard: "",
        name: "",
        sex: "",
        age: "",
        address: "",
        tags: [],
        search:[],
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
        institutionPageSize: 7,
        institutionTotal: 0,
        // 社区设施
        facilityList: [],
        facilityPage: 1,
        facilityPageSize: 7,
        facilityTotal: 0,
        isShow: true,
        showBtn:false,
        selectTypeMap: {
          zc: 1,
          fw: 2,
          yl: 3,
          sq: 4
        },
        tableData: [],
        orderForm: {
          area: "浦锦街道",
          flag: 0
        }
      }
    },
    mounted() {
      this.getAdviserCount();
      this.getAdviserSiteCount();
      this.getTrafficVolume();
      this.getRecordList();
      if (localStorage.getItem('myIdCord') !== null && localStorage.getItem('myIdCord') !== undefined) {
        this.search = JSON.parse(localStorage.getItem('myIdCord'))
      }
    },
    methods: {
      closeIt() {
        this.close();
        this.idCard='';
        this.name = "";
        this.sex = "";
        this.age = "";
        this.address = "";
        this.tags = [];
        this.policyList=[];
        this.serviceList=[];
        this.institutionList=[];
        this.facilityList=[];
        this.isTab="zc"

      },
      getDate(date) {
        if (date !== "" && date !== null) {
          return date.replace("00:00:00", "");
        } else {
          return date;
        }
      },
      changeList() {
        if (this.idCard === "") {
          this.$message.error("身份证号不能为空, 请输入身份证号");
          return false;
        }
        if (this.isTab === "zc") {
          this.getPolicyList();
        } else if (this.isTab === "fw") {
          this.getServiceList();
        } else if (this.isTab === "yl") {
          this.getInstitutionList();
        } else if (this.isTab === "sq") {
          this.getFacilityList();
        }
      },
      openSearchList() {
        this.isSearch = true
      },
      chooseIt(item) {
        this.idCard = item;
        this.isSearch = false
      },
      closeSearchList() {
        this.timerA = setTimeout(()=>{
          this.isSearch = false
          clearTimeout(this.timerA);
        },200);
      },
      handleSearch() {
        if (this.idCard === "") {
          this.$message.error("身份证号不能为空, 请输入身份证号");
          return false;
        }
        this.isSearch = false
        if (localStorage.getItem('myIdCord') !== null && localStorage.getItem('myIdCord') !== undefined) {
          const arrs = JSON.parse(localStorage.getItem('myIdCord'))
          arrs.forEach((item, index) => {
            if (item === this.idCard) {
              arrs.splice(index, 1)
            }
          })
          arrs.unshift(this.idCard);
          arrs.splice(5, arrs.length - 5);
          localStorage.removeItem('myIdCord');
          localStorage.setItem('myIdCord', JSON.stringify(arrs))
        } else {
          const arrs = [];
          arrs.push(this.idCard);
          localStorage.setItem('myIdCord', JSON.stringify(arrs))
        }
        if (this.isTab === "zc") {
          this.getPolicyList("1");
        } else if (this.isTab === "fw") {
          this.getServiceList("1");
        } else if (this.isTab === "yl") {
          this.getInstitutionList("1");
        } else if (this.isTab === "sq") {
          this.getFacilityList("1");
        }
        this.search = JSON.parse(localStorage.getItem('myIdCord'))
      },
      changeTab(type) {
        this.isTab = type;
        if (this.idCard === "") {
          this.$message.error("身份证号不能为空, 请输入身份证号");
          return false;
        }
        if (this.isTab === "zc") {
          this.getPolicyList("1");
        } else if (this.isTab === "fw") {
          this.getServiceList("1");
        } else if (this.isTab === "yl") {
          this.getInstitutionList("1");
        } else if (this.isTab === "sq") {
          this.getFacilityList("1");
        }
      },
      getAdviserSiteCount() {
        getAdviserSiteCount(this.form).then(res => {
          if (res.code === 0) {
            this.adviserSiteCount = res.data;
          }
        });
      },
      getAdviserCount() {
        getAdviserCount(this.form).then(res => {
          if (res.code === 0) {
            this.adviserCount = res.data;
          }
        });
      },
      getTrafficVolume() {
        getTrafficVolume(this.orderForm).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.trafficVolume = res.data.trafficVolume;
            }
          }
        });
      },
      loadMore(){
        if(this.lastPage === this.pageNum){
          this.pageNum=1
        }else{
          this.pageNum++
        }
        // this.pageNum++
        this.getRecordList()
      },
      getRecordList() {
        let data={
          areaCode: "310112001000",
          pageNum:this.pageNum,
          pageSize:3
        }
        getRecordList(data).then(res => {
          if (res.code === 0) {
            this.recordList = res.data.list;
            this.total = res.data.total;
            this.lastPage = res.data.lastPage
          }
        });
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
          areaCode: 310112001000,
          pageSize: this.policyPageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              this.tags = res.data.tag;
              let policyInformation = res.data.policyInformation;
              if (policyInformation) {
                if(policyInformation.total>=13){
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
          areaCode: 310112001000,
          pageSize: this.servicePageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              let serviceItems = res.data.serviceItems;
              if (serviceItems) {
                if(serviceItems.total>=13){
                  this.showBtn=true
                }else{
                  this.showBtn=false
                }
                this.serviceList = serviceItems.list
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
          areaCode: 310112001000,
          pageSize: this.institutionPageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              let pensionAgency = res.data.pensionAgency;
              if (pensionAgency) {
                if(pensionAgency.total>=8){
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
          areaCode: 310112001000,
          pageSize: this.facilityPageSize
        };
        getPensionAdvices(params).then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.name = res.data.name;
              this.sex = res.data.sex;
              this.age = res.data.age;
              this.address = res.data.address;
              let communityFacility = res.data.communityFacility;
              if (communityFacility) {
                if(communityFacility.total>=8){
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
      }
    }
  };
</script>

<style lang="scss">
.zn-body {
  width: 1000px;
  height: 840px;
  background: #094187;
  border: 1px solid #0fa2ff;
  margin: 155px auto 0 auto;
  position: relative;
  .zn-title {
    width: 100%;
    height: 34px;
    text-align: center;
    margin-top: 35px;
    img {
      width: 229px;
      height: 34px;
    }
  }
  .zn-input {
    position: relative;
    width: 640px;
    height: 48px;
    margin:  0 auto;
    margin-top: 30px;
    border:1px solid #0fa2ff;
    background: #144d94;
    input {
      width: 100%;
      outline: none;
      border: 0;
      line-height: 46px;
      background: transparent;
      text-indent: 10px;
      color: #ffffff;
      font-size: 20px;
    }
    img{
      position:absolute;
      right:10px;
      top:10px;
      cursor: pointer;
    }
    input::-webkit-input-placeholder {
       color: #999;
     }
  }
  .zn-detail {
     width: 100%;
    .zn-list {
     text-align: center;
     font-size: 18px;
      margin-top: 15px;
      span {
        color: #4cf9ff;
      }
      span:last-of-type {
        i {
          display: none;
        }
      }
      i {
        padding: 1px 5px;
        display: inline-block;
        vertical-align: top;
      }
    }
  }
}
.older-tab {
  margin-top: 20px;
  margin-left: 252px;
  text-align: center;
  & > span {
    display: block;
    width: 120px;
    float: left;
    height: 40px;
    font-size: 20px;
    line-height: 39px;
    cursor: pointer;
    position: relative;
    color: #4cf9ff;
    border: 1px solid #0fa2ff;
  }
  .choose-tab {
    color: #ffffff;
    background: #0fa2ff;
  }
}
.older-tab-content {
  width: 100%;
  text-align: left;
  height: 480px;
  padding: 0 40px;
  float: left;
  margin-top: 20px;
  .older-tab-content-list {
    width: 50%;
    float: left;
    height: 80px;
    padding-bottom: 12px;
    padding-right: 10px;
    p {
      font-size: 20px;
      color: #05fdfd;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      display: inline-block;
      width: 48%;
      font-size: 16px;
      margin-top: 5px;
    }
  }
  .el-table {
    background: transparent;
    margin-top: 10px;
    &::before {
      height: 0;
    }
    th {
      background: transparent;
      color: #05fdfd;
      font-size: 20px;
      font-weight: normal;
      text-align: center;
      border: 1px solid #226783;
      border-left: 0;
      padding: 15px 0;
    }
    th:first-of-type {
      border-left: 1px solid #226783;
    }
    td {
      border: 1px solid #226783;
      border-left: 0;
      border-top: 0;
      text-align: center;
      font-size: 18px;
      color: #ffffff;
      padding: 16px 0;
    }
    td:first-of-type {
      border-left: 1px solid #226783;
    }
    tr {
      background: transparent;
      border-bottom: 1px solid #226783;
    }
    tr:hover {
      td {
        background: transparent;
        border-bottom: 1px solid #226783;
      }
    }
  }
}
.zn-more {
  width: 918px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #144d94;
  position: absolute;
  bottom: 20px;
  left: 40px;
  cursor: pointer;
  font-size: 18px;
  color: #4cf9ff;
  letter-spacing: 1px;
}
.older-input-history {
  position: absolute;
  width: 640px;
  background: #3576a8;
  left: -1px;
  color: #05fdfd;
  border: 1px solid #05fdfd;
  border-top: 0;
  z-index:10;
  span {
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
