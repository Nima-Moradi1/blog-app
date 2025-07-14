import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center mt-20'>
        <div className='w-full max-w-md p-2'>
            {children}
        </div>
    </div>
  )
}

export default layout