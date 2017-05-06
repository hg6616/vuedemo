<template>
    <div class="container">
    
        <ul class="msgList topBorder">
            <li class="cls arrow" >
                <router-link to="/myTestDrive">
                    <div class="content">
                        <div class="left"> <i class="iconfont icon-c"></i></div>
                        <div class="right">
                            <p class="big"><span>试驾信息2</span><span class="msgnum">3</span></p>
                            <p class="small">
                                <span>成功预约明天(2月14日)的车辆试驾</span>
                                <span class="right">09:49</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>
            <li class="cls arrow">
                <div class="content">
                    <div class="left"> <i class="iconfont icon-chaxunguohujia"></i></div>
                    <div class="right">
                        <p class="big"><span>询低价信息</span><span class="msgnum">3</span></p>
                        <p class="small">
                            <span>新的车辆报价已到</span>
                            <span class="right">09:49</span>
                        </p>
                    </div>
                </div>
            </li>
            <li class="cls arrow">
                <div class="content">
                    <div class="left"> <i class="iconfont icon-xiaoxi"></i></div>
                    <div class="right">
                        <p class="big"><span>系统消息</span><span class="msgnum">3</span></p>
                        <p class="small">
                            <span>车微服新版新体验</span>
                            <span class="right">09:49</span>
                        </p>
                    </div>
                </div>
            </li>
            <li class="cls arrow">
                <div class="content">
                    <div class="left"> <i class="iconfont icon-xunjia"></i></div>
                    <div class="right">
                        <p class="big"><span>续保询价消息</span><span class="msgnum">3</span></p>
                        <p class="small">
                            <span>车辆续保报价已到</span>
                            <span class="right">09:49</span>
                        </p>
                    </div>
                </div>
            </li>
            <li class="cls arrow">
                <div class="content">
                    <div class="left"> <i class="iconfont icon-fuwu-02"></i></div>
                    <div class="right">
                        <p class="big"><span>养修消息</span><span class="msgnum">3</span></p>
                        <p class="small">
                            <span>养修已受理,恭候光临</span>
                            <span class="right">09:49</span>
                        </p>
                    </div>
                </div>
            </li>
            <li class="cls arrow">
                <div class="content">
                    <div class="left"> <i class="iconfont icon-iconfont-tuijian-"></i></div>
                    <div class="right">
                        <p class="big"><span>推荐消息</span><span class="msgnum">3</span></p>
                        <p class="small">
                            <span>推荐有礼已有结果</span>
                            <span class="right">09:49</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="">
export default {

}
</script>

<style lang="stylus"  scoped> 
       @import    '../style/var'; 
       
 .msgList{
   li{
       background-color: #fff;
       padding:(24/$pr);
         .content{
         display: flex;
         .left{
             width:(44/$pr);
             margin-right:(20/$pr);
             align-self: center;
             .iconfont{
                  font-size: (44/$pr);
             }
            
         }
         .right{
             flex:1;
         .big{
             color:#434343;
             font-size: (28/$pr);
         }
         .small{
             color:#9a9a9a;
             font-size: (20/$pr);
             .right{
                 float: right;
                 padding-right: 1rem;
             }
         }
         }
     }
   }
   li+li{
    //   border-top:0.1rem solid @bordercolor;
   }
 }
</style>
