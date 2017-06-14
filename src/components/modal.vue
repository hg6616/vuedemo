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
            this.config.isShow=false;
            //this.callback('hello')
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

<style lang="stylus" scoped> 
     @import    '../style/var';   
.modal{
     display: none;
           position: absolute;
    z-index: 2001;
        top:0;
.modal-back{
     position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
}
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
.dialog{
      position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s; 
    textarea{
           width:100%;
           }       
     .header{ 
           padding:1.2rem;      
           border-bottom: 0.1rem solid $themeColor;
        
     }   
      .footer{
          border-top: 0.1rem solid $themeColor;
      }
      .content{
           padding:1.2rem;
      }
    
  }
.show {
    display: block;
    top: 0;
}

</style>