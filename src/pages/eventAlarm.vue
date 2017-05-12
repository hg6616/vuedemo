<template>
    <div class="container">
    
        <div class="middle-div">
            <ul class="events">
                <li class="cls">
                    <p class="big">冷"COOL"到底,安全检查</p>
                    <p class="small">2017-03-09 12:00</p>
                    <div class="back going">
                        <div class="line"></div>
                        <div class="word">
                        </div>
                    </div>
                </li>
                <li class="cls">
                    <p class="big">春节送大礼,好车开回家</p>
                    <p class="small">2017-03-09 12:00</p>
                    <div class="back ended">
                        <div class="line"></div>
                        <div class="word">
                        </div>
                    </div>
                </li>
    
                <li class="cls" v-for="d in events">
                    <p class="big">{{d.actName}}</p>
                    <p class="small">{{d.actStartTime}}</p>
                    <div class="back ended">
                        <div class="line"></div>
                        <div class="word">
                        </div>
                    </div>
                </li>
    
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {

        };
    },
    computed: {
        // msg() {
        //     return this.$store.state.pc.msg;
        // }
        ...mapGetters(['events']),
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
      //  this.$store.dispatch({ type: this.$store.state.types.GET_EVENT, data: { "dlrCode": "H2901", "busiType": "1", "subBusiType": "1" } });

    },
        activated() {
                 this.$store.dispatch({ type: this.$store.state.types.GET_EVENT, data: { "dlrCode": "H2901", "busiType": "1", "subBusiType": "1" } });

        },
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var';  
 .events{
     margin-top:(24/$pr);
     li{
         background-color: #fff;
         position: relative;
         border-radius: (10/$pr);
         padding:(24/$pr);
         overflow:hidden;
         .big{
             color:#434343;
             font-size: (30/$pr);
         }
         .small{
             color:#9a9a9a;
             font-size: (16/$pr);
         }
         .back{
              position: absolute;
             top:0;
             right: 0;
                 height: 100%;
             width:9rem; 
              transform: skew(-30deg);
              transform-origin: bottom;
                background-color:#fff; 
             .line{
                 background-color:#fff;
                 height:100%;
                 width:.2rem;
                 margin-left:.2rem;
                 display:inline-block;
             }
             &>.word{ 
                 display: inline-block;
                  height: 100%;
                 vertical-align: top;
                 color:#fff;
                 font-size:(40/$pr);
                  transform: skew(30deg);
                  line-height:(110/$pr);
             }  
         }
          .back.going{
                 background-color:$themeColor; 
                  &>.word{
                 &:before{
                     content:'未使用'
                 } 
             }  
          }
           .back.ended{
                 background-color:grey; 
                  &>.word{
                 &:before{
                     content:'已取消'
                 } 
             }  
          }
     }
     li+li{
         margin-top:(12/$pr);
     }
 }
</style>
