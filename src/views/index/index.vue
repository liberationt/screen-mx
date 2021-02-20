<template>
  <div class="mhContent">
    <Header />
    <div class="mhContentCenter">
      <div>
        <elderlyInfor />
        <div style="margin-top:-1px;">
          <pensionInstitutions/>
        </div>
      </div>
      <div>
        <mapInfor />
        <!-- <elderlyInfor /> -->
      </div>
      <div>
        <communityFacilities />
        <div style="margin-top:-2px;">
          <pensionServices />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/index/components/header"
import pensionInstitutions from "@/views/index/components/pensionInstitutions"
import elderlyInfor from "@/views/index/components/elderlyInfor"
import mapInfor from "@/views/index/components/mapInfor"
import communityFacilities from "@/views/index/components/communityFacilities"
import pensionServices from "@/views/index/components/pensionServices"


export default {
  name: "index",
  components: {
    Header,
    pensionInstitutions,
    elderlyInfor,
    mapInfor,
    communityFacilities,
    pensionServices
  }
};
</script>

<style scoped lang="scss">
  .body-content {
    width: 100% !important;
    height: 100% !important;
    padding:  0 0 !important;
    margin-top: 0 !important;
  }
  .marginTop{
    margin-top:-1px;
  }
</style>
