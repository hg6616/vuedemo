<template>
    <div>
        <div class="container">
            <div class="card middle-div  margin-bottom">
                <div class="body">
    
                    <ul>
    
                        <li>
                            <label>姓名</label>
                            <span><input ref="carownerName" type="text"   v-validate="{ rules: { max: 3} }"  placeholder="请输入姓名" name="carownerName"></span>
                        </li>
                        <li>
                            <label>车牌</label>
                            <span><input type="text" placeholder="请输入车牌" ref="carNo"></span>
                        </li>
                        <li class="arrow ffg">
                            <label>绑定车型</label>
                            <span><input readonly type="text" placeholder="请选择车型" ref="carTypeConfigId"></span>
                        </li>
                        <li>
                            <label>手机号</label>
                            <span><input type="number" placeholder="请输入手机号" ref="mobile"></span>
                        </li>
                        <li style="position: relative">
                                                                                                                    <label>验证码</label>
                                                                                                                    <span><input type="text" placeholder="请输入验证码" class="short-inpu3t"></span>
                                                                                                                    <div class="little-button">获取验证码</div>
                                                                                                                </li>
                    </ul>
    
                </div>
            </div>
            <!--<span v-show="errors">{{ errors.first('carownerName') }}</span>
                    <div>
                        <input v-validate="{ rules: { required: true, email: true } }" type="text" name="email">
                        <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>
                    <div>
                        <input v-validate="{ rules: { required: true, mobile: true } }" type="text" name="email2">
                        <span v-show="errors.has('email2')">{{ errors.first('email2') }}</span>
                    </div>
                    <div>
                        <input v-validate="{ rules: { required: true, chn: true } }" type="text" name="email3">
                        <span v-show="errors.has('email3')">{{ errors.first('email3') }}</span>
                    </div>-->
    
            <div class="card middle-div  margin-bottom">
    
                <div class="body">
                    <ul>
                        <li><span style="padding-left: 1.5rem"> 补充更多信息(选填)      </span> </li>
                        <li>
                            <label>车架号</label>
                            <span><input type="text" placeholder="请输入车架号" ref="vin"></span></li>
                        <li>
                            <label>发动机号</label>
                            <span><input type="text" placeholder="请输入发动机号" ref="engineNo"></span></li>
                        <li class=" ">
                            <label>购车时间</label>
                            <span><input type="date" placeholder="请选择购车日期" ref="buyCarTime"></span></li>
                        <li class=" ">
                            <label>保险到期日</label>
                            <span><input type="date" placeholder="请选择到险日期" ref="buyInsuranceTime"></span></li>
                    </ul>
                </div>
            </div>
    
            <div class="longButton  bottom-button" @click="submitOwner">提交</div>
        </div>
        <div :class="{show:isShow}" class="modal">
            <div class="modal-back" @click="hideModal">
    
            </div>
            <div class="dialog">
                <!--<div class="header">1</div>-->
                <div class="content">
                    <div class="msg">
                        <p>1.检查输入的手机号</p>
                        <p>2.手机信号OK</p>
                        <p>3.机接收延迟</p>
                        <p>3.如解决不了,请联系客服</p>
                    </div>
    
                </div>
                <div class="footer">
                    <div class="btnText">
                        返回
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types' 
export default {
    name:'bindOwner',
    data() {
        return {
            ismodal: true,
            isShow: false,
            //  carownerName: '',
            mobile: '',
            carNo: '',
            carTypeConfigId: '',
            vin: '',
            engineNo: '',
            buyCarTime: '',
            buyInsuranceTime: '',
            //  suc: false,
        };
    },
    computed: {
        // msg() {
        //     return this.store.state.pc.msg;
        // } 
        ...mapState({
            suc: state => {
                var d = state.BIND_CAR_OWNER;
                var res = false;
                if (d != null && d.error == 'R200') {
                    res = true;
                }
                return res;
            }
        })
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');

    },
    activated() {
        // console.log(this.$refs.owner.value)
        // this.$refs.owner.value = 'hhh';
    },
    methods: {
        showModal() {
            this.$data.isShow = true;
        },
        hideModal() {
            this.$data.isShow = false;
        },
        submitOwner() {
            //validateScopes
            this.$validator.validateAll().then(()=>{
                console.log('vali suc')
            })
            .catch(()=>{
                console.log('vali fail')
            });
            return;
            if (this.$store.state.validate(this.errors)) {
                var param = {
                    carownerName: this.$refs.carownerName.value,
                    mobile: this.$refs.mobile.value,
                    carNo: this.$refs.carNo.value,
                    carTypeConfigId: this.$refs.carTypeConfigId.value,//todo
                    vin: this.$refs.vin.value,
                    engineNo: this.$refs.engineNo.value,
                    buyCarTime: this.$refs.buyCarTime.value,
                    buyInsuranceTime: this.$refs.buyInsuranceTime.value,
                    dlrCode: this.$store.state.dlrCode,
                };
                this.BIND_CAR_OWNER(param)
                    .then(() => {
                        if (this.suc) {
                            this.$toast({
                                message: '操作成功',
                            });
                            setTimeout(() => {
                                this.$router.go(-1);
                            }, 1000)
                        }
                        else {
                            this.$toast({
                                message: '操作失败',
                            });
                        }
                    })
                    .catch(err => {
                        this.$toast({
                            message: '操作失败',
                        });
                    });
            }
        },
        ...mapActions([types.BIND_CAR_OWNER])
    }

}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
       .inline-right-button{
      position: absolute;
         right:1rem;
         top:0.6rem;
}
li{ 
      &:active{
        opacity:0.8; 
    } 
}
.little-button{
    @extend   .inline-right-button
}
.modal{
    .msg{
        color:#333;
        p{
            font-size:1rem;            
        }
        p+p{
            margin-top: 1rem;
        }
    }
    .footer{
        .btnText{
            text-align: center;
            margin:0.7rem 0;
            font-size: 1.4rem;
            color:$themeColor;
        }
    }
}
</style>