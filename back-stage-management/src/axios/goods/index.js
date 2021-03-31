import http from '../axios'


// 获取商品列表接口
export function getGoods(){
    return http.get('/api/goodslist',{
        params:{
            size:10,
            page:1
        }
    })
}
// 添加商品列表接口
export function postGoodsAdd(data){
    console.log(data);
    return http.post('/api/goodsadd',data)
}
// 获取一条商品接口
export function getGoodsInfo(params){
    console.log('params',params);
    return http.get('/api/goodsinfo',{params})
}
// 修改商品列表接口
export function postEditGoods(data){
    return http.post('/api/goodsedit',data)
}
//删除商品列表接口
export function postDelGoods(id){
    return http.post('/api/goodsdelete',{id})
}