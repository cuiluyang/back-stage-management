import http from '../axios'

export function postLogin(data){
    return http.post('/api/userlogin',data)
}