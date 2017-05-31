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
        <modal :config="modalConfig" v-on:childdo="listenfromchild" :callback="childsay">
            <mdialog slot="dialog"> </mdialog>
        </modal>
        <!--<img :src="pic">-->
        <p>{{res}}</p>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import * as types from '../store/mutation-types'
import modal from '../components/modal'
import mdialog from '../components/dialog'
export default {
    data() {
        return {
            isShow: false,
            res: 'hell no',
            childsay2: function (e) {
                // alert(e);
                this.res = e;
            }
            //  pic:'static/img/car_event.jpg'//引用本地文件的写法,只能放在static,发布后要复制到static目录
            // modalConfig:{
            //     isShow:false
            // }
        };
    },
    components: { modal, mdialog },
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
        childsay(e) {
            console.log(e);
            this.res = e;
        },
        showModal() {
            this.modalConfig.isShow = true;
        },
        hideModal() {
            this.$data.isShow = false;
        },
        listenfromchild(msg) {
            console.log('listen child')
            console.log(msg)
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
