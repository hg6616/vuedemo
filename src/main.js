// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './router/index';
import store from './store';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

import App from './App';



Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Mint);

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
 // mode:'histroy'
// mode: 'history',
});

const app = new Vue({
  router
  ,store
  , template: '<App/>',
  components: { App }
}).$mount('#app');

// router.push('/index');
//  router.push('/myService');
//   router.push('/coupon');
//  router.push('/carTypeChoose');
//  router.push('/onlineShow');
//  router.push('/priceQuery');
//  router.push('/testDriveAppointment');
//  router.push('/recommendBuy');
//  router.push('/iRecommand');
//  router.push('/maintainAppointment');
//  router.push('/xubaoQuery');
//  router.push('/carExchange');
//  router.push('/priceOffEvent');
//  router.push('/eventAlarm');
  //router.push('/buyEvent');
//  router.push('/myTestDrive');
//  router.push('/testDriveDetail');
 //  router.push('/myRecord');
 //  router.push('/bindOwner');


var log = (t) => {
  console.log(t)
}
