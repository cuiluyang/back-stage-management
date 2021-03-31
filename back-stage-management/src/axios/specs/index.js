import http from '../axios'


// 获取角色列表接口
export function getSpecs(){
    return http.get('/api/specslist')
}
// 添加角色列表接口
export function postSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
// 获取一条角色接口
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{params})
}
// 修改角色列表接口
export function postEditSpecs(data){
    return http.post('/api/specsedit',data)
}
//删除角色列表接口
export function postDelSpecs(id){
    return http.post('/api/specsdelete',{id})
}