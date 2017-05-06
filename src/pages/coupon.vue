<template>
      <div>

              <div class="container">
       
      <div class="middle-div margin-top">
          <div class="coupon" @click="showModal">
               <div class="head">
                   <span class="type">集团券</span>
                   <span  class="shop">东风日产</span>
               </div>
               <div class="content">                   
                   <p class="coupon-name">免费保养一次</p>
                   <p class="coupon-expire">有效期至2017年12月30日</p>
               </div>
               <div class="couponimg unused">   </div> 
          </div> 
               <div class="coupon">
               <div class="head">
                   <span class="type">集团券</span>
                   <span  class="shop">东风日产</span>
               </div>
               <div class="content">                   
                   <p class="coupon-name">免费保养一次</p>
                   <p class="coupon-expire">有效期至2017年12月30日</p>
               </div>
               <div class="couponimg unused">   </div> 
          </div>
            <div class="coupon">
               <div class="head">
                   <span class="type">集团券</span>
                   <span  class="shop">东风日产</span>
               </div>
               <div class="content">                   
                   <p class="coupon-name">免费保养一次</p>
                   <p class="coupon-expire">有效期至2017年12月30日</p>
               </div>
               <div class="couponimg used">   </div> 
          </div>
            <div class="coupon">
               <div class="head">
                   <span class="type">集团券</span>
                   <span  class="shop">东风日产</span>
               </div>
               <div class="content">                   
                   <p class="coupon-name">免费保养一次</p>
                   <p class="coupon-expire">有效期至2017年12月30日</p>
               </div>
               <div class="couponimg expired">   </div> 
          </div>
      </div>
 
    </div>


    <div class="modal" :class={show:isShow}>
        <div class="modal-back" @click="hideModal">

        </div>
        <div class="dialog">
            <!--<div class="header">1</div>-->
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
    </div>
      </div>
</template>

<script>
export default {
    data() {
        return {
            isShow:false
        };
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
    methods:{
         showModal(){
             this.$data.isShow=true;
         },
           hideModal(){
             this.$data.isShow=false;
         }
    }
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       
.modal{
    .content{
        .desc{
            font-size: 1rem;
            margin-bottom: 0.75rem;
        }
        .img{
            .text{
                font-size: 1.5rem;
               
                color:#fff;
            }
             padding: 2rem 0 2rem 2rem;
            background-image: url("../assets/cp_free.png");
            background-size: 100% 100%;
        }
    }
    .footer{
        display: flex;
        .btnText{
            text-align: center;
             padding:0.75rem 0;
            font-size: 1.5rem;
            color:#9a9a9a;
          //  display: inline-block;
           // width: 49%; 
            flex: 1;
        }
         .btnText+.btnText{
                border-left: 0.1rem solid $themeColor;
                color:$themeColor
            }
    }
}

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
