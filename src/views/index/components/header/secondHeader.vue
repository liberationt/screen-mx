<template>
    <div class="detailHeader">
        <div class="displayFlex nameInfor">
            <div class="nameStyle">
                {{headerTitle}}
            </div>
            <div class="displayFlex headerRight">
                <div @click="toHome">首页</div>
                <div @click="toGw" :class="[isShow === true ? 'orangeColor' : '']">智能养老顾问</div>
                <div @click="toVideo">视频监控</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['headerTitle'],
    data(){
        return{
            isShow: false
        }
    },
    mounted() {
        if (this.$route.path === "/pensionAdvisor") {
            this.isShow = true
        } else {
            this.isShow = false
        }
    },
    methods:{
        toVideo() {
            this.$router.push('/video')
        },
        toHome(){
            this.$router.push('/')
        },
        toGw() {
            this.$router.push('/pensionAdvisor')
        }
    }
}
</script>
<style lang="scss" scoped>
.orangeColor {
    -webkit-text-fill-color: #ffd535;
}
</style>
