import Table from "@/_components/_ui/Table"
import toLocalDateShort from "@/_utils/DateFormatter"
import { toPersianDigits } from "@/_utils/NumberFormatter"
import truncateText from "@/_utils/TruncateText"
import { DeletePost, UpdatePost } from "../../posts/_components/ActionButtons"
import { getAllCommentsApi } from "@/_services/commentService"
import { getPostById } from "@/_services/postServices"
import Pagination from "@/_components/_ui/Pagination"
import { getCategoriesApi } from "@/_services/categoryService"
import { DeleteCategoryBtn } from "./actionButtons"

const CategoriesTable = async () => {
    //? if we want to add a delay to the fetch request we can use the following code (testing purposes)
            // const fetchPostsDataWithDelay = async () => {
            //     await new Promise(resolve => setTimeout(resolve, 3000));
            //     return getAllPosts(query)
            // }
        
            
    const {categories} = await getCategoriesApi()
    if(!categories) return <p>دسته بندی ای یافت نشد</p>
    return (
        <>
        <Table>
            <Table.Header>
                <th>#</th>
                <th>عنوان</th>
                <th>عنوان انگلیسی</th>
                <th>جزییات</th>
                <th>اسلاگ</th>
                <th>تاریخ ایجاد</th>
                <th>عملیات</th>
            </Table.Header>
            <Table.Body>
                {categories.map((category : any, index:number)=> (
                    <Table.Row key={category._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{truncateText(category.title , 25)}</td>
                        <td>{truncateText(category.englishTitle , 25)}</td>
                        <td>{truncateText(category.description , 25)}</td>
                        <td>{category.slug}</td>
                        <td>{toLocalDateShort(category.createdAt)}</td>
                        <td>
                            <div className="flex items-center justify-center gap-x-3">
                        {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                        <DeleteCategoryBtn category={category}/>
                            </div>
                        </td>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        </>
    )
        
}

export default CategoriesTable