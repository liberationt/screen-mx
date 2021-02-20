<template>
  <div class="mhContent detailInforCom">
    <elderHeader :headerTitle="title"/>
    <advLeft></advLeft>
    <advMid></advMid>
    <advRight></advRight>
  </div>
</template>

<script>
  import elderHeader from "../header/secondHeader"
  import advLeft from "./advLeft"
  import advMid from "./advMid"
  import advRight from "./advRight"
  export default {
    name: "index",
    components: {
      elderHeader,
      advLeft,
      advMid,
      advRight
    },
    data() {
      return {
        title: "闵行区养老服务一网统管平台"
      }
    }
  }
</script>

<style scoped>

</style>
