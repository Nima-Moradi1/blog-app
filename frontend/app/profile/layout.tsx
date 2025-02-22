//since we want a new header and content, we're using a different layout file here

import Header from "@/_components/Header"
import { Metadata } from "next"


export const metadata:Metadata = {
    title : 'پروفایل' ,
    description : 'صفحه اطلاعات حساب کاربری'
}

export default function RootLayout({ children }:{children : React.ReactNode}) {
    return (
      <>
        <Header />
        <div className="container xl:max-w-screen-xl overflow-auto">{children}</div>
      </>
    );
  }