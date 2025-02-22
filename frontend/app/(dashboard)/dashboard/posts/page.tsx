import { Suspense } from "react"
import PostsTable from "./_components/PostsTable"
import Fallback from "@/_components/_ui/Fallback"
import Search from "@/_components/_ui/Search"
import { CreatePost } from "./_components/ActionButtons"
import queryString from "query-string"
import { getAllPosts } from "@/_services/postServices"
import Pagination from "@/_components/_ui/Pagination"

const DashboardPostPage = async ({searchParams}:{searchParams : Promise<{ [key: string]: string | string[] | undefined }>}) => {
    //!NOTE : apparently now SearchParams are now "Promises", not objects!
    const params = await searchParams; //* output > {search : 'something we searched'}
      const queries = queryString.stringify(params) //* output > search=something we searched
    //? NOW IT'S TIME FOR PAGINATION (HANDLED FROM BACKEND NOT FRONTEND)
    const {totalPages} = await getAllPosts(queries)
    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
        <h2 className="text-xl text-secondary-600 font-bold">پست ها</h2>
        <Search />
        <CreatePost />
        </div>
        {/*//? we pass key to fallback to also enable loading based on the query user enters in searchbox */}
        <Suspense fallback={<Fallback />} key={queries}>
            <PostsTable query={queries}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages}/>
        </div>
        </>
    )
}

export default DashboardPostPage