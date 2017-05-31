<template>
    <div>
        <div class="container">
            <div class="arrow-select arrow" @click="showBrand">
                <img :src="selectedBrand.icon" style="height:1.1rem">
                <span class="text">{{selectedBrand.carBrandCn}}</span>
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
        <brandSelect :callback="setSelectBrand" :config="brandSelectConfig"></brandSelect>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as types from '../store/mutation-types'
import brandSelect from '../components/brandSelect'
export default {
    data() {
        return {
            //传入选择品牌组件的配置
            brandSelectConfig: {
                showBrand: false,
               level:'brand'
               // level:'series'
            },
            selectedBrand: {
                carBrandCn: '',
                icon: ''
            }
        };
    },
    computed: {
        ...mapState({
            carList: state => {
                var res = state.GET_CAR_SERIES;
                if (res == null) {
                    res = [];
                }
                return res;
            },

        })
    },
    components: {
        brandSelect
    },
    activated() {
        this.GET_CAR_SERIES({ data: { "dlrCode": "H2901", "carBrandId": "1", "carBrandCode": "1" } });
    },
    methods: {
        ...mapActions([types.GET_CAR_SERIES]),
        showDetail(id) {
            this.$router.push({ path: '/carTypeChoose', query: { id: id } })
        },
        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        setSelectBrand(obj) {
            this.selectedBrand = obj;
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




</style>
