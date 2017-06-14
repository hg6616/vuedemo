<template>
    <div class="container">
        <div class="msgde topBorder">
            <h5>{{info.msgTypeCn}}</h5>
            <div class="msgdt">{{info.msgContentCn}}</div> 
        </div>
    </div>
</template>

<script> 
import * as types from '../store/mutation-types'
import api from '../api/api.js'
export default {
     data() {
        return { 
            info:{
                msgTypeCn:'',
                msgContentCn:''
            },
        };
    },
    methods: {
       
    },
    computed: { 
      
    },
    activated() {
        console.log(this.$route.query.type,this.$route.query.id)
        api.getData([{
            type:types.GET_MSG,
            param:{ "dlrCode": this.$store.state.dlrCode, "busiType": "1", "subBusiType": "1"}
        }
            ])
        .then(res=>{ 
                if (res == null) {
                    res = {
                        msgType:'',
                        msgContent:'',
                    }
                }
                else {
                    res.msgType = this.$route.query.type;
                    res.id = this.$route.query.id;
         var  text=''
         switch (parseInt(res.msgType)){
                    case 10:
                      text='系统消息'
                      break;
                    case 11:
                       text='试驾信息'
                      break;
                    case 12:
                      text= '询低价信息'
                      break;
                    case 13:
                     text='续保询价消息'
                      break;
                    case 14:
                       text= '养修消息'
                      break;
                    case 15:
                     text= '推荐消息'
                      break;
                }
                res.msgTypeCn=text; 
                for (let i in res) {
                    var d = res[i];
                    var id = res.id;
                    if (res[i].id == parseInt(id)) {
                         res.msgContentCn=d.msgContent 
                    }
                }                                   
                } 
                this.info= res;            
        })
         
    }
}
</script>

<style lang="stylus"  scoped> 
       @import    '../style/var'; 
           .msgde{
            margin:15px;
            padding:10px;
            background-color:#fff;
            border-radius: 5px;
            font-size:1.4rem;
                h5{
                    font-size:1.8rem;
                    text-align: left;
                    font-weight: normal;
                }
                .msgdt{
                    line-height: 2rem;
                    text-indent: 2rem;
                    margin:10px 0;
                }
            
           }
 
</style>
