<template>
    <div class="box">
        <div class="block b1"></div>
        <div class="block b2"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
        <div class="block b3"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        // msg() {
        //     return this.store.state.pc.msg;
        // }
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
       .box{
           background-color:#f5f5d5;
           height: 800px;
           display:flex;
         flex-direction:row;
        //   flex-direction:column;
      //   justify-content:space-around;
         justify-content:space-between;
           flex-wrap:wrap;
         
       }
       .block{
          // background-color:#E88024;
           width:50px;
           height:50px;
           border:1px solid #fff;
        //   flex:1;
           display:inline-block;
           //flex:0 1 350px;
       }
       .b1{
              background-color:red;
              width:1313px;
       }
        .b2{
              background-color:green;
                width:30px;
       }
        .b3{
              background-color:blue;
               width:150px;
       }
</style>