<template>
    <div class="modal" :class="{show:isShowModal}">
        <div class="modal-back" @click="hideBrand">
        </div>
        <!--选择品牌-->
        <div class="brand-select" :class="{showSlide:isShowSlideBrand}">
            <ul class="cls">
                <li class="cls " v-for="x in brandList" :class="{active:x.checked}" @click="checkBrand(x.id,x.carBrandCode)">
                    <img class="brand-icon" :src="x.icon">{{x.carBrandCn}}
                </li>
            </ul>
        </div>
        <!--选择车系-->
        <div class="brand-select" :class="{showSlide:isShowSlideSeries}">
            <ul class="cls">
                <li class="cls " v-for="x in seriesList" :class="{active:x.checked}" @click="checkSeries(x.id)">
                    <img class="brand-icon" :src="x.image">{{x.carSeriesCn}}
                </li>
            </ul>
        </div>
        <!--选择车型-->
        <div class="brand-select" :class="{showSlide:isShowSlideCartype}">
            <ul class="cls">
                <li class="cls " v-for="x in carList" :class="{active:x.checked}" @click="checkCar(x.id)">
                    <img class="brand-icon" :src="x.image">{{x.carConfigCn}}
                </li>
            </ul>
        </div>
        <p style="display:none">{{setshowBrand}}</p>
    </div>
</template>

<script type="">  
import * as types from '../store/mutation-types'
import api from '../api/api';
export default {
    data() {
        return {
            isShowModal: false,//显示模态框背景
            isShowSlideBrand: false,//显示品牌侧边栏
            isShowSlideSeries: false,//显示车系侧边栏
            isShowSlideCartype: false,
            selectedBrand: {//选择的品牌
                carBrandCn: '',
                icon: '',
                id: '',
            },
            selectedSeries: {//选择的车系
                carSeriesCn: '',
                id: '',
            },
            selectedCar: {//选择的车型
                carConfigCn: '',
                id: '',
            },
            brandList: null,
            seriesList: null,
            carList: null

        }
    },
    props: ['config', 'callback'],
    methods: {
        hideBrand() {
            var level = this.config.level;
            if (level === 'brand') {
                this.isShowSlideBrand = false;
            }
            else if (level === 'series') {
                this.isShowSlideSeries = false;
            }
            else if (level === 'cartype') {
                this.isShowSlideCartype = false;
            }
            //使用settimeout才有先隐藏品牌再隐藏黑色背景效果
            setTimeout(
                () => {
                    this.$data.isShowModal = false;
                }, 300
            );
            //还要把传进来的参数改为false,不然第二次点击不会弹出来侧边栏
            this.config.showBrand = false;
        },
        //显示品牌侧边栏
        showBrand() {
            this.$data.isShowModal = true;
            setTimeout(
                () => { this.$data.isShowSlideBrand = true; }, 100);
        },
        //选择品牌
        checkBrand(id, brandCode) {
            var level = this.config.level;

            var ele = this.selectedBrand;
            ele.id = id;
            var list = this.brandList;
            if (list.length > 0) {
                list.forEach(v => { v.checked = false; });//重置为都不选中 
                for (let i in list) {
                    if (list[i].id == ele.id) {
                        list[i].checked = true;
                        this.selectedBrand = list[i];
                        break;
                    }
                }
            }
            if (level === 'brand') {
                this.callback(this.selectedBrand);
                setTimeout(() => {
                    this.hideBrand();
                }, 200)
            }
            else {
                this.isShowSlideBrand = false;
                this.isShowSlideSeries = true;
                this.seriesList = [];
                api.getData([{ type: types.GET_CAR_SERIES, param: { "dlrCode": this.$store.state.dlrCode, carBrandId: id, carBrandCode: brandCode } }])
                    .then(res => {
                        res.forEach(v => { v.checked = false });
                        this.seriesList = res;
                    });
            }
        },
        //选择车系
        checkSeries(id, brandCode) {
            var level = this.config.level;
            var ele = this.selectedSeries;
            ele.id = id;
            var res = [];
            var list = this.seriesList;
            if (list.length > 0) {
                res = list;
                res.forEach(v => { v.checked = false; })
                for (let i in res) {
                    if (res[i].id == ele.id) {
                        res[i].checked = true;
                        ele = res[i];
                        this.selectedBrand.series = ele;

                        break;
                    }
                }
            }
            if (level === 'series') {
                this.callback(this.selectedBrand);
                setTimeout(() => {
                    this.hideBrand();
                }, 200)
            }
            else {
                this.isShowSlideSeries = false;
                this.isShowSlideCartype = true;
                this.carList = [];
                this.selectedSeries.id = id;
                api.getData([{
                    type: types.GET_CAR_TYPE_CONFIG
                    , param: { "dlrCode": this.$store.state.dlrCode, carSeriesId: id }
                }])
                    .then(res => {
                        res.forEach(v => { v.checked = false });
                        this.carList = res;
                    });
            }
        },
        checkCar(id, brandCode) {
            var level = this.config.level;


            var res = [];
            var ele = this.selectedCar;
            ele.id = id;
            var list = this.carList;
            if (list.length > 0) {
                res = list;
                res.forEach(v => { v.checked = false; })
                for (let i in res) {
                    if (res[i].id == ele.id) {
                        res[i].checked = true;
                        ele = res[i];
                        this.selectedBrand.cartype = ele

                        break;
                    }
                }
            } 

            if (level === 'cartype') {
                this.callback(this.selectedBrand);
                setTimeout(() => {
                    this.hideBrand();
                }, 200)
            }
        },

    },
    activated() {
        api.getData([{ type: types.GET_CAR_BRAND, param: { "dlrCode": this.$store.state.dlrCode } }])
            .then(res => {
                res.forEach(v => { v.checked = false });
                this.brandList = res;
            });
    },
    computed: {
        //只是为了触发props改变事件 所以setshowBrand要放在页面中不能删除
        setshowBrand() {
            var res = this.config.showBrand;
            if (res) {
                this.showBrand();
            }
            return res;
        },
    }
}
</script>

<style lang="stylus" > 
  @import    '../style/var'; 
      
      .active{
                 background:$themeColor;
            color:#fff;
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
            font-size: 1.6rem;
            text-align: left;
             height: 100%;
            overflow: scroll;
            li{
                padding:1.2rem 0 1.2rem 1.2rem; 
                 border-bottom: 0.1rem solid $bordercolor;
                 .brand-icon{ 
                     height: 1.6rem;
                   vertical-align: text-bottom;
                     margin-right:(40/$pr3);
                 }
            } 
          
        }
    }
      .showSlide{
   left:8.9rem;
    }
  
}
</style>