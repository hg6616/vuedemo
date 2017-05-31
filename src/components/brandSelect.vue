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
        <p style="display:none">{{setshowBrand}}</p>
    </div>
</template>

<script type=""> 
import { mapGetters, mapState, mapActions } from 'vuex'
import * as types from '../store/mutation-types'
export default {
    data() {
        return {
            isShowModal: false,//显示模态框背景
            isShowSlideBrand: false,//显示品牌侧边栏
            isShowSlideSeries: false,//显示车系侧边栏
            selectedBrandList: [],//品牌的选择情况
            selectedSeriesList: [],//车系的选择情况
        }
    },
    props: ['config', 'callback'],
    methods: {
        ...mapActions([types.GET_CAR_SERIES, types.GET_CAR_BRAND]),
        hideBrand() {
            var level = this.config.level;
            if (level === 'brand') {
                this.$data.isShowSlideBrand = false;
            }
            else if (level === 'series') {
                this.$data.isShowSlideSeries = false;
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
        //选择品牌
        checkBrand(id, brandCode) {
            var level = this.config.level;
            if (level === 'brand') {
                var newList = []
                for (let x in this.selectedBrandList) {
                    newList[x] = false;
                }
                for (let x in this.brandList) {
                    if (this.brandList[x].id == id) {
                        newList[x] = !this.brandList[x].checked
                    }
                }
                this.selectedBrandList = newList;
                this.callback(this.selectedBrand);
                setTimeout(() => {
                    this.hideBrand();
                }, 200)
            }
            else if (level === 'series') {
                this.isShowSlideBrand = false;
                this.isShowSlideSeries = true;
                this.GET_CAR_SERIES({ data: { "dlrCode": this.$store.state.dlrCode, carBrandId: id, carBrandCode: brandCode } });

            }
        },
        //选择车系
        checkSeries(id, brandCode) {
            var level = this.config.level;
            if (level === 'series') {
                var newList = []
                for (let x in this.selectedSeriesList) {
                    newList[x] = false;
                }
                for (let x in this.seriesList) {
                    if (this.seriesList[x].id == id) {
                        newList[x] = !this.seriesList[x].checked
                    }
                }
                this.selectedSeriesList = newList;
                this.callback(this.selectedSeries);
                setTimeout(() => {
                    this.hideBrand();
                }, 200)
            }
            // else if (level === 'series') {
            //     this.isShowSlideBrand = false;
            //     this.isShowSlideSeries = true;
            //     this.GET_CAR_SERIES({ data: { "dlrCode": this.$store.state.dlrCode, carBrandId: id, carBrandCode: brandCode } });

            // }
        },


        //显示品牌侧边栏
        showBrand() {
            this.$data.isShowModal = true;
            setTimeout(
                () => { this.$data.isShowSlideBrand = true; }, 100);
        },
    },
    activated() {
        console.log('activated');
        this.GET_CAR_BRAND({ data: { "dlrCode": this.$store.state.dlrCode } });
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
        //选择的品牌
        selectedBrand() {
            var res = {
                carBrandCn: '',
                icon: ''
            }
            var list = this.brandList;
            for (let x in list) {
                if (list[x].checked) {
                    res = list[x];
                    break;
                }
            }
            return res;
        },
        //选择的车系
        selectedSeries() {
            var res = {
                carSeriesCn: '',
                id: ''
            }
            var list = this.seriesList;
            for (let x in list) {
                if (list[x].checked) {
                    res = list[x];
                    break;
                }
            }
            return res;
        },
        //品牌列表
        brandList() {
            //   debugger;
            var res = this.$store.state.GET_CAR_BRAND;
            if (res == null) {
                res = [];
            }
            else {
                //初始状态是0,全部赋值false
                if (this.selectedBrandList.length == 0) {
                    for (let x in res) {
                        this.selectedBrandList[x] = false;
                    }
                }
                for (let x in res) {
                    res[x].checked = this.selectedBrandList[x];
                }
            }
            return res;
        },
        //车系列表
        seriesList() {
            //   debugger;
            var res = this.$store.state.GET_CAR_SERIES;
            if (res == null) {
                res = [];
            }
            else {
                //初始状态是0,全部赋值false
                if (this.selectedSeriesList.length == 0) {
                    for (let x in res) {
                        this.selectedSeriesList[x] = false;
                    }
                }
                for (let x in res) {
                    res[x].checked = this.selectedSeriesList[x];
                }
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