<template>
    <div class="container">
        <ul class="ulc topBorder">
            <li class="lic arrow ">
                <i class="iconfont icon-iconfont-tuijian-"></i>
                <span class="text">推荐记录</span>
            </li>
            <li class="lic arrow ">
                <i class="iconfont icon-c"></i>
                <span class="text">试驾记录</span>
            </li>
            <li class="lic arrow ">
                <i class="iconfont icon-chaxunguohujia"></i>
                <span class="text">询价记录</span>
            </li>
            <li class="lic arrow ">
                <i class="iconfont icon-fuwu-02"></i>
                <span class="text">养修记录</span>
            </li>
            <li class="lic arrow ">
                <i class="iconfont icon-cheliangzhihuan"></i>
                <span class="text">置换记录</span>
            </li>
        </ul>
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
          .ulc{
      background-color:#fff;
      li{
          padding: (24/$pr);
          font-size:( 32/$pr);
          color:#5b5b5b;
          .iconfont{
              font-size: (32/$pr);
          }

      }

     
 }
</style>
