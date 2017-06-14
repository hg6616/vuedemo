<template>
    <div>
        <div class="container" v-if="carOwner.binded">
            <div class="arrow-select ">
                <div class="roundDot"></div>
                <span class="text">{{carBrandName}}</span>
            </div>
            <div class="card middle-div  margin-bottom">
                <div class="body">
                    <ul>
                        <!-- <li>
                                <label class="required">姓名</label>
                                <span><input ref="recommendName" name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"  type="text" placeholder="请填入姓名"></span>
                            </li> -->
                        <li>
                            <label class="required">姓名</label>
                            <span><input readonly name="姓名"  type="text" v-model="recommendName"></span>
                        </li>
                        <li>
                            <label class="required">手机号</label>
                            <!-- <span><input  ref="recommendTel" name="手机号"   v-validate="{ rules: {  required: true,mobile:true } }"   type="number" placeholder="请填入手机"></span> -->
                            <span><input readonly name="手机号码"  type="text" v-model="mobile"></span>
                        </li>
                        <!--  <li class=" ">
                                <label class="required">车牌</label>
                                <carNoInput :callback="getCarNo"></carNoInput>
                            </li> -->
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
                            <span><input readonly v-validate="{ rules: {  required: true } }" @click="openPicker" name="预约时间" ref="repairTime" type="text" placeholder="请选择预约时间"></span>
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
        <div class="container" v-else>
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
                        <!--  <li class=" ">
                                <label class="required">车牌</label>
                                <carNoInput :callback="getCarNo"></carNoInput>
                            </li> -->
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
                            <span><input readonly v-validate="{ rules: {  required: true } }" @click="openPicker" name="预约时间" ref="repairTime" type="text" placeholder="请选择预约时间"></span>
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
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date()" v-model="pickerValue" @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js'
import api from '../api/api.js';
import brandSelect from '../components/brandSelect'
import carNoInput from '../components/carNoInput'
export default {
    data() {
        return {
            pickerValue: '',
            selectedSeries: {
                carSeriesCn: ''
            },
            brandSelectConfig: {
                showBrand: false,
                level: 'series'
            },
            recommendName: '',
            mobile: '',
            carBrandName: ''
            // carNo: '',
        };
    },
    computed: {
        ...mapGetters(['carOwner']),
    },
    components: { brandSelect, carNoInput },
    activated() {
        util.ifRedirectAfterLoadPage.call(this);
        var dlrCode = this.$store.state.dlrCode;
        debugger
        api.getData([{
            type: types.GET_USER_INFO,
            param: { dlrCode }
        }])
            .then(
            res => {
                this.recommendName = res.carOwner.carownerName;
                this.mobile = res.carOwner.mobile;
                this.carBrandName = res.carOwner.carBrandName;
            }
            )
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm() {
            var c = util.getDateStr({ date: this.pickerValue })
            this.$refs.repairTime.value = c;
        },
        // getCarNo(obj) {
        //     this.carNo = obj;
        // },
        setSelectSeries(obj) {
            this.selectedSeries = obj;
        },
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        submit() {
            // if (this.carNo == '') {
            //     this.$toast('请输入正确的车牌号码');
            //     return;
            // }
            this.$validator.validateAll()
                .then(() => {
                    console.log('vali suc')
                    var state = this.$store.state;

                    api.getData([{
                        type: types.ADD_SERVICE_CLUE,
                        param: {
                            "dlrCode": state.dlrCode,
                            "repairType": this.$refs.repairType.value,
                            "repairTime": this.$refs.repairTime.value,
                            "courseNo": this.$refs.courseNo.value,
                            "buType": "1",//预约养修是1
                            "recommendName": this.$refs.recommendName.value,
                            "recommendTel": this.$refs.recommendTel.value,
                            "carTypeConfigId": '1',//todo
                            // "longitude": "107.456789",//todo
                            //  "latiude": "23.456789",//todo
                            "remark": this.$refs.remark.value,
                            // "carNo": this.carNo,//车牌号                            
                        }
                    }])
                        .then(res=> {
                            if (res == state.sucCode) {
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
                    util.validate(this.errors);
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
