<template>
    <div class="modal" :class={show:modalConfig.isShow}>
        <div class="modal-back" @click="hideModal">
    
        </div>
        <div class="dialog">
            <div class="header">1</div>
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
        <p>{{modalConfig.isShow}}</p>
    </div>
</template>

<script type=""> 
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
    name: 'modal',
    data() {
        return {
           modalConfig:this.config
        }
    },
    props:['config'],
    computed: {
        modalConfig2(){ 
            return this.config;
            var res={};
        //    debugger;
       //    Object.assign(res,this.config)
            //console.log(this.config);
            console.log(res);
         res=this.config;
            return res;
        }
    },
    methods: {
        hideModal(){
            // console.log(this.config2==this.config);
            // console.log(this.config2===this.config);
            // console.log(this.cf===this.config);
           // debugger;
         //   this.config.isShow=false;
            this.modalConfig.isShow=false;
           // this.cf.isShow=false;
            console.log('change show')
            // Vue.nextTick(()=>{
            //     console.log('updated')
            // });
        }
    }
    , components: {
        //  mheader
    },
    mounted() {
        //   console.log('mounted');
    },
    activated() {
        //   console.log('activated');  
        //this.GET_USER_INFO({ data: { "dlrCode": "H2901" } }) 
    },
}
</script>

<style lang="stylus" > 
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
</style>