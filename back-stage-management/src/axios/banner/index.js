import http from '../axios'


// 获取角色列表接口
export function getBanner(){
    return http.get('/api/bannerlist')
}
// 添加角色列表接口
export function postBannerAdd(data){
    return http.post('/api/banneradd',data)
}
// 获取一条角色接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{params})
}
// 修改角色列表接口
export function postEditBanner(data){
    return http.post('/api/banneredit',data)
}
//删除角色列表接口
export function postDelBanner(id){
    return http.post('/api/bannerdelete',{id})
}