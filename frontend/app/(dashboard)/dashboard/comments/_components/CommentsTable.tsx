import Table from "@/_components/_ui/Table"
import toLocalDateShort from "@/_utils/DateFormatter"
import { toPersianDigits } from "@/_utils/NumberFormatter"
import truncateText from "@/_utils/TruncateText"
import { DeletePost, UpdatePost } from "../../posts/_components/ActionButtons"
import { getAllCommentsApi } from "@/_services/commentService"
import { getPostById } from "@/_services/postServices"
import Pagination from "@/_components/_ui/Pagination"
import { DeleteCommentBtn } from "./actionButtons"

const CommentsTable = async () => {
    //? if we want to add a delay to the fetch request we can use the following code (testing purposes)
            // const fetchPostsDataWithDelay = async () => {
            //     await new Promise(resolve => setTimeout(resolve, 3000));
            //     return getAllPosts(query)
            // }
        
            
    const {comments} = await getAllCommentsApi()
    if(!comments.length) return <p>نظری یافت نشد</p>
    return (
        <div className="flex flex-col gap-4 ">
        <Table>
            <Table.Header>
                <th>#</th>
                <th>عنوان</th>
                <th>شناسه پست</th>
                <th>نویسنده</th>
                <th>تاریخ ایجاد</th>
                <th>عملیات</th>
            </Table.Header>
            <Table.Body>
                {comments.map((comment : any, index:number)=> (
                    <Table.Row key={comment._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{truncateText(comment.content.text , 25)}</td>
                        <td>{comment.post}</td>
                        <td>{comment.user.name}</td>
                        <td>{toLocalDateShort(comment.createdAt)}</td>
                        <td>
                            <div className="flex items-center justify-center gap-x-3">
                        {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                        <DeleteCommentBtn comment={comment}/>
                            </div>
                        </td>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        <p className="font-bold text-xl mt-3 text-secondary-600">پاسخ ها به نظرات</p>
        <Table>
            <Table.Header>
                <th>پاسخ به شماره </th>
                <th>عنوان</th>
                <th>شناسه پست</th>
                <th>نویسنده</th>
                <th>تاریخ ایجاد</th>
                <th>عملیات</th>
            </Table.Header>
            <Table.Body>
                {comments.map((comment : any, index:number)=> (
                    comment.answers.map((answer:any)=> (
                        <Table.Row key={answer._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{truncateText(answer.content.text , 25)}</td>
                        <td>{answer.post}</td>
                        <td>{answer.user.name}</td>
                        <td>{toLocalDateShort(answer.createdAt)}</td>
                        <td>
                            <div className="flex items-center justify-center gap-x-3">
                        {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                                <DeleteCommentBtn comment={comment}/>
                                </div>
                        </td>
                    </Table.Row>
                    ))
                ))}
            </Table.Body>
        </Table>
        </div>
    )
        
}

export default CommentsTable