<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label>姓名</label>
                        <span><input type="text" placeholder="请输入姓名"></span>
                    </li>
                    <li>
                        <label>手机号</label>
                        <span><input type="number" placeholder="请输入手机号"></span>
                    </li>
                    <li class="arrow">
                        <label>已有车型</label>
                        <span><input type="text" readonly placeholder="请选择车型"></span>
                    </li>
    
                    <li>
                        <label>行驶里程</label>
                        <span><input type="number" placeholder="请输入行驶里程"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li>
                        <label>上牌时间</label>
                        <span><input type="date" placeholder="请选择日期"></span>
                    </li>
                    <li class="arrow">
                        <label>心仪车型</label>
                        <span><input type="text" placeholder="请选择车型"></span>
                    </li>
                    <!--<li class="arrow"> <label>专营店</label>
                                <span><input type="text" placeholder="请选择专营店"></span>  
                            </li> -->
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea    style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <div class="longButton  bottom-button">提交</div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js'
export default {
    data() {
        return {
        };
    },
    activated() {
             util.ifRedirectAfterLoadPage.call(this);
    },
    methods: {
        ...mapActions([types.ADD_VEHICLE_CLUE, types.GET_USER_INFO]),
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
            this.ADD_VEHICLE_CLUE(params)
                .then(() => {
                    if (this.$store.state.ADD_VEHICLE_CLUE == 'R200') {
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
</style>
