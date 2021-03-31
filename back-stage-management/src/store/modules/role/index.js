import {getRole} from '@/axios/role'

const state = {
    roleList:[]
}
const getters={
    // 获取角色列表
    getRoleList(state){
        return state.roleList
    }
}
const mutations={
    // 角色列表赋值
    REQ_ROLELIST(state,payload){
        state.roleList = payload
    }
}
const actions={
    // 获取角色列表的行动
    getRoleListAction({commit}){
        getRole()
        .then(res=>{
            if(res.data.code == 200 ){
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