import axios from "axios";
import http from "./httpService";

export async function getPostBySlug(slug : string) { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`)
    const {data} = await response.json()
    //destructuring the post from data and giving it empty object for error handling
    //(when a wrong url enters we're erroring the handle by post slug , so the data should not be undefined > then we can redirect user to notFound())
   const {post} = data || {} ; 
   return post;

}

export async function getAllPosts( queries: string = '', options : object = {}) {

    const posts = http
    .get(`/post/list?${queries}`, options)
    .then(({ data }:{data : any}) => data.data);
    return posts;
}

export async function getCategoryApi(slug : string ,  queries : string = '' , options?: object) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${slug}&${queries}`, options)
    const {data} = await response.json()
    const {posts} = data || {} ; 
   return posts;
}

export async function likePostApi(id:string) {
    return http.post(`/post/like/${id}`).then(({ data }:any) => data.data);
  }
export async function bookmarkPostAPi(id:string) {
    return http.post(`/post/bookmark/${id}`).then(({ data }:any) => data.data);
  }

export async function createPostApi(data : any) {
    return http.post(`/post/create`,data).then(({ data }:any) => data.data);
  }

  export async function editPostApi({id ,data }: {id:string , data:any}) {
    return http.patch(`/post/update/${id}`,data).then(({ data }:any) => data.data);
  }

  export async function getPostById(id : string) { 
    return http.get(`/post/${id}`).then(({data}:any)=> data.data)

}

export async function deletePostApi({postId , options} : {postId : string , options : object}) {
  return http.delete(`/post/remove/${postId}` , options).then(({data}:any)=> data.data)
}