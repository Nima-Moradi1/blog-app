import http from "./httpService"

export const createCommentApi = async (data:any , options: object = {}) => {
    return http.post("/comment/add" , data , options).then(({data}:any)=>data)
}

export async function getAllCommentsApi(options : object = {} , query? : string) {
    return http.get(`/comment/list` , options).then(({ data }:any) => data.data);
}

export async function deleteCommentApi({commentId , options} : {commentId : string , options : object}) {
    return http.delete(`/comment/remove/${commentId}` , options).then(({data}:any)=> data.data)
}