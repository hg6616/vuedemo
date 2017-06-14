<template>
    <div class="container">
    
        <ul class="msgList topBorder">
            <li class="cls arrow" v-for="x in msgList" @click="linkTo(x.id,x.msgType)">
                <div class="content">
                    <div class="left"> <i class="iconfont " :class="x.icon"></i></div>
                    <div class="right width100">
                        <p class="big width100"><span>{{x.text}}</span></p>
                        <p class="small width100">
                            <span class="linw"><i class="round" :style="{display:x.sdisplay}"></i>{{x.msgContent}}</span>
                            <span class="right">{{x.sendTime}}</span>
                        </p>
                    </div>
                </div>
            </li>
    
        </ul>
    </div>
</template>

<script type="">
import { mapActions, mapState, mapGetters } from 'vuex';
import * as types from '../store/mutation-types';
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    data() {
        return {
            list: {},
            status: {}
        }
    },
    methods: { 
        linkTo(id, type) {
            var dlrCode = this.$store.state.dlrCode;
            api.getData([{
                type: types.UPDATE_MSG_READ_STATUS,
                param: { dlrCode, id }
            }])
                .then(res => {
                    this.status = res;
                });
            this.$router.push({ path: '/mymsgDetail', query: { id, type } });
        },
    },
    activated() {
        var dlrCode = this.$store.state.dlrCode;
        api.getData([{
            type: types.GET_MSG,
            param: { dlrCode }
        }])
            .then(res => {
                this.list = res;
            });
    },
    computed: {
        msgList() {
            var res = this.$store.state.GET_MSG;
            var config = {
                //10系统，11试驾，12询底价，13续保询价，14养修，15推荐
                '10': {
                    icon: 'icon-xiaoxi',
                    text: '系统消息'
                },
                '11': {
                    icon: 'icon-c',
                    text: '试驾信息'
                },
                '12': {
                    icon: 'icon-chaxunguohujia',
                    text: '询低价信息'
                },
                '13': {
                    icon: 'icon-xunjia',
                    text: '续保询价消息'
                },
                '14': {
                    icon: 'icon-fuwu-02',
                    text: '养修消息'
                },
                '15': {
                    icon: 'icon-iconfont-tuijian-',
                    text: '推荐消息'
                },
            };
            if (res == null) {
                res = []
            }
            else {
                for (let i in res) {
                    var d = res[i];
                    var type = config[d.msgType];
                    var read = this.status;
                    if (type != undefined) {
                        d.text = type.text;
                        d.icon = type.icon;
                        if (d.massMsgStatus == 'sending') {
                            d.sdisplay = 'inline-block';
                        } else {
                            d.sdisplay = 'none';
                        }
                    }
                }
            }
            return res;
        }
    }
}
</script>

<style lang="stylus"  scoped> 
       @import    '../style/var'; 
       
 .msgList{
   li{
       background-color: #fff;
       padding:(24/$pr);
         .content{
         display: flex;
         .width100{
            width:100%;
         }
         .left{
             width:(44/$pr);
             margin-right:(20/$pr);
             align-self: center;
             .iconfont{
                  font-size: (44/$pr);
             }
            
         }
         .right{
             flex:1;
         .big{
             color:#434343;
             font-size: (28/$pr);
             line-height: 2.8rem;
         }
         .small{
             color:#9a9a9a;
             font-size: (20/$pr);
             .right{
                 float: right;
                 padding-right: 2rem;
             }
             .linw {
                    display: inline-block;
                    width: 56%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            
            .round{
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background-color: #f5b214;
                    margin-right: 0.5rem; 
                    display: inline-block;                    
            }                              
         }
         }
     }
   }
   li+li{
    //   border-top:0.1rem solid @bordercolor;
   }
 }
</style>
