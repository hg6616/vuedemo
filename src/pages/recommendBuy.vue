<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label class="required">姓名</label>
                        <span><input  name="姓名"  v-validate="{ rules: {  required: true,chn: true } }"   ref="carownerName" type="text" placeholder="请输入预购人姓名"></span>
                    </li>
                    <li>
                        <label class="required">手机号</label>
                        <span><input  name="手机号"  v-validate="{ rules: {  required: true,mobile: true } }"   ref="mobile"  type="text" placeholder="请输入预购人手机号"></span>
                    </li>
                    <li class="arrow" @click="showBrand">
                        <label class="required">意向车型</label>
                        <span><input  name="意向车型" :value="showCarName"  v-validate="{ rules: {  required: true } }"      type="text" placeholder="请选择车型"> </span>
                    </li>
                    <!--<li class="arrow">
                                                                    <label>专营店</label>
                                                                    <span><input type="text" placeholder="请选择专营店"></span>
                                                                </li>-->
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea   name="备注"  v-validate="{ rules: {  max: 200 } }"   ref="remark"     style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <button class="longButton  bottom-button" @click="submit">提交</button>
        <brandSelect :callback="setSelectSeries" :config="brandSelectConfig"></brandSelect>
    
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
            selectedSeries: {
                carBrandCn: '',
                carSeriesCn: '',
                series: {
                    carSeriesCn: ''
                },
                cartype: {
                    carConfigCn: ''
                }
            },
            brandSelectConfig: {
                showBrand: false,
                level: 'series'
            },
        };
    },
    computed: {
        showCarName() {
            var res = '';
            if (this.selectedSeries.carBrandCn != undefined) {
                res += this.selectedSeries.carBrandCn + '-';
            }
            if (this.selectedSeries.series.carSeriesCn != undefined) {
                res += this.selectedSeries.series.carSeriesCn + '-';
            }
            if (this.selectedSeries.cartype.carConfigCn != undefined) {
                res += this.selectedSeries.cartype.carConfigCn + '-';
            }
            return res;
        }
    },
    components: { brandSelect },
    methods: {
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        setSelectSeries(obj) {
            console.log(obj)
            this.selectedSeries = obj;

        },
        submit() {
            var state = this.$store.state;
            this.$validator.validateAll()
                .then(() => {

                    api.getData([{
                        type: types.ADD_VEHICLE_CLUE,
                        param: {
                            "dlrCode": this.$store.state.dlrCode,
                            "carownerName": this.$refs.carownerName.value,
                            "mobile": this.$refs.mobile.value,
                            "clueType": "3",//t推荐购车是3
                            //    "repairTime": "2016-09-09",
                            "carTypeId": this.selectedSeries.id,
                            "carBrandId": this.selectedSeries.brandID,
                            "remark": this.$refs.remark.value,
                            // "validCode": "201609"
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
       .inline-right-button{
      position: absolute;
         right:1rem;
         top:0.6rem;
}

.little-button{
  //   .inline-right-button
} 

.card{
    margin-top: 4rem;
}
</style>
