<template>
  <div  class="mhContent detailInforCom">
    <elderHeader :headerTitle="title"/>
    <wisLeft></wisLeft>
    <wisRight></wisRight>
    <smartTerminal></smartTerminal>
  </div>
</template>

<script>
  import elderHeader from "../header/secondHeader"
  import wisLeft from "./wisLeft"
  import smartTerminal from "./smartTerminal"
  import wisRight from "./wisRight"
  export default {
    name: "index",
    components: {
      elderHeader,
      wisLeft,
      smartTerminal,
      wisRight
    },
    data() {
      return {
        title: "智慧养老"
      }
    }
  }
</script>

<style scoped>

</style>
