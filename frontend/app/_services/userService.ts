import http from "./httpService"

export function signupApi(data:any){
    return http.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`, data).then(({data}:{data : any})=>data.data)}

export function signinApi(data:any){
    return http.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`, data).then(({data}:{data : any})=>data.data)}

export async function getUserApi(options : object = {}) {
    return http.get(`/user/profile` , options).then(({ data }:any) => data);
}

export async function getAllUserApi(options : object = {}) {
        return http.get(`/user/list` , options).then(({ data }:any) => data.data);
}

export async function logOutApi() {
    http.post('/user/logout').then(({data}:any)=> data)
}

export async function updateProfileApi(data : any,options: object = {}) {
    return http.patch('/user/update' ,data, options).then(({data}:any)=> data.data)
}

export async function uploadAvatarApi(formData : FormData, options: object = {}){
    return http.post('/user/upload-avatar' , formData , options).then(({data}:any)=>data.data)
}
export async function forgotPasswordApi(data : {email : string}) {
    return http.post(`/user/forgot-password`, data).then(({data} : any) => data.data);
}
export async function resetPasswordApi(data : {token : string , password : string}){
    return http.post('/user/reset-password', data).then(({data}:any)=>data.data);
}