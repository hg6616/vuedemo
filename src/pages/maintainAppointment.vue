<template>
     <div class="container">
        <div class="arrow-select arrow"> 
          <div class="roundDot"></div>
            <span class="text">2016款 1.6L 手动 标致301 舒适版</span>
        </div>
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <ul>
                    <li> <label>姓名</label>
                        <span><input ref="recommendName" type="text" placeholder="请填入姓名"></span>
                    </li>
                    <li> <label>手机号</label>
                        <span><input  ref="recommendTel"  type="number" placeholder="请填入手机"></span>
                    </li>
                    <li class="arrow"> <label>车牌</label>
                        <span><input ref="carNo" type="text" placeholder="请填入车牌"></span>
                    </li>
                    <li style="position: relative;"> <label>当前里程</label>
                        <span><input ref="courseNo" type="number" placeholder="请输入当前里程"></span>
                        <span class="inline-right">km</span>
                    </li>
                    <li class=" "> <label>养修类型</label>
                        <span>
                             <select ref="repairType">
                                <option value="1">保养</option>
                                <option value="2">维修</option>
                            </select>
                            </span>
                    </li>
                    <li class="arrow"> <label>预约时间</label>
                        <span><input ref="repairTime" type="date" placeholder="请选择预约时间"></span>
                    </li>


                    <!--<li class="arrow"> <label>专营店</label>
                        <span><input type="text" placeholder="请选择专营店"></span>
                    </li>-->
                    <li> <label style="vertical-align: top">备注</label>
                        <span><textarea  ref="remark"   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>


                </ul>

            </div>
        </div>

        <button class="longButton  bottom-button" @click="submit">提交</button>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {

        };
    },
    methods: { 
        ...mapActions([types.ADD_SERVICE_CLUE]),
        submit() {
            var state = this.$store.state;
            var params = {
                "dlrCode": state.dlrCode,
                "repairType": this.$refs.repairType.value,
                "repairTime": this.$refs.repairTime.value,
                "courseNo": this.$refs.courseNo.value,
                "buType": "1",//预约养修是1
                "recommendName": this.$refs.recommendName.value,
                "recommendTel": this.$refs.recommendTel.value,
                "carTypeConfigId": 'xxx',//todo
               // "longitude": "107.456789",//todo
              //  "latiude": "23.456789",//todo
                "remark": this.$refs.remark.value,
                "carNo": this.$refs.carNo.value,//车牌号
            }
            this.ADD_SERVICE_CLUE(params)
                .then(() => { 
                     console.log( state.sucCode)
                    if (state.ADD_SERVICE_CLUE == state.sucCode) {
                        this.$toast('操作成功');
                     
                    }
                    else {
                        this.$toast('操作失败');
                    }
                })
                .catch((err) => { 
                    console.log(err)
                    this.$toast('操作失败');
                })
        }
    },
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       .card{
           margin-top:.5rem;
       }
</style>
