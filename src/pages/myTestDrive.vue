<template>
    <div class="container">
        <ul class="ulc topBorder">
            <li class="lic ">
                <router-link to="/testDriveDetail">
                    <p class="p1"><span class="sp1">MX5</span><span class="markLabel mkIng"></span><span class="triangle"></span></p>
                    <p class="p2">2017款 1.5L 手动豪华智能型</p>
                    <p class="p3">预约时间:2017-02-13 9:00~10:00</p>
                    <p class="p3">提交时间:2017-02-10 16:23</p>
    
                </router-link>
    
            </li>
            <li class="lic ">
                <p class="p1"><span class="sp1">MX5</span><span class="markLabel mkFail"  style="background-color:red ;display:inline-block; "></span>
                <span class="markLabel " style="background-color:red;width:17px;display:inline-block;height:17px;transform: skew(45deg);
        transform-origin: bottom;"> </span></p>
                <p class="p2">2017款 1.5L 手动豪华智能型</p>
                <p class="p3">预约时间:2017-02-13 9:00~10:00</p>
                <p class="p3">提交时间:2017-02-10 16:23</p>
                <div class="button">重新预约</div>
            </li>
            <li class="lic ">
                <p class="p1"><span class="sp1">MX5</span><span class="markLabel mkWait"></span></p>
                <p class="p2">2017款 1.5L 手动豪华智能型</p>
                <p class="p3">预约时间:2017-02-13 9:00~10:00</p>
                <p class="p3">提交时间:2017-02-10 16:23</p>
            </li>
            <li class="lic ">
                <p class="p1"><span class="sp1">MX5</span><span class="markLabel mkCancel"></span></p>
                <p class="p2">2017款 1.5L 手动豪华智能型</p>
                <p class="p3">预约时间:2017-02-13 9:00~10:00</p>
                <p class="p3">提交时间:2017-02-10 16:23</p>
            </li>
            <li class="lic ">
                <p class="p1"><span class="sp1">MX5</span><span class="markLabel mkDone"></span></p>
                <p class="p2">2017款 1.5L 手动豪华智能型</p>
                <p class="p3">预约时间:2017-02-13 9:00~10:00</p>
                <p class="p3">提交时间:2017-02-10 16:23</p>
            </li>
            <li class="lic ">
                <p class="p1"><span class="sp1">MX5</span><span class="markLabel mkValue"></span></p>
                <p class="p2">2017款 1.5L 手动豪华智能型</p>
                <p class="p3">预约时间:2017-02-13 9:00~10:00</p>
                <p class="p3">提交时间:2017-02-10 16:23</p>
            </li>
        </ul>
    </div>
</template>

<script>
import * as types from '../store/mutation-types'
import util from '../utils/util.js';
import api from '../api/api.js';
export default {
    data() {
        return {

        };
    }
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
         .ulc{
      .lic{
          font-size: (20/$pr);
          padding: (24/$pr);
          background-color: #fff;
          position: relative;
          p+p{
              margin-top:(12/$pr);
          }
          .p1{
              font-size:(24/$pr);
              color:#1a1a1a;
              .sp1{
                  margin-right:(10/$pr);
              }
              .spLabel{
                  color:#fff;
                  background-color: $themeColor;
              }
          }
          .p2{
              color:#636363;
          }
          .p3{
              color:#a7a7a7;
          }
          .button{
              position: absolute;
              right: (24/$pr);
              bottom: (24/$pr);
          }
      }
  }
</style>
