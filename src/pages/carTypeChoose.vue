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
                <p class="name">{{theCar.name}}</p>
                <p class="price"><span>{{theCar.price}}</span>万</p>
                <p class="price-old">
                    <del>厂家指导价:{{theCar.delPrice}}</del>
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
                            <p class="price"><span>{{x.lowestPrice2}}</span>万</p>
                            <p class="price-old">
                                <del>厂家指导价:{{x.netSalePrice2}}万</del>
                            </p>
                            <div class="operate">
                                <div class="button" @click="queryPrice(x)">询底价</div>
                                <div class="button" @click="testDrive(x)">试驾</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    
    </div>
</template>

<script>
//import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
import _ from 'underscore';
export default {
    data() {
        return {
            theCar: {
                name: '',
                price: '',
                delPrice: '',
            },
            carList: null,
            picList: null,
        };
    },
    components: {

    },
    methods: {
        queryPrice(x) {
            this.$router.push({
                path: '/priceQuery', query:
                { cartype: x.id, carbrand: this.carbrand, seriesCN: x.carConfigCn }
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
    },
    activated() {
        var carSeriesId = this.$route.query.id;
        var dlrCode = this.$store.state.dlrCode
        var carBrandId = this.$route.query.brandID;
        var carBrandCode = this.$route.query.brandCode;
        this.carbrand = carBrandId;
        this.theCar.name = this.$route.query.cn;

        api.getData([{
            type: types.GET_CAR_TYPE_CONFIG,
            param: { dlrCode, carSeriesId }
        }])
            .then(res => {
                if (res == null) {
                    res = [];
                }
                else {
                    for (let o of res) {
                        o.lowestPrice2 = o.lowestPrice / 10000;
                        o.netSalePrice2 = o.netSalePrice / 10000;
                    }
                    if (this.theCar != undefined) {
                        var minLow = _.min(res, function (r) { return r.lowestPrice2; });
                        var maxLow = _.max(res, function (r) { return r.lowestPrice2; });
                        var minNet = _.min(res, function (r) { return r.netSalePrice2; });
                        var maxNet = _.max(res, function (r) { return r.netSalePrice2; });
                        this.theCar.price = `${minLow.lowestPrice2}~${maxLow.lowestPrice2}`;
                        this.theCar.delPrice = `${minNet.netSalePrice2}~${maxNet.netSalePrice2}`;
                    }
                }
                this.carList = res;
            })
            .catch(err => {

            });
            
        api.getData([{
            type: types.GET_CAR_SERIES_PIC,
            param: { dlrCode, carBrandId, carBrandCode, carSeriesId }
        }])
            .then(res => {
                this.picList = res;
            })
            .catch(err => {

            });
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
