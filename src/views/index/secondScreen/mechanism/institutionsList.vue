<template>
<div>
    <div class="toastList">
        <div class="toastListTittle">养老机构列表 <img @click="closeinstitutions()" src="../../../../assets/images/close_dialog.png" alt=""></div>
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                <el-table-column prop="orgName" label="机构名称" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="color:#ffc600;cursor: pointer" @click="toDetail(scope.row.org_id)">{{scope.row.orgName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="机构类型" align="center" width='150'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.orgType === '1010'">养老机构</span>
                        <span v-if="scope.row.orgType === '1011'">长者照护之家</span>
                        <span v-if="scope.row.orgType === '2010'">日间照护</span>
                        <span v-if="scope.row.orgType === '2011'">综合为老服务中心</span>
                        <span v-if="scope.row.orgType === '2012'">邻里汇</span>
                        <span v-if="scope.row.orgType === '2013'">老年活动室</span>
                        <span v-if="scope.row.orgType === '2014'">助餐点</span>
                        <span v-if="scope.row.orgType === '2015'">社区长者食堂</span>
                        <span v-if="scope.row.orgType === '2016'">护理站</span>
                        <span v-if="scope.row.orgType === '2017'">社区养老组织</span>
                        <span v-if="scope.row.orgType === '2018'">健康小屋</span>
                        <span v-if="scope.row.orgType === '2019'">护理院</span>
                        <span v-if="scope.row.orgType === '3001'">政府采购类服务商</span>
                        <span v-if="scope.row.orgType === '3002'">市场化服务商</span>
                        <span v-if="scope.row.orgType === '4001'">养老辅具展示点</span>
                    </template>
                </el-table-column>
                <el-table-column prop="openState" label="机构状态" align="center" width='120'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.openState === 'open_state_normal'">正常</span>
                        <span v-if="scope.row.openState === 'open_state_prepare'">筹备</span>
                        <span v-if="scope.row.openState === 'open_state_pause'">暂停</span>
                        <span v-if="scope.row.openState === 'open_state_close'">关闭</span>
                    </template>
                </el-table-column>
                <el-table-column prop="areaName" label="所属居委" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="addr" label="详细地址" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"  width='150'></el-table-column>
                </el-table>
            </div>
            <el-pagination
                class="Pagination"
                @current-change="handleCurrentChange"
                :current-page="this.form.pageNum"
                :pager-count="5"
                :page-size="10"
                prev-text="上一页"
                next-text="下一页"
                layout="->,total,prev, pager, next, jumper"
                hide-on-single-page
                :total="total">
          </el-pagination>
        </div>
    </div>
    <div class="maskToast maskToasts" v-if="showList" @click.self="closemaskToast">
        <institutionsDetail v-if="showinstitutionsDetail" :closeinstitutionsDetail='closeinstitutionsDetail' :id="orgId"/>
    </div>
</div>
</template>
<script>
import {getFacilities} from '@/api/secondeScreen'
import institutionsDetail from "./institutionsDetail"
export default {
    props:['closeinstitutions'],
    components:{
        institutionsDetail
    },
    data(){
        return{
            loading:true,
            tableData:[],
            total:0,
            form: {
                areaCode: '310112001000',
                type: '1010,1011',
                pageNum: 1,
                pageSize: 10
            },
            orgId:'',
            showList:false,
            showinstitutionsDetail:false
        }
    },
    methods:{
        toDetail(orgId){
            this.orgId=orgId
            this.showList=true,
            this.showinstitutionsDetail=true
        },
        closemaskToast(){
            this.showinstitutionsDetail = false
            this.showList =false
        },
        closeinstitutionsDetail(){
            this.showList=false,
            this.showinstitutionsDetail=false
        },
        handleCurrentChange(val){
            this.loading = true;
            this.form.pageNum = val;
            this.getData();
        },
        getData(){
            getFacilities(this.form).then(res => {
                if (res) {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                }
            })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
   
</style>