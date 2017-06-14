<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <h1>{{title}}</h1>
                <ul>
                    <li>
                        <label class="required">商品名称</label>
                        <span><input :value="name"     type="text" name="姓名" placeholder="商品名称"></span>
                    </li>
                    <li>
                        <label class="required">单价</label>
                        <span><input  :value="price"    type="number" name="x2"  placeholder="单价"></span>
                    </li>
                    <li>
                        <label class="required">数量</label>
                        <span><input  v-model="count"    type="number" name="x2"  placeholder="单价"></span>
                    </li>
                    <li>
                        <label class="required">总价</label>
                        <span><input  :value="total"    type="number" name="x2"  placeholder="单价"></span>
                    </li>
    
                    .....
                    <li v-for="x in list ">
                        <div @click="alertOutter">
                            <label class="required" @click.stop="alertInner">名称</label>
                            <span><input  :value="x.name"   type="text" name="x2"  placeholder="单价"></span>
    
                        </div>
                        <div>
                            <label class="required">单价</label>
                            <span><input  :value="x.price"   type="number" name="x2"  placeholder="单价"></span>
    
                        </div>
                        <div>
                            <label class="required">数量</label>
                            <span><input  v-model="x.count"  :class="{warn:x.count>100}"  v-validate="{ rules: { required: true, max_value: 99 } }"  type="number" :name="x.name+'的数量'"  placeholder="单价"></span>
    
                        </div>
                    </li>
                    <li>
                        <label class="required">总价2</label>
                        <span><input  :value="total2"   type="number" name="x2"  placeholder="单价"></span>
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
            name: 'iphone6',
            price: 5000,
            count: 2,
            list: [
                { name: 'iphone5', price: 2000, count: 1 },
                { name: 'iphone6', price: 3000, count: 1 },
                { name: 'iphone7', price: 5000, count: 1 },
            ]
        }
    },
    computed: {
        total() {
            return this.price * this.count;
        },
        total2() {
            var res = 0;
            for (let x in this.list) {
                res += this.list[x].price * this.list[x].count;
            }
            return res;
        }
    },
    methods: {
        changeTitle() {
            this.title = "i have changed";
        },
        submit() {
            // console.log(this.list)
            this.$validator.validateAll().then(() => {
                console.log('vali suc')
            })
                .catch(() => {
                    console.log('vali fail')
                });
            if (this.$store.state.validate(this.errors)) {
                console.log('vali suc')
            }
        },
        alertInner() {
            alert('u click inner')
        },
        alertOutter() {
            alert('u click outter')
        }
    }
}
</script>

<style lang="stylus" scoped>
          @import    '../style/var'; 
          .warn{
              border:0.1rem solid red;
          }
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