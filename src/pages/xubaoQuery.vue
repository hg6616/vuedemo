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
                            <label>姓名</label>
                            <span><input ref="carownerName" type="text" placeholder="请填写姓名"></span>
                        </li>
                        <li>
                            <label>手机</label>
                            <span><input ref="mobile"  type="number" placeholder="请填写手机号码"></span>
    
                        </li>
                        <li>
                            <label>裸车价格</label>
                            <span><input type="number" ref="carPrice" placeholder="请填写裸车价格"></span>
                            <span class="inline-right">元</span>
                        </li>
                    </ul>
                </div>
    
            </div>
            <div class="card middle-div  margin-bottom mg_b_5">
                <div class="head">
                    险种选择
                </div>
                <div class="body">
                    <ul>
                        <li @click="checkSafe(x.dicDataId)" v-for="x in insurTypeList ">
                            <label @click.stop="tip(x.dicDataId)">{{x.safeName}} <span v-if="x.haveTip" class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                            <span> 
                                       <select  v-if="x.haveMoneyList"  v-model="x.selectedMoney">
                                          <option v-for="y in x.moneyList" :value="y.value">{{y.text}}</option>
                          </select>
                             <span v-if="!x.haveMoneyList" class="glyphicon glyphicon-ok-circle ckIcon"  :class="{grey:!x.checked}" aria-hidden="true"></span></span>
                            <li>
                                <label style="vertical-align: top">备注</label>
                                <span><textarea ref="remark"     style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                            </li>
                        </li>
    
                    </ul>
                </div>
            </div>
            <button class="longButton  bottom-button theme-bc" @click="submit">提交</button>
    
        </div>
        <brandSelect :callback="setSelectSeries" :config="brandSelectConfig"></brandSelect>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import * as types from '../store/mutation-types'
import { MessageBox } from 'mint-ui';
import util from '../utils/util.js'
import brandSelect from '../components/brandSelect'
export default {
    data() {
        return {
            brandSelectConfig: {
                showBrand: false,
                level: 'series'
            },
            selectedSeries: {
                carSeriesCn: ''
            },
            clickInsureID: '',
            emitChange: false,//用于触发列表改变事件
        };
    },
    components: { brandSelect },
    computed: {
        insurTypeList() {
            var res = this.insuranceTypes;
            var change = this.emitChange;
            //  debugger;
            if (res == null) {
                res = []
            }
            else {
                for (let x in res) {
                    let o = res[x];
                    if (this.clickInsureID == o.dicDataId && o.checked != undefined) {
                        o.checked = !o.checked;
                        break;
                    }
                }
            }
            return res;
        },
        ...mapState({
            insuranceTypes:state => {
                var res = state.GET_INSURANCE_TYPE;
                if (res == null) {
                    res = []
                }
                else {
                    for (let x in res) {
                        let o = res[x];
                        o.haveMoneyList = false;
                        o.haveTip = false;
                        o.checked = true;//默认都选中;
                        //debugger;
                        if (o.safeLimits != null) {
                            var listValue = ('0,' + o.safeLimits).split(',');
                            var listText = ('不选择,' + o.safeLimits).split(',');
                            var list = [];
                            for (let i in listValue) {
                                list.push({ value: listValue[i], text: listText[i] })
                            }
                            o.moneyList = list;
                            o.haveMoneyList = true;
                            o.checked = false;
                            o.selectedMoney = '0';
                        }
                        if (o.ext != null) {
                            o.haveTip = true
                        }
                    }
                }
                return res;
            }
        }),
        ...mapGetters(['carOwner'])
    },
    activated() {
        util.ifRedirectAfterLoadPage.call(this, () => { this.GET_INSURANCE_TYPE({}) });
    },
    methods: {
        ...mapActions([types.GET_INSURANCE_TYPE, types.ADD_INSURANCE_CLUE, types.GET_USER_INFO]),
        //勾选险种
        checkSafe(id) {
            this.clickInsureID = id;
            this.emitChange = !this.emitChange;
        },
        //弹出险种详情
        tip(id) {
            for (let x in this.insurTypeList) {
                var d = this.insurTypeList[x];
                if (d.dicDataId == id) {
                    if (d.haveTip && d.ext != null) {
                        MessageBox('提示', d.ext);
                    }
                    break;
                }
            }
        },
        submit() {
            var params = {
                "dlrCode": this.$store.state.dlrCode,
                "aiBuType": "1",//1是保险询价
                "recommendName": this.$refs.carownerName.value,
                "recommendTel": this.$refs.mobile.value,
                "remark": this.$refs.remark.value,
                "carPrice": this.$refs.carPrice.value,
                "safeList": []
            }
            var safeList = []
            for (let i in this.insurTypeList) {
                let d = this.insurTypeList[i];
                let obj;
                // debugger
                if (d.haveMoneyList) {//有选择保额的
                    obj = {
                        "dicDataId": d.dicDataId,
                        "safeName": d.safeName,
                        "safeLimit": d.selectedMoney
                    }
                }
                else if (d.checked) {//已勾选的
                    obj = {
                        "dicDataId": d.dicDataId,
                        "safeName": d.safeName,
                    }
                }
                if (obj != undefined) {
                    safeList.push(obj);
                }
            }
            params.safeList = safeList;
            this.ADD_INSURANCE_CLUE(params)
                .then(() => {
                    if (this.$store.state.ADD_INSURANCE_CLUE == 'R200') {
                        this.$toast('操作成功');
                    }
                    else {
                        this.$toast('操作失败');
                    }
                })
                .catch(() => {
                    this.$toast('操作失败');
                })
        }
        , setSelectSeries(obj) {
            this.selectedSeries = obj;
        },
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
    },
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
        .priceOff{
     padding: $pd3;
     background-color: #ebebeb;
     color:#a1a1a1;
     font-size:$fs1;
     margin-top:$pd3;
 }
 .card{
     margin-top:.5rem;
 }
 .glyphicon{
     color:$themeColor;
 }
 .lbIcon{
     margin-left:(15/$pr3);
 }
 .ckIcon{
     float:right;
     margin-right: .8rem;
 }
 .inline-arrow-left{
     color:#999;
 }
 .card .body ul li label {
    width: 10rem;
    display: inline-block;
}
.grey{
    color:#999;
}
</style>
