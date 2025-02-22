import { getAllPosts, getCategoryApi } from '@/_services/postServices'
import setCookieOnReq from '@/_utils/SetCookieOnReq'
import PostList from '@/(blogs)/blogs/_components/PostList'
import { cookies } from 'next/headers'
import queryString from 'query-string'
import React from 'react'


interface ParamsProps {
  categorySlug : string
}
// we added category page in (postList) because we wanted to use the same layout

const CategoryPage = async ({params , searchParams}:{params:ParamsProps , searchParams : Promise<{ [key: string]: string | string[] | undefined }>} ) => {
    const {categorySlug}  = params
    const sParams = await searchParams
    const {search} =  sParams
    const queries = `categorySlug=${categorySlug}&${queryString.stringify(sParams)}`
    //! cookies are DYNAMIC functions from nextjs >> by using this,the component won't be static anymore.
        const cookieStore = await cookies()
        const options = setCookieOnReq(cookieStore)
        const {posts} = await getAllPosts(queries,options);
  return (
    <div>
      {search ? 
      <p className='text-secondary-700 mb-5 font-bold'>
      {posts.length === 0 ? <>هیچ پستی با این مشخصات یافت نشد</> : 
      <>نشان دادن {posts.length} نتیجه برای &quot;{search}&quot;</>}
      </p> : null}
      <PostList posts={posts}/>
    </div>
  )
}

export default CategoryPage