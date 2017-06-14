/**
 * Mocking client-server processing
 * 约定此文件只负责请求数据,并把数据原封不动返回给action的callback
 * 在action中的callback中处理返回数据
 */
//import fetchData from '../utils/fetch'
import axios from 'axios';
import * as types from '../store/mutation-types';
const debug = process.env.NODE_ENV !== 'production';
import { Indicator, Toast } from 'mint-ui';
const readLocalMockData = false;//是否读取本地json,true:后台nodejs读取本地json文件,false时后台转发调用真实的服务 开发时该参数才有效
//公共的api处理方法
var commonApi = (url, param, cb) => {
  // if (url instanceof Array) {
  if (param.isConcurrency) {//是并发请求
    let resStr = '';//保存生成的代码
    let requestArray = '';//axios.all的参数
    let resParam = '';//axios.spread的参数
    let strPush = '';//往最终结果塞数据的代码
    //拼出代码
    for (let i in param.data) {
      requestArray += `getData(${JSON.stringify(param.data[i])},${JSON.stringify({ url: apiConfig[param.data[i].type].url })}),`;
      resParam += `a${i},`;
      strPush += `data.push(a${i});`
    }
    //去掉最后的逗号
    if (requestArray.length > 0) {
      requestArray = requestArray.substr(0, requestArray.length - 1)
      resParam = resParam.substr(0, resParam.length - 1)
    }

    resStr = `(axios,getData,cb)=>{ return axios.all([${requestArray}])
      .then(axios.spread(function (${resParam}) {
        var data=[]; 
      ${strPush}
       console.log('axios!!')
       console.log(data)
           if (data) {
             if(cb){
   cb(data)
             }
     else{
       return data;
     }
        }
       
      }))}`

    let func = eval.call(null, resStr);
    return func(axios, getData, cb);;
  }
  else {
    return getData(param, { url })
      .then(res => {
        if (res) {
          if (cb) {
            cb(res.data);
          }
          else {
            return res.data;
          }
        }
      });
  }
}
//参数转换
var getParam = (param) => {
  //  var postData = 'params= {"dlrCode": "H2901"}';
  var res = 'params=' + JSON.stringify(param.data);
  if (readLocalMockData) {
    res += '&local=' + JSON.stringify({ obj: param.type })
  }
  return res;
}
//公共的请求数据方法
function getData(param, cfg) {
  console.log('请求参数:')
  console.log(param);
  var type = param.type
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
  
  return axios(defaultCfg)
    .then(res => {
      switch (res.status) {
        case 200:
          //throw new Error(300, "error111")
          console.log(type + '请求结果:')
          console.log(res);
          return res;
          break;
      }
    })
  // .catch((err) => {
  //   console.log('axios err')
  //   console.log(err);
  //   throw err;
  // });
}
var apiConfig = {
  SEND_AUTH_CODE: { url: '/serv/base/phone/v1/validcode', desc: '发送手机验证码' },
  GET_CAR_BRAND: { url: '/serv/base/car/brand/v1/list', desc: '车辆品牌' },
  GET_CAR_SERIES: { url: '/serv/base/car/series/v1/list', desc: '车系接口' },
  GET_CAR_SERIES_PIC: { url: '/serv/base/car/series/v1/images', desc: '车系图片接口' },
  GET_CAR_TYPE_CONFIG: { url: '/serv/base/car/typeconfig/v1/list', desc: '车型配置接口' },
  GET_USER_INFO: { url: '/serv/base/fan/v1/curr/info', desc: '获取用户信息' },
  GET_MSG_COUNT: { url: '/serv/wechat/message/v1/count', desc: '消息统计' },
  GET_MSG: { url: '/serv/wechat/message/v1/records', desc: '消息记录' },
  UPDATE_MSG_READ_STATUS: { url: '/serv/wechat/message/v1/read', desc: '消息阅读状态更新' },
  ADD_VEHICLE_CLUE: { url: '/serv/ve/clue/v1/leave', desc: '整车线索留资' },
  GET_VEHICLE_CLUE: { url: '/serv/ve/clue/v1/records', desc: '整车留资记录' },
  BIND_CAR_OWNER: { url: '/serv/se/carowner/v1/authen', desc: '车主绑定' },
  ADD_SERVICE_CLUE: { url: '/serv/se/clue/v1/leave', desc: '服务线索留资' },
  GET_SERVICE_CLUE: { url: '/serv/se/clue/v1/records', desc: '服务留资记录' },
  GET_INSURANCE_TYPE: { url: '/serv/ai/clue/v1/insurances', desc: '险种信息接口' },
  ADD_INSURANCE_CLUE: { url: '/serv/ai/clue/v1/leave', desc: '保险线索留资' },
  GET_RENEWAL_INSURANCE_QUERY_PRICE: { url: '/serv/ai/clue/v1/records', desc: '续保询价记录' },
  GET_COUPON: { url: '/serv/coupon/card/v1/list', desc: '可领取优惠券' },
  TAKE_COUPON: { url: '/serv/coupon/card/v1/receive', desc: '优惠券领取接口' },
  GET_COUPON_TAKING_RECORD: { url: '/serv/coupon/card/v1/records', desc: '优惠券领取记录' },
  GET_DLR: { url: '/serv/base/org/v1/curr', desc: '获取专营店信息' },
  CANCEL_VEHICLE_APPOINTMENT: { url: '/serv/ve/clue/v1/cancel', desc: '取消整车预约' },
  CANCEL_SERVICE_APPOINTMENT: { url: '/serv/se/clue/v1/cancel', desc: '取消服务预约' },
  GET_EVENT: { url: '/serv/activity/sale/v1/list', desc: '活动列表接口' },
  GET_EVENT_DETAIL: { url: '/serv/activity/sale/v1/detail', desc: '活动详情' },
  GET_CLUE_RECORD: { url: '/serv/base/clue/v1/list', desc: '活动列表接口' },
  JOIN_EVENT: { url: '/serv/activity/sale/v1/comment', desc: '活动操作记录接口' },
  GET_EVENT_COMMENT: { url: '/serv/activity/sale/v1/comments', desc: '活动评论记录' },
  GET_USER_EVENT: { url: '/serv/activity/sale/v1/records', desc: '用户活动参与记录' },
  GET_VE_RECORD_DETAIL: { url: '/serv/ve/clue/v1/detail', desc: '整车线索记录详情' },
  GET_SE_RECORD_DETAIL: { url: '/serv/se/clue/v1/detail', desc: '服务线索记录详情' },
  GET_AI_RECORD_DETAIL: { url: '/serv/ai/clue/v1/detail', desc: '保险线索记录详情' },

}
export default {
  getData(param) {
    if (param.length == 1) {
      var p = param[0];
      var newParam = {};
      let type = p.type;
      //  newParam.type = p.type;
      newParam.param = {
        data: p.param,
        type: type
      };
      Indicator.open();
      
      return commonApi(apiConfig[type].url, newParam.param)
        .then(res => {
          Indicator.close();
          console.log(res)
          return res.result;
        })
        .catch(err => {
          Indicator.close();
          throw err;
        });
    }
    else if (param.length > 1) {
      var newParam = {
        data: [],
        isConcurrency: true
      };
      for (let i in param) {
        var o = {};
        o.type = param[i].type;
        o.data = param[i].param;
        newParam.data.push(o);
      }
      return commonApi(null, newParam);
    }
  },
  getZhihuData(param, cb) {
    var url = '/api/goods';
    url = '/api/zhihu';
    // url = '/news/latest'; 
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
    axios({
      method: 'get',
      url
    }).then(res => {
      cb(res);
    })
  },
  [types.SEND_AUTH_CODE](param, cb) { return commonApi(apiConfig[types.SEND_AUTH_CODE].url, param, cb); },
  [types.GET_CAR_BRAND](param, cb) { return commonApi(apiConfig[types.GET_CAR_BRAND].url, param, cb); },
  [types.GET_CAR_SERIES](param, cb) { return commonApi(apiConfig[types.GET_CAR_SERIES].url, param, cb); },
  [types.GET_CAR_SERIES_PIC](param, cb) { return commonApi(apiConfig[types.GET_CAR_SERIES_PIC].url, param, cb); },
  [types.GET_CAR_TYPE_CONFIG](param, cb) { return commonApi(apiConfig[types.GET_CAR_TYPE_CONFIG].url, param, cb); },
  [types.GET_USER_INFO](param, cb) { return commonApi(apiConfig[types.GET_USER_INFO].url, param, cb); },
  [types.GET_MSG_COUNT](param, cb) { return commonApi(apiConfig[types.GET_MSG_COUNT].url, param, cb); },
  [types.GET_MSG](param, cb) { return commonApi(apiConfig[types.GET_MSG].url, param, cb); },
  [types.UPDATE_MSG_READ_STATUS](param, cb) { return commonApi(apiConfig[types.UPDATE_MSG_READ_STATUS].url, param, cb); },
  [types.ADD_VEHICLE_CLUE](param, cb) { return commonApi(apiConfig[types.ADD_VEHICLE_CLUE].url, param, cb); },
  [types.GET_VEHICLE_CLUE](param, cb) { return commonApi(apiConfig[types.GET_VEHICLE_CLUE].url, param, cb); },
  [types.BIND_CAR_OWNER](param, cb) { return commonApi(apiConfig[types.BIND_CAR_OWNER].url, param, cb); },
  [types.ADD_SERVICE_CLUE](param, cb) { return commonApi(apiConfig[types.ADD_SERVICE_CLUE].url, param, cb); },
  [types.GET_SERVICE_CLUE](param, cb) { return commonApi(apiConfig[types.GET_SERVICE_CLUE].url, param, cb); },
  [types.GET_INSURANCE_TYPE](param, cb) { return commonApi(apiConfig[types.GET_INSURANCE_TYPE].url, param, cb); },
  [types.ADD_INSURANCE_CLUE](param, cb) { return commonApi(apiConfig[types.ADD_INSURANCE_CLUE].url, param, cb); },
  [types.GET_RENEWAL_INSURANCE_QUERY_PRICE](param, cb) { return commonApi(apiConfig[types.GET_RENEWAL_INSURANCE_QUERY_PRICE].url, param, cb); },
  [types.GET_COUPON](param, cb) { return commonApi(apiConfig[types.GET_COUPON].url, param, cb); },
  [types.TAKE_COUPON](param, cb) { return commonApi(apiConfig[types.TAKE_COUPON].url, param, cb); },
  [types.GET_COUPON_TAKING_RECORD](param, cb) { return commonApi(apiConfig[types.GET_COUPON_TAKING_RECORD].url, param, cb); },
  [types.GET_DLR](param, cb) { return commonApi(apiConfig[types.GET_DLR].url, param, cb); },
  [types.CANCEL_VEHICLE_APPOINTMENT](param, cb) { return commonApi(apiConfig[types.CANCEL_VEHICLE_APPOINTMENT].url, param, cb); },
  [types.CANCEL_SERVICE_APPOINTMENT](param, cb) { return commonApi(apiConfig[types.CANCEL_SERVICE_APPOINTMENT].url, param, cb); },
  [types.GET_EVENT](param, cb) { return commonApi(apiConfig[types.GET_EVENT].url, param, cb); },
  [types.GET_EVENT_DETAIL](param, cb) { return commonApi(apiConfig[types.GET_EVENT_DETAIL].url, param, cb); },
  [types.GET_MSG_DETAIL](param, cb) { return commonApi(apiConfig[types.GET_EVENT].url, param, cb); },
  [types.GET_RECORD](param, cb) {
    return commonApi(null, param, cb);
  },
  [types.GET_CLUE_RECORD](param, cb) { return commonApi(apiConfig[types.GET_CLUE_RECORD].url, param, cb); },
  [types.JOIN_EVENT](param, cb) { return commonApi(apiConfig[types.JOIN_EVENT].url, param, cb); },
  [types.GET_EVENT_COMMENT](param, cb) { return commonApi(apiConfig[types.GET_EVENT_COMMENT].url, param, cb); },


}