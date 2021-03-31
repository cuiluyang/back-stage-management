import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import sort from './modules/sort'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'
import member from './modules/member'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        userInfo:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : []
    },
    getters:{
        getUserInfo(state){
            return state.userInfo
        }
    },
    mutations:{
        RES_USERINFO(state,payload){
            if(payload){
                state.userInfo = payload
                sessionStorage.setItem('user',JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('user')
            }
            state.userInfo = payload
        }
    },
    actions:{
        getUserInfoAction({commit},payload){
            commit('RES_USERINFO',payload)
        }
    },
    modules:{
        menu,
        role,
        user,
        goods,
        specs,
        sort,
        banner,
        member
    }

})