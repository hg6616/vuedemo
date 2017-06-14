<template>
    <div class="container">
        <div class="card middle-div  margin-bottom">
            <div class="body">
                <h1>{{title}}</h1>
            </div>
    
            <ul>
                <li v-for="x in list">
                    <div @click="alertOut">
                        <label class="required" @click.stop="alertInner">名称</label>
                        <span><input    type="text"  :value="x.name"  readonly ></span>
                    </div>
                    <div>
                        <label class="required">价格</label>
                        <span><input    type="text" :value="x.price"  readonly ></span>
                    </div>
                    <div>
                        <label class="required">数量</label>
                        <span><input   :class="{warn:x.count>99}"    type="number"  name="数量"   v-validate="{ rules: { required: true, max_value: 99 } }"   v-model="x.count"  ></span>
                    </div>
                </li>
            </ul>
            <div>
                <label class="required">总价</label>
                <span><input    type="text"  :value="totalPrice"  ></span>
            </div>
        </div>
        ...........
    
        <div class="longButton  bottom-button" @click="submit">提交</div>
    
    </div>
</template>

<script>
import api from '../api/api';
import * as types from '../store/mutation-types'
export default {
    data() {
        return {
            title: 'hello vue',
            list: [
                { name: 'iphone7', price: 6000, count: 1 },
                { name: 'galaxy', price: 5000, count: 1 },
                { name: 'mi 5s', price: 2000, count: 1 },
            ],
            color: 'grey'
        }
    },
    methods: {
        submit() {

            api.getData([{
                type: types.GET_CAR_BRAND,
                param: {}
            }, {
                type: types.GET_EVENT_DETAIL,
                param: {}
            }])
                .then(res => {
                    console.log(res)
                })
                .catch(() => {

                })

        },
        alertOut() {
            alert('out')
        },
        alertInner() {
            alert('inner')
        }

    },
    computed: {
        totalPrice() {
            let t = 0;
            for (let i of this.list) {
                t += i.price * i.count;
            }
            return t;
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