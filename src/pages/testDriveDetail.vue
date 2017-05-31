<template>
    <div class="container" style="margin-bottom: 4rem;">
        <div class="headBanner">
            <p class="p1"><span class="sp1">试驾预约</span>
                <span class="markLabel mkWait"></span><span class="triangle"></span></p>
            <p class="p2">2017-02-10 16:23</p>
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="head">
                服务门店及时间
            </div>
            <div class="body">
                <ul>
                    <li class="info">
                        <div class="cls"><span class="label">门店</span><span class="msg">广州东风南方广大店</span></div>
                        <div class="cls"><span class="label">地址</span><span class="msg">武汉开发区屯阳大道8号</span></div>
                        <div class="cls"><span class="label">预约时间</span><span class="msg">2017年3月2日 9:00~10:00</span></div>
                    </li>
                    <li class="info">
                        <div class="cls">
                            <span class="label">诸葛亮</span><span class="msg">1355567777</span>
                            <span class="spright">  <i class="iconfont icon-iconfont-dianhua "></i></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="b0">
            <div class="bottomMsg">预约成功,请准时到店试驾</div>
        </div>
        <div id="b1">
            <div class="bottomMsg">预约处理中,请耐心等待....</div>
        </div>
        <div id="b2">
            <div class="card middle-div  margin-bottom">
                <div class="head">
                    评价
                </div>
                <div class="body">
                    <ul>
                        <li class="info">
                            <div class="cls"><span class="label">评价</span>
                                <span class="stars">
                                <i class="iconfont icon-guanzhu1 "></i>
                                <i class="iconfont icon-guanzhu1 "></i>
                                <i class="iconfont icon-guanzhu1 "></i>
                                <i class="iconfont icon-guanzhu1 "></i>
                                <i class="iconfont icon-guanzhu1 "></i>
                            </span>
                                <span class="spright score">80分</span>
                            </div>
                        </li>
                        <li class="info">
                            <div class="cls">
                                <span class="label vtop">评论</span><span class="msg">感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好</span>
    
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="b3">
            <div class="bottomMsg">预约已取消,请重新预约</div>
        </div>
        <div id="b4">
            <div class="card middle-div  margin-bottom">
                <div class="head">
                    评价
                </div>
                <div class="body">
                    <ul>
                        <li class="info">
                            <div class="cls"><span class="label">评价</span>
                                <span class="stars">
                                <i class="iconfont icon-guanzhu "></i>
                                <i class="iconfont icon-guanzhu "></i>
                                <i class="iconfont icon-guanzhu "></i>
                                <i class="iconfont icon-guanzhu "></i>
                                <i class="iconfont icon-guanzhu "></i>
                            </span>
                                <span class="spright score">0分</span>
                            </div>
                        </li>
                        <li class="info">
                            <div class="cls">
                                <span class="label vtop">评论</span>
                                <span class="msg">
                                    <textarea placeholder="再说几句吧"></textarea>
                                </span>
    
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="b5">
            <div class="bottomMsg">
                非常抱歉,,您可以重新预约或者直接来店试驾.
            </div>
        </div>
    
        <div class="longButton  bottom-button" id="bottom-button">预约取消</div>
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

    xxx() {
        var index = 0;
        var status = ['mkWait', 'mkIng', 'mkDone', 'mkCancel', 'mkDone', 'mkFail'];
        var btnMsg = ['预约取消', '预约取消', '提交', '重新预约', '提交', '重新预约'];

        for (var i = 1; i < 6; i++) {
            $('#b' + i.toString()).hide();
        }
        $('.headBanner').click(function () {
            index++;
            if (index >= 5) {
                index = 0;
            }
            for (var i = 0; i < 6; i++) {
                $('#b' + i.toString()).hide();
            }
            $('.markLabel').attr('class', 'markLabel ' + status[index]);
            $('#b' + index.toString()).show();
            $('#bottom-button').html(btnMsg[index]);
        });
        $('.stars .iconfont').mouseover(function () {

            $(this).prevAll().attr('class', 'iconfont icon-guanzhu1');
            $(this).attr('class', 'iconfont icon-guanzhu1');
            $(this).nextAll().attr('class', 'iconfont icon-guanzhu');
            $(this).parent().siblings('.score').text(($(this).index() + 1) * 20 + '分');
        });
        // $('.stars .iconfont').bind('mouseover',function(){
        //     debugger;
        //     console.log($(this).index())
        // })
    }
}

</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       
  .card{
      margin-top: (24/$pr);
      .head{
          background-color: $themeColor;
      }
      .body{
          ul{
              li{
                  padding:(24/$pr);
                  font-size: (20/$pr);
                  span.label{
                      width: (140/$pr);
                      color:#9b9b9b;
                      display: inline-block;
                  }
                  span.vtop{
                      vertical-align: top;
                  }
                span.msg{
                      width: (140/$pr);
                      color:#1e1e1e;
                  }
                  span.spright{
                       float: right;

                  }
                  div.cls+ div.cls{
                      margin-top:(24/$pr);
                  } 
                  .stars{
                      .iconfont{
                        color:#f5b214;
                      }
                      .iconfont+.iconfont{
                          margin-left:(24/$pr);
                          
                      }
                  }
              }
          }
      }
  }
  .headBanner{
       background-color: #fff;
       padding: (24/$pr);
       .p1{
           .sp1{
                 font-size: (30/$pr);
                 margin-right: (10/$pr);
                 color:#949494; 
           }
           margin-bottom: (10/$pr);
         
       }
       .p2{
           color:#adadad;
           font-size: (20/$pr);
       }
  }
</style>
