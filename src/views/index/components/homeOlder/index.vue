<template>
  <div  class="mhContent detailInforCom">
    <elderHeader :headerTitle="title"/>
    <homeHeader></homeHeader>
    <homeLeft></homeLeft>
    <homeMid></homeMid>
    <homeRight></homeRight>
  </div>
</template>

<script>
  import elderHeader from "../header/secondHeader"
  import homeHeader from "./homeHeader"
  import homeLeft from "./homeLeft"
  import homeMid from "./homeMid"
  import homeRight from "./homeRight"
  export default {
    name: "index",
    components: {
      elderHeader,
      homeHeader,
      homeLeft,
      homeMid,
      homeRight
    },
    data() {
      return {
        title: "居家养老"
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
