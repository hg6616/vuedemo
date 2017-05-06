//导入组件
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
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



export default [
  {
    path: '/goods', component: goods, children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'seller2',
        component: ratings
      }]
  },
    { path: '/', component: index },
     { path: '/index/:id', component: index },
  { path: '/flex', component: flex },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }, 
  { path: '/personalCenter', component: personalCenter },
  { path: '/myMsg', component: myMsg },
  { path: '/personalData', component: personalData },
  { path: '/bindOwner', component: bindOwner },
  { path: '/myService', component: myService },
  { path: '/coupon', component: coupon },
  { path: '/carTypeChoose', component: carTypeChoose },
  { path: '/onlineShow', component: onlineShow },
  { path: '/priceQuery', component: priceQuery },
  { path: '/testDriveAppointment', component: testDriveAppointment },
  { path: '/recommendBuy', component: recommendBuy },
  { path: '/iRecommand', component: iRecommand },
  { path: '/maintainAppointment', component: maintainAppointment },
  { path: '/xubaoQuery', component: xubaoQuery },
  { path: '/carExchange', component: carExchange },
  { path: '/priceOffEvent', component: priceOffEvent },
  { path: '/eventAlarm', component: eventAlarm },
  { path: '/buyEvent', component: buyEvent },
  { path: '/myTestDrive', component: myTestDrive },
  { path: '/testDriveDetail', component: testDriveDetail },
  { path: '/myRecord', component: myRecord },
  { path: '/zhihu', component: zhihu },

];
