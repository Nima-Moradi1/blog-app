
import Link from "next/link";
import Button from '@/_components/_ui/Button'
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'خانه - وب اپلیکیشن مدیریت بلاگ' ,
  description : ''
}

export default function Home() {
  return (
   <div>
    <h1 className="font-bold text-center text-2xl md:text-5xl text-secondary-800 my-20"
    >وب اپلیکیشن مدیریت بلاگ</h1>

    <div>
      <p className="text-center text-secondary-500 text-lg leading-loose">
        جایی که قراره اگر 
        <span className="font-bold text-secondary-900"> ادمین </span>
         هستی بتونی یه اپلیکیشن بلاگ کامل رو مدیریت و رصد کنی!
        بتونی بلاگ بسازی : ویرایش یا حذف کنی - کامنت بذاری  <br />  و توی پنلت همه اتفاقات رو 
        <span className="font-bold text-secondary-900"
        > مدیریت </span> کنی!
      </p>
      <div className="flex justify-center gap-x-8 w-full mt-10">
        <Button variant='outline'>
          <Link href='/blogs'>مطالعه بلاگ ها</Link>
        </Button>
        <Button variant='primary'>
          <Link href='/dashboard'>مدیریت بلاگ ها</Link>
        </Button>
      </div>
    </div>
   </div>
  );
}
