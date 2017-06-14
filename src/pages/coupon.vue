<template>
    <div>
        <div class="container">
            <div class="middle-div margin-top">
                <div class="coupon"  v-for="x in coupon">
                    <div class="head">
                       <p class="coupon-name">{{x.cardCode}}</p>
                        <!-- <span class="type"></span>
                        <span class="shop"></span> -->
                    </div>
                    <div class="content">
                        <p class="coupon-name">{{x.title}}</p>
                        <p class="coupon-expire">有效期至{{x.endTime}}</p>
                    </div>
                    <div class="couponimg unused" :class="x.status"> </div>
                </div>
            </div>
    
        </div> 
    </div>
</template>

<script>
import * as types from '../store/mutation-types'
import  api from  '../api/api.js'
export default {
    data() {
        return { 
            //  pic:'static/img/car_event.jpg'//引用本地文件的写法,只能放在static,发布后要复制到static目录
            coupon:null
        };
    },
   
    computed: {  
           

    }, 
    activated() {
         var dlrCode = this.$store.state.dlrCode;
        // this.GET_COUPON_TAKING_RECORD({ data: { dlrCode } });
        api.getData([{
            type:types.GET_COUPON_TAKING_RECORD,
            param:{ dlrCode }
        }])
        .then(
            res=>{
            var fStatus = {
                '5': {
                    status: 'unused-c'
                },
                '2': {
                    status: 'kexiao'
                },
                '3': {
                    status: 'used'
                },
                '4': {
                    status: 'expired'
                }
            }
            if (res == null) {
                res = [];
            }
            else {
                for (let i in res) {
                    console.log('this.status[i]');
                    var d = res[i];
                    if((d.status)==2){
                        d.status = fStatus[d.status].status;
                    }else{
                        var  x=this.computedTime(d.beginTime,d.endTime);
                        d.status = fStatus[x].status; 
                        // this.$set(d,'status',fStatus[this.computedTime(d.beginTime,d.endTime)].status)   
                    }
                   
                }
            }
            this.coupon= res;
                }
            )

    },
    methods: {
        /**
         * unused 未生效  day-beginTime<0
           used 有效     day-beginTime>=0 & day-endTime=<0 
           expired 已过期   day-endTime>0 
         */
        computedTime(beginTime,endTime){
            var Today= new Date();
            var timeBegin=new Date(beginTime);
            var timeEnd=new Date(endTime);

            if(Today - timeBegin < 0 ){
                return 5
            }else if(Today - timeBegin>= 0 && Today-timeEnd<=0){
                return 3
            }else if(Today-timeEnd>0){
                return 4
            }
        
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
         z-index: 5;
         position: relative;
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
                background:url("../assets/cp_used.png");
                background-size: 100% 100%;
         &:after{
            content: '未生效'; 
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
                background:url("../assets/cp_unused.png");
                background-size: 100% 100%;
         &:after{
            content: '有效卡券'; 
         }
     }
      .kexiao{ 
                background:url("../assets/cp_kexiao.png");
                background-size: 100% 100%;
         &:after{
            content: '已核销'; 
         }  
         } 
}
</style>
