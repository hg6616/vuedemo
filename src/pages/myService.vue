<template>
    <div class="container">
    
        <div class="card middle-div  margin-bottom">
            <div class="head">
                购车服务
            </div>
            <div class="body">
                <ul>
                    <li class="arrow" v-for=" x in serviceList.buyService" @click="linkTo(x.link)">
                        <i class="iconfont" :class="x.iconCls"></i>
                        <span>{{x.title}}</span>
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
                    <li class="arrow" v-for=" x in serviceList.ownerService" @click="ownerLinkTo(x.link)">
                        <i class="iconfont" :class="x.iconCls"></i>
                        <span>{{x.title}}</span>
                    </li>
                </ul>
            </div>
        </div>
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
        serviceList() {
            return {
                buyService: [
                    {
                        title: '线上展厅',
                        iconCls: 'icon-huanche',
                        link: '/onlineShow'
                    },
                    {
                        title: '试驾预约',
                        iconCls: 'icon-shijian',
                        link: '/testDriveAppointment'
                    }, {
                        title: '我要推荐',
                        iconCls: 'icon-iconfont-tuijian-',
                        link: '/iRecommand'
                    },
                ],
                ownerService: [
                    {
                        title: '养修预约',
                        iconCls: 'icon-lease-resv-2home',
                        link: '/maintainAppointment'
                    },
                    {
                        title: '续保询价',
                        iconCls: 'icon-xunjia',
                        link: '/xubaoQuery'
                    }, {
                        title: '车辆置换',
                        iconCls: 'icon-cheliangzhihuan',
                        link: '/carExchange'
                    },
                ]
            };
        }
    },
    methods: {
        linkTo(url) {
            this.$router.push(url)
        },
        ownerLinkTo(url) {
            if (this.$store.getters.carOwner.binded) {
                this.$router.push(url)
            }
            else{
                //todo 弹框前往绑定车主
                   this.$router.push('/bindOwner')
            }
        }
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },
    activated() {

    }
}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
</style>