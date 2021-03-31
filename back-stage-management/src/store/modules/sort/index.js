import {getSort} from '@/axios/sort'

const state = {
    sortList:[]
}
const getters={
    // 获取商品分类列表
    getSortList(state){
        return state.sortList
    }
}
const mutations={
    // 商品分类列表赋值
    REQ_ROLELIST(state,payload){
        state.sortList = payload
    }
}
const actions={
    // 获取商品分类列表的行动
    getSortListAction({commit}){
        getSort()
        .then(res=>{
            if(res.data.code == 200 ){
                console.log("##",res.data.list);
                commit('REQ_ROLELIST',res.data.list !==null?res.data.list:[])
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