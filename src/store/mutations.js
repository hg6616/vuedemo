import * as types from './mutation-types'

//在这里更改state,只能是同步的方式
export default{
  //方括号表示用字符串给function起名字
  [types.CHANGE](state,{msg}){
    state.index.msg=msg
  },
}