<template>
    <div class="container">
        <!--<div class="arrow-select arrow">
                                                                   <div class="roundDot"></div>
                                                                    <span class="text">2016款 1.6L 手动 标致301 舒适版</span>
                                                                </div>-->
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
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {
            showtip: false
        };
    },
    methods: {
        ...mapActions([types.ADD_VEHICLE_CLUE]),
        submit() {
            //validateScopes  validateAll
            // debugger;
            // console.log(this.errors)
            this.$validator.validateScopes()
                .then(() => {
                    console.log('vali suc')
                })
                .catch(() => {
                    console.log('vali fail')
                    this.$store.state.validate(this.errors)
                }); 
            return;
            var params = {
                "dlrCode": this.$store.state.dlrCode,
                "carownerName": this.$refs.carownerName.value,
                "mobile": this.$refs.mobile.value,
                "clueType": "1",
                //  "repairTime": "2016-09-09",
                "carTypeId": this.$route.query.cartype,
                "carBrandId": this.$route.query.carbrand,
                "remark": this.$refs.remark.value,
                //    "validCode": "201609"
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
    computed: {
        // msg() {
        //     return this.$store.state.pc.msg;
        // }
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },

    //     $(function () {
    //     $('.longButton').click(function () {
    //         $('.modal').addClass('show');
    //     });

    //     $('.modal').click(function () {
    //         $(this).removeClass('show');
    //     });
    // })
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
