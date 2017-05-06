<template>
    <div class="container"> 
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li> <label>姓名</label>
                        <span><input type="text" placeholder="请输入姓名"></span>
                    </li>
                    <li> <label>手机号</label>
                        <span><input type="text" placeholder="请输入手机号"></span> 
                    </li>
                     <li class="arrow"> <label>已有车型</label>
                        <span><input type="text" readonly placeholder="2016款 1.6L 标致301 舒适版"></span>
                    </li>

                    <li> <label>行驶里程</label>
                        <span><input type="text" placeholder="请输入行驶里程"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li class="arrow"> <label>上牌时间</label>
                        <span><input type="text" placeholder="请选择日期"></span>  
                    </li>
                      <li class="arrow"> <label>心仪车型</label>
                        <span><input type="text" placeholder="请选择车型"></span>  
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
