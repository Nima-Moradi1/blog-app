import BreadCrumbs from "@/_components/_ui/BreadCrumbs"
import UsersTable from "./_components/UsersTable"

const DashboardUsersPage = () => {
    return (
        <>
          <BreadCrumbs breadCrumbs={[
                    {
                        label : 'پروفایل',
                        href : '/dashboard'
                    } , 
                    {
                        label : ' کاربران',
                        href : '/dashboard/users' ,
                        active : true
                    }
                ]}/>
            <h1 className="text-xl font-bold text-secondary-700 mb-6"
            >صفحه کاربران</h1>
            <UsersTable />
        </>
    )
}

export default DashboardUsersPage