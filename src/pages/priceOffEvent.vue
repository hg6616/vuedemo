<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper"></div>
    
        </div>
    
        <div class="card middle-div  margin-bottom">
    
            <div class="body">
                <ul>
                    <li class="arrow">
                        <span class="spImg"><img src="../assets/iconc.jpg"></span>
                        <span class="spText ellipsis">购车活动购车活动购车活动购车活动购车活动66666666yerterter</span>
                    </li>
                        <li class="arrow">
                        <span class="spImg"><img src="../assets/iconc.jpg"></span>
                        <span class="spText ellipsis">购车活动购车活动购车活动购车活动购车活动66666666yerterter</span>
                    </li>
                        <li class="arrow">
                        <span class="spImg"><img src="../assets/iconc.jpg"></span>
                        <span class="spText ellipsis">购车活动购车活动购车活动购车活动购车活动66666666yerterter</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottomMsg">
            参加活动,省心省力更省钱
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
      .body{
          li{
              .spImg{
                  width:(215/$pr3);
                  height:(100/$pr3);
                  display:inline-block;
                  margin-right:(21/$pr3);
                  img{
                       width:(215/$pr3);
                  height:(100/$pr3);
                  }
              }
              .spText{
                  max-width:(653/$pr3);
                  display:inline-block;
                  line-height:(100/$pr3);
                  height:(100/$pr3);
                  word-wrap:nowrap;
              }
          }
      }
  }
</style>
