<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li>
                        <label>姓名</label>
                        <span><input ref="carownerName" type="text" placeholder="请输入预购人姓名"></span>
                    </li>
                    <li>
                        <label>手机号</label>
                        <span><input ref="mobile"  type="text" placeholder="请输入预购人手机号"></span>
                    </li>
                    <li class="arrow">
                        <label>意向车型</label>
                        <span><input ref="carTypeId"  type="text" placeholder="请选择车型"></span>
                    </li>
                    <!--<li class="arrow">
                                        <label>专营店</label>
                                        <span><input type="text" placeholder="请选择专营店"></span>
                                    </li>-->
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea ref="remark"     style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
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
        ...mapActions([types.ADD_VEHICLE_CLUE]),
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
