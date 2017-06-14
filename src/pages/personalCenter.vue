<template>
    <div class="personcenter-container">
    
        <div class="head">
            <div class="detail clearfix">
                <div class="img">
                    <img class="img2" :src="carOwner.headImgUrl">
                </div>
                <div class="word">
                    <div class="up">
                        <!--<div class=" "> </div>-->
                        <i class="iconfont icon-yonghu-yuan"></i>
                        <div class="text" @click="viewDetail">{{carOwner.nickName}}</div>
                    </div>
                    <div class="down">
                        <span class="sp1">{{carOwner.carOwner.carNo}}</span>
                        <span class="sp2">{{carOwner.carOwner.carTypeConfigName}}</span>
                    </div>
                </div>
            </div>
            <div class="banner">
                <ul class="menuul" v-show="carOwner.binded">
                    <li class="clickable">
                        <router-link to="/eventAlarm">
                            <div class=""><i class="iconfont icon-daxiao"></i></div>活动提醒
                        </router-link>
                    </li>
                    <li class="disabled">
                        <div class=""><i class="iconfont icon-jiankong"></i></div>保养提醒</li>
                    <li class="disabled">
                        <div class=""><i class="iconfont icon-anquan"></i></div>保险提醒</li>
                    <li class="disabled">
                        <div class=""><i class="iconfont icon-iconfont-car-viewed"></i></div>车检提醒</li>
                </ul>
                <div class="bindCar" v-show="!carOwner.binded">
                    <router-link to="/bindOwner">
                        <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                        <span class="text">绑定车主</span>
                    </router-link>
    
                </div>
            </div>
        </div>
     <!---->
        <div class="tableMenu middle-div" v-show="carOwner.binded">
            <div class="row">
                <div class="cell clickable" @click="linkTo('/maintainAppointment')">
                    <div class="icon">
                        <div class="icon-wrapper">
                            <i class="iconfont icon-lease-resv-2home"></i>
                        </div>
                    </div>
                    <div class="text">养修预约</div>
                    <div class="lineToTop"></div>
                    <div class="lineToLeft"></div>
                </div>
                <div class="cell" @click="linkTo('/irecommand')">
                    <div class="icon">
                        <div class="icon-wrapper">
                            <i class="iconfont icon-iconfont-tuijian-"></i>
                        </div>
                    </div>
                    <div class="text">我要推荐</div>
                    <div class="lineToRight"></div>
                </div>
            </div>
            <div class="row">
                <!-- <div class="cell" @click="linkTo('/carexchange')"> -->
                <div class="cell disable" >
                    <div class="icon">
                        <div class="icon-wrapper">
                            <i class="iconfont icon-cheliangzhihuan"></i> </div>
                    </div>
                    <div class="text">车辆置换</div>
                    <div class="lineToBottom"></div>
    
                </div>
                <div class="cell" @click="linkTo('/xubaoQuery')">
                    <div class="icon">
                        <div class="icon-wrapper">
                            <i class="iconfont icon-xunjia"></i>
                        </div>
                    </div>
                    <div class="text">续保询价</div>
    
                </div>
            </div>
        </div>
    
        <div class="tableMenu middle-div" v-show="!carOwner.binded">
            <div class="row">
                <div class="cell"  @click="linkTo('/maintainAppointment')">
                    <div class="icon">
                        <div class="icon-wrapper">
    
                            <i class="iconfont icon-lease-resv-2home"></i>
                        </div>
                    </div>
                    <div class="text">养修预约</div>
                    <div class="lineToTop2"></div>
                    <div class="lineToBottom2"></div>
                </div>
                <div class="cell"  @click="linkTo('/irecommand')">
                    <div class="icon">
                        <div class="icon-wrapper">
                            <i class="iconfont icon-iconfont-tuijian-"></i>
                        </div>
                    </div>
                    <div class="text">我要推荐</div>
                </div>
            </div>
    
        </div>
    
        <div class="body">
            <ul class="c">
                <li class="arrow  " @click="linkTo('/priceOffEvent')">
    
                    <span class="glyphicon glyphicon-gift" aria-hidden="true"></span>
    
                    <div class="text">最新优惠活动</div>
                    <div class="msgnum" v-if="msgCount.maintain!=null">{{msgCount.maintain}}</div>
    
                </li>
                <li class="arrow" @click="linkTo('/myMsg')">
    
                    <i class="iconfont icon-tixing"></i>
                    <div class="text">我的消息</div>
                    <div class="msgnum">{{msgCount.all}}</div>
    
                </li>
                <li class="arrow" @click="linkTo('/myRecord')">
    
                    <i class="iconfont icon-lishijilu"></i>
                    <div class="text">服务记录</div>
    
                </li>
                <li class="arrow" @click="linkTo('/coupon')">
    
                    <i class="iconfont icon-youhuiquan"></i>
                    <div class="text">优惠券</div>
    
                </li>
            </ul>
            <div class="bindComment" v-show="!carOwner.binded">
                <p>温馨提示:绑定后有啥好处?</p>
                <p>1.保养,保险,年检到期提醒</p>
                <p>2.养修免排队</p>
                <p>3.一键救援,出行无忧</p>
                <p>4.在线服务点评,关心您的诉求</p>
                <p>5.1对1专属养车顾问24小时在线服务</p>
            </div>
        </div>
               
    </div>
</template>

<script type=""> 
import { mapGetters, mapState, mapActions } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    name: 'personalCenter',
    computed: {
        ...mapGetters(['carOwner','msgCount']),
    
    },

    methods: {
        ...mapActions([
            types.GET_USER_INFO
        ]),
        linkTo(url) {
            this.$router.push(url);
        },
        viewDetail() {
            if (this.carOwner.binded) {
                this.$router.push('/personaldata');
            }
        },
    }
}
</script>

<style lang="stylus" > 
     @import    '../style/var';  
 .personcenter-container {
     .head {
         height: 11rem;
         background: url('../assets/bg.png');
         position: relative;
         // overflow: hidden;
         .detail {
             height: 6.5rem;
             padding: 0.8rem 0 1.3rem 1.5rem;
             .img {
                 float: left;
                 .img2 {
                     height: 6.5rem;
                     width: 6.5rem;
                     border-radius: 3.25rem;
                     border: 0.1rem solid white;
                 }
             }
             .word {
                 margin-left: 0.8rem;
                 float: left;
                 color: #ffffff;
                 .up {
                     height: 2.07rem;
                     line-height: 2.07rem;
                     margin: 1.4rem 0 1.2rem 0;
                     vertical-align: middle;
                     font-size: 2.07rem;
                     .iconfont {
                         color: #fff;
                         font-size: 2.07rem;
                     }
                     .text {
                         display: inline-block;
                         vertical-align: top;
                     }
                 }
                 .down {
                     font-size: 1.2rem;
                     margin-bottom: 0.73rem;
                     .sp1 {
                         padding-right: 0.93rem;
                         border-right: 0.1rem solid #ffffff;
                     }
                     .sp2 {
                         padding-left: 1rem;
                     }
                 }
             }
         }
         .banner {
             margin: 0 1.5rem 0.8rem 1.5rem;
             height: 5.77rem;
             border-radius: 0.5rem;
             position: absolute;
             background: #ffffff;
             left: 50%;
             width: 91.7%;
             margin-left: -45.6%;
             bottom: -3.47rem;
             box-sizing: content-box;
             box-shadow: 0 0.5rem 0.1rem #c9c9c9;
             ul {
                 list-style: none;
                 text-align: center;
                 display: flex;
                 flex-direction: row;
                 padding:(41/$pr3) (54/$pr3) (33/$pr3) (54/$pr3) ;
                 font-size:1rem;
                 li { 
                     flex: 1; 
                     .iconfont {
                         font-size: (57/$pr3) ;
                         margin-bottom:(21/$pr3) ;
                     } 
                 }
                 li.disabled{
                     color:#ddd;
                     .iconfont {
                         color:#ddd;
                     }
                 }
                 li+li {
                  //   content: ' ';
                   //  display: inline-block;
                   //  height: 3.2rem; //   margin-top:1.4rem;
                     border-left: 0.1rem solid $bordercolor;
                  //   position: absolute;
                    // left: 0px;
                 }
             }
             .bindCar {
                 color: $themeColor;
                 text-align: center;
                 margin: 2rem 0; 
                 .text {
                     font-size: 1.6rem;
                     display: inline-block;
                       color: $themeColor;
                 }
                 .icon-yonghu-yuan {
                     font-size: 1.6rem;
                 }
                 .glyphicon{
                       color: $themeColor;
                         font-size: 1.6rem;
                 }
             }
         }
     }
     .body {
         margin: 1rem 1.5rem 0.8rem 1.5rem;
         border-radius: 0.5rem;
         background: #fff; //  padding-top:3.6rem;
         ul {
             list-style: none;
             text-align: left;
             font-size: 1.6rem;
             li {
                 padding: 1.2rem 1.4rem;
                 .glyphicon ,.iconfont{
                     color:$themeColor;
                     font-size:1.6rem;
                 } 
                 .iconlittle {
                     margin-right: 0.8rem;
                 }
                 .arrow {
                     float: right;
                 }
             }
             li+li {
                 border-top: 0.1rem solid $bordercolor;
             }
         }
         .text {
             display: inline-block;
         }
     }

     .tableMenu{
         padding:(38/$pr3) (52/$pr3);
         background-color:#fff;
         border-radius:1rem;
         box-sizing: border-box;
         margin-top:4rem;
         &>.row+.row{
              &>.cell{
             padding-top:(54/$pr3);
             padding-bottom:0;
              }
              
         }
         &>.row{
            display:flex; 
            &>.cell.disable {
                    color: #ddd;
                    .icon {
                        border: 0.2rem solid #ddd;
                        .icon-wrapper {
                            background-color: #ddd;
                        }
                    }
                }
            &>.cell{
                flex:1;
                text-align:center;
                position:relative;
             //   border:0.1rem solid $themeColor;
                  padding-bottom:(54/$pr3);
               @extend   .clickable;
                .icon{
                          border-radius:50%;
                        border:(6/$pr3) solid $themeColor;
                        display: inline-block;
                        margin-bottom:(16/$pr3);
                      
                    .icon-wrapper{
                        background:$themeColor;
                         border-radius:50%;
                       display: inline-block;
                        border:(13/$pr3) solid #fff;
                        .glyphicon,.iconfont{
                            font-size:(66/$pr3);
                            color:#fff;
                            margin:(33/$pr3);
                        }
                    }
                } 
                &>.text{
                    font-size:(36/$pr3);
                }
                 
                &>.lineToTop{
                    position:absolute;
                    background:linear-gradient(to top, $themeColor , #fcfefe); 
                    height:100%;
                    width:  0.1rem ;
                    top:0;
                    right:0
                }
                 &>.lineToRight{
                    position:absolute;
                    background:linear-gradient(to right, $themeColor , #fcfefe); 
                width    :100%;
                    height:  0.1rem ;
                    left:0;
                    bottom:0
                }
                 &>.lineToBottom{
                    position:absolute;
                    background:linear-gradient(to bottom, $themeColor , #fcfefe); 
                    height:100%;
                    width:  0.1rem ;
                    top:0;
                    right:0
                }
                 &>.lineToLeft{
                    position:absolute;
                    background:linear-gradient(to left, $themeColor , #fcfefe); 
                    width    :100%;
                    height:  0.1rem ;
                    bottom:0;
                    right:0
                }
                &>.lineToTop2{
                    position:absolute;
                    background:linear-gradient(to top, $themeColor , #fcfefe); 
                    height:50%;
                    width:  0.1rem ;
                    top:0;
                    right:0
                }
                 &>.lineToBottom2{
                    position:absolute;
                    background:linear-gradient(to bottom, $themeColor , #fcfefe); 
                    height:50%;
                    width:  0.1rem ;
                    bottom:0;
                    right:0
                }
            }
         }
         
     }
 }

</style>
