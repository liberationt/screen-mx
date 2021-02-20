<template>
    <div class="header">
        <div class="headerTop displayFlex">
            <div class="headerTopImg">
               闵行区养老服务一网统管平台
            </div>
            <div class="displayFlex headerTopRight">
                <div class="mr40" @click="toGw">
                    <span>智能养老顾问</span>
                </div>
                 <div>
                    <span @click="toVideo">视频监控</span>
                </div>
            </div>
        </div>
        <div class="streetInfor">
            <div v-for="(item,i) in streetList" :key="i" class="cursorPointer" :class="index===i?'activeColor':''" @click="changeUrl(i, item)">
                {{item.screenConfigAlias}}
            </div>
        </div>
    </div>
</template>
<script>
import {getJdList} from '@/api/sq'
export default {
    data(){
        return{
            streetList:[
                {screenConfigAlias:'闵行区'}
            ],
            index:0,
            dataType:'',
            accessToken:''
        }
    },
    mounted() {
        this.getJdList()
        this.dataType = this.$route.query.dataType ||localStorage.getItem('dataType')
        this.accessToken = this.$route.query.accessToken ||localStorage.getItem('accessToken')
        localStorage.setItem('dataType',this.dataType)
        localStorage.setItem('accessToken',this.accessToken)
    },
    methods:{
        toVideo() {
            this.$router.push('/video')
        },
        toGw() {
            this.$router.push('/pensionAdvisor')
        },
        changeUrl(i, data){
            this.index=i
            if (i !== 0) {
                window.open(data.screenConfigValue);
            }
        },
        getJdList() {
            getJdList().then(res =>{
                if (res.code === 0) {
                    res.data.forEach(item=>{
                        item.screenConfigValue =  `${item.screenConfigValue}?accessToken=${this.accessToken}&dataType=${this.dataType}`
                    })
                    this.streetList = this.streetList.concat(res.data)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .header{
        height:325px;
        .headerTop{
            font-size:24px;
            height:212px;
            border-bottom: 3px solid #1cefe9;
            padding: 0 50px;
            .headerTopImg{
                font-size: 66px;
                // letter-spacing: 5px;
                font-weight: bold;
                background-image:-webkit-linear-gradient(top,#c8fdff,#7efbff);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
            }
            .headerTopRight{
                div{
                    width:310px;
                    height:84px;
                    background:url("../../../../assets/img/mapBtn_bg.png");
                    background-size:100% 100%;
                    line-height: 84px;
                    text-align: center;
                    cursor: pointer;
                }
                font-size:42px;
                font-weight: bold;
                background-image:-webkit-linear-gradient(top,#c8fdff,#7efbff);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
            }
        }
        .streetInfor{
            display: flex;
            padding:0 120px;
            justify-content: space-between;
            align-items: center;
            font-size:38px;
            height:110px;
            .activeColor{
                color:#1cefe9;
            }
        }

    }
</style>
