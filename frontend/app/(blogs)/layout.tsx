//we put blogs into a different section with a new layout because Header component was always rendering 
//in the root layout of the project, which we did NOT need to render in the dashboard or admin page or profile

import Header from "@/_components/Header"

export const metadata = {
    title: "Blog",
    description: "Blogs",
  };
  
  export default function RootLayout({ children }:{children : React.ReactNode}) {
    return (
      <>
        <Header/>
        <div className="container xl:max-w-screen-xl"
        >{children}</div>
      </>
    );
  }