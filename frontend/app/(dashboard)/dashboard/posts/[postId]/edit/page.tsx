import BreadCrumbs from "@/_components/_ui/BreadCrumbs"
import CreatePostForm from "../../create/_components/CreatePostForm"
import { getPostById } from "@/_services/postServices"
import { notFound } from "next/navigation"

const EditPostsPage = async ({params : {postId}} : {params : {postId : string}}) => {
    const {post} = await getPostById(postId)
    if(!post) return notFound()

return <div>
        <BreadCrumbs 
        breadCrumbs={[
            {
                label : 'پست ها',
                href : '/dashboard/posts'
            } , 
            {
                label : 'ویرایش پست',
                href : `/dashboard/posts/${postId}/edit`,
                active : true
            }
        ]}
/>
        <CreatePostForm postToEdit={post} />
    </div>

}

export default EditPostsPage