<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper">
                <img :src="detail.actPhotoUrl" class="actImg">
            </div>
    
        </div>
    
        <div class="event_detail  middle-div">
            <div class="content">
                <div class="title">
                    <p class="event_name">{{detail.actName}}</p>
                    <p class="sub">活动时间:{{detail.actStartTime}}~{{detail.actEndTime}}</p>
                    <!--   <p class="sub">活动对象:{{detail.actClient==undefined?'':detail.actClient}} -->
                    <span class="view-status">
                                                <span class="view">
                                                   <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> {{detail.actUpNum}}
                    </span>
                    <span class="zan">
                                                 <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></span> {{detail.actCheckNum}}
                    </span>
                    </span>
                    </p>
                </div>
                <div class="detail" v-html="detail.actInfor">
                    <!--{{detail.actInfor}}-->
                </div>
            </div>
            <div class="operate">
                <div class="signMan">
                    <p>已报名人数:</p>
                    <p class="pNum"><span class="signNum">{{detail.signUpNum2}}</span>人</p>
                </div>
                <div class="buttons">
                    <div class="button2" @click="signUpAct(detail)">参加活动</div>
                    <div class="button2" @click="dail(detail)"><a :href="'tel:'+detail.actTel">拨打热线</a></div>
                </div>
            </div>
            <div class="coupon" @click="clickCoupon(detail)" v-if="detail.coupon!=undefined">
                <div class="coupon-desc">
                    <p class="coupon-big-word">{{detail.coupon.title}}</p>
                    <p class="coupon-sub-word">点击图片,立即领取优惠券</p>
                </div>
                <div class="coupon-time">
                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                    <span class="expire-time">有效期:{{detail.coupon.expireText}}</span>
                </div>
            </div>
            <div class="comments">
                <div class="head clearfix">
                    <span class="sp1">精选评论</span>
                    <span class="sp2" @click="showWriteComment">
                                              <span class="glyphicon glyphicon-pencil icon-mg-right" aria-hidden="true"></span>写评论</span>
                </div>
                <div class="body">
                    <ul>
                        <li v-for="x in  comments">
                            <div class="img">
                                <img :src="x.headImgUrl" class="thumb">
                            </div>
                            <div class="comment">
                                <p class="p1">
                                    <span class="username">{{x.nickName}}</span>
                                    <!--<span class="zan"><span class="glyphicon glyphicon-thumbs-up icon-mg-right" aria-hidden="true"></span>{{x.thumbNum}}</span>-->
                                </p>
                                <p class="p2">{{x.comment}}</p>
                                <p class="p3">
                                    {{x.createDate}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <modal :config="modalConfig">
            <!--<h1 slot="dialog">这里可能是一个页面标题</h1>-->
    
            <div class="dialog" slot="dialog">
                <!--<div class="header">
                                                                                                    请填写评论
                                                                                                </div>-->
                <div class="content">
                    <textarea name="备注" style=" vertical-align: text-top" resize="no" v-validate="{ rules: {  max: 200} }" ref="remark" placeholder="请填写评论"></textarea>
                </div>
                <div class="footer">
                    <div class="btnText" @click="hideWriteComment">
                        取消
                    </div>
                    <div class="btnText" @click="submitComment">
                        确定
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util'
import modal from '../components/modal'
import dialog from '../components/dialog'
import api from '../api/api.js';

export default {
    data() {
        return {
            modalConfig: {
                isShow: false
            },
            changeDetail: false,
            id: '',
            detail: {},
            comments: {},
        }
    },
    components: { modal, dialog2: dialog },
    computed: {
    },
    activated() {
        this.id = this.$route.query.id;
        if (this.id != '') {
            this.loadData();
        }
    },
    methods: {
        ...mapActions([types.GET_EVENT_DETAIL, types.JOIN_EVENT, types.TAKE_COUPON, types.GET_EVENT_COMMENT]),

        loadData() {
            let dlrCode = this.$store.state.dlrCode;
            let id = this.id;
            api.getData([{
                type: types.GET_EVENT_DETAIL,
                param: { dlrCode, id }
            }])
                .then(res => {
                    if (res == null) {
                        res = {}
                    }
                    else if (res.length > 0) {
                        res = res[0];
                        res.signUpNum2 = res.signUpNum;
                        if (res.coupon != undefined) {
                            var cp = res.coupon;
                            if (cp.dateType == 1) {
                                cp.expireText = util.getDateStr({ date: new Date(cp.beginTimestamp.time) }) + '~' + util.getDateStr({ date: new Date(cp.endTimestamp.time) });
                            }
                            else if (cp.dateType == 2) {
                                cp.expireText = `自领取${cp.fixedBeginTerm}天后生效,${cp.fixedTerm}天内使用有效`;
                            }
                        }
                    }
                    this.detail = res;
                    api.getData([{
                        type: types.GET_EVENT_COMMENT,
                        param: { dlrCode, id: this.detail.id }
                    }]).then(res2 => {
                        this.comments = res2;
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.$toast('获取详情失败')
                });
        },
        //参加活动   
        signUpAct(d) {
            let param = {
                dlrCode: this.$store.state.dlrCode,
                id: d.id,
                type: 3,
                userName: '',
                moblie: '',
            };
            var state = this.$store.state;
            api.getData([{
                type: types.JOIN_EVENT,
                param
            }])
                .then(res => {
                    if (res == state.sucCode)
                        this.$toast('参加成功');
                    this.detail.signUpNum2 = parseInt(this.detail.signUpNum2) + 1;
                    this.changeDetail = !this.changeDetail;
                })
                .catch(() => {
                    this.$toast('参加失败')
                });
        },
        //拨打热线
        dail(d) {
            //donothing
        },
        //领取优惠券
        clickCoupon(d) {
            var state = this.$store.state;
            api.getData([{
                type: types.TAKE_COUPON,
                param: {
                    dlrCode: this.$store.state.dlrCode,
                    cardId: d.coupon.id,
                    bussId: this.detail.id,
                    receiveType: 1,
                }
            }])
                .then(res => {
                    if (res.id != undefined)
                        this.$toast('领取成功')
                })
                .catch(() => {
                    this.$toast('领取失败')
                });
        },
        //写评论
        showWriteComment() {
            this.modalConfig.isShow = true;
            document.getElementsByTagName("body")[0].style.overflow='hidden';
        },
        hideWriteComment() {
            this.modalConfig.isShow = false;
            document.getElementsByTagName("body")[0].style.overflow='';
        },
        submitComment(d) {
            var state = this.$store.state;
            this.$validator.validateAll()
                .then(() => {
                    api.getData([{
                        type: types.JOIN_EVENT,
                        param: {
                            dlrCode: state.dlrCode,
                            id: this.detail.id,
                            type: 4,
                            content: this.$refs.remark.value,
                        }
                    }])
                        .then(res => { 
                            if (res == state.sucCode) {
                                this.$toast('评论成功')
                                this.hideWriteComment();
                                api.getData([{
                                    type: types.GET_EVENT_COMMENT,
                                    param: { dlrCode: this.$store.state.dlrCode, id: this.detail.id }
                                }])
                                .then(res=>{
                                    this.comments=res;
                                });
                            }
                        })
                        .catch(() => {
                            this.$toast('评论失败')
                        });
                })
                .catch((err) => {
                    console.log(err)
                    util.validate(this.errors);
                })

        }
    }
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
         
body{
    overflow:hidden;
}
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
        width: 100%;
        display: inline-block;
        width: 96%;
        .title{
            padding: 0.5rem;
            border-bottom: 0.1rem solid $bordercolor;
            display: inline-block;
            .event_name{
                font-size: 1.2rem;
                color:$themeColor;
                margin-bottom: 0.5rem; 
            }
            .view-status{
              float:right;
              .glyphicon-eye-open:before {
                  color: #ef9e20;
              }
              .glyphicon-thumbs-up:before {
                  color: #f11414;
              }
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
