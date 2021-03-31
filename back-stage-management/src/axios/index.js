import http from './axios'


export function menuAdd(data){
    console.log("axios",data);
    return http.post('/api/menuadd',data)
}
export function menuList(){
    return http.get('/api/menulist',{
        params:{
            istree:true
        }
    })
}
//菜单修改
export function postEditMenu(data){
    return http.post('/api/menuedit',data)
}
export function getMenuInfo(params){
    console.log(params);
    return http.get('/api/menuinfo',{params})
}

export function postDelMenmu(id){
    return http.post('/api/menudelete',{id})
}