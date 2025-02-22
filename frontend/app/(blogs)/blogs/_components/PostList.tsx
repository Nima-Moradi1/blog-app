import { ClockIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import CoverImage from "./CoverImage"
import Author from "./Author"
import BlogInteraction from "./BlogInteraction"
import Pagination from "@/_components/_ui/Pagination"
import { getAllPosts } from "@/_services/postServices"

interface PostsProps {
    _id : string,
    title : string
    coverImageUrl : string , 
    readingTime : number,
    slug : string ,
    author : {
        avatarUrl : string ,
        name : string
    }
}
const PostList = async ({posts , totalPages}:{posts : PostsProps[] , totalPages : number}) => {
    return (
      <div>
        <div className="grid grid-cols-12 gap-8">
        {posts?.map((post : PostsProps) => {
          return (
            <div
              key={post._id}
              className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4 border border-secondary-100
              p-1 rounded-lg
              "
            >
              {/*  blog image */}
              <CoverImage {...post} />
              {/* blog content */}
              <div className="bg-secondary-100  p-2 rounded-lg flex flex-col w-full justify-between flex-1">
                <Link href={`/blogs/${post.slug}`}>
                  <h2 className="mb-4 font-bold text-secondary-700">
                    {post.title}
                  </h2>
                </Link>
                {/* blog author-category */}
                <div className="flex items-center  justify-between mb-4">
                  <Author {...post.author} />
                  <div className="flex items-center text-[10px] text-secondary-500">
                    <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                    <span className="ml-1"> خواندن:</span>
                    <span className="ml-1 leading-3">{post.readingTime}</span>
                    <span>دقیقه</span>
                  </div>
                </div>
                {/* blog interaction */}
                <BlogInteraction post={post} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center mt-10">
      <Pagination totalPages={totalPages}/>
      </div>
      </div>
   )
        
}

export default PostList