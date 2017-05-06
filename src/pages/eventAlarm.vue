<template>
    <div class="container">
    
        <div class="middle-div">
            <ul class="events">
                <li class="cls">
                    <p class="big">冷"COOL"到底,安全检查</p>
                    <p class="small">2017-03-09 12:00</p>
                    <div class="back"> </div>
                </li>
                <li class="cls">
                    <p class="big">春节送大礼,好车开回家</p>
                    <p class="small">2017-03-09 12:00</p>
                    <div class="back"> </div>
                </li>
            </ul>
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
       
 .events{
     margin-top:(24/$pr);
     li{
         background-color: #fff;
         position: relative;
         border-radius: (10/$pr);
         padding:(24/$pr);
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
             background-color:$themeColor;
             &:before{
                 content:"未使用";
                 color:#fff;
                 font-size: (30/$pr);
             }
         }
     }
     li+li{
         margin-top:(12/$pr);
     }
 }
</style>
