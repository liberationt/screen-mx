<template>
<div>
    <div class="toastList">
        <div class="toastListTittle">志愿者列表 <img @click="closevolunteerList()" src="../../../../assets/images/close_dialog.png" alt=""></div> 
        <div class="toastcontent">
            <div class="tableList">
                <el-table v-loading="loading" :data="tableData" >
                    <el-table-column prop="fullName" label="姓名" align="center" >
                    </el-table-column>
                    <el-table-column prop="sexName" label="性别" align="center">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" align="center">
                    </el-table-column>
                    <el-table-column   label="身份证号码" prop="idCard" align="center">
                        <!-- <template slot-scope="scope">
                        <span>{{idCard(scope.row.idCard)}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column  label="服务对象" align="center">
                        <template slot-scope="scope">
                        <span style="color:#ffc600;cursor: pointer" @click="toDetail(scope.row.id)">{{scope.row.servicePeopleNumber}}</span>
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
        <servicerList v-if="showservicerList" :id="id" :closeserviceList='closeserviceList' />
    </div>
</div>
</template>
<script>
import {getVolunteerList} from "@/api/secondeScreen"
import servicerList from './serviceList'
export default {
    props:['closevolunteerList'],
    components:{
        servicerList
    },
    data(){
        return{
            form: {
                areaCode: '310112001000',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            loading:false,
            tableData:[],
            id:'',
            showservicerList:false,
            showList:false,
        }
    },
    methods:{
        handleCurrentChange(val){
            this.form.pageNum = val
            this.getData()
        },
        toDetail(id){
            this.id=id
            this.showList=true
            this.showservicerList=true
        },
        closeserviceList(){
            this.showList=false
            this.showservicerList=false
        },
        closemaskToast(){
            this.closeserviceList() 
        },
        getData() {
            getVolunteerList(this.form).then(res => {
                if (res.code === 0) {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                }
            });
        },
    },
    mounted(){
        // this.form.orgId = this.orgId
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    
</style>