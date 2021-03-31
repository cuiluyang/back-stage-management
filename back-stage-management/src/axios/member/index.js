import http from '../axios'


// 获取会员列表接口
export function getMember(){
    return http.get('/api/memberlist')
}
// 添加会员列表接口
export function postMemberAdd(data){
    return http.post('/api/memberadd',data)
}
// 获取一条会员接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{params})
}
// 修改会员列表接口
export function postEditMember(data){
    return http.post('/api/memberedit',data)
}
//删除会员列表接口
export function postDelMember(id){
    return http.post('/api/memberdelete',{id})
}