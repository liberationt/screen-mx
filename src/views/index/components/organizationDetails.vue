<template>
    <div class="longWidthStyle" style="height:1203px">
        <div class="inforTitle displayFlex">
            <div><img src="@/assets/img/jgxq.png" alt=""></div>
            <div @click="close"><img src="@/assets/img/guanbi.png" alt=""></div>
        </div>
        <div class="organizationDetail">
            <div>
                <h3 class="mb30 font32">基础信息</h3>
                <div class="organizationDetailInfor">
                    <div class="halfWidth">
                        <span>机构名称：</span>
                        <span>{{form.orgName}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='1010'">
                        <span>组织机构代码：</span>
                        <span>{{form.orgCode}}</span>
                    </div>
                    <!-- <div class="halfWidth"  v-if="instituType=='1010'">
                        <span>机构类型：</span>
                        <span>{{form.orgTypeName}}</span>
                    </div> -->
                    <div class="halfWidth"  v-if="instituType=='2010'||instituType=='2011'||instituType=='2013'||instituType=='2014'||instituType=='2017'||instituType=='2020'">
                        <span>机构类型：</span>
                        <span>{{orgTypeName}}</span>
                    </div>
                    <div class="halfWidth"  v-if="instituType=='2017'||instituType=='2020'">
                        <span>机构编码：</span>
                        <span>{{form.orgCode}}</span>
                    </div>
                    <div class="halfWidth">
                        <span>成立时间：</span>
                        <span>{{form.establishTime}}</span>
                    </div>
                    <div class="halfWidth">
                        <span>咨询电话：</span>
                        <span>{{form.phone}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2013'&&instituType!='2014'&&instituType!='2017'&&instituType!='2020'">
                        <span>房屋产权：</span>
                        <span>{{form.houseProperty}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2011'">
                        <span>机构建造形式：</span>
                        <span>{{form.orgBuildForm}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2011'&&instituType!='2013'&&instituType!='2017'&&instituType!='2020'">
                        <span>设置形式：</span>
                        <span>{{form.setType}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2017'&&instituType!='2020'">
                        <span>建筑面积(m<sup>2</sup>)：</span>
                        <span>{{form.buildArea}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2014'">
                        <span>证照情况：</span>
                        <span>{{form.certStatus}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2013'&&instituType!='2014'&&instituType!='2017'&&instituType!='2020'">
                        <span>楼层信息：</span>
                        <span>{{form.buildFloor}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2013'&&instituType!='2014'&&instituType!='2017'&&instituType!='2020'">
                        <span>是否有电梯：</span>
                        <span>{{form.isLift}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2017'&&instituType!='2020'">
                        <span>所属居委：</span>
                        <span>{{form.areaCodeStr}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2017'&&instituType!='2020'">
                        <span>详细地址：</span>
                        <span>{{form.addr}}</span>
                    </div>
                    <div class="halfWidth">
                        <span>开放状态：</span>
                        <span>{{form.openState}}</span>
                    </div>
                    <div v-if="instituType=='1010'" class="halfWidth">
                        <span>评定等级：</span>
                        <span>{{form.ratingLevel}}</span>
                    </div>
                    <div v-if="instituType=='1010'" class="halfWidth">
                        <span>日常监测：</span>
                        <span>{{form.dailyInspection}}</span>
                    </div>
                    <div v-if="instituType=='2013'" class="halfWidth">
                        <span>开放时间：</span>
                        <span>{{ form.openStartTime }} - {{ form.openEndTime }}</span>
                    </div>
                    <div v-if="instituType=='2017'||instituType=='2020'" class="halfWidth">
                        <span>注册行政区划：</span>
                        <span>{{form.regAreaStr}}</span>
                    </div>
                    <div v-if="instituType=='2017'||instituType=='2020'" class="halfWidth">
                        <span>注册详细地址：</span>
                        <span>{{form.regAddr}}</span>
                    </div>
                    <div v-if="instituType=='2017'||instituType=='2020'" class="halfWidth">
                        <span>办公行政区划：</span>
                        <span>{{form.officeAreaStr}}</span>
                    </div>
                    <div v-if="instituType=='2017'||instituType=='2020'" class="halfWidth">
                        <span>办公详细地址：</span>
                        <span>{{form.officeAddr}}</span>
                    </div>
                </div>
                <div class="organizationDetailInfor">
                    <h3 class="mb30 font32">运营信息</h3>
                    <div class="halfWidth" v-if="instituType=='2013'">
                        <span>主体性质：</span>
                        <span>{{form.legalType}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2013'">
                        <span>投入主体：</span>
                        <span>{{form.investingMain}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2010'">
                        <span>机构属性：</span>
                        <span>{{form.orgAttr}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='1010'||instituType=='1011'||instituType=='2017'||instituType=='2011'||instituType=='2020'">
                        <span>法人性质：</span>
                        <span>{{form.legalType}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2017'&&instituType!='2020'">
                        <span>运营模式：</span>
                        <span>{{form.opMode}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2013'">
                        <span>运营单位：</span>
                        <span>{{form.opOrg}}</span>
                    </div>

                    <div class="halfWidth">
                        <span>运营方负责人：</span>
                        <span>{{form.opLinkman}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2017'||instituType=='2020'">
                        <span>机构负责人：</span>
                        <span>{{form.orgHead}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2017'||instituType=='2020'">
                        <span>机构负责人联系方式：</span>
                        <span>{{form.orgHeadLinkman}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2014'&&instituType!='2013'&&instituType!='2017'&&instituType!='2020'">
                        <span>建设方负责人：</span>
                        <span>{{form.buildLinkman}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType=='2010'">
                        <span>建设主体：</span>
                        <span>{{form.buildMain}}</span>
                    </div>
                    <div class="halfWidth">
                        <span>运营方联系方式：</span>
                        <span>{{form.opPhone}}</span>
                    </div>
                    <div class="halfWidth" v-if="instituType!='2014'&&instituType!='2013'&&instituType!='2017'&&instituType!='2020'">
                        <span>建设方负责人联系方式：</span>
                        <span>{{form.buildPhone}}</span>
                    </div>
                </div>
                <div class="organizationDetailInfor">
                    <h3 class="mb30 font32">机构图片</h3>
                    <div class="inforImg mr12" v-for="(item,i) in imageInfoVosLookUrl" :key="i">
						<img :src="item" class="agencyImage"/>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="mb30 font32">服务信息</h3>
                <div>
                    <div class="mb30" style="height:120px;" v-if="instituType=='2014'">
                        <h3 class="mb30 font32">最大供餐能力</h3>
                        <div class="display">
                            <div class="halfWidth mb20t">
                                <span>集中供餐人数(人/天)：</span>
                                <span>{{form.focusFoodNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>上门送餐人数(人/天)：</span>
                                <span>{{form.doorFoodDeliveryNum}}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-for="(item, index) in this.institutionField" :key="index">
                            <InstituField :current-item="item" :index="index" :model-type="modelType"></InstituField>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="mb30 font32" v-if="instituType!='2011'&&instituType!='2014'&&instituType!='2013'">服务能力</h3>
                <div>
                    <div v-if="instituType!='2011'&&instituType!='2014'&&instituType!='2013'&&instituType!='2020'">
                        <h4>床位</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span v-if="instituType === '2010'">托位(张)：</span>
                                <span v-else>床位总数量(张)：</span>
                                <span>{{form.bedTotal}}</span>
                            </div>
                            <div class="halfWidth" v-if="instituType === '1010'">
                                <span>已用床位数量(张)：</span>
                                <span>{{form.bedUsed}}</span>
                            </div>
                            <div class="halfWidth" v-if="instituType === '1010'">
                                <span>剩余床位数量(张)：</span>
                                <span>{{form.bedUnused}}</span>
                            </div>
                            <div class="halfWidth" v-if="instituType === '1011'||instituType === '2010'">
                                <span>登记服务总人数(人)：</span>
                                <span>{{form.serviceTotalnum}}</span>
                            </div>
                            <div class="halfWidth" v-if="instituType === '1011'||instituType === '2010'">
                                <span>日服务量(人)：</span>
                                <span>{{form.dayServicenum}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType=='2020'">
                        <h4>服务人数</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth" v-for="(item,i) in service_numOptions" :key="i">
                                <span>{{item.dictLabel}}：</span>
                                <span>{{form.providerPersionVos[item.dictValue]}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType!='2011'&&instituType!='2014'&&instituType!='2013'">
                        <h4>职工</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth" v-for="(item,i) in workforce_typeOptions" :key="i">
                                <span>{{item.dictLabel}}：</span>
                                <span>{{form.providerPersionVos[item.dictValue]}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType=='1010'">
                        <h4>床位费</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span>单人间(元/月)：</span>
                                <span>{{form.oneRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>双人间(元/月)：</span>
                                <span>{{form.twoRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>三人间(元/月)：</span>
                                <span>{{form.threeRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>四人间(元/月)：</span>
                                <span>{{form.fourRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>五人间(元/月)：</span>
                                <span>{{form.fiveRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>六人间及以上(元/月)：</span>
                                <span>{{form.sixMoreRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症照护单人间(元/月）：</span>
                                <span>{{form.cognitiveDisorderOneRoomFee}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症照护多人间：</span>
                                <span>{{ form.cognitiveDisorderMoreRoom1Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom1Fee }}元/月</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症照护多人间：</span>
                                <span>{{ form.cognitiveDisorderMoreRoom2Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom2Fee }}元/月</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType=='1010'">
                        <h4>护理费</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span>一级(元/月)：</span>
                                <span>{{form.nursingFeeLevel1}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>二级(元/月)：</span>
                                 <span>{{form.nursingFeeLevel2}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>三级(元/月)：</span>
                                 <span>{{form.nursingFeeLevel3}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>四级(元/月)：</span>
                                 <span>{{form.nursingFeeLevel4}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>五级(元/月)：</span>
                                 <span>{{form.nursingFeeLevel5}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>六级(元/月)：</span>
                                 <span>{{form.nursingFeeLevel6}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症(元/月)：</span>
                                 <span>{{form.cognitiveDisorderFee}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType=='1010'">
                        <h4>膳食费</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span>膳食费(元/月)：</span>
                                <span>{{form.mealsCostFee}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType=='1011'">
                        <h4>房型</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span>单人房(间)：</span>
                                <span>{{form.oneRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>双人房(间)：</span>
                                 <span>{{form.twoRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>三人房(间)：</span>
                                 <span>{{form.threeRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>四人房(间)：</span>
                                 <span>{{form.fourRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>五人房(间)：</span>
                                 <span>{{form.fiveRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>六人房及以上(间)：</span>
                                 <span>{{form.sixMoreRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症照护单人间(间)：</span>
                                 <span>{{form.cognitiveDisorderOneRoomNum}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症照护多人间：</span>
                                <span>{{ form.cognitiveDisorderMoreRoom1Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom1Num2 }}间</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症照护多人间：</span>
                                <span>{{ form.cognitiveDisorderMoreRoom2Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom2Num2 }}间</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType=='1011'|| instituType=='2010'">
                        <h4>服务价格</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span>一般护理费(元/月)：</span>
                                <span>{{form.commonlyPrice}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>认知症护理费(元/月)：</span>
                                 <span>{{form.cognitiveDisorderNursingPrice}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>床位费(元/月)：</span>
                                 <span>{{form.bedPrice}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>餐费(元/月)：</span>
                                 <span>{{form.mealsPrice}}</span>
                            </div>
                            <div class="halfWidth">
                                <span>其它增值服务费(元/月)：</span>
                                 <span>{{form.otherIncrementPrice}}</span>
                            </div>
                            <div class="halfWidth" v-if="instituType=='1011'">
                                <span>长照餐费(元/天)：</span>
                                 <span>{{form.elderlyCareMealsPrice}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="instituType!='2011'&&instituType!='2014'&&instituType!='2013'&&instituType!='2020'">
                        <h4>其它</h4>
                        <div class="organizationDetailInfor pl60">
                            <div class="halfWidth">
                                <span>养护比(%)：</span>
                                <span>{{curingRatio}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="instituType=='2010'||instituType=='2011'||instituType=='2014'||instituType=='2017'">
                    <h3 class="mb30 font32">享受政策</h3>
                    <div>
                        <div v-for="(item, index) in this.privilegeField" :key="index">
                            <InstituField :current-item="item" :index="index" :model-type="modelType"></InstituField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InstituField from "./InstituField"
import {institutionDetailsData,institutionDetailsDatas,allSelectdictionaryData,facilityTypeFun} from "@/api/organizationDetails"
export default {
    components:{InstituField},
    props: ['instituType', 'id', 'close'],
    watch: {
        id() {
            this.getDateDetail()
            this.orgTypeName = facilityTypeFun(this.instituType);
        }
    },
    data(){
        return{
            modelType:'look',
            institutionField: [
                { children: [] },
                { children: [] },
                { children: [] }
            ],
            //享受政策的字段配置
            privilegeField: [
                {children: []},
                {children: []},
                {children: []}
            ],
            service_numOptions: [], // 服务人数
            form: {
                //-----基本信息-------
                orgName: '',//机构名称
                orgCode:'', //组织代码
                orgType: '',//机构类型
                orgTypeName:'', //机构名称
                ratingLevel:'',//评定等级
                legalType:'',//法人性质
                dailyInspection:'',// 日常监测
                establishTime: '',//成立时间
                phone: '',//咨询电话
                houseProperty: '',//房屋产权
                setType: '',//设置形式
                buildArea: '',//建筑面积
                buildFloor: '',//楼层信息
                isLift: '',//是否有电梯
                openState: '',//开放状态
                areaCode: [],//所属居委
                addr: '',//详细地址
                imageInfoVos: [],//机构图片
                //-------运营信息--------
                //legalType: '',//法人性质
                orgAttr:'', //机构属性
                opMode: '',//运营模式
                opOrg: '',//运营单位
                opLinkman: '',//运营方负责人
                opPhone: '',//运营方联系方式
                buildMain:'',//建设主体
                buildLinkman: '',//建设方负责人
                buildPhone: '',//建设方联系方式
                investingMain:'',//投入主体
                //-----服务能力------
                bedTotal: null,//托位,
                bedUsed: null,//已用床位数量,
                bedUnused: null,//剩余床位数量,
                serviceTotalnum: null,//登记服务总人数,
                dayServicenum: null,//日服务量,
                providerPersionVos: {},//职工的数据
                // 2011
                orgBuildForm:null,
                //床位信息
                oneRoomFee:null,
                twoRoomFee:null,
                threeRoomFee:null,
                fourRoomFee:null,
                fiveRoomFee:null,
                sixMoreRoomFee:null,
                cognitiveDisorderOneRoomFee:null,
                cognitiveDisorderMoreRoom1Num1:null,
                cognitiveDisorderMoreRoom2Num1:null,
                cognitiveDisorderMoreRoom2Fee:null,
                //护理费
                nursingFeeLevel1:null,
                nursingFeeLevel2:null,
                nursingFeeLevel3:null,
                nursingFeeLevel4:null,
                nursingFeeLevel5:null,
                nursingFeeLevel6:null,
                cognitiveDisorderFee:null,
                //1011 长者照护之家
                dayServicenum:null,
                serviceTotalnum:null,
                oneRoomNum: null,
                twoRoomNum: null,
                threeRoomNum: null,
                fourRoomNum: null,
                fiveRoomNum: null,
                sixMoreRoomNum: null,
                cognitiveDisorderOneRoomNum: null,
                cognitiveDisorderMoreRoom1Num1: null,
                cognitiveDisorderMoreRoom1Num2: null,
                cognitiveDisorderMoreRoom2Num1: null,
                cognitiveDisorderMoreRoom2Num2: null,
                commonlyPrice: null,
                cognitiveDisorderNursingPrice: null,
                bedPrice: null,
                mealsPrice: null,
                otherIncrementPrice: null,
                elderlyCareMealsPrice: null,
                //膳食费
                mealsCostFee:null,
                //-----服务信息----
                providerItemVos: [],
                openStartTime:null,
                openEndTime:null,
                certStatus:null,
                //新增
                dayAvgPrice:null,
                positionPrice:null,
                baseServicePrice:null,
                incrementPrice:null,
                mealsPrice:null,
                //2017
                regAreaStr:null,
                regAddr:null,
                officeAreaStr:null,
                officeAddr:null,
                orgHead:null,
                orgHeadLinkman:null,
            },
            orgTypeName:"",//机构属性
            curingRatio:null,
            imageInfoVosLookUrl:[],
            workforce_typeOptions:[]
        }
    },
    methods:{
        closeDetail(){
            this.close();
        },
        // 获取下拉字典
        getSelect() {
            return new Promise((resolve, reject) => {
                // 数据字典接口
                // 1011:长者照顾,  1010:养老机构
                let dicKey = 'workforce_type,service_num'
                // if (this.instituType === '1011') {
                //   dicKey = 'workforce_type'
                // } else {
                //   dicKey = 'house_type,set_mode_type,sys_Yes_No,open_state,corp_attr,operate_mode,workforce_type,rating,daily_testing'
                // }
                allSelectdictionaryData(dicKey).then(response => {
                if (response.code === 0) {
                    for (const k in response.data) {
                    switch (k) {
                        // 职工信息
                        case 'workforce_type':
                        this.workforce_typeOptions = response.data[k]
                        break
                        case 'service_num':
                        this.service_numOptions = response.data[k]
                        break
                    }
                    }
                } else {
                    this.$message.error('数据字典接口请求失败！')
                }
                resolve()
                }).catch(() => {
                this.$message.error('操作失败！')
                reject()
                })
            })
        },
        async getDateDetail(){
            await this.getSelect()
            if(this.instituType=='2013'){
                institutionDetailsDatas(this.id,'').then(res=>{
                    if(res.code==0){
                        this.form = res.data
                        this.form.imageInfoVos.forEach((item)=>{
                            this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
                        });
                        this.institutionField = res.data.serviceProviderConfigVoList['1']
                    }
                })
            }else{
                institutionDetailsData(this.id,'').then(res=>{
                    if(res.code==0){
                        this.form = res.data
                        this.form.imageInfoVos.forEach((item)=>{
                            this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
                        });
                        this.institutionField = res.data.serviceProviderConfigVoList['2']
                        if(res.data.serviceProviderConfigVoList&&res.data.serviceProviderConfigVoList['3']){
                            this.privilegeField = res.data.serviceProviderConfigVoList['3'];
                        }
                        // 职工---赋值数量
                        const providerPersionVosArr = {}
                        res.data.providerPersionVos.forEach((item) => {
                            providerPersionVosArr[item.persionType] = item.num
                        })
                        // 职工---赋值id
                        this.form.providerPersionVos = {}
                        this.form.providerPersionVos = providerPersionVosArr
                        this.curingRatioCalculate()
                    }
                })
            }
        },
      // 计算养护比的值
        curingRatioCalculate() {
            if (parseInt(this.form.providerPersionVos.nurse) > 0 && parseInt(this.form.bedTotal) >= 0) {
                this.curingRatio = parseFloat(parseInt(this.form.providerPersionVos.nurse) / parseInt(this.form.bedTotal) * 100).toFixed(2)
            } else {
                this.curingRatio = '0'
            }
        },
    },
    mounted(){
        this.getDateDetail()
        this.orgTypeName = facilityTypeFun(this.instituType);
    }
}
</script>
<style lang="scss" scoped>
    .organizationDetail{
        margin:0;
        padding:35px 40px;
        height:1120px;
        overflow: auto;
        font-size:30px;
        h4{
            font-size:30px;
            width:100%;
        }
        h3{
            width:100%;
        }
        .organizationDetailInfor{
            >div{
                margin-bottom:25px;
            }
            display: flex;
            flex-wrap: wrap;
            .inforImg{
                width:310px;
                height:250px;
                .agencyImage{
                    width:100%;
                    height:100%;
                }
            }
        }
    }
</style>
