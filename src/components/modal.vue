<template>
    <div class="modal" :class={show:modalConfig2.isShow}>
        <div class="modal-back" @click="hideModal">
    
        </div>
           <slot name="dialog"></slot>

        <!--<p>{{modalConfig2.isShow}}</p>-->
        
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
    props:['config','callback'],
    computed: {
        modalConfig2(){ 
            return this.config;
        }
    },
    methods: {
        hideModal(){
            this.callback('hello')
                 // this.config.isShow=false;
        },
        dosome(){
            console.log('dosome')
            this.$emit('childdo',{hello:'world'})
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