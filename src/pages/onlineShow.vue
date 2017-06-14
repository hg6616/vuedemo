<template>
    <div>
        <div class="container">
            <div class="arrow-select arrow" @click="showBrand">
                <img :src="selectedBrand.icon" style="height:1.1rem">
                <span class="text">{{selectedBrand.carBrandCn}}</span>
            </div>
            <div class="showpic-content middle-div">
                <ul class="ul-pic">
                    <li class="li-pic" v-for="x in carList" @click="showDetail(x.id,x.carSeriesCn)">
                        <div class="pic">
                            <img :src="x.path" class="showpic">
                        </div>
                        <p class="car-series">{{x.carSeriesCn}}</p>
                        <!--<p class="price"><span>{{x.price}}</span>万</p>-->
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
import util from '../utils/util.js';
import api from '../api/api.js';
import brandSelect from '../components/brandSelect'
export default {
    data() {
        return {
            //传入选择品牌组件的配置
            brandSelectConfig: {
                showBrand: false,
                level: 'brand'
                // level:'series'
            },
            selectedBrand: {
                carBrandCn: '请选择品牌',
                icon: ''
            },
            carList: {},
        };
    },
    computed: {
    },
    components: {
        brandSelect
    },
    activated() {
        //  
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        showDetail(id, cn) {
            this.$router.push({
                path: '/carTypeChoose',
                query: { id: id, brandID: this.selectedBrand.id, brandCode: this.selectedBrand.carBrandCode, cn }
            })
        },

        showBrand() {
            this.brandSelectConfig.showBrand = true;
        },
        setSelectBrand(obj) {
            this.selectedBrand = obj;
            let dlrCode = this.$store.state.dlrCode,
                carBrandId = this.selectedBrand.id,
                carBrandCode = this.selectedBrand.carBrandCode;
            api.getData([{
                type: types.GET_CAR_SERIES,
                param: { dlrCode, carBrandId, carBrandCode }
            }])
                .then(res => {
                    this.carList = res;
                });

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
