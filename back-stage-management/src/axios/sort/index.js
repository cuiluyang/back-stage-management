import http from '../axios'


// 获取商品分类列表接口
export function getSort(){
    return http.get('/api/catelist',{params:{
        istree:true
    }})
}
// 添加商品分类列表接口
export function postSortAdd(data){
    return http.post('/api/cateadd',data)
}
// 获取一条商品分类接口
export function getSortInfo(params){
    return http.get('/api/cateinfo',{params})
}
// 修改商品分类列表接口
export function postEditSort(data){
    return http.post('/api/cateedit',data)
}
//删除商品分类列表接口
export function postDelSort(id){
    return http.post('/api/catedelete',{id})
}