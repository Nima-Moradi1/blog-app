import {
    ChatBubbleBottomCenterIcon,
    DocumentTextIcon,
    RectangleGroupIcon,
    Squares2X2Icon,
    UserCircleIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  import classNames from "classnames";
  import Link from "next/link";
  import { usePathname, useRouter } from "next/navigation";
  
  const sidebarNavs = [
      {
        id : 0 ,
        title : 'پروفایل' , 
        icon : <UserCircleIcon className="size-6 -mr-1"/>,
        href : '/profile'
     } ,
    {
      id: 1,
      title: " داشبورد ادمین",
      icon: <RectangleGroupIcon className="size-5" />,
      href: "/dashboard",
    },
  
    {
      id: 2,
      title: "پست ها",
      icon: <DocumentTextIcon className="size-5" />,
      href: "/dashboard/posts",
    },
    {
      id: 3,
      title: "نظرات",
      icon: <ChatBubbleBottomCenterIcon className="size-5" />,
      href: "/dashboard/comments",
    },
    {
      id: 4,
      title: "دسته بندی ها",
      icon: <Squares2X2Icon className="size-5" />,
      href: "/dashboard/categories",
    },
    {
      id: 5,
      title: "کاربران",
      icon: <UsersIcon className="size-5" />,
      href: "/dashboard/users",
    },
  ];
  export default function SidebarNavs() {
    const pathname = usePathname();
    return (
      <ul className="space-y-2">
        {sidebarNavs.map((nav) => {
          return (
            <li key={nav.id}>
              <Link
              
                href={nav.href}
                className={classNames(
                  "flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4",
                  {
                    "bg-primary-100/40 !font-bold text-blue-500":
                      pathname == nav.href,
                  }
                )}
              >
                {nav.icon}
                {nav.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
  