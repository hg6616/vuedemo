import * as types from './mutation-types'
import api from '../api/api'
//在action中更改mutation ,可以异步  在vue文件中通过this.$store.dispatch({		type:'changemsg',		msg:'bad'	});来调用
export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}


export const changemsg=({commit},param)=>{
  console.log('action changemsg')
  setTimeout(()=>
   commit(
     types.CHANGE,
    param
   ),1000*5);
}

export const getzhihu=({commit},param)=>{
      api.getZhihuData(param,data=>{
        commit(types.GET_ZHIHU,data);
      });
}