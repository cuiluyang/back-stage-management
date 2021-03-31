import http from '../axios'


// 获取管理员列表接口
export function getUser(size,page){
    console.log("size",size,page);
    return http.get('/api/userlist',{params:{
        size,
        page
    }})
}
// 添加管理员列表接口
export function postUserAdd(data){
    console.log(data);
    return http.post('/api/useradd',data)
}
// 获取一条管理员接口
export function getUserInfo(params){
    return http.get('/api/userinfo',{params})
}
// 修改管理员列表接口
export function postEditUser(data){
    return http.post('/api/useredit',data)
}
//删除管理员列表接口
export function postDelUser(uid){
    return http.post('/api/userdelete',{uid})
}
//管理员总数（用于计算分页）**
export function getUserCount(){
    return http.get('/api/usercount')
}
//管理员登录
export function postUserLogin(data){
    return http.post('/api/userlogin',data)
}