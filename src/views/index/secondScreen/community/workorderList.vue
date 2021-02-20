<template>
<div>
    <div class="toastList">
        <div class="toastListTittle">养老服务工单列表 <img @click="closeworkorderList()" src="../../../../assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                    <el-table-column prop="COMMITTEE" label="居委" align="center">
                    </el-table-column>
                    <el-table-column label="主动关爱" align="center">
                        <template slot-scope="scope">
                        <span style="color:#ffc600;cursor: pointer" @click="openLoveList(scope.row.COMMITTEE)">{{scope.row.ZDGA}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="优抚工单">
                        <template slot-scope="scope">
                        <span style="color:#ffc600;cursor: pointer" @click="openFirstHelp(scope.row.COMMITTEE, '优抚工单')">{{scope.row.YF}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="牵线搭桥" align="center">
                        <template slot-scope="scope">
                        <span style="color:#ffc600;cursor: pointer" @click="openMatchmakingList(scope.row.COMMITTEE, '牵线搭桥')">{{scope.row.QXDQ}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
          <el-pagination
            class="Pagination"
            @current-change="handleCurrentChange"
            :current-page="this.form.pageNum"
            prev-text="上一页"
            :page-size="10"
            :pager-count="5"
            next-text="下一页"
            layout="->,total,prev, pager, next, jumper"
            hide-on-single-page
            :total="total">
          </el-pagination>
        </div>
    </div>
    <div class="maskToast maskToasts" v-if="showList" @click.self="closemaskToast">
        <activecareList v-if="showactivecareList" :closeactivecareList='closeactivecareList' :id='id'/>
        <matchmakingList v-if="showmatchmakingList" :closematchmakingList='closematchmakingList' :id='id'/>
    </div>
</div>
</template>
<script>
import { getOrderList } from "@/api/order"
import activecareList from './activecareList'
import matchmakingList from './matchmakingList'
export default {
    components:{
        activecareList,
        matchmakingList
    },
    props:['closeworkorderList'],
    data(){
        return{
            form: {
                area: '江川路街道',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            loading:true,
            tableData:[],
            showList:false,
            id:"",
            showactivecareList:false,
            showmatchmakingList:false
        }
    },
    methods:{
        handleCurrentChange(val){
            this.form.pageNum = val
            this.getData()
        },
        getData() {
            getOrderList(this.form).then(res => {
                if (res.code === 0) {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                }
            });
        },
        openLoveList(id){
            this.id=id
            this.showList = true
            this.showactivecareList=true
        },
        openMatchmakingList(id){
            this.id=id
            this.showList = true
            this.showmatchmakingList = true
        },
        closeactivecareList(){
            this.showList = false
            this.showactivecareList=false
        },
        closematchmakingList(){
            this.showList = false
            this.showmatchmakingList=false
        },
        closemaskToast(){
            this.showList = false
            this.showactivecareList=false
            this.showmatchmakingList=false
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>

</style>M
