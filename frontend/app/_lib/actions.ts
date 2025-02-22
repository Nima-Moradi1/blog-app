"use server";
import { createCommentApi, deleteCommentApi } from "@/_services/commentService";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/_utils/SetCookieOnReq";
import { revalidatePath } from "next/cache";
import { deletePostApi } from "@/_services/postServices";
import { deleteCategoryApi } from "@/_services/categoryService";
//! Note that server actions MUST always be async functions

export async function createComment(prevState : any , {formData,postId,parentId }:any) {
  const rawFormData = {
        text: formData.get("text"),
        postId,
        parentId,
      };
  //? by default, we ONLY have access to 'text' from formData.get('text')
  //!Problem ? How can we pass the parentId and PostId here in Server actions ?
  //? Based on Nextjs docs, we can use the bind() method to do that from the client component and pass the things we want
  //!Another problem! we remember that we cannot access cookies on server actions,therefore, the user is not authenticated yet!
  //?Solution: we can pass the cookies MANUALLY

  const cookieStore = await cookies()
  const options = setCookiesOnReq(cookieStore)
  try {
    const {data } = await createCommentApi(rawFormData , options)
    revalidatePath('/blogs') //? This is a function that we created to revalidate the cache of the and refetch data
    return data
  } catch(err:any) {
   const error = (err?.response?.data?.message);
   return {error}
  }
}

export async function deletePost(
  prevState: { message?: string; error?: string }, 
  { postId }: { postId: string }
): Promise<{ message?: string; error?: string }> {

  const cookieStore = await cookies();
  
  try {
    const options = setCookiesOnReq(cookieStore);
    const { message } = await deletePostApi({ postId, options });

    revalidatePath('/dashboard/posts');

    return { message , error : undefined }; 
  } catch (err: any) {
    const error = err?.response?.data?.message || "An error occurred while deleting the post";
    
    console.error("❌ Caught an error in deletePost:", err);
    
    return { error , message : undefined };
  }
}

export async function deleteComment(
  prevState: { message?: string; error?: string }, 
  { commentId }: { commentId: string }
): Promise<{ message?: string; error?: string }> {

  const cookieStore = await cookies();
  
  try {
    const options = setCookiesOnReq(cookieStore);
    const { message } = await deleteCommentApi({ commentId, options });

    revalidatePath('/dashboard/comments');

    return { message , error : undefined }; 
  } catch (err: any) {
    const error = err?.response?.data?.message || "An error occurred while deleting the comment";
    
    console.error("❌ Caught an error in deleteComment:", err);
    
    return { error , message : undefined };
  }
}

export async function deleteCategory(
  prevState: { message?: string; error?: string }, 
  { categoryId }: { categoryId: string }
): Promise<{ message?: string; error?: string }> {

  const cookieStore = await cookies();
  
  try {
    const options = setCookiesOnReq(cookieStore);
    const { message } = await deleteCategoryApi({ categoryId, options });

    revalidatePath('/dashboard/categories');

    return { message , error : undefined }; 
  } catch (err: any) {
    const error = err?.response?.data?.message || "An error occurred while deleting the category";
    
    console.error("❌ Caught an error in deleteComment:", err);
    
    return { error , message : undefined };
  }
}