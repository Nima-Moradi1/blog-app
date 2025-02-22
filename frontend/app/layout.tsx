
import "@/_styles/globals.css";
import vazirFont from "./_constants/localFont";
import Header from "./_components/Header";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./_context/AuthContext";
import QueryClientProvider from "./_providers/QueryClientProvider";

export const metadata = {
 title : {
  template : '%s | وب اپلیکیشن بلاگ' ,
  default : 'وب اپلیکیشن بلاگ'
 } ,
  description : "وب اپلیکیشن مدیریت بلاگ ها و  نظرات کاربران"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans min-h-screen`}
      >
        <Toaster />
        <QueryClientProvider>
        <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
        </body>
    </html>
  );
}

//?Q AuthProvider is a Client Component, by using it here, doesn't that make the layout a CC ?
//A: No, because we're rendering {children} in AuthProvider and Next.js allows us to render SC in CC
//without any changes IF they're rendering {children} (not other components in it)
// E.g : if we rendered <Header /> which is a SC in AuthProvider, it would make <Header/> a CC.
