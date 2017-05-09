<template>
     <div class="toTop" @click="toTop"> 
           <mt-button type="primary">到顶部</mt-button>
     </div>
   
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        // msg() {
        //     return this.store.state.pc.msg;
        // }
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },
    methods:{
        toTop(){
            window.scrollTo(0,0)
        }
    }
}
</script>

<style lang="stylus" scoped> 
       .toTop{
           display:inline-block;
           position:fixed;
           right:10px;
           bottom:10px;
           opacity:0.75;
       }
</style>