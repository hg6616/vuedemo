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
                    <li class=" ">
                        <label>到险日期</label>
                        <span><input ref="repairTime" type="date" placeholder="请选择到险日期"></span>
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
        ...mapActions([types.ADD_INSURANCE_CLUE]),
        submit() {
            var state = this.$store.state;
            var params = {
                "dlrCode": state.dlrCode,
                "aiBuType": "2",//推荐购买是2
                "recommendName": this.$refs.carownerName.value,
                "recommendTel": this.$refs.mobile.value,
                "remark": this.$refs.remark.value,
            };
            this.ADD_INSURANCE_CLUE(params)
                .then(() => {
                 //    this.$store.commit(types.CHANGE_TITLE,'保险')
                    if (state.ADD_INSURANCE_CLUE == state.sucCode) {
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
       .little-button{
 //    .inline-right-button
} 

.card{
    margin-top: .5rem;
}
</style>
