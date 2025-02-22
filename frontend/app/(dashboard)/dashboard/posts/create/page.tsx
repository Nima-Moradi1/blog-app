//what we need : 1. a form >> title , category , ...

import BreadCrumbs from "@/_components/_ui/BreadCrumbs"
import CreatePostForm from "./_components/CreatePostForm"

const CreatePost = () => {

    return <>
    <BreadCrumbs breadCrumbs={[
         {
            label : 'پست ها',
            href : '/dashboard/posts'
         } ,
         {
            label : "ایجاد پست" ,
            href : '/dashboard/posts/create',
            active : true
         }
    ]}/> 
    <CreatePostForm /> 
     </>
}

export default CreatePost