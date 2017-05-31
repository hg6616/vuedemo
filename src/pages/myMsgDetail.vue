<template>
    <div class="container">
        <div class="msgde topBorder">
            <h5>养修预约详情</h5>
            <div class="msgdt">尊敬的XXX先生/女士，您与5月10日预约的轩逸2017款2.0L智能版已预约成功。XXXXXXX店恭候您的到来，具体信息如下：</div>
            <p>试驾车型：轩逸2017款2.0L智跑款</p>
            <p>试驾时间：2017年5月12日9:00-10:00</p>
            <p>地址：广州花都风神大道8号</p>
            <p>状态：待试驾</p>
            <div class="msgline">{{info.msg}}</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as types from '../store/mutation-types'
export default {
    methods: {
        ...mapActions([types.GET_MSG_DETAIL]),
    },
    computed: {
        ...mapState({
            info: state => {
                var res = state.GET_MSG_DETAIL;
                debugger;
                if (res == null) {
                    res = {
                        msg: ''
                    }
                }
                else {
                    res = res[0]
                }
                return res;
            }
        }),
        info2() {

            var res = this.$store.state.GET_MSG_DETAIL;
            if (res == null) {
                res = {
                    msg: ''
                }
            }
            else {
                res = res[0]
            }
            return res;
        }
    },
    activated() {
        this.GET_MSG_DETAIL({ data: { "dlrCode": this.$store.state.dlrCode, "busiType": "1", "subBusiType": "1" } })
    }
}
</script>

<style lang="stylus"  scoped> 
       @import    '../style/var'; 
           .msgde{
            margin:15px;
            padding:5px;
            background-color:#fff;
            border-radius: 5px;
            font-size:1.4rem;
                h5{
                    font-size:1.8rem;
                    text-align: left;
                    font-weight: normal;
                }
                .msgdt{
                    line-height: 2rem;
                    text-indent: 2rem;
                    margin:10px 0;
                }
                p{
                    line-height: 2rem;
                }
                .msgline{
                    padding: 10px;
                    border-top: 1px solid #e1e1e1;
                    margin-top: 10px;
                }

           }
 
</style>
