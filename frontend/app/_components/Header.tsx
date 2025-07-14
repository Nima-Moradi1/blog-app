"use client";

import { useAuth } from "@/_context/AuthContext";
import NavLink from "./NavLink";
import ButtonIcon from "./_ui/ButtonIcon";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const navLinks = [
  {
    id: 1,
    children: "خانه",
    path: "/",
  },
  {
    id: 2,
    children: "بلاگ ها",
    path: "/blogs",
  },
];

function Header({className} : {className? : string}) {
  
  const {user , isLoading , isAdmin , logOut} = useAuth();
  const logoutHandler = async () => {
    await logOut()
  }

  return (
    <header
      className={`  mb-10 ${className} z-10 shadow-md bg-inherit sticky top-0 transition-all duration-200 border-b border-b-secondary-300 ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav className="container xl:max-w-screen-xl">
        <ul className="flex items-center text-secondary-400 justify-between py-2">
          <div className="flex items-center gap-x-10">
            {navLinks.map((navLink) => {
              return (
                <li key={navLink.id}>
                  <NavLink path={navLink.path}>{navLink.children}</NavLink>
                </li>
              );
            })}
          </div>
          <li>
            {isAdmin ? (
              <NavLink path="/dashboard">داشبورد</NavLink>
            ) : (
              user ? 
              <div className="flex gap-10 items-center justify-center flex-row-reverse"
              ><NavLink path="/profile">پروفایل</NavLink>
              <div
          onClick={logoutHandler}
          className="flex items-center transition-all duration-200 text-secondary-700 py-3 px-4 hover:text-error cursor-pointer"
        >
          <ArrowLeftStartOnRectangleIcon className="ml-1 h-5 w-5 hover:stroke-error" />
          <span>خروج</span>
        </div></div> 
              : 
              <NavLink path="/signin">ورود به حساب</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
