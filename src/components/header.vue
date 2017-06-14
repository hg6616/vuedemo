<template>
    <mt-header :title="mytt" class="theme-bc">
        <mt-button  icon="back" slot="left" @click="back">返回</mt-button>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
</template>

<script>
//import MintUI from 'mint-ui'
export default {
    name:'header',
    data() {
        return {
           //   mytt:this.mytitle
        };
    },
    props:['mytitle'],
    computed: {
        mytt() {
            return this.mytitle;
        }
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },
    methods:{
        back(){ 
            let entry = this.$route.query.entry;
            if(entry=='weixin'){

                this.weixinClosePage();
            }else{
                this.$router.go(-1); 
            }
        },
        //关闭微信页面
        weixinClosePage() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', this.weixin_ClosePage(), false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', this.weixin_ClosePage());
                    document.attachEvent('onWeixinJSBridgeReady', this.weixin_ClosePage());
                }
            } else {
                this.weixin_ClosePage();
            }
        },
        weixin_ClosePage() {
            WeixinJSBridge.call('closeWindow');
        }
    }
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
       .header{
           background-color:$themeColor;
       }
</style>