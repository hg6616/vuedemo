<template>
    <mt-header :title="mytt" class="header">
        <mt-button  icon="back" slot="left" @click="back">返回</mt-button>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
</template>

<script>
//import MintUI from 'mint-ui'
export default {
    name:'nerd',
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
            console.log(3);
            this.$router.go(-1);
                 console.log(4);
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