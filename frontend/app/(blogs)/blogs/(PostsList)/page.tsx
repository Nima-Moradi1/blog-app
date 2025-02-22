import PostList from "../_components/PostList"
import { cookies } from "next/headers"
import setCookieOnReq from "@/_utils/SetCookieOnReq"
import { getAllPosts } from "@/_services/postServices"
import queryString from "query-string"

//NOTE : in page.tsx pages in Next.Js , we can destructure params and searchParams by default (they're not my own Props!) and also it makes the page DYNAMIC

//!NOTE : apparently now SearchParams are now "Promises", not objects!
const BlogPage = async ({searchParams}:{searchParams : Promise<{ [key: string]: string | string[] | undefined }>}) => {
  const params = await searchParams; //* output > {search : 'something we searched'}
  const queries = queryString.stringify(params) //* output > search=something we searched
//! cookies are DYNAMIC functions from nextjs >> by using this,the component won't be static anymore.
    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
    const {posts} = await getAllPosts(queries,options);
    const data = await getAllPosts()
    const totalPages = data.totalPages
  return (
    <div>
      {posts.length > 0 ? <><PostList totalPages={totalPages} posts={posts}/></> : null} 
    </div>
  )
}

export default BlogPage