import setCookieOnReq from "@/_utils/SetCookieOnReq";
import { cookies } from "next/headers";
import { getAllUserApi } from "./userService";
import { getAllCommentsApi } from "./commentService";
import { getAllPosts } from "./postServices";

export async function fetchDashCardData() {
    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
//? when we enter dashboard, we want all three fetch requests to start async together
    try {
       const data = await Promise.all([
        getAllUserApi(options),
        getAllCommentsApi(options) ,
        getAllPosts('limit=100') ,
       ])
        const numberOfUsers = Number(data[0].users.length ?? '0')
        const numberOfComments = Number(data[1].commentsCount ?? '0')
        const numberOfPosts = Number(data[2].posts.length ?? "0")
        return {
            numberOfComments , 
            numberOfPosts ,
            numberOfUsers
        }
    }catch(err:any){
        console.log(err?.response?.data.message);
        throw new Error('خطا در بارگذاری اطلاعات داشبورد')
    }
}