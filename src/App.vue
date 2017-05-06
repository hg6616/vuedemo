<template>
  <div id="app"> 
		<!--路由出口-->
     <transition name="router-fade" mode="out-in">
			 <keep-alive>
      <router-view></router-view>
			</keep-alive>
    </transition> 
  </div>
</template>

<script type=""> 
 	export default {
    	
  	}
</script>

<style lang="stylus" rel="stylesheet/stylus"> 
//导入公共样式,初始化/图标等
   @import    './style/cms_wechart';
  //@import    './style/a';

	// 路由切换过渡
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	} 

</style>
