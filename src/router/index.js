//导入组件 
import index from '../pages/index';
import personalCenter from '../pages/personalCenter';
import myMsg from '../pages/myMsg';
import personalData from '../pages/personalData';
import bindOwner from '../pages/bindOwner';
import myService from '../pages/myService';
import coupon from '../pages/coupon';
import carTypeChoose from '../pages/carTypeChoose';
import onlineShow from '../pages/onlineShow';
import priceQuery from '../pages/priceQuery';
import testDriveAppointment from '../pages/testDriveAppointment';
import recommendBuy from '../pages/recommendBuy';
import recommendInsurance from '../pages/recommendInsurance';
import recommendMaintain from '../pages/recommendMaintain';
import iRecommand from '../pages/iRecommand';
import maintainAppointment from '../pages/maintainAppointment';
import xubaoQuery from '../pages/xubaoQuery';
import carExchange from '../pages/carExchange';
import priceOffEvent from '../pages/priceOffEvent';
import eventAlarm from '../pages/eventAlarm';
import buyEvent from '../pages/buyEvent';
import myTestDrive from '../pages/myTestDrive';
import testDriveDetail from '../pages/testDriveDetail';
import myRecord from '../pages/myRecord';
import flex from '../pages/flex';
import zhihu from '../pages/zhihu';
import zhihuDetail from '../pages/zhihuDetail';



export default [

  { path: '/', meta: { title: '首页' }, component: index },
  { path: '/index', meta: { title: '首页' }, component: index },
  { path: '/flex', meta: { title: 'flex' }, component: flex },
  { path: '/personalCenter',  meta: { title: '个人中心' }, component: personalCenter },
  { path: '/myMsg', meta: { title: '我的消息' },  component: myMsg },
  { path: '/personalData', meta: { title: '个人资料' }, component: personalData },
  { path: '/bindOwner', meta: { title: '绑定车主' }, component: bindOwner },
  { path: '/myService', meta: { title: '我的服务' }, component: myService },
  { path: '/coupon', meta: { title: '优惠券' }, component: coupon },
  { path: '/carTypeChoose', name: '车型选择', meta: { title: '个人中心' }, component: carTypeChoose },
  { path: '/onlineShow', meta: { title: '在线展示' }, component: onlineShow },
  { path: '/priceQuery', meta: { title: '询底价' }, component: priceQuery },
  { path: '/testDriveAppointment', meta: { title: '试驾预约' }, component: testDriveAppointment },
  { path: '/recommendBuy', meta: { title: '推荐购车' }, component: recommendBuy },
  { path: '/recommendInsurance', meta: { title: '推荐保险' }, component: recommendInsurance },
  { path: '/recommendMaintain', meta: { title: '推荐养修' }, component: recommendMaintain },
  { path: '/iRecommand', meta: { title: '我要推荐' }, component: iRecommand },
  { path: '/maintainAppointment', meta: { title: '维修预约' }, component: maintainAppointment },
  { path: '/xubaoQuery', meta: { title: '续保查询' }, component: xubaoQuery },
  { path: '/carExchange', meta: { title: '车辆置换' }, component: carExchange },
  { path: '/priceOffEvent', meta: { title: '降价活动' }, component: priceOffEvent },
  { path: '/eventAlarm', meta: { title: '活动提醒' }, component: eventAlarm },
  { path: '/buyEvent', meta: { title: '购车活动' }, component: buyEvent },
  { path: '/myTestDrive', meta: { title: '我的试驾' }, component: myTestDrive },
  { path: '/testDriveDetail', meta: { title: '试驾详情' }, component: testDriveDetail },
  { path: '/myRecord', meta: { title: '我的记录' }, component: myRecord },
  { path: '/zhihu', meta: { title: '知乎' }, component: zhihu },
  { path: '/zhihuDetail/:id', meta: { title: '知乎详细' }, component: zhihuDetail },

];
