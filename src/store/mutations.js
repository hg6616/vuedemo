import * as types from './mutation-types'
import { Indicator } from 'mint-ui';
//在这里更改state,只能是同步的方式
export default{
  //方括号表示用字符串给function起名字
  [types.CHANGE](state,{msg}){
    state.index.msg=msg
  },
  [types.GET_ZHIHU](state,{data}){
  //  console.log(data)
    // for(let x in data.stories){
    //          console.log(x)
    //      }
    state.zdata=data;
  //  console.log(state.zdata)
    Indicator.close();
  },
  [types.GET_NEWS](state,{data}){
    console.log(data)
    state.news=data.body;
  }
}