<template>
    <div class="container">
        <div class="arrow-select arrow">
            <div class="roundDot"></div>
            <span class="text">2016款 1.6L 手动 标致301 舒适版</span>
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li @click="mm( $event)">
                        <label>姓名</label>
                        <span><input type="text" placeholder="请填写姓名"></span>
                    </li>
                    <li>
                        <label>手机</label>
                        <span><input type="number" placeholder="请填写手机号码"></span>
    
                    </li>
                    <li>
                        <label>裸车价格</label>
                        <span><input type="number" placeholder="请填写裸车价格"></span>
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
                    <li @click="checkSafe(x.dicDataId)" v-for="x in insurTypeList2 ">
                        <label>{{x.safeName}} <span v-if="x.haveTip" @click.stop="tip(x.dicDataId)" class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span> 
                                                        <select  v-if="x.haveMoneyList" >
                                                    <option v-for="y in x.moneyList" :value="y">{{y}}</option>
                         
                                                </select>
                                                    <span v-if="!x.haveMoneyList" class="glyphicon glyphicon-ok-circle ckIcon"  :class="{grey:!x.checked}" aria-hidden="true"></span></span>
                        <p>{{!x.checked}}</p>
                    </li>
                    ......
                    <li>
                        <label>交强险(必选) <span @click="tip" class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    ....
                    <li>
                        <label>第三者责任险</label>
                        <select>
                            <option>不选择</option>
                            <option>5万</option>
                        </select>
                    </li>
                    <li>
                        <label>机动车辆损失险 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li>
                        <label>全车抢盗险 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li class="arrow">
                        <label>车上人员责任险</label>
                        <span class="inline-arrow-left">不选择</span>
                    </li>
                    <li>
                        <label>玻璃单独破碎险 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li class="arrow">
                        <label>车身划痕损失险<span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <select>
                            <option>不选择</option>
                            <option>5万</option>
                        </select>
                        <span class="inline-arrow-left">不选择</span>
                    </li>
                    <li>
                        <label>自燃损失险 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li>
                        <label>涉水损失责任险 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li>
                        <label>不计免赔 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li>
                        <label>车船税 <span class="glyphicon glyphicon-exclamation-sign lbIcon" aria-hidden="true"></span></label>
                        <span><span class="glyphicon glyphicon-ok-circle ckIcon" aria-hidden="true"></span></span>
                    </li>
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea    style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
        <button class="longButton  bottom-button theme-bc" @click="change">提交</button>
    
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {
            insurTypeListd:[
            {
                "dicDataId": 1,
                "safeName": "第三者责任险",
                "safeLimits": "1000,2000,50000",
                "ext": "第三者责任险是指被保险人或其允许的驾驶人员在使用保险车辆过程中发生意外事故，致使第三者遭受人身伤亡或财产直接损毁，依法应当由被保险人承担的经济责 任，保险公司负责赔偿。同时，若经保险公司书面同意，被保险人因此发生仲裁或诉讼费用的，保险公司在责任限额以外赔偿，但最高不超过责任限额的30％。因 为交强险在对第三者的财产损失和医疗费用部分赔偿较低，可考虑购买第三者责任险作为交强险的补充。"
            },
            {
                "dicDataId": 2,
                "safeName": "机动车辆损失险",
                "safeLimits": null,
                "ext": "机动车辆损失险~~~~~~~~。"
            },
              {
                "dicDataId": 3,
                "safeName": "xxx辆损失险",
                "safeLimits": null,
                "ext": null
            }
        ]
        };
    },
    computed: {
        insurTypeList2(){
             var res = this.insurTypeListd;
                if (res == null) {
                    res = []
                }
                else {
                    for (let x in res) {
                        let o = res[x];
                        o.haveMoneyList = false;
                        o.haveTip = false;
                        o.checked = true;
                        //debugger;
                        if (o.safeLimits != null) {
                            var list = o.safeLimits.split(',')
                            o.moneyList = list;
                            o.haveMoneyList = true;
                            o.checked = false;
                        }
                        if (o.ext != null) {
                            o.haveTip = true
                        }
                    }
                }
                return res;
        },
        ...mapState({
            insurTypeList: state => {
                var res = state.GET_INSURANCE_TYPE;
                if (res == null) {
                    res = []
                }
                else {
                    for (let x in res) {
                        let o = res[x];
                        o.haveMoneyList = false;
                        o.haveTip = false;
                        o.checked = true;
                        //debugger;
                        if (o.safeLimits != null) {
                            var list = o.safeLimits.split(',')
                            o.moneyList = list;
                            o.haveMoneyList = true;
                            o.checked = false;
                        }
                        if (o.ext != null) {
                            o.haveTip = true
                        }
                    }
                }
                return res;
            }
        })
    },
    activated() {
        this.GET_INSURANCE_TYPE({})
    },
    methods: {
        ...mapActions([types.GET_INSURANCE_TYPE, types.ADD_INSURANCE_CLUE]),
        checkSafe(id) {
            console.log(id);
            this.insurTypeList2[1].checked = !this.insurTypeList2[1].checked;
            return;
            console.log(this.insurTypeList);
            for (let x in this.insurTypeList) {
                var d = this.insurTypeList[x];
                if (d.dicDataId == id) {
                    d.checked = !d.checked
                }
            }
            // var cc = this.insurTypeList.filter(x => {
            //     return x.dicDataId == id;
            // })[0];

            // console.log(cc);
            // cc.checked=! cc.checked
        },
        tip(id) {
            console.log(id)
        },
        change() { },
        submit() {
            var params = {
                "dlrCode": this.$store.state.dlrCode,
                "carownerName": this.$refs.carownerName.value,
                "mobile": this.$refs.mobile.value,
                "clueType": "3",//t推荐购车是3
                //    "repairTime": "2016-09-09",
                "carTypeId": this.$refs.carTypeId.value,
                "carBrandId": "1",
                "remark": this.$refs.remark.value,
                // "validCode": "201609"
            }
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
