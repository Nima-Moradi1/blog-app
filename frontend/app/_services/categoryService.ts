import http from "./httpService"

// const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list` , {
//     cache : 'force-cache'
// })
// //destructure the objects from the data response
// const {data : {categories}} = await response.json()

export async function getCategoriesApi(options : object = {}) {
    return http.get('/category/list' , options).then(({data}:any)=> data.data)
}

export async function deleteCategoryApi({categoryId , options} : {categoryId : string , options : object}) {
    return http.delete(`/category/remove/${categoryId}` , options).then(({data}:any)=> data.data)
}