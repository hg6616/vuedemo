<template>
	<div class="container" style="margin-bottom: 4rem;">
		<div class="headBanner">
			<p class="p1"><span class="sp1">{{info.title}}</span>
				<span class="markStatus" :style="{backgroundColor:info.statusColor}">{{info.statusText}}</span><span class="triangle1" :style="{borderBottomColor:info.statusColor}"></span>
			</p>
			<p class="p2">{{info.createDate}}</p>
		</div>
		<div class="card middle-div  margin-bottom">
			<div class="head">
				服务门店及时间
			</div>
			<div class="body">
			 <div class="weui-wepay-flow">
			    <div class="weui-wepay-flow__bd">
			        <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done':info.followStatus>=1}">
			            <div class="weui-wepay-flow__state">
			                1
			            </div>
			            <p class="weui-wepay-flow__title-bottom">已受理</p>
			        </div>
			        <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done':info.followStatus>1,'weui-wepay-flow__line_ing':info.followStatus==1}">
			            <div class="weui-wepay-flow__process"></div>
			            <!---->
			        </div>
			        <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done':info.followStatus>=2}">
			            <div class="weui-wepay-flow__state">
			                2
			            </div>
			            <p class="weui-wepay-flow__title-bottom">已联系</p>
			        </div>
			        <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done':info.followStatus>2,'weui-wepay-flow__line_ing':info.followStatus==2}">
			            <div class="weui-wepay-flow__process"></div>
			           <!--  <div class="weui-wepay-flow__info-top" v-if="info.followStatus=='1'">
			                进行中
			            </div> -->
			        </div>
			        <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done':info.followStatus>=3}">
			            <div class="weui-wepay-flow__state">
			                3
			            </div>
			            <p class="weui-wepay-flow__title-bottom">已到店</p>
			        </div>
			        <div class="weui-wepay-flow__line" :class="{'weui-wepay-flow__line_done':info.followStatus>3,'weui-wepay-flow__line_ing':info.followStatus==3}">
			            <div class="weui-wepay-flow__process"></div>
			            <!---->
			        </div>
			         
			        <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done':info.followStatus>=4}">
			            <div class="weui-wepay-flow__state">
			                4
			            </div>
			            <p class="weui-wepay-flow__title-bottom">{{info.followStatus=="5"?'战败':'已成交'}}</p>
			        </div>
			    </div>
			</div>

				<ul>
					<li class="info">
						<div class="cls"><span class="label">门店</span><span class="msg">{{dlr.shortName}}</span></div>
						<div class="cls"><span class="label">地址</span><span class="msg">{{dlr.address}}</span></div>
						<div class="cls" v-if="info.title=='试驾消息'">
							<div class="cls"><span class="label">预约时间</span><span class="msg">{{detail.repairTime}}</span></div>
							<div class="cls"><span class="label">试驾车型</span><span class="msg">{{detail.carTypeId}}</span></div>
						</div>
						<div class="cls" v-if="info.title=='养修预约'">
							<div class="cls"><span class="label">养修类型</span><span class="msg">{{detail.repairType=='1'?'保养':'维修'}}</span></div>
							<div class="cls"><span class="label">养修车型</span><span class="msg">{{detail.carBrandEn}} {{detail.carSeriesCn}} {{detail.carConfigCn }}</span></div>
							<div class="cls"><span class="label">预约时间</span><span class="msg">{{detail.repairTime}}</span></div>
							<div class="cls"><span class="label">养修里程</span><span class="msg">{{detail.courseNo}}</span></div>
						</div>
						<div class="cls" v-if="info.title=='购车询价消息'">
							<!--接口字段不够 -->
							<div class="cls"><span class="label">意向车型</span><span class="msg">{{detail.carTypeId}}</span></div>
							<div class="cls"><span class="label">最低报价</span><span class="msg">{{detail.carTypeId}}</span></div>
						</div>
						<div class="cls" v-if="info.title=='保险询价'">
							<!--接口字段不够 -->
							<div class="cls" v-if=false><span class="label">裸车价</span><span class="msg">{{detail.aiPrice}}</span></div>
							<div class="cls" v-if=false><span class="label">询价车型</span><span class="msg">{{detail.aiPrice}}</span></div>
							<div class="cls"><span class="label">保险报价</span><span class="msg">{{detail.aiPrice}}</span></div>
						</div>
						<div class="cls" v-if="info.title=='推荐购车消息'">
							<div class="cls"><span class="label">意向车型</span><span class="msg">{{detail.carTypeId}}</span></div>
						</div>
						<div class="cls" v-if="info.title=='推荐养修'">
							<div class="cls"><span class="label">养修车型</span><span class="msg">{{detail.carBrandEn}} {{detail.carSeriesCn}} {{detail.carConfigCn }}</span></div>
						</div>
						<div class="cls" v-if="info.title=='推荐买保'">
							<div class="cls"><span class="label">保险到期</span><span class="msg">{{detail.createDate}}</span></div>
						</div>
					</li>
					<li class="info">
						<div class="cls">
							<span class="label"><!--{{detail.recommendName}}--></span><span class="msg">{{dlr.serviceTel}}</span>
							<span class="spright"><i class="iconfont icon-iconfont-dianhua "></i></span>
						</div>

					</li>
				</ul>
			</div>
		</div>
		<div>
			<div class="bottomMsg" v-if="bottomText!=''">{{bottomText}}</div>
		</div>

		<div id="b2" v-if="false">
			<div class="card middle-div  margin-bottom">
				<div class="head">
					评价
				</div>
				<div class="body">
					<ul>
						<li class="info">
							<div class="cls"><span class="label">评价</span>
								<span class="stars">
                                        <i class="iconfont icon-guanzhu1 "></i>
                                        <i class="iconfont icon-guanzhu1 "></i>
                                        <i class="iconfont icon-guanzhu1 "></i>
                                        <i class="iconfont icon-guanzhu1 "></i>
                                        <i class="iconfont icon-guanzhu1 "></i>
                                    </span>
								<span class="spright score">80分</span>
							</div>
						</li>
						<li class="info">
							<div class="cls">
								<span class="label vtop">评论</span><span class="msg">感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好感觉很好</span>

							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div id="b4" v-if="false">
			<div class="card middle-div  margin-bottom">
				<div class="head">
					评价
				</div>
				<div class="body">
					<ul>
						<li class="info">
							<div class="cls"><span class="label">评价</span>
								<span class="stars">
                                                                                <i class="iconfont icon-guanzhu "></i>
                                                                                <i class="iconfont icon-guanzhu "></i>
                                                                                <i class="iconfont icon-guanzhu "></i>
                                                                                <i class="iconfont icon-guanzhu "></i>
                                                                                <i class="iconfont icon-guanzhu "></i>
                                                                            </span>
								<span class="spright score">0分</span>
							</div>
						</li>
						<li class="info">
							<div class="cls">
								<span class="label vtop">评论</span>
								<span class="msg">
                                                                                        <textarea placeholder="再说几句吧"></textarea>
                                                                                    </span>

							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="longButton  bottom-button" v-if="buttonText!=''" @click="operate">{{buttonText}}</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { MessageBox } from 'mint-ui';
	import * as types from '../store/mutation-types'
	import util from '../utils/util.js';
	import api from '../api/api.js';

	export default {
		data() {
			return {
				info: {},
				detail: {},
				bottomText: '',
				buttonText: '',
				dlr: {},
				currenStatus:false
			};
		},
		activated() {
			let x = this.$route.query.info;
			let y = JSON.parse(x);
			this.info = y;
			this.loadData();
			this.setText();
		},
		methods: {
			...mapActions(['CANCEL_VEHICLE_APPOINTMENT', 'CANCEL_SERVICE_APPOINTMENT']),
			operate() {
				debugger
				let dlrCode = this.$store.state.dlrCode;
				let clueId = this.info.id;
				let type = this.info.type;
				let clueType = this.info.clueType;
				let followStatus = this.info.followStatus;
				if(type == 1) {
					if(clueType == '1') { //询底价
						//不处理
					} else if(clueType == '2') { //试驾 
						if(this.buttonText == '预约取消') {
							MessageBox.confirm('确定取消预约?').then(action => {
								this.CANCEL_VEHICLE_APPOINTMENT({
										data: {
											dlrCode,
											clueId
										}
									})
									.then(res => {
										console.log(res);
									})
									.catch(() => {
										this.$toast('取消失败')
									});
							});

						} else if(this.buttonText == '重新预约') {
							let params = {
								"dlrCode": dlrCode,
								"carownerName": this.info.name,
								"mobile": this.info.mobile,
								"clueType":this.info.clueType,
								"repairTime": this.getCurrentTime(0),
								"carTypeId": this.detail.carTypeId,
								"carBrandId": this.detail.carBrandId,
								"remark": this.detail.remark,
								"validCode": "201609"
							}
							this.ADD_VEHICLE_CLUE({
									data: {
										params
									}
								})
								.then(res => {
									// console.log(res);
									this.$toast('预约成功')
								})
								.catch(() => {
									this.$toast('预约失败')
								});
						}
					} else if(clueType == '3') { //推荐购车线索 
                        //不处理
					}
				} else if(type == 2) {
					if(clueType == '1') { //养修预约
						if(this.buttonText == '预约取消') {
							MessageBox.confirm('确定取消预约?').then(action => {
								this.CANCEL_SERVICE_APPOINTMENT({
										data: {
											dlrCode,
											clueId
										}
									})
									.then(res => {
										this.$toast('取消成功')
									})
									.catch(() => {
										this.$toast('取消失败')
									});
							});

						} else if(this.buttonText == '重新预约') {
							let params = {
								"dlrCode": dlrCode,
							    "repairType": this.detail.repairType,
							    "repairTime": this.getCurrentTime(0),
							    "courseNo": this.detail.courseNo,
							    "buType": this.detail.buType,
							    "recommendName": this.detail.recommendName,
							    "recommendTel": this.detail.recommendTel,
							    "carTypeConfigId": this.detail.carTypeConfigId,
							    "longitude": this.dlr.longitude,
							    "latiude": this.dlr.latiude,
							    "remark": this.detail.remark,
							}
							this.ADD_SERVICE_CLUE({
									data: {
										params
									}
								})
								.then(res => {
									// console.log(res);
									this.$toast('预约成功')
								})
								.catch(() => {
									this.$toast('预约失败')
								});
						}
					} else if(clueType == '2') { //推荐养修 

					}
				} else if(type == 3) {
					if(clueType == '1') { //保险询价       

					} else if(clueType == '2') { //推荐买保

					}
				}

			},
			loadData() {
				let dlrCode = this.$store.state.dlrCode;
				let clueId = this.info.id;
				let type = this.info.type;
				let detailType = '';
				if(type == 1) {
					detailType = types.GET_VE_RECORD_DETAIL; //整车线索记录详情
				} else if(type == 2) {
					detailType = types.GET_SE_RECORD_DETAIL; //服务线索记录详情
				} else if(type == 3) {
					detailType = types.GET_AI_RECORD_DETAIL; //保险线索记录详情
				}
				api.getData([{
						type: types.GET_DLR,
						param: {
							dlrCode
						}
					}])
					.then(res => {

						this.dlr = res;

					})
					.catch(() => {
						this.$toast('获取信息失败')
					});
				api.getData([{
						type: detailType,
						param: {
							dlrCode,
							clueId
						}
					}])
					.then(res => {
						this.detail = res;
					})
					.catch(() => {
						this.$toast('获取信息失败')
					});
			},
			setText() {
				let type = this.info.type;
				let clueType = this.info.clueType;
				let followStatus = this.info.followStatus;
			    
				if(type == 1) {
					if(clueType == '1') { //询底价
						this.bottomText = '询价处理中，请耐心等待...';
						this.buttonText = '';
					} else if(clueType == '2') { //试驾 
						let cfg = {
							'1': { //已受理
								bottomText: '预约处理中，请耐心等待...',
								buttonText: '预约取消',
							},
							'2': { //待试驾
								bottomText: '预约成功，请准时到店试驾',
								buttonText: '预约取消',
							},
							'3': { //已试驾
								bottomText: '',
								buttonText: '',
							},
							'4': { //已试驾
								bottomText: '',
								buttonText: '',
							},
							'5': { //已取消
								bottomText: '预约已取消，请重新预约',
								buttonText: '重新预约',
							}
						}
						this.bottomText = cfg[followStatus].bottomText;
						this.buttonText = cfg[followStatus].buttonText;
					} else if(clueType == '3') { //推荐购车线索 
						if(followStatus == '1' || followStatus == '2') {
							this.bottomText = '推荐处理中，请耐心等待...';
						} else if(followStatus == '3' || followStatus == '4') {
							this.bottomText = '推荐成功，礼券已存放入优惠卡包';
						} else if(followStatus == '5') {
							this.bottomText = '推荐失败，请再接再厉'
						}
						this.buttonText = '';
					}
				} else if(type == 2) {
					if(clueType == '1') { //养修预约
						let cfg = {
							'1': { //已受理
								bottomText: '预约处理中，请耐心等待...',
								buttonText: '预约取消',
							},
							'2': { //待养修
								bottomText: '预约成功，请准时到店',
								buttonText: '预约取消',
							},
							'3': { //已养修
								bottomText: '感谢您的支持，我们将为您提供更优质的服务',
								buttonText: '',
							},
							'4': { //已养修
								bottomText: '感谢您的支持，我们将为您提供更优质的服务',
								buttonText: '',
							},
							'5': { //已取消
								bottomText: '预约已取消，请重新预约',
								buttonText: '重新预约',
							}
						}
						this.bottomText = cfg[followStatus].bottomText;
						this.buttonText = cfg[followStatus].buttonText;
					} else if(clueType == '2') { //推荐养修 
						if(followStatus == '1' || followStatus == '2') {
							this.bottomText = '推荐处理中，请耐心等待...';
						} else if(followStatus == '3' || followStatus == '4') {
							this.bottomText = '推荐成功，礼券已存放入优惠卡包';
						} else if(followStatus == '5') {
							this.bottomText = '推荐失败，请再接再厉'
						}
						this.buttonText = '';
					}
				} else if(type == 3) {
					if(clueType == '1') { //保险询价       
						if(followStatus == '1' || followStatus == '2') {
							this.bottomText = '询价处理中，请耐心等待...';
							this.buttonText = '';
						} else if(followStatus == '3' || followStatus == '4' || followStatus == '5') {
							this.bottomText = '询价已完成，诚邀您到店详谈';
							this.buttonText = '';
						}
					} else if(clueType == '2') { //推荐买保
						if(followStatus == '1' || followStatus == '2') {
							this.bottomText = '推荐处理中，请耐心等待...';
						} else if(followStatus == '3' || followStatus == '4') {
							this.bottomText = '推荐成功，礼券已存放入优惠卡包';
						} else if(followStatus == '5') {
							this.bottomText = '推荐失败，请再接再厉'
						}
						this.buttonText = '';
					}
				}

			},
			xxx() {
				var index = 0;
				var status = ['mkWait', 'mkIng', 'mkDone', 'mkCancel', 'mkDone', 'mkFail'];
				var btnMsg = ['预约取消', '预约取消', '提交', '重新预约', '提交', '重新预约'];

				for(var i = 1; i < 6; i++) {
					$('#b' + i.toString()).hide();
				}
				$('.headBanner').click(function() {
					index++;
					if(index >= 5) {
						index = 0;
					}
					for(var i = 0; i < 6; i++) {
						$('#b' + i.toString()).hide();
					}
					$('.markLabel').attr('class', 'markLabel ' + status[index]);
					$('#b' + index.toString()).show();
					$('#bottom-button').html(btnMsg[index]);
				});
				$('.stars .iconfont').mouseover(function() {

					$(this).prevAll().attr('class', 'iconfont icon-guanzhu1');
					$(this).attr('class', 'iconfont icon-guanzhu1');
					$(this).nextAll().attr('class', 'iconfont icon-guanzhu');
					$(this).parent().siblings('.score').text(($(this).index() + 1) * 20 + '分');
				});
				// $('.stars .iconfont').bind('mouseover',function(){
				//     debugger;
				//     console.log($(this).index())
				// })
			},
			getCurrentTime(AddDayCount){
				var dd = new Date();
		        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
		        var y = dd.getFullYear();
		        var m = dd.getMonth()+1;//获取当前月份的日期
		        var d = dd.getDate();
		        if (m < 10) m = "0" + m;
		        if (d < 10) d = "0" + d;
		        return y+"-"+m+"-"+d;
			}

		},
		computed: {
			judgeType() {
				let x = this.$route.query.info;
				let y = JSON.parse(x);
				this.info = y;
				let type = this.info.type;
				let clueType = this.info.clueType;
				let followStatus = this.info.followStatus;
				if(type == 1) {
					if(clueType == 1) {
						switch(followStatus) {

							case 1:
							    return 1;//购车询价已受理
								break;
							case 2:
							 	return 2;//购车询价已联系
								break;
							case 3:
								return 3;//购车询价已到店
								break;
							case 4:
								return 4;//购车询价已成交
								break;
							case 5:
								return 5;//购车询价已取消
								break;
						}
					} else if(clueType == 2) {
                        switch(followStatus) {
							case 1:
							    return 6;//试驾预约已受理
								break;
							case 2:
							 	return 7;//试驾预约已联系
								break;
							case 3:
							    return 8;//购车询价已到店
								break;
							case 4:
								return 9;//试驾预约已成交
								break;
							case 5:
								return 10;//试驾预约已取消
								break;
						}
					} else if(clueType == 3) {
                         switch(followStatus) {
                         	case 1:
							    return 11;//推荐购车已受理
								break;
							case 2:
							 	return 12;//推荐购车已联系
								break;
							case 3:
							    return 13;//推荐购车已到店
								break;
							case 4:
								return 14;//推荐购车已成交
								break;
							case 5:
								return 15;//推荐购车已取消
								break;
						}
					}
				} else if(type == 2) {
                    if(clueType == 1) {
						switch(followStatus) {
							case 1:
							    return 16;//养修预约已受理
								break;
							case 2:
							 	return 17;//养修预约已联系
								break;
							case 3:
							    return 18;//养修预约已到店
								break;
							case 4:
								return 19;//养修预约已成交
								break;
							case 5:
								return 20;//养修预约已取消
								break;	
						}
					} else if(clueType == 2) {
                        switch(followStatus) {
                        	case 1:
							    return 21;//推荐养修已受理
								break;
							case 2:
							 	return 22;//推荐养修已联系
								break;
							case 3:
							    return 23;//推荐养修已到店
								break;
							case 4:
								return 24;//推荐养修已成交
								break;
							case 5:
								return 25;//推荐养修已取消
								break;	
						}
					}
				} else if(type == 3) {
                    if(clueType == 1) {
						switch(followStatus) {
							case 1:
							    return 26;//保险询价已受理
								break;
							case 2:
							 	return 27;//保险询价已联系
								break;
							case 3:
							    return 28;//保险询价已到店
								break;
							case 4:
								return 29;//保险询价已成交
								break;
							case 5:
								return 30;//保险询价已取消
								break;	
						}
					} else if(clueType == 2) {
                        switch(followStatus) {
                        	case 1:
							    return 31;//推荐买保已受理
								break;
							case 2:
							 	return 32;//推荐买保已联系
								break;
							case 3:
							    return 33;//推荐买保已到店
								break;
							case 4:
								return 34;//推荐买保已成交
								break;
							case 5:
								return 35;//推荐买保已取消
								break;	
						}
					}
				}

			}

		}
	}
</script>

<style lang="stylus" scoped>
	@import '../style/var';
	.card {
		margin-top: (24/$pr);
		.head {
			background-color: $themeColor;
		}
		.body {
			ul {
				li {
					padding: (24/$pr);
					font-size: (20/$pr);
					span.label {
						width: (140/$pr);
						color: #9b9b9b;
						display: inline-block;
					}
					span.vtop {
						vertical-align: top;
					}
					span.msg {
						width: (140/$pr);
						color: #1e1e1e;
					}
					span.spright {
						float: right;
					}
					div.cls+div.cls {
						margin-top: (24/$pr);
					}
					.stars {
						.iconfont {
							color: #f5b214;
						}
						.iconfont+.iconfont {
							margin-left: (24/$pr);
						}
					}
				}
			}
		}
	}
	
	.headBanner {
		background-color: #fff;
		padding: (24/$pr);
		.p1 {
			.sp1 {
				font-size: (30/$pr);
				margin-right: (10/$pr);
				color: #949494;
			}
			margin-bottom: (10/$pr);
		}
		.p2 {
			color: #adadad;
			font-size: (20/$pr);
		}
	}
	
	.markStatus {
		color: #fff;
		font-size: (16/$pr);
		background-color: $themeColor;
		padding: 0.2rem 0.5rem;
		margin-left: 0.5rem;
	}
.weui-wepay-flow,
.weui-wepay-flow-auto {
  padding: 40px 25px;
}
.weui-wepay-flow__bd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
          justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}
.weui-wepay-flow__li {
  width: 14px;
  height: 14px;
  position: relative;
  z-index: 1;
}
.weui-wepay-flow__li .weui-wepay-flow__state {
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #FFF;
  border-radius: 7px;
  box-sizing: border-box;
}
.weui-wepay-flow__state {
  background-color: #E2E2E2;
}
.weui-wepay-flow__li_done .weui-wepay-flow__state {
  background-color: $themeColor;
}
[class^="weui-wepay-flow__title-"],
[class*=" weui-wepay-flow__title-"] {
  position: absolute;
  color: #999999;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  text-align: center;
}
.weui-wepay-flow__title-top {
  bottom: 20px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
}
.weui-wepay-flow__li_done .weui-wepay-flow__title-top {
  color: #333;
}
.weui-wepay-flow__title-bottom {
  top: 20px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
}
.weui-wepay-flow__li_done .weui-wepay-flow__title-bottom {
  color: #333;
}
.weui-wepay-flow__title-left {
  right: 30px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  text-align: right;
}
.weui-wepay-flow__li_done .weui-wepay-flow__title-left {
  color: #333;
}
.weui-wepay-flow__title-right {
  left: 30px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  text-align: left;
}
.weui-wepay-flow__li_done .weui-wepay-flow__title-right {
  color: #333;
}
[class^="weui-wepay-flow__intro-"],
[class*=" weui-wepay-flow__intro-"] {
  height: 20px;
  line-height: 20px;
  background-color: #ff8a00;
  font-size: 10px;
  color: #FFF;
  white-space: nowrap;
  padding: 0 6px;
  position: relative;
  border-radius: 4px;
}
[class^="weui-wepay-flow__intro-"]:after,
[class*=" weui-wepay-flow__intro-"]:after {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  position: absolute;
}
.weui-wepay-flow__intro-top {
  bottom: 25px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  position: absolute;
}
.weui-wepay-flow__intro-top:after {
  border-color: #ff8a00 transparent transparent transparent;
  border-style: solid;
  border-width: 5px 3px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  bottom: -10px;
}
.weui-wepay-flow__intro-bottom {
  top: 25px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  position: absolute;
}
.weui-wepay-flow__intro-bottom:after {
  border-color: transparent transparent #ff8a00 transparent;
  border-style: dashed dashed solid dashed;
  border-width: 5px 3px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  top: -10px;
}
.weui-wepay-flow__intro-right {
  left: 36px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  position: absolute;
}
.weui-wepay-flow__intro-right:after {
  border-color: transparent #ff8a00 transparent transparent;
  border-style: solid;
  border-width: 3px 5px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  left: -10px;
}
.weui-wepay-flow__intro-left {
  right: 36px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  position: absolute;
}
.weui-wepay-flow__intro-left:after {
  border-color: transparent transparent transparent #ff8a00;
  border-style: solid;
  border-width: 3px 5px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  right: -10px;
}
[class^="weui-wepay-flow__info-"] {
  height: 14px;
  line-height: 14px;
  background-color: $themeColor;
  font-size: 10px;
  color: #FFF;
  white-space: nowrap;
  padding: 0 6px;
  position: relative;
  border-radius: 2px;
  position: absolute;
}
[class^="weui-wepay-flow__info-"]:after {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  position: absolute;
}
.weui-wepay-flow__line_ing [class^="weui-wepay-flow__info-"] {
  display: block;
}
.weui-wepay-flow__info-top {
  display: none;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  bottom: 11px;
}
.weui-wepay-flow__line_ing .weui-wepay-flow__info-top {
  display: block;
}
.weui-wepay-flow__info-top:after {
  border-color: $themeColor transparent transparent transparent;
  border-style: solid;
  border-width: 5px 3px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  bottom: -10px;
}
.weui-wepay-flow__info-bottom {
  display: none;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  top: 11px;
}
.weui-wepay-flow__line_ing .weui-wepay-flow__info-bottom {
  display: block;
}
.weui-wepay-flow__info-bottom:after {
  border-color: transparent transparent $themeColor transparent;
  border-style: dashed dashed solid dashed;
  border-width: 5px 3px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0);
  top: -10px;
}
.weui-wepay-flow__info-left {
  display: none;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  right: 12px;
}
.weui-wepay-flow__line_ing .weui-wepay-flow__info-left {
  display: block;
}
.weui-wepay-flow__info-left:after {
  border-color: transparent transparent transparent $themeColor;
  border-style: solid;
  border-width: 3px 5px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  right: -10px;
}
.weui-wepay-flow__info-right {
  display: none;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  left: 12px;
}
.weui-wepay-flow__line_ing .weui-wepay-flow__info-right {
  display: block;
}
.weui-wepay-flow__info-right:after {
  border-color: transparent $themeColor transparent transparent;
  border-style: solid;
  border-width: 3px 5px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
  left: -10px;
}
.weui-wepay-flow__line {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
  background-color: #E2E2E2;
  height: 3px;
  position: relative;
}
.weui-wepay-flow__title {
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}
.weui-wepay-flow__info {
  color: #999999;
  font-size: 12px;
}
.weui-wepay-flow__process {
  display: none;
  background-color:$themeColor;
  height: 3px;
  position: relative;
}
.weui-wepay-flow__line_ing .weui-wepay-flow__process {
  display: block;
  width: 50%;
}
.weui-wepay-flow__line_done .weui-wepay-flow__process {
  display: block;
}
.weui-wepay-flow_custom .weui-wepay-flow__bd {
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
          justify-content: flex-start;
}
.weui-wepay-flow_custom .weui-wepay-flow__line {
  -webkit-box-flex: 0;
  -webkit-flex: none;
          flex: none;
  width: 100px;
}
.weui-wepay-flow_vertical .weui-wepay-flow__bd {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
          flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.weui-wepay-flow_vertical .weui-wepay-flow__line {
  height: auto;
  width: 3px;
}
.weui-wepay-flow_vertical .weui-wepay-flow__line_ing .weui-wepay-flow__process {
  height: 50%;
}
.weui-wepay-flow_vertical .weui-wepay-flow__process {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
}
.weui-wepay-flow_vertical .weui-wepay-flow__line_done .weui-wepay-flow__process {
  height: 100%;
}
.weui-wepay-flow_vertical-custom .weui-wepay-flow__bd {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
          flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.weui-wepay-flow_vertical-custom .weui-wepay-flow__line {
  width: 3px;
  -webkit-box-flex: 0;
  -webkit-flex: none;
          flex: none;
}
.weui-wepay-flow_vertical-custom .weui-wepay-flow__line_ing .weui-wepay-flow__process {
  height: 50%;
}
.weui-wepay-flow_vertical-custom .weui-wepay-flow__process {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
}
.weui-wepay-flow_vertical-custom .weui-wepay-flow__line_done .weui-wepay-flow__process {
  height: 100%;
}
.weui-wepay-flow-auto {
  position: relative;
}
.weui-wepay-flow-auto__bd {
  position: relative;
}
.weui-wepay-flow-auto__state {
  position: absolute;
  left: 0;
  top: 4px;
  width: 14px;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #FFF;
  border-radius: 7px;
  background-color: #E2E2E2;
  z-index: 2;
}
.weui-wepay-flow-auto__state_on {
  background-color: $themeColor;
}
.weui-wepay-flow-auto__line {
  position: absolute;
  width: 2px;
  background-color: #dddddd;
  top: 10px;
  bottom: -4px;
  left: 6px;
  z-index: 1;
}
.weui-wepay-flow-auto__line_on {
  background-color: $themeColor;
}
.weui-wepay-flow-auto__li {
  position: relative;
  padding-bottom: 20px;
  padding-left: 30px;
}
.weui-wepay-flow-auto__title {
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}
.weui-wepay-flow-auto__info {
  color: #999999;
  font-size: 12px;
}

</style>