<template>
	<div id="app">
		 <mheader></mheader>
		<!--路由出口-->
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script type=""> 
import axios from 'axios';
//import css from 'style/aa.css'
import mheader from './components/header'
export default {


	created() {

	},
	components:{
		mheader
	},
	methods:{
      logx(obj){
		  console.log(obj)
	  }
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus"> 
//导入公共样式,初始化/图标等
   @import    './style/cms_wechart';
  //@import    './style/a';
.arrow{ 
    background-image: url("assets/arrow.svg");
    background-size: 10px 20px;
    background-repeat: no-repeat;
    background-position: 95% center;
   background-position: -webkit-calc(100% -1rem) center;
    background-position: calc(100% - 2rem) center; 
   }
	// 路由切换过渡
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	} 


</style>
