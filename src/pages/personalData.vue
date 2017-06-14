<template>
    <div class="container" v-if="carOwner!=null&&carOwner!=undefined">
    
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label>姓名</label>
                        <span>{{info.carownerName}}</span></li>
                    <li>
                        <label>手机号码</label>
                        <span>{{info.mobile}}</span>
                       <!--  <a class="abuttonRight" @click="changeMobile">更换</a> -->
                    </li>
                </ul>
    
            </div>
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="head">
                车辆信息
            </div>
            <div class="body">
                <ul>
                    <li>
                        <label>车牌</label>
                        <span>{{info.carNo}}</span></li>
                    <li>
                        <label>车型</label>
                        <span>{{info.carTypeConfigName}}</span></li>
                    <li>
                        <label>车架号</label>
                        <span>{{info.vin}}</span></li>
                    <li>
                        <label>发动机号</label>
                        <span>{{info.engineNo}}</span></li>
                    <li>
                        <label>保险到期</label>
                        <span>{{info.buyInsuranceTime2}}</span></li>
                </ul>
            </div>
        </div>
    
       <!--  <button class="longButton  bottom-button" @click="changeInfo">更改</button> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    computed: {
        ...mapGetters(['carOwner']),
        info() {
            var res = this.carOwner.carOwner;
            if (res.buyInsuranceTime != undefined) {
                var d = util.getDateStr({ date: new Date(res.buyInsuranceTime.time) });
                console.log(d)
                res.buyInsuranceTime2 = util.getDateStr({ date: new Date(res.buyInsuranceTime.time) });

            }
            return res;
        }
    },
    methods: {
        changeMobile() {
            //todo
        },
        changeInfo() {
            //todo
        }
    }
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
</style>