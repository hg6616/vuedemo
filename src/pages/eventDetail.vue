<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper">
                <img :src="detail.actPhotoUrl" class="actImg"> 
            </div>
    
        </div>
        <!--<div class="event_card middle-div">
            <ul>
                <li class="cls">
                    <div class="up clearfix">
                        <div class="left">
                            <img class="img" src="../assets/car_event.jpg">
                            <div class="status">进行中</div>
                        </div>
                        <div class="right">
                            <p class="clshead">奇骏MT手到擒来,先用后买超低首付10%起!</p>
                            <p class="cls">活动时间:2017.04.01~2017.04.21</p>
                            <p class="cls">报名时间:2017.04.01~2017.04.21</p>
                        </div>
                    </div>
                    <div class="down">
                        活动地址:广州市花都区风神大道108号xxxxxxxx
                    </div>
                </li>
                <li class="cls">
                    <div class="up clearfix">
                        <div class="left">
                            <img class="img" src="../assets/car_event.jpg">
                            <div class="status">进行中</div>
                        </div>
                        <div class="right">
                            <p class="clshead">奇骏MT手到擒来,先用后买超低首付10%起!</p>
                            <p class="cls">活动时间:2017.04.01~2017.04.21</p>
                            <p class="cls">报名时间:2017.04.01~2017.04.21</p>
                        </div>
                    </div>
                    <div class="down">
                        活动地址:广州市花都区风神大道108号xxxxxxxx
                    </div>
                </li>
                <li class="cls">
                    <div class="up clearfix">
                        <div class="left">
                            <img class="img" src="../assets/car_event.jpg">
                            <div class="status">进行中</div>
                        </div>
                        <div class="right">
                            <p class="clshead">奇骏MT手到擒来,先用后买超低首付10%起!</p>
                            <p class="cls">活动时间:2017.04.01~2017.04.21</p>
                            <p class="cls">报名时间:2017.04.01~2017.04.21</p>
                        </div>
                    </div>
                    <div class="down">
                        活动地址:广州市花都区风神大道108号xxxxxxxx
                    </div>
                </li>
            </ul>
        </div>-->
    
        <div class="event_detail  middle-div">
            <div class="content">
                <div class="title">
                    <p class="event_name">{{detail.actName}}</p>
                    <p class="sub">活动时间:{{detail.actStartTime}}~{{detail.actEndTime}}</p>
                    <p class="sub">活动对象:{{detail.actClient==undefined?'':detail.actClient}}
                        <span class="view-status">
<span class="view">
    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> 2000
</span>
<span class="zan">
   <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></span> 2000
</span>
                        </span>
                    </p>
                </div>
                <div class="detail">
                     {{detail.actInfor}}
                </div>
            </div>
            <div class="operate">
                <div class="signMan">
                    <p>已报名人数:</p>
                    <p class="pNum"><span class="signNum">{{detail.signUpNum}}</span>人</p>
                </div>
                <div class="buttons">
                    <div class="button2" @click="signUpAct">参加活动</div>
                    <div class="button2" @click="dail">拨打热线</div>
                </div>
            </div>
            <div class="coupon" @click="clickCoupon">
                <div class="coupon-desc">
                    <p class="coupon-big-word">{{detail.coupon.title}}</p>
                    <p class="coupon-sub-word">点击图片,立即领取优惠券</p>
                </div>
                <div class="coupon-time">
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                    <span class="expire-time">有效期:{{detail.coupon.expire}}</span>
                </div>
            </div>
            <div class="comments">
                <div class="head clearfix">
                    <span class="sp1">精选评论</span>
                    <span class="sp2" @click="writeComment"><span class="glyphicon glyphicon-pencil icon-mg-right" aria-hidden="true"></span>写评论</span>
                </div>
                <div class="body">
                    <ul>                      
                        <li v-for="x in detail.comments">
                            <div class="img">
                                <img :src="x.photo" class="thumb">
                            </div>
                            <div class="comment">
                                <p class="p1">
                                    <span class="username">{{x.nickname}}</span>
                                    <span class="zan"><span class="glyphicon glyphicon-thumbs-up icon-mg-right" aria-hidden="true"></span>{{x.thumbNum}}</span>
                                </p>
                                <p class="p2">{{x.content}}</p>
                                <p class="p3">
                                 {{x.time}}
                                </p>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    computed: {
     ...mapState({
         detail:state=>{
             var res=state.GET_EVENT_DETAIL;
             if(res==null){
                 res={}
             }
             else if(res.length>0){
                 res=res[0];
             }
             return res;
         }
     })
    },
    activated() {
        console.log(this.$route.query.id)
        var id = this.$route.query.id;
        if (id) {
            this.GET_EVENT_DETAIL({ data: { dlrCode: this.$store.state.dlrCode, id } })
        } 
    },
    methods: {
        ...mapActions([types.GET_EVENT_DETAIL]),
        //参加活动  //todo
        signUpAct(){

        },
        //拨打热线
        dail(){

        },
        //领取优惠券
        clickCoupon(){

        },
        //写评论
        writeComment(){

        }
    }
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
         

.swiper-container{
    height:16.7rem;
    position: relative; 
   .swiper{
       height: 100%;
      //  background: $themeColor;
      //  background: url("../assets/iwantrecommand.jpg");
     //   background-size: 100% 100%;
        .actImg{
            height:100%;
            width:100%;
        }
   } 
} 
 

 .event_card{
     display: none;
     ul{
           li+li{
                 margin-top:0.5rem; 
             }
         li{
             background-color: #fff;
             border-radius: 0.5rem;
             padding: 0.5rem;
             color:#8c8c8c;           
             .up{
                 .left{
                     display: inline-block;
                     height: 100%;
                     width: 12.8rem;
                     position: relative;
                     .img{
                         max-width: 100%;
                         max-height: 100%;
                     }
                     .status{
                         position: absolute;
                         left: 0;
                         bottom: 0;
                         background-color: $themeColor;
                         color:#fff;
                     }
                 }
                 .right{
                        display: inline-block;
                          height: 100%;
                          width: 17rem;
                          margin-left: 0.6rem;
                          border-bottom: 0.1rem solid $bordercolor;
                  p{
                      font-size: .8rem;
                     }
                 .clshead{
                     color:#6d6d6d;
                     font-size: $fs0;
                 } 
                 p+p{
                     margin-top:0.5rem;
                    }
                 }
  
             }
             .down{
                font-size:0.9rem;
             }
         }
     }
 }

.event_detail{
 
    .content{
       background-color: #fff;
        border-radius: 0.5rem;
        .title{
            padding: 0.5rem;
            border-bottom: 0.1rem solid $bordercolor;
            .event_name{
                font-size: 1.2rem;
                color:$themeColor;
                margin-bottom: 0.5rem; 
            }
            .sub{
                color:#a4a4a4;
                font-size: 0.7rem;
                .view-status{
                    float:right;
                    font-size:(32/$pr3);
                    color:#dfdfdf;
                    &>.view{
                        margin-right:(22/$pr3);
                    }
                    .glyphicon{
                        margin-right:(10/$pr3);
                    }
                }
            } 
        }
        .detail{
            padding: 1rem;
             font-size: 1rem;
             color:#7b7b7b; 
        }
    }

    .operate{   
         margin-top: 0.5rem;
         height: 5rem;
         position:relative; 
            .signMan{
             background-image: url("../assets/shakehand.jpg");
             background-position: 100% 0%;
              background-size: 30% 60%;
                background-repeat: no-repeat;
               border: 0.1rem solid $themeColor;
                 padding: (21/$pr3); 
                 padding-bottom:(63/$pr3)
               display: inline-block;
               margin-right: 0.5rem;
               width: 19rem;
                 height: 5rem;
               background-color: #fff;         
               border-radius: 0.5rem;
               box-sizing: border-box;
               float: left;
                     color:#a4a4a4;
                     font-size:1rem;
                     .pNum{
                         .signNum{
                             margin-left: 7.5rem;
                             font-size:1.7rem;
                             color:$alertColor;
                         }
                     }
             }
             .buttons{
                position:absolute;
                right:0;
                  display: inline-block;
                 .button2 {
    color: #fff;
    background: #58bace;
    text-align: center;
   // display: inline-block;
    border-radius: 0.5rem; 
    font-size: 1rem;
    padding: 0.4rem 1rem; 
    width: 7.5rem;
}
.button2+.button2{
    margin-top:0.5rem;
}
             }
    }
    .coupon{
        background:url('../assets/coupon-bg.png');
        background-size:100% (300/$pr3);
        height: 10rem;
        position:relative;
        margin-top:1rem;
        .coupon-desc{
            position:absolute;
            top:(60/$pr3);
            right:(71/$pr3);
            .coupon-big-word{
                color:#fff;
                font-size:(45/$pr3);
                margin-bottom:(17/$pr3)
            }
             .coupon-sub-word{
                color:#f0f0f0;
                font-size:(37/$pr3); 
            }
        }
        .coupon-time{
            position:absolute;
            left:(22/$pr3);
            bottom:(14/$pr3);
            font-size:(42/$pr3)
            .glyphicon{
                color:#f5921d;
                margin-right:(21/$pr3);
            }
            .expire-time{
                color:#999;
            }
        }
    }
    .comments{
        background-color:#fff;
        margin-top: 0.5rem;
        margin-bottom:0.5rem;
        border-radius: 0.5rem;
        .icon-mg-right{
            margin-right:(12/$pr3);
        }
        .head{
            padding: 1rem;
            font-size: 1rem;
            .sp1{              
                color:#656565;
                float: left;
            }
            .sp2{
                color:$themeColor;
                  float: right;
            }
            border-bottom: 0.1rem solid $bordercolor;
        }
        .body{
            padding: 1rem;
            ul{
                li+li{
                    margin-top: 1.5rem;
                }
                li{ 

                       position:relative;
                  .img{
                      width: 2rem;
                      //float: left;
                    margin-right: 0.5rem;
                      .thumb{
                          width: 100%;
                      }
                      position: absolute;
                      top: 0;
                      left: 0;
                  }
                  .comment{
                      color:#a1a1a1;
                      margin-left: 2.5rem;
                      .p1{
                          font-size:0.8rem;
                          .username{
                           //   float: left;
                          }
                          .zan{
                              float: right;
                          }
                          .p2{
                              font-size: 0.9rem;
                              color:#787878;
                          }
                          .p3{
                              font-size: 0.6rem;
                          }

                      }

                  }
                }
            }
        }
    }
}


</style>
