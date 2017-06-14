<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label class="required">姓名</label>
                        <span><input ref="carownerName"  name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"  type="text" placeholder="请输入姓名"></span>
                    </li>
                    <li>
                        <label class="required">手机号</label>
                        <span><input ref="mobile" name="手机号"  v-validate="{ rules: {  required: true,mobile: true } }"  type="number" placeholder="请输入手机号"></span>
                    </li>
                    <li class="arrow" @click="showBrand">
                        <label class="required">车型</label>
                        <span><input type="text" name="车型"  v-validate="{ rules: {  required: true  } }"  :value="selectedCartype.carConfigCn" placeholder="请选择车型" readonly></span>
                    </li>
                    <!--<li style="position: relative">
                                                        <label>验证码</label>
                                                        <span><input type="text" placeholder="请输入验证码" class="short-inpu3t"></span>
                                                        <div class="little-button">获取验证码</div>
                                                    </li>-->
                    <li class=" ">
                        <label class="required">预约时间</label>
                        <span><input ref="repairTime" readonly @click="openPicker"  name="预约时间"   v-validate="{ rules: {  required: true } }"  readonly type="text" placeholder="请选择预约时间"></span>
                    </li>
                    <!--<li class="arrow">
                                                        <label>专营店</label>
                                                        <span><input type="text" placeholder="请选择专营店"></span>
                                                    </li>-->
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea  ref="remark" name="备注"  v-validate="{ rules: {  max: 200 } }"    style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
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
import * as types from '../store/mutation-types'
import brandSelect from '../components/brandSelect'
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    data() {
        return {
            brandSelectConfig: {
                showBrand: false,
                level: 'cartype'
            },
            selectedCartype: {
                carConfigCn: '点击选择车型'
            },
            pickerValue: '',
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
            this.selectedCartype = obj;
        },
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        submit() {
            this.$validator.validateAll()
                .then(() => {
                    var param = {
                        "dlrCode": this.$store.state.dlrCode,
                        "carownerName": this.$refs.carownerName.value,
                        "mobile": this.$refs.mobile.value,
                        "clueType": "2",//试驾是2
                        "repairTime": this.$refs.repairTime.value,
                        // "carTypeId": this.$route.query.cartype,
                        // "carBrandId": this.$route.query.carbrand,
                        "carTypeId": this.selectedCartype.id,
                        "carBrandId": this.selectedCartype.brandID,
                        "remark": this.$refs.remark.value,
                        //    "validCode": "201609"
                    };
                    api.getData([{
                        type: types.ADD_VEHICLE_CLUE,
                        param
                    }])
                        .then(res => {
                            if (res == 'R200') {
                                this.$toast('操作成功');
                            }
                            else {
                                this.$toast('操作失败');
                            }
                        })
                        .catch(() => {
                            this.$toast('操作失败');
                        }); 
                })
                .catch(err => {
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
