'use client'

import { ArrowRightIcon } from '@heroicons/react/16/solid'
import useMoveBack  from './_hooks/useMoveBack'
import React from 'react'

const NotFound = () => {

    const moveBack = useMoveBack()

  return (
    <div className='h-screen'>
        <div className='container xl:max-w-screen-xl'>
            <div className='flex justify-center pt-10'>
                <div>
                    <h1 className='text-xl font-bold text-secondary-700 mb-10'>
                        صفحه ای که دنبالش بودید پیدا نشد
                    </h1>
                    <button className='flex items-center gap-x-2 text-secondary-500'
                    onClick={moveBack}
                    >
                        <ArrowRightIcon className='size-6 text-primary-900'/>
                        <span>برگشت</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound