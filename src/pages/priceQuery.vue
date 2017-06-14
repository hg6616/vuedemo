<template>
    <div class="container">
    
        <div class="arrow-select  " @click="showBrand">
            <div class="roundDot"></div>
            <span class="text">{{selectedSeries.carConfigCn}}</span>
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label class="required">姓名</label>
                        <span><input class="required" ref="carownerName" type="text" name="姓名" v-validate="{ rules: {  required: true,chn: true } }"   placeholder="请输入姓名"></span>
                    </li>
                    <li>
                        <label class="required">手机号</label>
                        <span><input ref="mobile" type="text" name="手机号"  v-validate="{ rules: { required: true, mobile: true } }" placeholder="请输入手机号"></span>
                    </li>
                    <!--<li style="position: relative">
                                                                                                        <label>验证码</label>
                                                                                                        <span><input type="text" placeholder="请输入验证码" class="short-inpu3t"></span>
                                                                                                        <div class="little-button">获取验证码</div>
                                                                                                    </li>-->
                    <!--<li class="arrow">
                                                                                    <label>专营店</label>
                                                                                    <div style="position:relative;display:inline-block">
                                                                                        <input type="text" placeholder="请选择专营店" @keyup="keyu" ref="zyd">
                                                                                      
                                                                                    </div>
                                                                
                                                                                </li>-->
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea  ref="remark"   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <div class="longButton  bottom-button" @click="submit">提交</div>
        <brandSelect :callback="setSelectSeries" :config="brandSelectConfig"></brandSelect>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
import brandSelect from '../components/brandSelect'
export default {
    data() {
        return {
            showtip: false,
            selectedSeries: {
                carSeriesCn: ''
            },
            brandSelectConfig: {
                showBrand: false,
                level: 'cartype'
            },
        };
    },
    components: { brandSelect },
    // activated() {
    //     this.selectedSeries.carConfigCn = this.$route.query.seriesCN;
    //     this.$refs.carownerName.value = '';
    //     this.$refs.mobile.value = '';
    //     this.$refs.remark.value = '';
    // },
    methods: {
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
                        type: types.ADD_VEHICLE_CLUE,
                        param: {
                            "dlrCode": this.$store.state.dlrCode,
                            "carownerName": this.$refs.carownerName.value,
                            "mobile": this.$refs.mobile.value,
                            "clueType": "1",
                            // "repairTime": "2016-09-09",
                            "carTypeId": this.selectedSeries.id,
                            "carBrandId": this.selectedSeries.brandID,
                            "remark": this.$refs.remark.value
                            //    "validCode": "201609"
                        }
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
                .catch(() => {
                    console.log(err)
                    util.validate(this.errors);
                });
            // return;

        }
    },
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       .inline-right-button{
      position: absolute;
         right:1rem;
         top:0.6rem;
}
.tipUl{
   position:absolute;
   top:2rem;
   background-color:lightblue;
}

.little-button{
   @extend  .inline-right-button
} 

.card{
    margin-top: 0.5rem;
}
</style>
