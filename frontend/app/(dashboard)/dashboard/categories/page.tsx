import BreadCrumbs from "@/_components/_ui/BreadCrumbs"
import CategoriesTable from "./_components/CategoriesTable"
import { Suspense } from "react"
import Fallback from "@/_components/_ui/Fallback"

const DashboardCategoriesPage = () => {
    return (
        <>
        <BreadCrumbs breadCrumbs={[
            {
                label : 'داشبورد',
                href : '/dashboard'
            } , 
            {
                label : 'دسته بندی ها',
                href : '/dashboard/categories',
                active : true
            }
        ]}/>
            <h1 className="text-xl text-secondary-700 font-bold mb-6"
            >صفحه دسته بندی ها</h1> 
            <Suspense fallback={<Fallback />}>  
            <CategoriesTable />  
            </Suspense> 
    </>
    )
}

export default DashboardCategoriesPage