<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper"></div>
    
        </div>
    
        <div class="card middle-div  margin-bottom">
            <div class="head">
                活动分类
            </div>
            <div class="body">
                <ul>
                    <li class="arrow">
                        <i class="iconfont icon-fanxiangxunche"></i>
                        <span>购车活动</span>
                    </li>
                    <li class="arrow">
                        <i class="iconfont icon-fuwu-02"></i>
                        <span>养修活动</span>
                    </li>
                    <li class="arrow">
                        <i class="iconfont icon-chexianguanli"></i>
                        <span>续保活动</span>
                    </li>
                    <li class="arrow">
                        <i class="iconfont icon-cheliangzhihuan"></i>
                        <span>置换活动</span>
                    </li>
                </ul>
            </div>
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
        background: $themeColor;
        background: url("../assets/iwantrecommand.jpg");
        background-size: 100% 100%;
   } 
} 
  
  .card{
      .head{
          background-color: $themeColor;
      }
  }
</style>
