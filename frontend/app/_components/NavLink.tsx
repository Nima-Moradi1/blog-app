"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ path, children }: {children : React.ReactNode , path : string}) {
  const pathname = usePathname();

  return (
    //change the color of the active link based on pathname
    <Link
      className={`block py-2 hover:text-secondary-900 transition-all ease-out
        ${pathname === path ? "text-primary-900" : ""}
      `}
      href={path}
    >
      {children}
    </Link>
  );
}

export default NavLink;
