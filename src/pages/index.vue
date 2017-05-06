<template>
    <div class="index-container">
        <input type="text" :value="msg">
        <ul class="ulc topBorder">
            <li class="lic  ">
                <i class="iconfont icon-iconfont-tuijian-"></i>
                <span class="text">我的</span>
                <ul class="subul">
                    <li class=".arrow">
                        <router-link to="/personalCenter">商家</router-link>
                    </li>
                    <li>
                        <router-link to="/myService">我的服务</router-link>
                    </li>
                    <li>
                        <router-link to="/myMsg">我的消息</router-link>
                    </li>
    
                </ul>
            </li>
            <li class="lic  ">
                <i class="iconfont icon-c"></i>
                <span class="text">业务办理</span>
                <ul class="subul">
                    <li>
                        <router-link to="/priceQuery">询底价</router-link>
                    </li>
                    <li>
                        <router-link to="/testDriveAppointment">试驾预约</router-link>
                    </li>
                    <li>
                        <router-link to="/maintainAppointment">养修预约</router-link>
                    </li>
                    <li>
                        <router-link to="/xubaoQuery">续保询价</router-link>
                    </li>
                </ul>
            </li>
            <li class="lic  ">
                <i class="iconfont icon-chaxunguohujia"></i>
                <span class="text">发现精彩</span>
                <ul class="subul">
                    <li>
                        <router-link to="/iRecommand">我要推荐</router-link>
                    </li>
                    <li>
                        <router-link to="/onlineShow">线上展厅</router-link>
                    </li>
                    <li>
                        <router-link to="/priceOffEvent">优惠活动</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script type="">
export default {
    data() {
        return {};
    },
    // beforeCreate() {
    //     console.log('beforeCreate');
    // },
    // created() {
    //     console.log('created');
    // },
    // beforeMount() {
    //     console.log('beforeMount');
    // },
    // mounted() {
    //     console.log('mounted');
    // },
    // beforeUpdate() {
    //     console.log('beforeUpdate');
    // },
    // updated() {
    //     console.log('updated');
    // },
    // beforeDestroy() {
    //     console.log('beforeDestroy');
    // },
    // destroyed() {
    //     console.log('destroyed');
    // },
    computed: {
        msg() {
            return this.$store.state.index.msg;
        }
    }
}
</script> 
<style lang="stylus" scoped>  
   @import    '../style/var'; 
 .index-container{
   .ulc{
      background-color:#fff;
      li{
          padding:(24/$pr);
          font-size: (32/$pr);
          color:#5b5b5b; 
          .iconfont{
               font-size: (32/$pr);
          } 
      } 
 }

 .subul{
      li{
		          //@extend .arrow;
            a{
                text-decoration: none;
                display: inline-block;
                width:100%;
            }
        }
 }
}
 .arrow{ 
    background-image: url("../assets/arrow.svg");
    background-size: 10px 20px;
    background-repeat: no-repeat;
    background-position: 95% center;
   background-position: -webkit-calc(100% -1rem) center;
    background-position: calc(100% - 2rem) center; 
   }
</style>
