<template>
    <div>
        <!--<ul>
            <li v-for="d in zdata">
    
            </li>
        </ul>-->
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
        zdata() {
            return this.$store.state.zdata;
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
    },
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
</style>