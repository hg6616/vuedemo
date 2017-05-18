<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="x in picList" :key="x.imgPath">
                    <img class="swiperImg" :src="x.imgPath">
                </mt-swipe-item>
            </mt-swipe>
    
        </div>
        <div class="middle-div">
            <div class="middle_title">
                <div class="line">
    
                </div>
                <div class="text">我要推荐</div>
                <div class="line">
    
                </div>
            </div>
            <div class="longButton" @click="linkTo('/recommendInsurance')">推荐保险</div>
            <div class="longButton" @click="linkTo('/recommendMaintain')">推荐养修</div>
            <div class="longButton" @click="linkTo('/recommendBuy')">推荐购车</div>
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
    methods:{
        linkTo(url){
            this.$router.push({path:url})
        }
    },
    computed: { 
        picList() {
            return [
                {
                    "imgPath": "http://img1.bitautoimg.com/autoalbum/files/20140728/885/23423088545828_3490372_3.jpg",
                    "sort": 1
                },
                {
                    "imgPath": "http://img2.bitautoimg.com/autoalbum/files/20140728/604/23104360411431_3490377_14.jpg",
                    "sort": 1
                },
                {
                    "imgPath": "http://img4.bitautoimg.com/autoalbum/files/20140728/395/23412139549047_3490375_14.jpg",
                    "sort": 1
                },
                {
                    "imgPath": "http://img1.bitautoimg.com/autoalbum/files/20140728/690/23414269064293_3490376_14.jpg",
                    "sort": 1
                }
            ]
        }
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
