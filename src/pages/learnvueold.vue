<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <h1>{{title}}</h1>
                <ul>
                    <li>
                        <label class="required">商品名称</label>
                        <span><input  :value="name"   type="text" name="姓名" placeholder="商品名称"></span>
                    </li>
                    <li>
                        <label class="required">单价</label>
                        <span><input   :value="price"    type="number" name="x2"  placeholder="单价"></span>
                    </li>
                    <li>
                        <label class="required">数量</label>
                        <span><input  v-model="count"     type="number" name="x2"  placeholder="数量"></span>
                    </li>
                    <li>
                        <label class="required">总价</label>
                        <span><input  :value="total"     type="number" name="x2"  placeholder="总价"></span>
                    </li>
                    <li>
                        <label style="vertical-align: top">备注</label>
                        <span><textarea   style="vertical-align: text-top" placeholder="请填写备注"></textarea></span>
                    </li>
                    ......................... 水果列表
                    <li v-for="x in list">
                        <div @click="alertOutter">
                            <label class="required" @click.stop="alertInner">名称</label>
                            <span><input  :value="x.name"     type="text" name="x2"  placeholder="总价"></span>
    
                        </div>
                        <div v-show="showPrice">
                            <label class="required">单价</label>
                            <span><input   :value="x.price"      type="number" name="x2"  placeholder="总价"></span>
    
                        </div>
                        <div>
                            <label class="required">数量</label>
                            <span><input :class="{warn:x.count>100} " v-validate="{ rules: { required: true, max_value: 99 } }"  v-model="x.count"         type="number" :name="x.name"  placeholder="总价"></span>
    
                        </div>
                    </li>
                    <li>
                        <label class="required">fruit总价</label>
                        <span><input  :value="totalFruit"     type="number" name="x2"  placeholder="总价"></span>
                    </li>
                </ul>
    
            </div>
        </div>
    
        <div class="longButton  bottom-button" @click="submit">提交</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'hello vue',
            name: 'iphone',
            price: 5000,
            count: 1,
            showPrice:true,
            list: [
                { name: 'apple', price: 5, count: 1 },
                { name: 'banana', price: 6, count: 1 },
                { name: 'pear', price: 8, count: 1 },
            ]
        }
    },
    methods: {
        changetitle() {
            this.title = "i have changed";

        },
        submit(){
             this.$validator.validateAll().then(()=>{
                console.log('vali suc')
            })
            .catch(()=>{
                console.log('vali fail')
            }); 
            if (this.$store.state.validate(this.errors)) {
                      console.log('vali suc')    
            }
            console.log(this.list);
            this.showPrice=false;
        },
        alertInner(){
            alert('u click inner')
        },
          alertOutter(){
            alert('u click outter')
        }
    },
    computed: {
        total() {
            return this.price * this.count;
        },
        totalFruit() {
          
            var res = 0;
            for (let x in this.list) {
                res += this.list[x].price*this.list[x].count;
            }

            return res;
        }
    }
}
</script>

<style lang="stylus" scoped>
          @import    '../style/var'; 
       .inline-right-button{
      position: absolute;
         right:1rem;
         top:0.6rem;
}
.tipUl{
   position:absolute;
   top:2rem;
   background-color:lightblue;
}

.little-button{
   @extend  .inline-right-button
} 

.card{
    margin-top: 0.5rem;
}
.warn{
    border:0.1rem solid  red;
}
</style>