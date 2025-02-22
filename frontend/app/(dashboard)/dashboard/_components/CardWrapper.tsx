//? Why did we create this component? >> to prevent multiple latencies and fetch requests on the profile page 
//? which makes the page load ALL the data first and then render the page,Which is a DISASTER >> so render cards here
//? with Suspense on Profile Page and then the other fetch requests

import { fetchDashCardData } from "@/_services/dashboardData"
import { Card } from "./Card"
import { useCallback } from "react"

const CardWrapper = async () => {

    const {numberOfComments,numberOfPosts,numberOfUsers} = await fetchDashCardData ()

    return <>
     <div className='grid gap-6 md:grid-cols-3 mb-8'>
    <Card title='کاربران' value={numberOfUsers} type='users'/>
    <Card title='پست ها' value={numberOfPosts} type='posts'/>
    <Card title='کامنت ها' value={numberOfComments} type='comments'/>
   </div>
    </>
}


export default CardWrapper