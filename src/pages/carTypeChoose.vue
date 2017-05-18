<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <!--<div class="swiper"></div>-->
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="x in picList" :key="x.imgPath">
                    <img class="swiperImg" :src="x.imgPath">
                </mt-swipe-item>
            </mt-swipe>
            <div class="intro">
                <p class="name">标致301</p>
                <p class="price"><span>18.97~21.97</span>万</p>
                <p class="price-old">
                    <del>厂家指导价:18.97~21.97</del>
                </p>
            </div>
    
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="head">
                车型选择
            </div>
            <div class="body">
                <ul>
                    <li v-for="x in carList">
                        <div class="detail">
                            <p class="name">{{x.carConfigCn}}</p>
                            <p class="price"><span>{{x.netSalePrice}}</span>万</p>
                            <p class="price-old">
                                <del>厂家指导价:{{x.lowestPrice}}~{{x.netSalePrice}}</del>
                            </p>
                            <div class="operate">
                                <div class="button" @click="queryPrice(x.id)">询底价</div>
                                <div class="button" @click="testDrive(x.id)">试驾</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {

        };
    },
    components: {

    },
    methods: {
        ...mapActions([types.GET_CAR_TYPE_CONFIG, types.GET_CAR_SERIES_PIC]),
        queryPrice(id) { 
            this.$router.push({
                path: '/priceQuery', query:
                    { cartype: id, carbrand: this.carbrand }
            })
        },
        testDrive(id) {
               this.$router.push({
                path: '/testDriveAppointment', query:
                    { cartype: id, carbrand: this.carbrand }
            })
        },
    },
    computed: {
        // msg() {
        //     return this.$store.state.pc.msg;
        // }
        ...mapState({
            carList: state => {
                var res = state.GET_CAR_TYPE_CONFIG;
                if (res == null) {
                    res = [];
                }
                return res;
            },
            picList: state => {
                var res = state.GET_CAR_SERIES_PIC;
                if (res == null) {
                    res = [];
                }
                return res;
            },
        })
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },
    activated() {
        var carSeriesID = this.$route.query.id;
        var dlrCode = this.$store.state.dlrCode
        var carBrandId = '2';
        var carBrandCode = '1';
        this.carbrand=carBrandId;
        this.GET_CAR_TYPE_CONFIG({ data: { dlrCode, carSeriesID } });
        this.GET_CAR_SERIES_PIC({ data: { dlrCode, carBrandId, carBrandCode } });
    }
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

.card{
    .body{
        li{
            .detail{
                position:relative;
                .operate{
                position:absolute;
                right:0;
                top:0;
                   color:#666; 
                .button{
                    display:block;
                }
                  .button+.button{
                   margin-top:0.5rem;
                }
            } 
              .name{
           font-size:(39/$pr3);
           margin-bottom:(19/$pr3);
       }
       .price{
           font-size:(32/$pr3);
           margin-bottom:(19/$pr3);
           span{
               color:#d44848;
           }
       }
          .price-old{
           font-size:(21/$pr3); 
           color:#999;
       }
            } 
        }
    }
}
</style>
