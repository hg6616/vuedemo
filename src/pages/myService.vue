<template>
    <div class="container">
    
        <div class="card middle-div  margin-bottom">
            <div class="head">
                购车服务
            </div>
            <div class="body">
                <ul>
                    <li class="arrow">
                        <router-link to="/onlineShow">
                            <i class="iconfont icon-huanche"></i>
                            <span>线上展厅</span>
                        </router-link>
    
                    </li>
                    <li class="arrow">
                        <router-link to="/testDriveAppointment">
                            <i class="iconfont icon-shijian"></i>
                            <span>试驾预约</span>
                        </router-link>
    
                    </li>
                    <li class="arrow">
                        <router-link to="/iRecommand">
                            <i class="iconfont icon-iconfont-tuijian-"></i>
                            <span>我要推荐</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    
        <div class="card middle-div  margin-bottom">
            <div class="head">
                车主服务
            </div>
            <div class="body">
                <ul>
                    <li class="arrow">
                        <router-link to="/maintainAppointment"> <i class="iconfont icon-lease-resv-2home"></i>
                            <span>养修预约</span></router-link>
    
                    </li>
                    <li class="arrow">
                        <router-link to="/xubaoQuery"> <i class="iconfont icon-xunjia"></i>
                            <span>续保询价</span></router-link>
    
                    </li>
                    <li class="arrow">
                        <router-link to="/carExchange"> <i class="iconfont icon-cheliangzhihuan"></i>
                            <span>车辆置换</span></router-link>
    
                    </li>
                </ul>
            </div>
        </div>
        <div class="longButton  bottom-button">更改</div>
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
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
</style>