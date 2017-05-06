<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper"></div>
    
        </div>
        <div class="middle-div">
            <div class="middle_title">
                <div class="line">
    
                </div>
                <div class="text">我要推荐</div>
                <div class="line">
    
                </div>
            </div>
            <div class="longButton">推荐保险</div>
            <div class="longButton">推荐养修</div>
            <div class="longButton">推荐购车</div>
            <div class="mark">*被推荐人完成成交,推荐人可获得相关奖励</div>
        </div>
    
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    computed: {
        // msg() {
        //     return this.$store.state.pc.msg;
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
       @import    '../style/var'; 
       .swiper-container{
    height:16.7rem;
    position: relative;

   .swiper{
       height: 100%;
        background: @themeColor;
        background: url("../assets/iwantrecommand.jpg");
        background-size: 100% 100%;
   } 
}
 .longButton{
     &+&{
         margin-top: 0.5rem;
     }
     width:100%;
 }
.mark{
     margin: 0 auto;
    margin-top: 1.2rem;
    font-size: 1.2rem;
    color:#646464;
    text-align: center;
   
}
 
</style>
