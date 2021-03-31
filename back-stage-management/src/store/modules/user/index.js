import {getUser,getUserCount} from '@/axios/user'

const state = {
    userList:[],
    userCount:0,
    pageSize:2
}
const getters={
    // 获取管理员列表
    getUserList(state){
        return state.userList
    },
    getUserCount(state){
        return state.userCount
    },
    getPageSize(state){
        return state.pageSize
    },

}
const mutations={
    // 管理员列表赋值
    REQ_USERLIST(state,payload){
        state.userList = payload
    },
    REQ_USERCOUNT(state,payload){
        state.userCount = payload
    }
}
const actions={
    // 获取管理员列表的行动
    getUserListAction({commit},data){
        getUser(data[0],data[1])
        .then(res=>{
            if(res.data.code == 200 ){
                commit('REQ_USERLIST', res.data.list !==null?res.data.list:[]  )          
            }else{
                console.log(res.data.msg);
            }
        })
    },
    getUserCountAction({commit}){
        getUserCount()
        .then(res=>{
            if(res.data.code == 200 ){
                commit('REQ_USERCOUNT', res.data.list[0].total )          
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