import { Metadata } from 'next'
import React, { Suspense } from 'react'
import CategoryList from '../_components/CategoryList'
import Loading from '../loading'
import Search from '@/_components/_ui/Search'
import Header from '@/_components/Header'
export const metadata : Metadata = {
    title : "صفحه بلاگ ها" ,
    description : ""
}

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <>
    <div>
       <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-10 text-secondary-700 mb-12 items-center'>
       <h1 className='text-lg font-bold mb-2'
        >لیست بلاگ ها</h1>
        <Search/>
       </div>
        <div className="grid grid-cols-12 gap-8">
            <div className='col-span-12 lg:col-span-4 xl:col-span-3 lg:pl-2 text-secondary-500 space-y-4'>
                <Suspense fallback={<Loading />}>
                <CategoryList />
                </Suspense>
                </div>
            <div className='col-span-12 lg:col-span-8 xl:col-span-9 lg:pl-2'>
                {children}
            </div>
        </div>
    </div></>
    
  )
}

export default layout