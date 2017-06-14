<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label class="required">姓名</label>
                        <span><input  name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"   ref="carownerName" type="text" placeholder="请输入姓名"></span>
                    </li>
                    <li>
                        <label class="required">手机号</label>
                        <span><input  name="手机号"  v-validate="{ rules: {  required: true,mobile: true } }"   ref="mobile" type="number" placeholder="请输入手机号"></span>
                    </li>
                    <li class="arrow " @click="showBrand">
                        <label class="required">养修车型</label>
                        <span>{{selectedSeries.carConfigCn}}</span>
    
                    </li>
                    <li style="position: relative;">
                        <label class="required">当前里程</label>
                        <span><input ref="courseNo" type="number" name="当前里程"  v-validate="{ rules: {  required: true,positiveInt:true } }" placeholder="请输入当前里程"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li class="arrow">
                        <label class="required">预约时间</label>
                        <span><input readonly   v-validate="{ rules: {  required: true } }" @click="openPicker" name="预约时间" ref="repairTime" type="text" placeholder="请选择预约时间"></span>
                    </li>
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea name="备注"  v-validate="{ rules: {  max: 200 } }"    ref="remark"   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <button class="longButton  bottom-button" @click="submit">提交</button>
        <brandSelect :callback="setSelectSeries" :config="brandSelectConfig"></brandSelect>
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date()" v-model="pickerValue" @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import brandSelect from '../components/brandSelect'
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    data() {
        return {
            pickerValue: '',
            selectedSeries: {
                carConfigCn: ''
            },
            brandSelectConfig: {
                showBrand: false,
                level: 'cartype'
            },
        };
    },
    components: { brandSelect },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm() {
            var c = util.getDateStr({ date: this.pickerValue })
            this.$refs.repairTime.value = c;
        },
        setSelectSeries(obj) {
            this.selectedSeries = obj;
        },
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        submit() {
            if (this.selectedSeries.carConfigCn == '') {
                this.$toast({
                    message: '请选择车型',
                    duration: 2000
                });
                return;
            }
            var state = this.$store.state;
            this.$validator.validateAll()
                .then(() => {

                    api.getData([{
                        type: types.ADD_SERVICE_CLUE,
                        param: {

                            "dlrCode": state.dlrCode,
                            "repairType": "1",//养修类型 todo
                            "repairTime": this.$refs.repairTime.value,
                            "courseNo": this.$refs.courseNo.value,
                            "buType": "2",//推荐养修是2
                            "recommendName": this.$refs.carownerName.value,
                            "recommendTel": this.$refs.mobile.value,
                            "carTypeConfigId": this.selectedSeries.id,
                            // "longitude": "107.456789",//todo
                            // "latiude": "23.456789",//todo
                            "remark": this.$refs.remark.value,
                        }
                    }])
                        .then(res => {
                            if (res == state.sucCode) {
                                this.$toast('操作成功');
                                this.$refs.carownerName.value = '';
                                this.$refs.mobile.value = '';
                                this.selectedSeries.carConfigCn = '';
                                this.$refs.remark.value = '';
                            }
                            else {
                                this.$toast('操作失败');
                            }
                        })
                        .catch(() => {
                            this.$toast('操作失败');
                        });
                })
                .catch((err) => {
                    console.log(err)
                    util.validate(this.errors);
                });
        }
    },
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       .little-button{
 //    .inline-right-button
      } 

.card{
    margin-top: .5rem;
}
</style>
