<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label class="required">姓名</label>
                        <span><input   name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"  type="text" placeholder="请输入姓名"></span>
                    </li>
                    <li>
                        <label class="required">手机号</label>
                        <span><input  name="手机号"  v-validate="{ rules: {  required: true,mobile: true } }"   type="number" placeholder="请输入手机号"></span>
                    </li>
                   <!--  <li class="arrow" @click="showBrand">
                        <label class="required">已有车型</label>
                        <span>{{selectedSeries.carSeriesCn}}</span>
                    </li> -->
    
                    <li>
                        <label  class="required">行驶里程</label>
                        <span><input   name="姓名"  v-validate="{ rules: {  required: true,positiveInt: true } }"   type="number" placeholder="请输入行驶里程"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li>
                        <label class="">上牌时间</label>
                        <span><input  name="上牌时间" @click="openPicker" ref="repairTime" v-validate="{ rules: {  required: true} }"   type="text" placeholder="请选择日期"></span>
                    </li>
                    <li class="arrow" @click="showBrandLike">
                        <label class="required">心仪车型</label>
                        <span>{{selectedSeriesLike.carSeriesCn}}</span>
                    </li>
                    <!--<li class="arrow"> <label>专营店</label>
                                                    <span><input type="text" placeholder="请选择专营店"></span>  
                                                </li> -->
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea   name="姓名"  v-validate="{ rules: {  max: 200 } }"     style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <div class="longButton  bottom-button" @click="submit">提交</div>
        <brandSelect :callback="setSelectSeries" :config="brandSelectConfig"></brandSelect>
        <brandSelect :callback="setSelectSeriesLike" :config="brandSelectConfigLike"></brandSelect>
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date()" v-model="pickerValue" @confirm="handleConfirm">
        </mt-datetime-picker>         
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import * as types from '../store/mutation-types';
import util from '../utils/util.js';
import brandSelect from '../components/brandSelect'
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

            selectedSeriesLike: {
                carSeriesCn: ''
            },
            brandSelectConfigLike: {
                showBrand: false,
                level: 'series'
            },
        };
    },
    activated() {
        util.ifRedirectAfterLoadPage.call(this);
    },
    components: { brandSelect },
    methods: {
        ...mapActions([types.ADD_SERVICE_CLUE, types.GET_USER_INFO]),
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm() {
            var c = util.getDateStr({ date: this.pickerValue })
            this.$refs.repairTime.value = c;
        },          
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        setSelectSeries(obj) {
            this.selectedSeries = obj;
        },
        showBrandLike() {
            this.brandSelectConfigLike.showBrand = true;
        },
        setSelectSeriesLike(obj) {
            this.selectedSeriesLike = obj;
        },
        submit() {
            var state = this.$store.state;
            this.$validator.validateAll()
                .then(() => {
                    var params = {
                        "dlrCode": this.$store.state.dlrCode,
                        "carownerName": this.$refs.carownerName.value,
                        "mobile": this.$refs.mobile.value,
                        "clueType": "3",//t车辆置换是3
                        "repairTime": "2016-09-09",
                        "carTypeId": this.$refs.carTypeId.value,
                        "carBrandId": "1",
                        "remark": this.$refs.remark.value,
                        // "validCode": "201609"
                    }
                    this.ADD_SERVICE_CLUE(params)
                        .then(() => {
                            if (this.$store.state.ADD_SERVICE_CLUE == 'R200') {
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
</style>
