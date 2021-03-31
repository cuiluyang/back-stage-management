import {getBanner} from '@/axios/banner'

const state = {
    bannerList:[]
}
const getters={
    // 获取角色列表
    getBannerList(state){
        return state.bannerList
    }
}
const mutations={
    // 角色列表赋值
    REQ_BANNERLIST(state,payload){
        state.bannerList = payload
    }
}
const actions={
    // 获取角色列表的行动
    getBannerListAction({commit}){
        getBanner()
        .then(res=>{
            if(res.data.code == 200 ){
                commit('REQ_BANNERLIST',res.data.list !==null?res.data.list:[])
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