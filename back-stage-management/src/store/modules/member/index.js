import {getMember} from '@/axios/member'

const state = {
    memberList:[]
}
const getters={
    // 获取角色列表
    getMemberList(state){
        return state.memberList
    }
}
const mutations={
    // 角色列表赋值
    REQ_MEMBERLIST(state,payload){
        state.memberList = payload
    }
}
const actions={
    // 获取角色列表的行动
    getMemberListAction({commit}){
        getMember()
        .then(res=>{
            if(res.data.code == 200 ){
                commit('REQ_MEMBERLIST',res.data.list !==null?res.data.list:[])
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