<template>
    <div class="container mg_b_5">
        <div class="middle-div">
            <ul class="events" ref="ulList">
                <li class="cls" v-for="d in events" @click="seeDetail(d.id)">
                    <p class="big ellipsis">{{d.actName}}</p>
                    <p class="small">{{d.actStartTime}}</p>
                    <div class="back" :class="{going:d.going,ended:!d.going}">
                        <div class="line"></div>
                        <div class="word">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import util from '../utils/util.js';
import api from '../api/api.js';
import * as types from '../store/mutation-types'
let cfg = {
    pageNo: 1,
    pageSize: 2,
    haveMoreData: true,
    loading: false,
    oldList: [],
    firstLoad: true,
};
export default {
    data() {
        return {
            listOrign: null
        }
    },
    computed: {
        events() {
            var d = this.listOrign;
            var res = [];
            if (d != undefined && d.length > 0) {
                for (let x in d) {
                    d[x].going = new Date() - new Date(d[x].actEndTime) <= 0 ? true : false;
                }
                res = d;
                if (res.length == cfg.pageSize) {
                    cfg.haveMoreData = true;
                }
                else {
                    cfg.haveMoreData = false;
                }
                cfg.firstLoad = false;
            }
            if (cfg.pageNo == 1) {
            }
            else {
                res = cfg.oldList.concat(res);
            }
            cfg.oldList = res;
            return res;
        },
    },
    methods: { 
        seeDetail(id) {
            this.$router.push({ path: '/eventDetail', query: { id: id } })
        },
        loadData() {
            let pageNo, pageSize;
            if (cfg.firstLoad) {
                pageNo = cfg.pageNo = 1;
                pageSize = cfg.pageSize = 10;
            }
            else {
                cfg.pageNo++;
                pageNo = cfg.pageNo;
                pageSize = cfg.pageSize;
            }
            let dlrCode = this.$store.state.dlrCode;
            if (!cfg.haveMoreData) {
                this.$toast('没有更多的数据')
            }
            else if (cfg.haveMoreData && !cfg.loading) {
                cfg.loading = true;
                api.getData([{ type:'GET_USER_EVENT', param: { dlrCode, pageNo, pageSize } }]) 
                    .then(res=> {
                        this.listOrign=res;
                        cfg.loading = false;
                    })
                    .catch(() => {
                        cfg.loading = false;
                    });
            }
        },
    },
    activated() {
        cfg.firstLoad = true;
        this.loadData();
    },
    mounted() {
        //   var obj = window;
        let obj = this.$refs.ulList;
        let _this = this;
        util.addScrollEvent({
            target: obj,
            fn: _this.loadData,
        });
    },
}
</script>

<style lang="stylus" scoped> 
@import    '../style/var';  
 .events{
     margin-top:(24/$pr);
     li{
         background-color: #fff;
         position: relative;
         border-radius: (10/$pr);
         padding:(24/$pr);
         overflow:hidden;
         @extend .clickable;
         .big{
             color:#434343;
             font-size: (30/$pr);
             width:20rem;
         }
         .small{
             color:#9a9a9a;
             font-size: (16/$pr);
         }
         .back{
              position: absolute;
             top:0;
             right: 0;
                 height: 100%;
             width:9rem; 
              transform: skew(-30deg);
              transform-origin: bottom;
                background-color:#fff; 
             .line{
                 background-color:#fff;
                 height:100%;
                 width:.2rem;
                 margin-left:.2rem;
                 display:inline-block;
             }
             &>.word{ 
                 display: inline-block;
                  height: 100%;
                 vertical-align: top;
                 color:#fff;
                 font-size:(40/$pr);
                  transform: skew(30deg);
                  line-height:(110/$pr);
             }  
         }
          .back.going{
                 background-color:$themeColor; 
                  &>.word{
                 &:before{
                     content:'进行中'
                 } 
             }  
          }
           .back.ended{
                 background-color:grey; 
                  &>.word{
                 &:before{
                     content:'已结束'
                 } 
             }  
          }
     }
     li+li{
         margin-top:(12/$pr);
     }
 }
</style>
