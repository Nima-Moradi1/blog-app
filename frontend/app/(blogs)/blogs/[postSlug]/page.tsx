import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/_services/postServices"
import RelatedPost from "../_components/RelatedPost"
import BlogComments from "../_components/comment/BlogComments"
interface postSlugProps {
  params : {
    postSlug : string
  }
}
//we switch this dynamic route render to "static" because our posts does not change often >> save all the slugs in an object
//!NOTE :we're fetching ALL the posts in static params because the posts are very few! if you have +1000 posts,
//try slicing the first 50 posts in static and then rendering the others dynamically by "removing" dynamicParams = false
export async function generateStaticParams() {
  const {posts} = await getAllPosts('limit=50')
  const slugs = await posts?.map((post : {slug:string})=> ({postSlug : post.slug}));
  return slugs;
}
//we tell nextjs,not to look for pages that don't exist (so that we don't get Interal-error on a wrong url slug)
export const dynamicParams = false ;
//we simply get the slug from params, pass it to getPostBySlug() and fetch the data
export async function generateMetadata({params}:postSlugProps) {
   const post = await getPostBySlug(params.postSlug)
return {
  title : post.title
}
}
//! as always, page.tsx files gives us params and search params by default!
const SinglePost = async ({params}:postSlugProps) => {
 const post = await getPostBySlug(params.postSlug)
 if(!post) notFound()
  return (
    <div className="text-secondary-600 max-w-screen-md mx-auto">
    <h1 className="text-secondary-700 text-2xl font-bold mb-8">
      {post.title}
    </h1>
    <p className="mb-4">{post.briefText}</p>
    <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
      <Image
      alt={post.title}
        className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
        fill
        src={post.coverImageUrl}
      />
    </div>
    <p className="mb-16">{post.text}</p>
    {post.related.length > 0 && <RelatedPost posts={post.related} />}
    <BlogComments post={post} /> 
  </div>
  )
}

export default SinglePost