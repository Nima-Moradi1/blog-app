import Spinner from '@/_components/_ui/Spinner'
import React from 'react'

const loading = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Spinner />
        <span className='text-lg text-secondary-400'>در حال بارگذاری</span>
    </div>
    
  )
}

export default loading