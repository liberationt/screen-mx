<template>
  <div class="maskToast" @click.self="close()">
    <div class="toastList" style="width: 1040px" v-if="mes.orgType === '2012' || mes.orgType === '2013' || mes.orgTypeStr === '健康小屋' || mes.orgTypeStr === '护理站'|| mes.orgTypeStr === '养老辅具点'|| mes.orgType === '2014'">
      <div class="toastListTittle">机构详情 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
      <div class="toastcontent" style="margin-top: 0px">
        <div class="jg-detail">
          <div class="all-small-title">
            <span>基本信息</span>
          </div>
          <div class="all-detail-content" style="border-bottom: 1px solid #155d99">
            <div class="all-detail-list">
              <span>机构名称：</span>
              <span>{{mes.orgName}}</span>
            </div>
            <div class="all-detail-list">
              <span>机构类型：</span>
              <span>{{mes.orgTypeStr}}</span>
            </div>
            <div class="all-detail-list">
              <span>成立时间：</span>
              <span>{{mes.establishTime}}</span>
            </div>
            <div class="all-detail-list">
              <span>咨询电话：</span>
              <span>{{mes.phone}}</span>
            </div>
            <div class="all-detail-list">
              <span>房屋产权：</span>
              <span>{{mes.houseProperty}}</span>
            </div>
            <div class="all-detail-list">
              <span>设置形式：</span>
              <span>{{mes.setType}}</span>
            </div>
            <div class="all-detail-list">
              <span>建筑面积(m²)：</span>
              <span>{{mes.buildArea}}</span>
            </div>
            <div class="all-detail-list">
              <span>楼层信息(层)：</span>
              <span>{{mes.buildFloor}}</span>
            </div>
            <div class="all-detail-list">
              <span>是否有电梯：</span>
              <span>{{mes.isLift}}</span>
            </div>
            <div class="all-detail-list">
              <span>所属居委：</span>
              <span>{{mes.areaCodeStr}}</span>
            </div>
            <div class="all-detail-list">
              <span>详细地址：</span>
              <span>{{mes.addr}}</span>
            </div>
            <div class="all-detail-list">
              <span>开放状态：</span>
              <span>{{mes.openState}}</span>
            </div>
          </div>
          <div class="all-small-title">
            <span>运营信息</span>
            <span></span>
          </div>
          <div class="all-detail-content">
            <div class="all-detail-list">
              <span>法人性质：</span>
              <span>{{mes.legalType}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营模式：</span>
              <span>{{mes.opMode}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营单位：</span>
              <span>{{mes.opOrg}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营方负责人：</span>
              <span>{{mes.opLinkman}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营方联系方式：</span>
              <span>{{mes.opPhone}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toastList" v-if="mes.orgType === '2010' || mes.orgType === '2017' || mes.orgType === '2011' || mes.orgType === '1010' || mes.orgType === '1011'">
      <div class="toastListTittle">机构详情 <img @click="close()" src="@/assets/images/close_dialog.png" alt=""></div>
      <div class="toastcontent" style="margin-top: 0px;">
        <div class="jg-detail" style="width: 50%">
          <div class="all-small-title">
            <span>基本信息</span>
          </div>
          <div class="all-detail-content" style="border-bottom: 1px solid #155d99">
            <div class="all-detail-list">
              <span>机构名称：</span>
              <span>{{mes.orgName}}</span>
            </div>
            <div class="all-detail-list">
              <span>机构类型：</span>
              <span>{{mes.orgTypeStr}}</span>
            </div>
            <div class="all-detail-list">
              <span>成立时间：</span>
              <span>{{mes.establishTime}}</span>
            </div>
            <div class="all-detail-list">
              <span>咨询电话：</span>
              <span>{{mes.phone}}</span>
            </div>
            <div class="all-detail-list">
              <span>房屋产权：</span>
              <span>{{mes.houseProperty}}</span>
            </div>
            <div class="all-detail-list">
              <span>设置形式：</span>
              <span>{{mes.setType}}</span>
            </div>
            <div class="all-detail-list">
              <span>建筑面积(m²)：</span>
              <span>{{mes.buildArea}}</span>
            </div>
            <div class="all-detail-list">
              <span>楼层信息(层)：</span>
              <span>{{mes.buildFloor}}</span>
            </div>
            <div class="all-detail-list">
              <span>是否有电梯：</span>
              <span>{{mes.isLift}}</span>
            </div>
            <div class="all-detail-list">
              <span>所属居委：</span>
              <span>{{mes.areaCodeStr}}</span>
            </div>
            <div class="all-detail-list">
              <span>详细地址：</span>
              <span>{{mes.addr}}</span>
            </div>
            <div class="all-detail-list">
              <span>开放状态：</span>
              <span>{{mes.openState}}</span>
            </div>
          </div>
          <div class="all-small-title">
            <span>运营信息</span>
            <span></span>
          </div>
          <div class="all-detail-content">
            <div class="all-detail-list">
              <span>法人性质：</span>
              <span>{{mes.legalType}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营模式：</span>
              <span>{{mes.opMode}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营单位：</span>
              <span>{{mes.opOrg}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营方负责人：</span>
              <span>{{mes.opLinkman}}</span>
            </div>
            <div class="all-detail-list">
              <span>运营方联系方式：</span>
              <span>{{mes.opPhone}}</span>
            </div>
          </div>
        </div>
        <div class="jg-detail" style="width: 50%;padding-left: 15px; border-left: 1px solid rgb(21, 93, 153);height: 680px;margin-top: 20px">
          <div class="all-small-title" style="padding-top: 0;">
            <span>服务信息</span>
          </div>
          <div v-for="(item, index) in mes.serviceItems" :key="index">
            <div class="all-detail-content" v-if="item.children !== null">
              <div class="all-other-list" v-for="(list, indexs) in item.children" :key="indexs + 11">
                <span>{{list.serviceValue}}</span>
                <div v-if="list.children !== null" class="list-item">
                  <div v-for="(myItems, indexss) in list.children" :key="indexss + 111">
                    <span v-if="myItems.serviceValue !== undefined">{{myItems.serviceValue}}</span>
                    <span v-if="myItems.children !== null && myItems.children.length !== 0">：</span>
                    <span v-if="myItems.children !== null && myItems.children.length !== 0">
                      <span v-for="(myLists, sindexss) in myItems.children" :key="sindexss + 1111">
                        {{myLists.serviceValue}} <i v-if="sindexss !== myItems.children.length - 1">\ </i>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <!--<div class="all-detail-list">-->
              <!--<span>机构类型：</span>-->
              <!--<span>{{jgType(mes.orgType)}}</span>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getFacilitiesDetail } from "@/api/secondeScreen"
  import areaCode from '@/api/areaCode'
  export default {
    name: "jgDetail",
    props: ['close', 'id'],
    data() {
      return {
        form: {
          areaCode: areaCode.areaCode
        },
        mes: '',
        jgType: '',
        isSmall: false
      }
    },
    mounted() {
      this.getDetail(this.id)
    },
    methods: {
      getDetail(id) {
        getFacilitiesDetail(id).then(res =>{
          if (res.code === 0) {
            if (res.data.orgType === '2010' || res.data.orgType === '2011' || res.data.orgType === '1010') {
              this.isSmall = false
            } else {
              this.isSmall = true
            }
            this.mes = res.data;
            const arr = []
            res.data.serviceItems.forEach(item => {
              if (item.serviceValue === "基本服务") {
                arr.push(item)
              }
            });
            this.mes.serviceItems = arr;
          }
        })
      },
    }
  };
</script>

<style scoped lang="scss">
.jg-detail {
  width: 100%;
  float: left;
  .all-small-title {
    font-size: 18px;
    padding: 20px 0 10px 0;
  }
  .all-detail-content {
    width: 100%;
    padding-bottom: 20px;
    float: left;
    .all-detail-list {
      width: 50%;
      float: left;
      font-size: 16px;
      padding: 10px 0;
    }
    .all-other-list {
      width: 100%;
      float: left;
      font-size: 16px;
      &>span {
        padding: 10px 0;
        display: inline-block;
      }
      .list-item {
        padding-left:30px;
        display: flex;
        flex-wrap: wrap;
        div {
        margin-right: 20px;
          &>span {
            padding: 10px 0;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
