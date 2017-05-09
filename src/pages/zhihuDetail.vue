<template>
    <div style="position:relative">
         <link rel="stylesheet" :href="detail.css?detail.css[0]:''">
        <mheader :mytitle="detail.title" class="topHead"></mheader>
        <div v-html="detail.body">    </div>
        <toTop  ></toTop>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import toTop from '../components/toTop'
import mheader from '../components/header'
export default {
    data() {
        return {
            currentID: null
        };
    },
    computed: {
        // msg() {
        //     return this.store.state.pc.msg;
        // }
        detail() { 
            return this.$store.state.news;
        },
         testhh(){
        console.log(333);
        return 33;
        }
    },
    beforeCreate() {

    },
    created() {
        //   console.log('created');
        //     var id = this.$route.params.id;
        //     this.$data.currentID = id;
        //     this.$store.dispatch({
        //         type: 'getNews',
        //         param: id
        //     });
    },
    methods:{
       
    },
    activated() {
        console.log('activated');
        var id = this.$route.params.id;
        if (this.$data.currentID != id) {
            this.$data.currentID = id;
            this.$store.dispatch({
                type: 'getNews',
                param: id
            });
        } 
    },
    mounted() {
        //  console.log('mounted');
        window.scrollTo(0,0)
    },
    components: {
    toTop,mheader
    }
}
</script>

<style lang="stylus" scoped> 
       .topHead{
           position:fixed;
           top:0;
           width: 100%;
       }
</style>