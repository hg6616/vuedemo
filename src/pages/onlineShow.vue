<template>
    <div>
        <div class="container">
            <div class="arrow-select arrow" @click="showBrand">
                <img src="../assets/brand/peugeot.png" style="height:1.1rem">
                <span class="text">东风标致</span>
            </div>
            <div class="showpic-content middle-div">
                <ul class="ul-pic">
                    <li class="li-pic" v-for="x in carList" @click="showDetail(x.id)">
                        <div class="pic">
                            <img :src="x.image" class="showpic">
                        </div>
                        <p class="car-series">{{x.carSeriesCn}}</p>
                        <p class="price"><span>{{x.price}}</span>万</p>
                    </li>
                </ul>
            </div>
        </div>
    
        <div class="modal" :class="{show:isShow}">
            <div class="modal-back" @click="hideBrand">
    
            </div>
            <div class="brand-select" :class="{showBrand:isShowBrand}">
                <ul class="cls">
                    <li class="cls active">东风标致</li>
                    <li class="cls">郑州日产</li>
                    <li class="cls">东风风神</li>
                    <li class="cls">一汽大众</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {
            isShow: false,
            isShowBrand: false
        };
    },
    computed: {
        // msg() {
        //     return this.$store.state.pc.msg;
        // }
        ...mapState({
            carList: state => {
                var res = state.GET_CAR_SERIES;
                if (res == null) {
                    res = [];
                }
                return res;
            }
        })
    },
    created() {
        //   console.log('created');
    },
    mounted() {
        //  console.log('mounted');
    },
    activated() {
        this.GET_CAR_SERIES({ data: { "dlrCode": "H2901", "carBrandId": "1", "carBrandCode": "1" } });
    },
    methods: {
        ...mapActions([types.GET_CAR_SERIES]),
        showDetail(id) {
            console.log(id)
            this.$router.push({ path: '/carTypeChoose', query: { id: id}})
        },
        showBrand() {
            this.$data.isShow = true;
            setTimeout(
                () => {
                    this.$data.isShowBrand = true;
                }, 100
            );
        },
        //todo
        hideBrand() {
            this.$data.isShowBrand = false;
            setTimeout(
                () => {
                    this.$data.isShow = false;
                }, 300
            );
        }
    }
}
</script>

<style lang="stylus" scoped> 
       @import    '../style/var'; 
       
.showpic-content{
 //   margin-top:3.9rem;
  
    .ul-pic{ 
        display: flex;
        flex-wrap: wrap;
        .li-pic{
            flex: 1; 
            background:#fff;
            border-radius: 0.5rem;
            margin-top:0.7rem;
            .pic{
                height:10rem;
                width:13rem;
                margin-bottom: 0.8rem;
                .showpic{
                    height:100%;
                    width: 100%;
                }
            }
            .car-series{
                 color:#737373;
                 font-size:1rem;
                 margin: 0 0 0.7rem 0.7rem;
            }
            .price{
                color:#737373;
                 font-size:1rem;
                  margin: 0 0 0.7rem 0.7rem;
                span{
                  color:#cf3a3a;
                }
            }
        }
        .li-pic:nth-child(even){
             margin-left:1rem; 
        }
    }
}


.modal{
    .brand-select{
        height: 100%;
        width: 100%;
        position: absolute;
        top:0;
        left:100%;    
        z-index:10002;
        background: #fff;
        transition: all .5s ease-in-out;
        ul{ 
            color:#787878;
            font-size: 1.2rem;
            text-align: left;
            li{
                padding:1.2rem 0 1.2rem 1.2rem; 
                 border-bottom: 0.1rem solid $bordercolor;
            } 
            .active{
                 background:$themeColor;
            color:#fff;
            }
        }
    }
    .showBrand{
   left:8.9rem;;    
    }
}

</style>
