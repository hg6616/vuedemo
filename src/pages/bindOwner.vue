<template>
    <div>
        <div class="container">
            <div class="card middle-div  margin-bottom">
                <div class="body">
                    <ul>
                        <li>
                            <label>姓名</label>
                            <span><input type="text" placeholder="请输入姓名"></span>
                        </li>
                        <li>
                            <label>车牌</label>
                            <span><input type="text" placeholder="请输入车牌"></span>
                        </li>
                        <li class="arrow">
                            <label>绑定车型</label>
                            <span><input type="text" placeholder="请选择车型"></span>
                        </li>
                        <li>
                            <label>手机号</label>
                            <span><input type="text" placeholder="请输入手机号"></span>
                        </li>
                        <li style="position: relative">
                            <label>验证码</label>
                            <span><input type="text" placeholder="请输入验证码" class="short-inpu3t"></span>
                            <div class="little-button">获取验证码</div>
                        </li>
                    </ul>
    
                </div>
            </div>
            <div class="card middle-div  margin-bottom">
    
                <div class="body">
                    <ul>
                        <li><span style="padding-left: 1.5rem"> 补充更多信息(选填)      </span> </li>
                        <li>
                            <label>车架号</label>
                            <span><input type="text" placeholder="请输入车牌"></span></li>
                        <li>
                            <label>发动机号</label>
                            <span><input type="text" placeholder="请输入车牌"></span></li>
                        <li class="arrow">
                            <label>购车时间</label>
                            <span><input type="text" placeholder="请选择购车日期"></span></li>
                        <li class="arrow">
                            <label>保险到期日</label>
                            <span><input type="text" placeholder="请选择到险日期"></span></li>
                    </ul>
                </div>
            </div>
    
            <div class="longButton  bottom-button" @click="showModal">提交</div>
        </div>
        <div :class="{show:isShow}"  class="modal">
            <div class="modal-back" @click="hideModal">
    
            </div>
            <div class="dialog">
                <!--<div class="header">1</div>-->
                <div class="content">
                    <div class="msg">
                        <p>1.检查输入的手机号</p>
                        <p>2.手机信号OK</p>
                        <p>3.机接收延迟</p>
                        <p>3.如解决不了,请联系客服</p>
                    </div>
    
                </div>
                <div class="footer">
                    <div class="btnText">
                        返回
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ismodal: true,
            isShow: false
        };
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
    methods: {
        showModal() {
            this.$data.isShow = true;
        },
        hideModal() {
            this.$data.isShow = false;
        }
    }

}
</script>

<style lang="stylus" scoped> 
       @import  '../style/var'; 
       .inline-right-button{
      position: absolute;
         right:1rem;
         top:0.6rem;
}

.little-button{
    @extend   .inline-right-button
}
.modal{
    .msg{
        color:#333;
        p{
            font-size:1rem;            
        }
        p+p{
            margin-top: 1rem;
        }
    }
    .footer{
        .btnText{
            text-align: center;
            margin:0.7rem 0;
            font-size: 1.4rem;
            color:$themeColor;
        }
    }
}
</style>