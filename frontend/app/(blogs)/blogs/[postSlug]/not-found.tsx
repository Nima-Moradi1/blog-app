import Link from 'next/link'

const NotFound = () => {


  return (
    <div className='h-screen'>
        <div className='container xl:max-w-screen-xl'>
            <div className='flex justify-center pt-10'>
                <div>
                    <h1 className='text-xl font-bold text-red-500 mb-10'>
                        هیچ پستی با مشخصات یا آدرس وارد شده یافت نشد
                    </h1>
                    <Link href='/blogs'>
                    رفتن به صفحه پست ها؟ ←
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound