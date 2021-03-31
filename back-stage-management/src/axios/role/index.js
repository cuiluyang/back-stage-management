import http from '../axios'


// 获取角色列表接口
export function getRole(){
    return http.get('/api/rolelist')
}
// 添加角色列表接口
export function postRoleAdd(data){
    return http.post('/api/roleadd',data)
}
// 获取一条角色接口
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{params})
}
// 修改角色列表接口
export function postEditRole(data){
    return http.post('/api/roleedit',data)
}
//删除角色列表接口
export function postDelRole(id){
    return http.post('/api/roledelete',{id})
}