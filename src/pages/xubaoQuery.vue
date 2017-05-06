<template>
        <div class="container">
        <div class="arrow-select arrow">
            <i class="icon icon-lion">小圆点</i>
            <span class="text">2016款 1.6L 手动 标致301 舒适版</span>
        </div>
        <div class="card middle-div  margin-bottom mg_t_4">
            <div class="body">
                <ul>
                    <li> <label>姓名</label>
                        <span><input type="text" placeholder="武松"></span>
                    </li>
                    <li> <label>裸车价</label>
                        <span><input type="text" placeholder="150,000"></span>
                        <span class="inline-right">元</span>
                    </li>
                    <li> <label>购车年限</label>
                        <span><input type="text" placeholder="3"></span>
                        <span class="inline-right">年</span>
                    </li>
                    <li> <label>出险次数</label>
                        <span><input type="text" placeholder="请输入出险次数"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li> <label>上年度保险费用</label>
                        <span><input type="text" placeholder="请输入金额"></span>
                        <span class="inline-right">元</span>
                    </li>
                    <li class="arrow"> <label>保险公司</label>
                        <span><input type="text" readonly placeholder="请选择保险公司"></span>
                    </li>
                    <li class="arrow"> <label>专营店</label>
                        <span><input type="text" readonly placeholder="请选择专营店"></span>
                    </li>

                    <li> <label>保险预估</label>
                        <span class="alertColor">2000</span>
                        <div class="priceOff">
                            <p>店端优惠</p>
                            <p>1.优惠信息优惠信息优惠信息优惠信息优惠信息优惠信息</p>
                            <p>2.优惠信息优惠信息优惠信息优惠信息优惠信息优惠信息33</p>
                        </div>
                    </li>

                    <li> <label style="vertical-align: top">备注</label>
                        <span><textarea    style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>


                </ul>

            </div>
        </div>

        <div class="longButton  bottom-button">提交</div>
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
        .priceOff{
     padding: $pd3;
     background-color: #ebebeb;
     color:#a1a1a1;
     font-size:$fs1;
     margin-top:$pd3;
 }
</style>
