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

//车主信息
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

  if (d != undefined) {
    res = d;
    if (res.carOwner != null) {
      res.binded = true;//已绑定
    }
    else {
      res.carOwner = {
        "carNo": "",
        "carTypeConfigName": ""
      }
    }
   //  res.binded =true//todo
  }
  return res;
}

//活动提醒
export const events = state => {
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
  var d = state.GET_EVENT;
  var res = [];
  if (d != undefined && d.length > 0) {
    for (let x in d) {
      d[x].going = new Date() - new Date(d[x].actEndTime) <= 0 ? true : false;
    }
    res = d;
  }
  return res;
}
export const msgCount = state => {
  var d = state.GET_MSG_COUNT;
  //10系统，11试驾，12询底价，13续保询价，14养修，15推荐
  var res = {
    system: null,
    testDrive: null,
    priceQuery: null,
    xubaoQuery: null,
    maintain: null,
    recommand: null,
    all: null,
  } 
  if (d != null) {
    d.forEach(v => {
      res.all += parseInt(v.count)
    })
  }

  for (let x in d) {
    switch (d[x].msgType) {
      case '10':
        res.system = d[x].count;
        break;
      case '11':
        res.testDrive = d[x].count;
        break;
      case '12':
        res.priceQuery = d[x].count;
        break;
      case '13':
        res.xubaoQuery = d[x].count;
        break;
      case '14':
        res.maintain = d[x].count;
        break;
      case '15':
        res.recommand = d[x].count;
        break;
    }
  }
  return res;
}

