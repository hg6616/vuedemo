<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <!--<div class="tab-item">1</div>
           <div class="tab-item">2</div>
           <div class="tab-item">3</div>-->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
  
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
  	<transition name="router-fade" mode="out-in">
    <router-view></router-view>
    	</transition>
  </div>
</template>

<script type="">
import header from './components/header/header.vue';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    return;
    this.$http.get('/api/goods').then((res) => {
          console.log(res.body) 
      if (res.errno === ERR_OK) {
        this.seller = res.data
        console.log(this.seller)
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus"> 
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
 #app
  .tab
   display:flex
   width:100%
   height:40px
   line-height:40px
   border-bottom:1px solid rgba(7,17,27,0.1)
   .tab-item
    flex:1
    text-align:center
    &>a
    {
     display:block
     font-size:14px    
     color:rgb(77,85,93)
     }
     &.active
      color:rgb(240,20,20)
</style>

