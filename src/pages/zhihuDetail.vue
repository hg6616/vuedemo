<template>
    <div v-html="">

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
        detail(){
            return this.$store.state.news;
        }
    },
    created() {
        //   console.log('created');
        var id=this.$route.params.id;
        this.$store.dispatch({
            type:'getNews',
            param:id
        });
    },
    mounted() {
        //  console.log('mounted');
    },
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
</style>