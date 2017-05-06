<template>
      <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper"></div>
            <div class="intro">
                <p class="name">标致301</p>
                <p class="price"><span>18.97~21.97</span>万</p>
                <p class="price-old">
                    <del>厂家指导价:18.97~21.97</del>
                </p>
            </div>
        </div>
        <div class="card2 middle-div  margin-bottom">
            <div class="head">
                车型选择
            </div>
            <div class="body">
                <ul>
                    <li  >
                        <div class="detail">
                            <p class="name">2016款 1.6L 手动 标致301 舒适版</p>
                            <p class="price"><span>18.97</span>万</p>
                            <p class="price-old">
                                <del>厂家指导价:18.97~21.97</del>
                            </p>
                        </div>
                        <div class="operate">
                            <div class="button">询底价</div>
                            <div class="button">试驾</div>
                        </div>

                    </li>
                           <li  >
                        <div class="detail">
                            <p class="name">2016款 1.6L 手动 标致301 舒适版</p>
                            <p class="price"><span>18.97</span>万</p>
                            <p class="price-old">
                                <del>厂家指导价:18.97~21.97</del>
                            </p>
                        </div>
                        <div class="operate">
                            <div class="button">询底价</div>
                            <div class="button">试驾</div>
                        </div>

                    </li>
                           <li  >
                        <div class="detail">
                            <p class="name">2016款 1.6L 手动 标致301 舒适版</p>
                            <p class="price"><span>18.97</span>万</p>
                            <p class="price-old">
                                <del>厂家指导价:18.97~21.97</del>
                            </p>
                        </div>
                        <div class="operate">
                            <div class="button">询底价</div>
                            <div class="button">试驾</div>
                        </div>

                    </li>
    
                </ul>
            </div>
        </div>

        <div class="longButton  bottom-button middle-div">更改</div>
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
        background: url("../assets/showcar.jpg");
        background-size: 100% 100%;
   }
   .intro{
      color:#666;
       position: absolute;
       top:1rem;
       left:1.4rem;
       .name{
           font-size:0.87rem;
           margin-bottom:0.8rem;
       }
       .price{
           font-size:1rem;
           margin-bottom:0.8rem;
           span{
               color:#d44848;
           }
       }
          .price-old{
           font-size:0.7rem; 
           color:#999;
       }
   }
} 
</style>
