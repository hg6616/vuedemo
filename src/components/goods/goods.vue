<template>
    <div>
        <div class="header">i am good1</div>
        <div>
            <label>商品名称:
            </label>
            <!--<input type="text" :value="good.name">-->
            <span>
                {{good.name}}
            </span>
        </div>
        <div>
            <label class="redco">价格:
            </label>
             <input type="text" v-model="good.price">
            <!--<input type="text" :value="good.price">-->
        </div>
        <div>
            <label>数量:
            </label>
            <!--<input type="number" :value="good.count">-->
            <input type="number" v-model="good.count">
        </div>
        <div>
    
            <label>总价:
            </label>
            <span>{{totalPrice}}</span>
        </div>
    
        <div>
            <button @click="postdata">
                提交
            </button>
             <router-link to="/goods/seller2">商家</router-link>
                  
        </div>
         <router-view></router-view>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            good: {
                name: '',
                price: 0,
                count: 1
            },
            message: 'Hello'
        }
    },
    methods:{
        postdata(){  
            console.log( this.totalPrice);
        }
    },
    computed: {
        totalPrice() {
         
            return this.good.price * this.good.count;
        }
    },
    created() {
        this.$http.get('/api/goods').then((res) => {
            console.log(res.body)
            this.good = res.body[0];
        });
    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped > 
   .redco{
       color:red;
   }
</style>
