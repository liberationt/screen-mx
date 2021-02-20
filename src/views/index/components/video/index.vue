<template>
  <div class="mhContent detailInforCom">
    <div class="detailHeader">
      <div class="displayFlex nameInfor">
        <div class="nameStyle">
          闵行区养老服务一网统管平台
        </div>
        <div class="displayFlex headerRight">
          <div @click="toHome">首页</div>
          <div @click="toGw">智能养老顾问</div>
          <div class="orangeColor">视频监控</div>
        </div>
      </div>
    </div>
    <div class="video">
      <div class="video-left">
        <div class="inforTitle">
          <div class="inforTitleImg" style="cursor: inherit">机构养老</div>
          <div class="dailog-bd-video" style="margin-top: 20px">
            <el-table
                    :data="tableData"
                    v-loading="loading"
                    style="width: 100%">
              <el-table-column
                      align="center"
                      show-overflow-tooltip
                      prop="orgName"
                      width="500"
                      label="机构名称">
              </el-table-column>
              <el-table-column
                      align="center"
                      prop="street"
                      show-overflow-tooltip
                      label="所属街道">
              </el-table-column>
              <el-table-column
                      align="center"
                      prop="committee"
                      show-overflow-tooltip
                      label="所属居委">
              </el-table-column>
              <el-table-column
                      align="center"
                      show-overflow-tooltip
                      prop="addr"
                      label="详细地址">
              </el-table-column>
              <el-table-column
                      align="center"
                      prop="ADDRESS"
                      show-overflow-tooltip
                      label="操作">
                <template slot-scope="scope">
                  <span @click="getVideo(scope.row.orgId)" style="color: #e9d10f; cursor: pointer">查看视频</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                    class="Page"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="->,total,prev, pager, next, jumper"
                    :page-size="12"
                    :pager-count="5"
                    :total="total"
                    :hide-on-single-page="hideOnSinglePage">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="video-right">
        <div class="inforTitle">
          <div class="inforTitleImg" style="cursor: inherit">视频列表</div>
        </div>
        <div class="video-list">
          <div class="video-list-item" v-for="(item, index) in videoList" :key="item">
            <video
              :id="'myplayer' + index"
              :src="item"
              width="480"
              height="285"
              autoplay
              controls
              playsInline
              webkit-playsinline
            >
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EZUIKit from '../../../../../public/ezuikit'
  import { getVideoList, getVideo  } from "@/api/thirdScreen"
  import { areaCode } from '@/api/areaCode'
  export default {
    name: "Video",
    data() {
      return {
        tableData: [],
        form: {
          areaCode: areaCode,
          pageNum: 1,
          pageSize: 12
        },
        total: 0,
        currentPage:1,
        hideOnSinglePage:true,
        loading: true,
        videoList: []
      }
    },
    mounted() {
      this.getVideoList();
    },
    methods:{
      init(id) {
        var _this = this
        setTimeout(() =>{
          var player = new EZUIKit.EZUIPlayer(id);
        })
      },
      toHome(){
        this.$router.push('/')
      },
      toGw() {
        this.$router.push('/pensionAdvisor')
      },
      getVideoList() {
        getVideoList(this.form).then(res =>{
          if (res.code === 0) {
            this.tableData = res.data.list;
            const arr = []
            res.data.list.forEach(item => {
              if (item.eqUrl01 !== '' && item.eqUrl01 !== null) {
                arr.push(item.eqUrl01)
              }
              if (item.eqUrl02 !== '' && item.eqUrl02 !== null) {
                arr.push(item.eqUrl02)
              }
            })
            this.videoList = arr
            this.$nextTick(() => {
              this.videoList.forEach((item, index) => {
                let id = 'myplayer' + index
                this.init(id)
              })
            })
            this.total = res.data.total;
            this.loading = false;
          }
        })
      },
      getVideo(orgId) {
        getVideo({
          areaCode: areaCode,
          orgId: orgId
        }).then(res =>{
          if (res.code === 0) {
            // this.videoList.forEach((item, index) => {
            //   var video = document.getElementById('video');
            //   video.removeAttribute('src');
            //   video.load();
            // })
            this.videoList = []

            this.$nextTick(() => {
              if (res.data.eqUrl01 !== '' && res.data.eqUrl01 !== null) {
                this.videoList.push(res.data.eqUrl01)
              }
              if (res.data.eqUrl02 !== '' && res.data.eqUrl02 !== null) {
                this.videoList.push(res.data.eqUrl02)
              }
              this.videoList.forEach((item, index) => {
                let id = 'myplayer' + index
                this.init(id)
              })
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.form.pageNum = val;
        this.getVideoList();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .orangeColor {
    -webkit-text-fill-color: #ffd535;
  }
  .video {
    width: 100%;
    height: 1350px;
    padding-bottom: 30px;
    .video-left {
      width: 1578px;
      height: 1330px;
      float: left;
      background: url("../../../../assets/imgYu/bg_video1.png") center no-repeat;
      background-size: 100% 100%;
    }
    .video-right {
      width: 3032px;
      height: 1330px;
      float: left;
      background: url("../../../../assets/imgYu/bg_video2.png") center no-repeat;
      background-size: 100% 100%;
      margin-left: 30px;
    }
    .inforTitleImg {
      line-height: 60px;
    }
    .video-list {
      width: 100%;
      padding: 10px 15px;
      .video-list-item {
        width: 480px;
        height: 285px;
        background: #ffffff;
        margin: 10px 10px;
        float: left;
        cursor: pointer;
      }
    }
  }
</style>
<style lang="scss">
  .dailog-bd-video {
    .cell {
      line-height: 75px;
    }
    .el-table th,.el-table tr{
      background: #193853;
      color:#00fff8;
      font-size: 28px !important;
      font-weight: normal;
      padding: 0 !important;
      height:70px;
    }
    .el-table__empty-block{
      background:#193853;
    }
    .el-table td,.el-table th.is-leaf {
      border-bottom:1px solid #0fafb6 !important;
      font-size:24px;
      padding: 0;
    }
    .el-table::before{
      background:none;
    }
    tr td{
      padding:0 !important;
      height:70px;
      color:#ffffff;
    }
    tr:hover {
      td {
        background: transparent !important;
        // border-bottom: 1px solid rgba(5, 253, 253, 0.3);
      }
    }
    .el-table--border, .el-table--group{
      border:none;
    }
    .el-table--border th{
      border-color:#0fafb6;
    }
    .el-table--group::after{
      background: #193853;
    }
    .el-table--border td{
      border:none;
    }
    .el-table th {
      .cell {
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
    .el-table th,.el-table tr{
      background: transparent !important;
      height:65px !important;
    }
    .cell {
      line-height: 88px !important;
    }
    tr td{
      height: 65px !important;
    }
    .el-table__empty-block{
      background: #ffffff !important;
    }
    .el-table {
      background: transparent !important;
    }
    .el-table__empty-block {
      background: transparent !important;
    }
    .el-loading-mask {
      height: 800px;
      background: transparent !important;
    }
  }
</style>
