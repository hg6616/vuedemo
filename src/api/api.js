/**
 * Mocking client-server processing
 */
import fetchData from '../utils/fetch'

const _products = [
  { "id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2 },
  { "id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10 },
  { "id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5 }
]

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
    //  console.log(Vue)
    //   this.$http.get
var url='http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=广州';
   //url='http://news-at.zhihu.com/api/4/news/latest';
   url='/api/zhihu';
    fetch(url, {
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin':'*'
      // },
      method: "GET",
      headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
     // mode: 'no-cors',
    }).then((res) => {
      console.log(res);
      cb(res);
    });
  }
}
