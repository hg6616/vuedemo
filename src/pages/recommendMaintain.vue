<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label>姓名</label>
                        <span><input ref="carownerName" type="text" placeholder="请输入姓名"></span>
                    </li>
                    <li>
                        <label>手机号</label>
                        <span><input ref="mobile" type="number" placeholder="请输入手机号"></span>
                    </li>
                    <li class="arrow ">
                        <label>养修车型</label>
                        <span><input ref="carTypeConfigId" type="text" placeholder="请选择车型"></span>
                    </li>
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea  ref="remark"   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
    
                </ul>
    
            </div>
        </div>
    
        <button class="longButton  bottom-button" @click="submit">提交</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {

        };
    },
    methods: {

        ...mapActions([types.ADD_SERVICE_CLUE]),
        submit() {
            var state = this.$store.state;
            var params = {
                "dlrCode": state.dlrCode,
                "repairType": "1",//养修类型 todo
                "repairTime": "2016-09-09",//todo
                "courseNo": "5000",//
                "buType": "2",//推荐养修是2
                "recommendName": this.$refs.carownerName.value,
                "recommendTel": this.$refs.mobile.value,
                "carTypeConfigId": this.$refs.carTypeConfigId.value,
                "longitude": "107.456789",//todo
                "latiude": "23.456789",//todo
                "remark": this.$refs.remark.value,
            }
            this.ADD_SERVICE_CLUE(params)
                .then(() => {
                    if (state.ADD_SERVICE_CLUE == state.sucCode) {
                        this.$toast('操作成功');
                        this.$refs.carownerName.value = '';
                        this.$refs.mobile.value = '';
                        this.$refs.carTypeConfigId.value = '';
                        this.$refs.remark.value = '';
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
       .little-button{
 //    .inline-right-button
} 

.card{
    margin-top: .5rem;
}
</style>
