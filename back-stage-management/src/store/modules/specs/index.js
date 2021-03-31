import {getSpecs} from '@/axios/specs'

const state = {
    specsList:[]
}
const getters={
    // 获取角色列表
    getSpecsList(state){
        return state.specsList
    }
}
const mutations={
    // 角色列表赋值
    REQ_SPECSLIST(state,payload){
        state.specsList = payload
    }
}
const actions={
    // 获取角色列表的行动
    getSpecsListAction({commit}){
        getSpecs()
        .then(res=>{
            if(res.data.code == 200 ){
                console.log(res.data);
                commit('REQ_SPECSLIST',res.data.list !==null?res.data.list:[])
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