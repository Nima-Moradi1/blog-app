import BreadCrumbs from "@/_components/_ui/BreadCrumbs"
import { Metadata } from "next"
import CommentsTable from "./_components/CommentsTable"
import Pagination from "@/_components/_ui/Pagination"
import { getAllCommentsApi } from "@/_services/commentService"
import { Suspense } from "react"
import Fallback from "@/_components/_ui/Fallback"

export const metadata:Metadata = {
    title : 'بخش کامنت ها'
}
const DashboardCommentsPage = async () => {
    const {commentsCount} = await getAllCommentsApi()
   return (
    <div>
        <BreadCrumbs breadCrumbs={[
            {
                label : 'داشبورد',
                href : '/dashboard'
            } , 
            {
                label : 'نظرات کاربران',
                href : '/dashboard/comments' ,
                active : true
            }
        ]}/>
        <Suspense fallback={<Fallback />}>
        <CommentsTable />
        </Suspense>
    </div>
   ) 
    
}

export default DashboardCommentsPage