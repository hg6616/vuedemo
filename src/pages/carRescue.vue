<template>
	<div class="rescue">
		<div class="map" id="allmap" v-bind:style="mapStyle">
			<!--<img src="../../sta/img/car_event.jpg">-->
		</div>
		<div class="map-explain">
			<div class="map-explain-box">
				<a class="btn" @click="ajaxMap">重新定位</a>
				<p class="explain">请保持GPS和网络开启，如定位有偏差，可与救援人员联系确认位置</p>
			</div>
		</div>
		<div class="card middle-div  margin-bottom">
			<div class="head"> 请求救援专营店（最近专营店）</div>
			<div class="body">
				<ul>
					<li class="arrow">
						<span>广州风日</span><span class="right">其他专营店</span>
					</li>
					<li class="arrow"><span>紧急救援电话：</span><span class="phone">4008 305 721</span></li>
					<li class="arrow"><span>紧急救援手机号：</span><span class="phone">138 2222 3333</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mapStyle: {
					width: '100%',
					height: this.mapHeight + 'px'
				},
				mapHeight: 500
			};
		},
		mounted() {
			this.$nextTick(()=> {
				this.ajaxMap();
			})
		},
		methods: {
			ajaxMap() {
				var map = new BMap.Map("allmap", {
					minZoom: 4,
					maxZoom: 16
				});
				var lng = sessionStorage.getItem("lng");
				var lat = sessionStorage.getItem("lat");
				var point = null;
				if(lng == '') {
					point = new BMap.Point(116.331398, 39.897445);
				} else {
					point = new BMap.Point(lng, lat);
				}
				map.centerAndZoom(point, 16);
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						var mk = new BMap.Marker(r.point);
						map.addOverlay(mk);
						map.panTo(r.point);
						sessionStorage.setItem("lng", r.point.lng);
						sessionStorage.setItem("lat", r.point.lat);
						console.log('您的位置：' + r.point.lng + ',' + r.point.lat);

//						setTimeout(function() {
//							map.setZoom(16);
//						}, 2000); //2秒后放大到14级
						map.enableScrollWheelZoom(true);
					} else {
						alert('failed' + this.getStatus());
					}
				}, {
					enableHighAccuracy: true
				})
			}	
		}

	}
</script>

<style lang="stylus" scoped>
	@import '../style/var';
	.rescue {
		overflow-x: hidden;
	}
	
	img {
		width: 100%;
		height: 16.7rem;
	}
	
	.map {
		width: 100%;
		font-size: 0;
		height: 18.7rem;
	}
	
	.map-explain {
		background-color: #fff;
	}
	
	.map-explain-box {
		width: 92%;
		padding: 15px 4%;
		margin-bottom: 10px;
	}
	
	.btn {
		width: 100%;
		display: inline-block;
		color: #fff;
		background: $themeColor;
		text-align: center;
		margin: 0 auto;
		border-radius: 0.5rem;
		height: 3.4rem;
		line-height: 3.4rem;
		font-size: 1.6rem;
	}
	
	.explain {
		color: $themeColor;
		font-size: $normalSize;
		line-height: 1.5;
	}
	
	.body .right {
		float: right;
		padding-right: 30px;
	}
	
	.phone {
		padding-left: 10px;
		color: orange;
	}
</style>