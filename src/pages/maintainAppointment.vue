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
                    <li> <label>手机号</label>
                        <span><input type="text" placeholder="1384444444444"></span>
                    </li>
                    <li class="arrow"> <label>意向车型</label>
                        <span><input type="text" placeholder="请选择车型"></span>
                    </li>
                    <li style="position: relative;"> <label>当前里程</label>
                        <span><input type="text" placeholder="请输入当前里程"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li class="arrow"> <label>养修类型</label>
                        <span><input type="text" placeholder="请选择养修类型"></span>
                    </li>
                    <li class="arrow"> <label>预约时间</label>
                        <span><input type="text" placeholder="请选择预约时间"></span>
                    </li>


                    <li class="arrow"> <label>专营店</label>
                        <span><input type="text" placeholder="请选择专营店"></span>
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
</style>
