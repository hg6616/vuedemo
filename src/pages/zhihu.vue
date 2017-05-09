<template>
    <div id="zhihu">
        <ul>
            <li v-for="d in zdata.stories" class="card clearfix" @click="viewDetail(d.id)">
                <div class="img">
                    <img :src="d.images[0]">
                </div>
                <div class="title">
                    {{d.title}}
                </div>
            </li>
        </ul>
    
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {};
    },
    computed: {
        // msg() {
        //     return this.store.state.pc.msg;
        // }
        zdata() {
            var d = this.$store.state.zdata;
            //  console.log(d);
            return d;
        }
    },
    methods: {
        viewDetail(id) {
            // console.log(id);
            this.$router.push('/zhihuDetail/' + id);
        }
    },
    created() {
        //   console.log('created');
        this.$store.dispatch({
            type: 'getzhihu',
            param: ''
        });

    },
    mounted() {
        //  console.log('mounted');
        //  return;
        //  console.log(document.getElementById('zhihu'));
        //   console.log(this.$el)
        //     new BScroll(this.$el, {
        //           click: true
        //         });
    },
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 

       #zhihu{
         //  background-color:green;
          // height:1000px;
       }
       .card{
           border-radius:5px;
           display:flex;
           .img{
              // height:100px; 
               //float:left;
               flex:1
           }
           .title{
               padding:5px;
               font-size:16px;
               color:#000;
               flex:2;
           }
           margin-bottom:10px;
       }
</style>