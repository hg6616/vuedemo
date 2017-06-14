<template>
    <div class="container">
    
        <ul class="msgList topBorder">
            <li class="cls arrow" v-for=" x in list" @click="linkTo(x)">
                <div class="content">
                    <div class="left"> <i class="iconfont" :class="x.icon"></i></div>
                    <div class="right">
                        <p class="big"><span>{{x.title}}</span><span class="markStatus" :style="{backgroundColor:x.statusColor}">{{x.statusText}}</span><span class="triangle1" :style="{borderBottomColor:x.statusColor}"></span></p>
                        <p class="small">
                            <span>{{x.msg}}</span>
                            <span class="right">{{x.createDate}}</span>
                        </p>
                    </div>
                </div>
            </li>
    
        </ul> 
    </div>
</template>

<script type=""> 
import * as types from '../store/mutation-types';
import util from '../utils/util.js';
import api from '../api/api.js';
import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            list: null
        }
    },
    methods: { 
        loadData() {
            var dlrCode = this.$store.state.dlrCode;
            api.getData([{
                type: types.GET_CLUE_RECORD,
                param: { dlrCode }
            }])
                .then(res => {
                    var fStatus = {
                        '1': {
                            text: '客户已申请',
                            bgcolor: '#58bac5',
                            trbgcolor: '#58bac5'
                        },
                        '2': {
                            text: '已跟进',
                            bgcolor: '#0389bb',
                            trbgcolor: '#0389bb'
                        },
                        '3': {
                            text: '客户已到店',
                            bgcolor: '#58ba85',
                            trbgcolor: '#58ba85'
                        },
                        '4': {
                            text: '已成交',
                            bgcolor: '#58Fac5',
                            trbgcolor: '#58Fac5'
                        },
                        '5': {
                            text: '战败',
                            bgcolor: '#51bac5',
                            trbgcolor: '#51bac5'
                        },
                    }
                    var clueType = {
                        '1': {
                            '1': {
                                text: '购车询价',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            '2': {
                                text: '试驾预约',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            '3': {
                                text: '推荐购车',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            icon: 'icon-c'
                        },
                        '2': {
                            '1': {
                                text: '养修预约',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            '2': {
                                text: '推荐养修',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            '3': {
                                text: '一键救援',//todo
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            icon: 'icon-fuwu-02'
                        }
                        , '3': {
                            '1': {
                                text: '保险询价',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            '2': {
                                text: '推荐买保',
                                '1': '已受理',
                                '2': '已联系',
                                '3': '已到店',
                                '4': '已成交',
                                '5': '战败',
                            },
                            icon: 'icon-xunjia'
                        }
                    }
                    if (res == null) {
                        res = [];
                    }
                    else {
                        for (let i in res) {
                            var d = res[i];
                            //  debugger
                            d.icon = clueType[d.type].icon;
                            d.title = clueType[d.type][d.clueType].text;
                            d.statusText = clueType[d.type][d.clueType][d.followStatus];
                            d.statusColor = fStatus[d.followStatus].bgcolor;
                            d.msg = '';
                            if (d.name != undefined) {
                                d.msg = d.name + ' ' + d.mobile;
                            }
                            else {
                                d.msg = d.carTypeConfigName;
                            }
                        }
                    }
                    this.list = res;
                })
                .catch(() => {

                });
        },
        linkTo(x) {
//          this.$router.push({ name: 'testDriveDetail', params: { info: x } })
            
            let y=JSON.stringify(x);
       
            this.$router.push({ path: '/testDriveDetail', query: { info: y } }) //x 为 String
        }

    },
    mounted() { 
        this.loadData();
    },
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
             p{
              line-height:(38/$pr);
              .triangle1{
                display: inline-block;
                width: 0;
                height: 0;
                border-right: 1rem solid transparent;
                position: relative;
                top: 0.5rem;
                border-bottom: 1.8rem solid;
              }
             }
         .big{
             color:#434343;
             font-size: (28/$pr);
              .markStatus{
                  color:#fff;
                   font-size: (16/$pr);
                   background-color:$themeColor;
                   padding: 0.2rem 0.5rem;
                   margin-left:0.5rem;
              }
         }
         .small{
             color:#9a9a9a;
             font-size: (20/$pr);
             .right{
                 float: right;
                 padding-right: 2rem;
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
