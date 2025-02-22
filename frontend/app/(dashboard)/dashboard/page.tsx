import { fetchDashCardData } from '@/_services/dashboardData'
import React, { Suspense } from 'react'
import { Card } from './_components/Card'
import PostsTable from './posts/_components/PostsTable'
import CardWrapper from './_components/CardWrapper'
import Fallback from '@/_components/_ui/Fallback'

const Dashboard = async () => {
  return (
    <>
    <h1 className='text-xl text-secondary-600 mb-5 font-bold'>داشبورد</h1>
  <Suspense fallback={<Fallback />}>
    <CardWrapper/>
  </Suspense>
   <div>
    <p className='text-xl text-secondary-600 mb-5 font-bold'>پست های اخیر</p>
    <Suspense fallback={<Fallback />}>
    <PostsTable query='sort=latest&limit=5'/>
    </Suspense>
   </div>
   </>
  )
}

export default Dashboard