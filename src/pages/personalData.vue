<template>
     <div class="container">

        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li> <label>姓名</label>
                        <span>武松</span></li>
                    <li> <label>手机号码</label>
                        <span>139868848484</span>
                        <a class="abuttonRight">更换</a>
                        </li>
                </ul>

            </div>
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="head">
                车辆信息
            </div>
            <div class="body">
                <ul> 
                <li><label>车牌</label>
                    <span>粤A12345</span></li>
                <li><label>车型</label>
                    <span>标致301</span></li>
                <li><label>车架号</label>
                    <span>LGB456789598877</span></li>
                <li><label>发动机号</label>
                    <span>G45456457667</span></li>
                <li><label>保险到期</label>
                    <span>2017-09-12</span></li>
                </ul>
            </div>
        </div>

        <div class="longButton ">更改</div>
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