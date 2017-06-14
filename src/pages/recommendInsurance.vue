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
                        <span><input ref="mobile" name="手机号"  v-validate="{ rules: {  required: true,mobile: true } }"   type="number" placeholder="请输入手机号"></span>
                    </li>
                    <li class="arrow ">
                        <label class="required">到险日期</label>
                        <span><input readonly ref="repairTime" readonly name="到险日期" @click="openPicker"  v-validate="{ rules: {  required: true } }"   type="text" placeholder="请选择到险日期"></span>
                    </li>
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea  ref="remark"   name="备注"  v-validate="{ rules: {  max: 200 } }"   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <button class="longButton  bottom-button" @click="submit">提交</button>
    
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date()" v-model="pickerValue" @confirm="handleConfirm">
        </mt-datetime-picker>
    
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    data() {
        return {
            pickerValue: ''
        };
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm() {
            var c = util.getDateStr({ date: this.pickerValue })
            this.$refs.repairTime.value = c;
        },
        submit() {
            var state = this.$store.state;
            this.$validator.validateAll()
                .then(() => {

                    api.getData([{
                        type: types.ADD_INSURANCE_CLUE,
                        param: {
                            "dlrCode": state.dlrCode,
                            "aiBuType": "2",//推荐购买是2
                            "recommendName": this.$refs.carownerName.value,
                            "recommendTel": this.$refs.mobile.value,
                            "remark": this.$refs.remark.value,
                            aboutExpireTime: this.$refs.repairTime.value,
                        }
                    }])
                        .then(res => {
                            if (res == state.sucCode) {
                                this.$toast('操作成功');
                            }
                            else {
                                this.$toast('操作失败');
                            }
                        })
                        .catch(() => {
                            this.$toast('操作失败');
                        })
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
