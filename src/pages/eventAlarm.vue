<template>
    <div class="container">
        <div class="middle-div">
            <ul class="events">
                <li class="cls" v-for="d in events" @click="seeDetail(d.id)">
                    <p class="big ellipsis">{{d.actName}}</p>
                    <p class="small">{{d.actStartTime}}</p>
                    <div class="back" :class="{going:d.going,ended:!d.going}">
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
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters(['events']),
    },
    methods: {
        ...mapActions(['GET_EVENT']),
        seeDetail(id){
            this.$router.push({path:'/eventDetail',query:{id:id}})
        }
    },
    activated() {
        this.GET_EVENT({ data: { "dlrCode": this.$store.state.dlrCode, "busiType": "1", "subBusiType": "1" } })
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
         @extend .clickable;
         .big{
             color:#434343;
             font-size: (30/$pr);
             width:20rem;
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
                     content:'进行中'
                 } 
             }  
          }
           .back.ended{
                 background-color:grey; 
                  &>.word{
                 &:before{
                     content:'已结束'
                 } 
             }  
          }
     }
     li+li{
         margin-top:(12/$pr);
     }
 }
</style>
