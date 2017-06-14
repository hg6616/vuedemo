<template>
    <div>
        <div class="container" v-if="carOwner.binded">
            <div class="card middle-div  margin-bottom">
                <div class="body">
                    <ul>
                        <li>
                            <label class="required">姓名</label>
                            <span><input ref="carownerName" name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"  type="text" placeholder="请填入姓名"></span>
                        </li>
                        <li class=" ">
                            <label class="required">车牌</label>
                            <carNoInput :callback="getCarNo"></carNoInput>
                        </li>
                        <li class="arrow ffg" @click="showBrand">
                            <label class="required">绑定车型</label>
                            <span><input readonly type="text" :value="selectedSeries.carSeriesCn" placeholder="请选择车型" ref="carTypeConfigId" name="车型"  v-validate="{ rules: { required: true }}"></span>
                        </li>
                        <li>
                            <label class="required">手机号</label>
                            <span><input  ref="mobile" name="手机号"   v-validate="{ rules: {  required: true,mobile:true } }"   type="number" placeholder="请填入手机"></span>
                        </li>
    
                    </ul>
    
                </div>
            </div>
            <div class="card middle-div  margin-bottom">
    
                <div class="body">
                    <ul>
                        <li><span style="padding-left: 1.5rem"> 补充更多信息(选填)</span> </li>
                        <li>
                            <label>车架号</label>
                            <span><input  placeholder="请输入车架号" ref="vin"   name="车架号"  v-validate="{ rules: { max:17 } }"   type="text"></span></li>
                        <li>
                            <label>发动机号</label>
                            <span><input  placeholder="请输入发动机号" ref="engineNo"   name="发动机号"  v-validate="{ rules: {  max:6} }"   type="number"></span></li>
                        <li class="" @click="openPicker(1)">
                            <label class="">购车时间</label>
                            <span><input   name="预约时间" ref="buyCarTime" type="text" placeholder="请选择购车日期"></span>
                        </li>
                        <li class="" @click="openPicker(2)">
                            <label class="">保险到期日</label>
                            <span><input   name="预约时间" ref="buyInsuranceTime" type="text" placeholder="请选择预约时间"></span>
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
import brandSelect from '../components/brandSelect'
import carNoInput from '../components/carNoInput';
import api from '../api/api.js';
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
            carNo: '',
            id: ''
        };
    },
    computed: {
        ...mapGetters(['carOwner']),
    },
    components: { brandSelect, carNoInput },
    activated() {
        //  util.ifRedirectAfterLoadPage.call(this);
    },
    methods: {
        openPicker(i) {
            this.id = i
            this.$refs.picker.open();
        },
        handleConfirm() {
            var c = util.getDateStr({ date: this.pickerValue })
            if (this.id == 1) {
                this.$refs.buyCarTime.value = c;
            }
            else if (this.id == 2) {
                this.$refs.buyInsuranceTime.value = c;
            }
        },
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
            if (this.carNo == '') {
                this.$toast('请输入正确的车牌号码');
                return;
            }
            this.$validator.validateAll()
                .then(() => {
                    var state = this.$store.state;
                    var param = {
                        "dlrCode": state.dlrCode,
                        "carownerName": this.$refs.carownerName.value,
                        "mobile": this.$refs.mobile.value,
                        "carNo": this.carNo,//车牌号
                        "carTypeConfigId": this.selectedSeries.id,
                        "vin": this.$refs.vin.value,
                        "engineNo": this.$refs.engineNo.value,
                        "buyCarTime": this.$refs.buyCarTime.value,
                        "buyInsuranceTime": this.$refs.buyInsuranceTime.value,
                    };
                    api.getData([{
                        type: types.BIND_CAR_OWNER,
                        param
                    }])
                        .then(res => {
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
