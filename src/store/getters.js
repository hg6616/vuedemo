import * as types from './mutation-types'

export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.all.find(p => p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}

//个人中心
export const carOwner = state => {
  var d = state.GET_USER_INFO;
  var res = {
    "nickName": "",
    "headImgUrl": "",
    "carOwner": {
      "carNo": "",
      "carTypeConfigName": ""
    }
  };
  if (d!=undefined&&d.length > 0) {
    res = d;
  }
  return res;
}

//活动提醒
export const events = state => {
 // debugger;
  var d = state.GET_EVENT;
  //  "result": [
  //           {
  //               "id": 1,
  //               "actName": "奇骏MT手到擎来，先用后买超低首付10%起",
  //               "actShortName": "奇骏MT手到擎来，先用后买超低首付10%起",
  //               "actStartTime": "2017-04-01 00:00:00",
  //               "actEndTime": "2017-04-21 23:59:59",
  //               "actOpenStartTime": "2017-04-01 00:00:00",
  //               "actOpenEndTime": "2017-04-21 23:59:59",
  //               "actPhotoUrl": "http://dmswx.szlanyou.com/file/img/1234566434.jpg"
  //           }
  //       ],
  var res = [];
  if (d!=undefined&&d.length > 0) {
    for(let x in d){
       d[x].going=new Date()-new Date(d[x].actEndTime)>0?true:false;
    }
    res = d;
  }
  return res;
}