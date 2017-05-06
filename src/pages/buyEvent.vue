<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper"></div>
    
        </div>
        <div class="event_card middle-div">
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
        </div>
    
        <div class="event_detail  middle-div">
            <div class="content">
                <div class="title">
                    <p class="event_name">新春SPRING海归的约会</p>
                    <p class="sub">活动时间:2017.04.01~2017.04.21</p>
                    <p class="sub">活动对象:四个月未进站,用车1年以上客户</p>
                </div>
                <div class="detail">内容内容内容内容内容内容内 内容内容内容内容内容内容内 内容内容内容内容内容内容内 内容内容内容内容内容内容内 内容内容内容内容内容内容内 内容内容内容内容内容内容内 容内容内容内容内容内容内容内容内容内容内容
                </div>
            </div>
            <div class="operate">
                <div class="signMan">
                    <p>已报名人数:</p>
                    <p class="pNum"><span class="signNum">99</span>人</p>
                </div>
                <div class="buttons">
                    <div class="button2">参加活动</div>
                    <div class="button2">拨打热线</div>
                </div>
            </div>
            <div class="comments">
                <div class="head clearfix">
                    <span class="sp1">精选评论</span>
                    <span class="sp2"><i>铅笔</i>写评论</span>
                </div>
                <div class="body">
                    <ul>
                        <li>
                            <div class="img">
                                <img src="../assets/thumb_comment.jpg" class="thumb">
                            </div>
                            <div class="comment">
                                <p class="p1">
                                    <span class="username">Same</span>
                                    <span class="zan"><i>拇指</i>377</span>
                                </p>
                                <p class="p2">这活动很好啊!!!</p>
                                <p class="p3">
                                    2小时前
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="img">
                                <img src="../assets/thumb_comment.jpg" class="thumb">
                            </div>
                            <div class="comment">
                                <p class="p1">
                                    <span class="username">Same</span>
                                    <span class="zan"><i>拇指</i>377</span>
                                </p>
                                <p class="p2">这活动很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好啊!!!</p>
                                <p class="p3">
                                    2小时前
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
export default {
    data() {
        return {

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
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
         

.swiper-container{
    height:16.7rem;
    position: relative; 
   .swiper{
       height: 100%;
        background: $themeColor;
        background: url("../assets/iwantrecommand.jpg");
        background-size: 100% 100%;
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
        // background-color:lightgoldenrodyellow; 
            .signMan{
             background-image: url("../assets/shakehand.jpg");
             background-position: 100% 0%;
              background-size: 30% 60%;
                background-repeat: no-repeat;
               border: 0.1rem solid $themeColor;
                 padding: 0.5rem; 
               display: inline-block;
               margin-right: 0.5rem;
               width: 21rem;
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
                 float: right;
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

    .comments{
        background-color:#fff;
        margin-top: 0.5rem;
        border-radius: 0.5rem;
        .head{
            padding: 1rem;
            font-size: 1rem;
           //@extend   .clearfix;
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
