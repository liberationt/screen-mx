<template>
  <div class="dailog-bd">
    <div class="dailog-content" @click.self="close">
      <div class="home-dailog-list">
        <div class="inforTitle">
          <div class="inforTitleImg">
            政策详情
            <img src="@/assets/imgYu/guanbi.png" alt="" @click="close">
          </div>
        </div>
        <div class="home-dailog-list-bd" style="overflow-x: auto">
          <div class="title">
            基础信息
          </div>
          <div class="content-base">
            <span>一级分类：{{ detail.classify1Name }}</span>
            <span>二级分类：{{ detail.classify2Name }}</span>
            <span>发布单位：{{ detail.deptName }}</span>
            <span>发布日期：{{ detail.pubDate }}</span>
          </div>
          <div class="title">
            资讯标题
          </div>
          <div class="content-base">
            <span style="width: 90%">{{ detail.title }}</span>
          </div>
          <div class="title">
            资讯内容
          </div>
          <div class="content-base" v-html="detail.bizExtendContentVo.content">

          </div>
          <div class="title">
            服务范围
          </div>
          <div class="content-base">
            <span>区域范围：{{ detail.serviceAreaName }}</span>
            <span>服务对象：{{ detail.serviceTargetName }}</span>
            <span>年龄范围：{{ detail.serviceScope }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { areaCode } from '@/api/areaCode'
  import { userDetailsData } from '../../../../api/thirdScreen'
  export default {
    name: "zcDeatail",
    props: ["close", "id"],
    data() {
      return {
        detail: ''
      }
    },
    mounted() {
      this.userDetailsData()
    },
    methods: {
      userDetailsData() {
        userDetailsData(this.id).then(response => {
          if (response) {
            this.detail = response
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .dailog-bd {
    width: 4700px;
    height: 1566px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .dailog-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100% ;
      height: 100% ;
      .home-dailog-list {
        width: 1712px;
        height: 1161px;
        background: url("../../../../assets/images/dialog_bg1.png");
        background-size: 100% 100%;
        .inforTitleImg {
          line-height: 62px;
          img {
            float: right;
            margin-top: 14px;
            cursor: pointer;
          }
        }
        .home-dailog-list-bd {
          width: 100%;
          height: 1079px;
          padding: 0 25px;
          .home-dailog-detail {
            width: 33.33%;
            display: inline-block;
            vertical-align: top;
            padding-right: 40px;
            p {
              font-size: 22px;
              letter-spacing: 1px;
              margin-bottom: 30px;
            }
          }
          .home-dailog-detail-top {
            width: 100%;
            height: 200px;
            letter-spacing: 1px;
          }
          home-dailog-detail-list {
            width: 100%;
            letter-spacing: 1px;
          }
        }
      }
    }
    .title {
      font-size: 24px;
      font-weight: bold;
    }
    .content-base {
      width: 100%;
      margin: 20px 0 30px 0;
      span {
        margin-right: 50px;
        font-size: 22px;
        display: inline-block;
      }

    }
  }
  p {
    font-size: 22px !important;
  }
  /*div::-webkit-scrollbar{*/
  /*    width:10px;*/
  /*}*/
  /*div::-webkit-scrollbar-track{*/
  /*    background: #2f4e6e;*/
  /*    border-radius:2px;*/
  /*}*/
  /*div::-webkit-scrollbar-thumb{*/
  /*    background: #00fff8;*/
  /*    width:5px;*/
  /*    border-radius:10px;*/
  /*}*/
</style>
