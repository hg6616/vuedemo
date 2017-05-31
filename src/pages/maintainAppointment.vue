<template>
    <div>
        <div class="container" v-if="carOwner.binded">
            <div class="arrow-select arrow" @click="showBrand">
                <div class="roundDot"></div>
                <span class="text">{{selectedSeries.carSeriesCn}}</span>
            </div>
            <div class="card middle-div  margin-bottom">
                <div class="body">
                    <ul>
                        <li>
                            <label class="required">姓名</label>
                            <span><input ref="recommendName" name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"  type="text" placeholder="请填入姓名"></span>
                        </li>
                        <li>
                            <label class="required">手机号</label>
                            <span><input  ref="recommendTel" name="手机号"   v-validate="{ rules: {  required: true,mobile:true } }"   type="number" placeholder="请填入手机"></span>
                        </li>
                        <li class=" ">
                            <label class="required">车牌</label>
                            <carNoInput :callback="getCarNo"></carNoInput>
                        </li>
                        <li style="position: relative;">
                            <label class="required">当前里程</label>
                            <span><input ref="courseNo" type="number" name="当前里程"  v-validate="{ rules: {  required: true,positiveInt:true } }" placeholder="请输入当前里程"></span>
                            <span class="inline-right">km</span>
                        </li>
                        <li class=" ">
                            <label class="required">养修类型</label>
                            <span>
                                                         <select ref="repairType">
                                                            <option value="1">保养</option>
                                                            <option value="2">维修</option>
                                                        </select>
                                                        </span>
                        </li>
                        <li class="arrow">
                            <label class="required">预约时间</label>
                            <span><input  :min="minDate" v-validate="{ rules: {  required: true } }"  name="预约时间" ref="repairTime" type="date" placeholder="请选择预约时间"></span>
                        </li>
    
                        <!--<li class="arrow"> <label>专营店</label>
                                                    <span><input type="text" placeholder="请选择专营店"></span>
                                                </li>-->
                        <li>
                            <label style="vertical-align: top">备注</label>
                            <span><textarea name="备注"  v-validate="{ rules: {  max: 200 } }"    ref="remark"   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                        </li>
    
                    </ul>
    
                </div>
            </div>
    
            <button class="longButton  bottom-button" @click="submit">提交</button>
        </div>
        <brandSelect :callback="setSelectSeries" :config="brandSelectConfig"></brandSelect>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js'
import brandSelect from '../components/brandSelect'
import carNoInput from '../components/carNoInput'
export default {
    data() {
        return {
            selectedSeries: {
                carSeriesCn: ''
            },
            brandSelectConfig: {
                showBrand: false,
                //  level:'brand'
                level: 'series'
            },
            carNo: '',
            minDate2: '2017-05-03'
        };
    },
    computed: {
        ...mapGetters(['carOwner']),
        minDate() {
            var res = '';
            var d = new Date();
            res += d.getFullYear();
            var m = d.getMonth() + 1;
            if (m < 10) {
                m = '0' + m;
            }
            res += '-' + m;
            var day = d.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            res += '-' + day;

            return res;
        }
    },
    components: { brandSelect, carNoInput },
    activated() {
        util.ifRedirectAfterLoadPage.call(this);
    },
    methods: {
        ...mapActions([types.ADD_SERVICE_CLUE, types.GET_USER_INFO]),
        getCarNo(obj) {
            this.carNo = obj;
        },
        setSelectSeries(obj) {
            this.selectedSeries = obj;
        },
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        submit() {
            this.$validator.validateAll()
                .then(() => {
                    console.log('vali suc')
                    var state = this.$store.state;
                    var params = {
                        "dlrCode": state.dlrCode,
                        "repairType": this.$refs.repairType.value,
                        "repairTime": this.$refs.repairTime.value,
                        "courseNo": this.$refs.courseNo.value,
                        "buType": "1",//预约养修是1
                        "recommendName": this.$refs.recommendName.value,
                        "recommendTel": this.$refs.recommendTel.value,
                        "carTypeConfigId": 'xxx',//todo
                        // "longitude": "107.456789",//todo
                        //  "latiude": "23.456789",//todo
                        "remark": this.$refs.remark.value,
                        "carNo": this.carNo,//车牌号
                    }
                    this.ADD_SERVICE_CLUE(params)
                        .then(() => {
                            console.log(state.sucCode)
                            if (state.ADD_SERVICE_CLUE == state.sucCode) {
                                this.$toast('操作成功');

                            }
                            else {
                                this.$toast('操作失败');
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            this.$toast('操作失败');
                        });
                })
                .catch((err) => {
                    console.log('vali fail')
                    console.log(err)
                    this.$store.state.validate(this.errors)
                });


        },
    },
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       .card{
           margin-top:.5rem;
       }
</style>
