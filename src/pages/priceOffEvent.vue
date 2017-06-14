<template>
    <div class="container">
        <div class="swiper-container margin-bottom">
            <div class="swiper">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="x in picList" :key="x.imgPath">
                        <img class="swiperImg" :src="x.imgPath">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
    
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li class="arrow" v-for="x in eventList" @click="linkTo(x.id)">
                        <span class="spImg"><img :src="x.actPhotoUrl"></span>
                        <span class="spText ellipsis">{{x.actName}}</span>
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
import { mapActions, mapState, mapGetters } from 'vuex';
import * as types from '../store/mutation-types';
import util from '../utils/util.js';
import api from '../api/api.js';

export default {
    data() {
        return {
            list: []
        }
    },
    activated() {
        // this.GET_EVENT({ dlrCode: this.$store.state.dlrCode });
        var dlrCode = this.$store.state.dlrCode;
        api.getData([{ type: types.GET_EVENT, param: { dlrCode } }])
            .then(res => {
                this.list = res;
            })
    },
    methods: { 
        linkTo(id) {
            this.$router.push({ path: '/eventDetail', query: { id } })
        }
    },
    computed: {
        eventList() {
            var res = this.list;
            if (res == null) {
                res = []
            }
            else {

            }
            return res;
        },
        picList() {
            var res = [];
            for (let o in this.list) {
                if (parseInt(o) < 5) {
                    res.push({
                        imgPath: this.list[o].actPhotoUrl
                    })
                }
                else {
                    break;
                } 
            }
            return res;
        }
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
        // background: $themeColor;
        // background: url("../assets/iwantrecommand.jpg");
        // background-size: 100% 100%;
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
                  max-width:50%;
                  display:inline-block;
                  line-height:(100/$pr3);
                  height:(100/$pr3);
                  word-wrap:nowrap;
              }
          }
      }
  }
</style>
