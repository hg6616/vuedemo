/**
 * Mocking client-server processing
 */
//import fetchData from '../utils/fetch'
import axios from 'axios';
import { Indicator } from 'mint-ui';
import * as types from '../store/mutation-types';

const _products = [
  { "id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2 },
  { "id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10 },
  { "id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5 }
]

var commonApi = (url, param, cb) => {
  getData(param, { url })
    .then(data => {
 
      if (data) {
        cb(data);
      }
    });
}
var getParam = (param) => {
  //  var postData = 'params= {"dlrCode": "H2901"}';
  var res = 'params=' + JSON.stringify(param.data);
  if (readLocalMockData) {
    res += '&local=' + JSON.stringify({ obj: param.type })
  }
  return res;
}
function log(t) {
  console.log(t);
}

const debug = process.env.NODE_ENV !== 'production';
const readLocalMockData = true;
//请求数据的公共方法
function getData(param, cfg) {
  console.log('请求参数:')
  console.log(param);
  //默认配置
  var defaultCfg = {
    method: 'post',
    data: getParam(param)
  }
  //覆盖默认配置
  for (let x in cfg) {
    defaultCfg[x] = cfg[x];
  }
  //调试模式下是调用webpack的后台
  if (debug) {
    defaultCfg.url = '/mock'
    defaultCfg.data += '&url=' + cfg.url;
  }
  //  log(defaultCfg);
  Indicator.open();
  return axios(defaultCfg)
    .then(res => {
      //debugger
      Indicator.close();
      switch (res.status) {
        case 200:
          // throw new Error(300,"error111")
          console.log('请求结果:')
          console.log(res.data.result);
          return res.data.result;
          break;
      }

    })
    .catch((err) => {
      Indicator.close();
      log(err);
      //  console.log(err.number);
      //  console.log(err.description);
      //
    });
}
function getFName(fn) {
  return (/^[\s\(]*function(?:\s+([\w$_][\w\d$_]*))?\(/).exec(fn.toString())[1] || '';
}
export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  },
  getZhihuData(param, cb) {

    var url = '/api/goods';
    url = '/api/zhihu';
    // url = '/news/latest';
    Indicator.open();
    axios({
      method: 'get',
      url: url,
    })
      .then(function (response) {
        console.log(response);
        cb(response);
      });
  },
  getNews(param, cb) {
    var url = '/api/news2/' + param.param;
    // log(param);
    axios({
      method: 'get',
      url
    }).then(res => {
      cb(res);
    })
  },

  [types.SEND_AUTH_CODE](param, cb) { commonApi('/serv/base/phone/v1/validcode', param, cb); },
  [types.GET_CAR_BRAND](param, cb) { commonApi('/serv/base/car/brand/v1/list', param, cb); },
  [types.GET_CAR_SERIES](param, cb) { commonApi('/serv/base/car/series/v1/list', param, cb); },
  [types.GET_CAR_SERIES_PIC](param, cb) { commonApi('/serv/base/car/series/v1/images', param, cb); },
  [types.GET_CAR_TYPE_CONFIG](param, cb) { commonApi('/serv/base/car/typeconfig/v1/list', param, cb); },
  [types.GET_USER_INFO](param, cb) { commonApi('/serv/base/fan/v1/curr/info', param, cb); },
  [types.GET_MSG_COUNT](param, cb) { commonApi('/serv/wechat/message/v1/count', param, cb); },
  [types.GET_MSG](param, cb) { commonApi('/serv/wechat/message/v1/records', param, cb); },
  [types.UPDATE_MSG_READ_STATUS](param, cb) { commonApi('/serv/wechat/message/v1/read', param, cb); },
  [types.ADD_VEHICLE_CLUE](param, cb) { commonApi('/serv/ve/clue/v1/leave', param, cb); },
  [types.GET_VEHICLE_CLUE](param, cb) { commonApi('/serv/ve/clue/v1/records', param, cb); },
  [types.BIND_CAR_OWNER](param, cb) { commonApi('/serv/se/carowner/v1/authen', param, cb); },
  [types.ADD_SERVICE_CLUE](param, cb) { commonApi('/serv/se/clue/v1/leave', param, cb); },
  [types.GET_SERVICE_CLUE](param, cb) { commonApi('/serv/se/clue/v1/records', param, cb); },
  [types.GET_INSURANCE_TYPE](param, cb) { commonApi('/serv/ai/clue/v1/insurances', param, cb); },
  [types.ADD_INSURANCE_CLUE](param, cb) { commonApi('/serv/ai/clue/v1/leave', param, cb); },
  [types.GET_RENEWAL_INSURANCE_QUERY_PRICE](param, cb) { commonApi('/serv/ai/clue/v1/records', param, cb); },
  [types.GET_COUPON](param, cb) { commonApi('/serv/coupon/card/v1/list', param, cb); },
  [types.TAKE_COUPON](param, cb) { commonApi('/serv/coupon/card/v1/receive', param, cb); },
  [types.GET_COUPON_TAKING_RECORD](param, cb) { commonApi('/serv/coupon/card/v1/records', param, cb); },
  [types.GET_DLR](param, cb) { commonApi('/serv/base/org/v1/curr', param, cb); },
  [types.CANCEL_VEHICLE_APPOINTMENT](param, cb) { commonApi('/serv/ve/clue/v1/cancel', param, cb); },
  [types.CANCEL_SERVICE_APPOINTMENT](param, cb) { commonApi('/serv/se/clue/v1/cancel', param, cb); },
  [types.GET_EVENT](param, cb) { commonApi('/serv/sale/activity/v1/list', param, cb); },

}