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
            this.$router.go(-1); 
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