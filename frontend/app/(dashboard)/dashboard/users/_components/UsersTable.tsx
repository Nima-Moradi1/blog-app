import Table from "@/_components/_ui/Table"
import toLocalDateShort from "@/_utils/DateFormatter"
import { toPersianDigits } from "@/_utils/NumberFormatter"
import truncateText from "@/_utils/TruncateText"
import { getAllUserApi } from "@/_services/userService"
import { cookies } from "next/headers"
import setCookieOnReq from "@/_utils/SetCookieOnReq"

const UsersTable = async () => {
    //? if we want to add a delay to the fetch request we can use the following code (testing purposes)
            // const fetchPostsDataWithDelay = async () => {
            //     await new Promise(resolve => setTimeout(resolve, 3000));
            //     return getAllPosts(query)
            // }
        
            const cookieStore = await cookies()
            const options = setCookieOnReq(cookieStore)
    const {users} = await getAllUserApi(options)

    if(!users) return <p> کاربری یافت نشد</p>
    
    return (
        <>
        <Table>
            <Table.Header>
                <th>#</th>
                <th>نام کاربر</th>
                <th>ایمیل</th>
                <th>تعداد پست بوکمارک</th>
                <th>تعداد پست لایک شده</th>
                <th>تاریخ عضویت </th>
            </Table.Header>
            <Table.Body>
                {users.map((user : any, index:number)=> (
                    <Table.Row key={user._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{truncateText(user.name , 25)}</td>
                        <td>{truncateText(user.email , 25)}</td>
                        <td>{user.bookmarkedPosts.length}</td>
                        <td>{user.likedPosts.length}</td>
                        <td>{toLocalDateShort(user.createdAt)}</td>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        </>
    )
        
}

export default UsersTable