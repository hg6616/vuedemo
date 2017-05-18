<template>
    <div>
    
        <div class="container">
    
            <div class="middle-div margin-top">
                <div class="coupon" @click="showModal" v-for="x in coupon">
                    <div class="head">
                        <span class="type"></span>
                        <span class="shop"></span>
                    </div>
                    <div class="content">
                        <p class="coupon-name">{{x.title}}</p>
                        <p class="coupon-expire">有效期至{{x.endTime}}</p>
                    </div>
                    <div class="couponimg unused" :class="{unused:x.status=='0',used:x.status=='1',expired:x.status=='2',}"> </div>
                </div>
            </div>
    
        </div>
        <modal :config="modalConfig"></modal>
        <!--<div class="modal" :class={show:isShow}>
                <div class="modal-back" @click="hideModal">
        
                </div>
                <div class="dialog">
                    <div class="header">1</div> 
                    <div class="content">
                        <p class="desc">使用该卡券</p>
                        <div class="img"><span class="text">免费保养一次</span></div>
                    </div>
                    <div class="footer">
                        <div class="btnText">
                            取消
                        </div>
                        <div class="btnText">
                            确定
                        </div>
                    </div>
                </div>
            </div>-->
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import * as types from '../store/mutation-types'
import modal from '../components/modal'
export default {
    data() {
        return {
            isShow: false,
            // modalConfig:{
            //     isShow:false
            // }
        };
    },
    components:{modal},
    computed: {
        // msg() {
        //     return this.$store.state.pc.msg;
        // }
        modalConfig() {
            return { isShow: false }
        },
        ...mapState({
            coupon: state => {
                var res = state.GET_COUPON_TAKING_RECORD;
                if (res == null || res == undefined) {
                    res = []
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
        // this.$store.dispatch({ type: this.$store.state.types.GET_COUPON_TAKING_RECORD, data: {"dlrCode":"H2901","status":"1"} });
        this.GET_COUPON_TAKING_RECORD({ data: { "dlrCode": "H2901", "status": "1" } })
    },
    methods: {
        ...mapActions([
            types.GET_COUPON_TAKING_RECORD
        ]),
        showModal() {
           this.modalConfig.isShow=true;
        },
        hideModal() {
            this.$data.isShow = false;
        }
    }
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
 

.coupon{
     border-radius: 0.5rem;
     background: #fff;
     color:#a0a0a0;
     overflow: hidden;
     position: relative;
     &+&{
         margin-top: 0.6rem;
     }
     .head{
         padding: 0.7rem 0 0.7rem 1.3rem;
         border-bottom: 0.1rem solid $bordercolor;
         .type{
            font-size:1.1rem;
            padding-right: 0.6rem;
            border-right: 0.1rem solid $bordercolor;
         }
         .shop{
             padding-left: 0.6rem;
         }
     }
     .content{
         padding: 1.2rem;
         .coupon-name{
             color:#222;
             font-size: 1.7rem;
             margin-bottom: 0.9rem;
         }
         .coupon-expire{
               font-size: 0.8rem;
         }
     }

.couponimg{  
         position: absolute;
         right: 0px;
         height: 100%;
           width: 50%;
             bottom: 0px;
                &:after{
       content: '';
    font-size: 20px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: #fff;
    padding: 0 0.9rem 1.3rem 0;
         }
}
     .unused{ 
                background:url("../assets/cp_unused.png");
                background-size: 100% 100%;
         &:after{
            content: '未使用'; 
         }
     }

        .expired{ 
                background:url("../assets/cp_expired.png");
                background-size: 100% 100%;
         &:after{
            content: '已过期'; 
         }
     }

        .used{ 
                background:url("../assets/cp_used.png");
                background-size: 100% 100%;
         &:after{
            content: '已使用'; 
         }
     }
}
</style>
