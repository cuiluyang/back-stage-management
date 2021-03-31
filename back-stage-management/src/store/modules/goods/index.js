import {getGoods} from '@/axios/goods'

const state = {
    goodsList:[]
}
const getters={
    // 获取商品列表
    getGoodsList(state){
        return state.goodsList
    }
}
const mutations={
    // 商品列表赋值
    REQ_USERLIST(state,payload){
        state.goodsList = payload
    }
}
const actions={
    // 获取商品列表的行动
    getGoodsListAction({commit}){
        getGoods()
        .then(res=>{
            if(res.data.code == 200){
                commit('REQ_USERLIST',res.data.list !==null?res.data.list:[])
            }else{
                console.log(res.data.msg);
            }
        })
    }
}
export default{
    state,
    getters,
    mutations,
    actions,
    namespaced : true
}