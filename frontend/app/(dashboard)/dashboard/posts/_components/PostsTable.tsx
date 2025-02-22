import Table from "@/_components/_ui/Table"
import { getAllPosts } from "@/_services/postServices"
import toLocalDateShort from "@/_utils/DateFormatter"
import { toPersianDigits } from "@/_utils/NumberFormatter"
import truncateText from "@/_utils/TruncateText"
import { DeletePost, UpdatePost } from "./ActionButtons"


const typeStyle = {
    free : {
        label : 'رایگان' ,
        className : "badge--success"
    } ,
    premium : {
        label : 'اشتراکی' ,
        className : "badge--secondary"
    }
}

const PostsTable = async ({query}: {query?:string}) => {
    //? if we want to add a delay to the fetch request we can use the following code (testing purposes)
            // const fetchPostsDataWithDelay = async () => {
            //     await new Promise(resolve => setTimeout(resolve, 3000));
            //     return getAllPosts(query)
            // }
            
    const {posts} = await getAllPosts(query)
    if(!posts.length) return <p>پستی یافت نشد</p>
    return (
        <Table>
            <Table.Header>
                <th>#</th>
                <th>عنوان</th>
                <th>دسته بندی</th>
                <th>نویسنده</th>
                <th>تاریخ ایجاد</th>
                <th>نوع</th>
                <th>عملیات</th>
            </Table.Header>
            <Table.Body>
                {posts.map((post : any, index:number)=> (
                    <Table.Row key={post._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{truncateText(post.title , 25)}</td>
                        <td>{post.category.title}</td>
                        <td>{post.author.name}</td>
                        <td>{toLocalDateShort(post.createdAt)}</td>
                        <td>
                            <span className={`badge ${typeStyle[post.type as keyof typeof typeStyle].className}`}>
                                {typeStyle[post.type as keyof typeof typeStyle].label}
                            </span>
                        </td>
                        <td>
                            <div className="flex items-center justify-center gap-x-3">
                        {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                                <UpdatePost id={post._id} />
                                <DeletePost post={post} />
                            </div>
                        </td>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default PostsTable