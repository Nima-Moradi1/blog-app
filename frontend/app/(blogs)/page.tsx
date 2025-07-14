
import Link from "next/link";
import Button from '@/_components/_ui/Button'
import { Metadata } from "next";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";

export const metadata : Metadata = {
  title : 'خانه - وب اپلیکیشن بلاگ جاوا اسکریپت' ,
  description : 'بلاگ شخصی توسعه فول استک با جاوا اسکریپت'
}

export default function Home() {
  return (
   <> 
   <div className="w-full flex flex-col lg:flex-row-reverse items-center justify-center">
      <div className="">
        <Image
        className="lg:rounded-xl rounded-lg"
        width={400} height={200} src='/images/qr-code.png' alt="landing-image"/>
      </div>
    <div className="mb-3">
        <h1 className="animate-character font-bold text-center text-3xl md:text-4xl xl:text-5xl text-transparent bg-clip-text bg-gradient-to-l from-black via-secondary-800 to-red-50 mt-20 mb-10"
    >دنیای فول استک جاوا اسکریپت</h1>
     <p className="max-w-screen-sm text-sm md:text-base">
      اینجا تجربیات خودم رو از یکسری مطالب راجع به Next.JS و React , TailwindCSS , MUI , Express.JS , Nest.JS , SQL , MongoDB و ...
      که توی توسعه پروژه های خودم یا شرکت ها استفاده کردم میذارم . 
      <br/>
      <span className="font-bold">
      میتونید با اسکن کردن بارکد به گیت هاب من سر بزنید و اگر سوالی داشتید از 
      قسمت ارتباط با من در تماس خواهیم بود!
      </span>
 </p>
      <div className="flex justify-center gap-x-8 w-full mt-10">
        <Button variant='outline'>
          <Link href='/contact'
          className="flex items-center justify-center">
          <span>ارتباط با من</span>
          <IoIosArrowRoundBack 
          className="mr-1"/>
          </Link>
        </Button>
        <Button variant='primary'>
          <Link href='/blogs'
          className="flex items-center justify-center"
          >مطالعه بلاگ ها
        <IoIosArrowRoundBack 
          className="mr-1"/>
          </Link>
        </Button>
      </div>
    </div>
   </div>
   </>
  );
}
