
import Table from "@/_components/_ui/Table"
import UpdateProfile from "./_components/UpdateProfile"
import { getUserApi } from "@/_services/userService"
import toLocalDateShort from "@/_utils/DateFormatter"
import { Suspense } from "react"
import Fallback from "@/_components/_ui/Fallback"
import { cookies } from "next/headers"
import setCookieOnReq from "@/_utils/SetCookieOnReq"
import UploadAvatar from "./_components/UploadAvatar"

const ProfilePage = async () => {

    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
    const {data : {user}} = await getUserApi(options)
    return (
        <>
         <h1 className="text-xl font-bold mb-5 text-secondary-700 border-b border-b-secondary-200">
            صفحه پروفایل
        </h1>
        <div className="flex flex-col xl:flex-row  items-center justify-center w-full gap-10">
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-xl font-bold text-secondary-500 border-b border-b-secondary-100"
                >اطلاعات حساب کاربری </h2>
              <Suspense fallback={<Fallback />}>
              {user && (
                <Table>
                <Table.Header>
                    <th>نام</th>
                    <th>ایمیل</th>
                    <th>تاریخ عضویت</th>
                    <th>تعداد بوکمارک ها</th>
                    <th>تعداد لایک ها</th>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{toLocalDateShort(user?.createdAt)}</td>
                        <td>{user?.bookmarkedPosts.length}</td>
                        <td>{user?.likedPosts.length}</td>
                    </Table.Row>
                </Table.Body>
            </Table>
               )}
              </Suspense>
              <UploadAvatar />
            </div>
            <div className="flex-1 w-full">
       <UpdateProfile user={user}/>
       </div>
        </div>
        
        </>
       
    )
}

export default ProfilePage