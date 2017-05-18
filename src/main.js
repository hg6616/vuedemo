// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
//import VueResource from 'vue-resource';
import routes from './router/index';
import store from './store';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import rules from './utils/vueValidateRule'
import App from './App';




Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Mint);

//验证插件的配置
{
  Vue.use(VeeValidate, rules.validateConfig);
  for (let x in rules.rules) {
    //   debugger;
    var d = rules.rules[x]
    // console.log(rules.rules[x]);;
    //  Object.assign(d, rules.rules[x]);
    //  console.log(d)
    if (d.fn != undefined) {
      Validator.extend(d.name, d.fn);
    }
  }
}

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  // mode:'histroy'
  // mode: 'history',
});
router.beforeEach((to, from, next) => {
  // ...
  // console.log(to);
  // if (vm) {
  //   debugger;
  //   console.log('vmou')
  //   console.log(vm)
  //   vm.$store.commit('CHANGE_TITLE', '56789')
  // }
  if (app) {
    var title = to.meta.title;
    if (title) {
      app.$store.commit('CHANGE_TITLE', title)
    }

  }
  next();

})
// router.afterEach(route => {
//   //debugger
//     //  console.log(this)
// })
const app = new Vue({
  router
  , store
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
