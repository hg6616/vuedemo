import * as types from './mutation-types'
import { Indicator } from 'mint-ui';
//在这里更改state,只能是同步的方式
export default {
  //方括号表示用字符串给function起名字
  [types.CHANGE](state, { msg }) {
    state.index.msg = msg
  },
  [types.GET_ZHIHU](state, { data }) {
    for (let x in data.stories) {
      var d = data.stories[x].images;
      for (let y in d) {
        d[y] = ' /resource?url=' + d[y];
      }
    }
    state.zdata = data;
    console.log(data)
    Indicator.close();
  },
  [types.GET_NEWS](state, { data }) {
    //  console.log(data)

    data.body = data.body.replaceAll('src=\"', 'src=\"/resource?url=');
    data.css[0] = '/resource?url=' + data.css[0];
    state.news = data;
  },
  [types.GET_CAR](state, { data }) {
    state.car = data;
  }
}
String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}
