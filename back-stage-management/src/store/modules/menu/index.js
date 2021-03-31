import { menuAdd, menuList ,} from '@/axios/index'

const state = {
    menuAddInfo:'',
    menuList:[]
}
const getters={
    getMenuList(state){
        return state.menuList
    }
}
const mutations={
    MENU_ADD(state,payload){
        console.log("store",payload);
        menuAdd(payload)
        .then(res=>{
            state.menuAddInfo = res.data.msg
        })
        .catch(err=>{
            console.log(err);
        })
    },
    MENU_LIST(state,payload){
        menuList()
        .then(res=>{
            if(res.data.code == 200){
                state.menuList = res.data.list !==null?res.data.list:[]
            }else{
                console.log(res.data.msg);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
}
const actions={
    menuListAction({commit}){
        commit('MENU_LIST',"");
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}