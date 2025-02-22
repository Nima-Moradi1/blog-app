"use client";
import Link from "next/link";
import ButtonIcon from "@/_components/_ui/ButtonIcon";
import Avatar from "@/_components/_ui/Avatar";
import { useAuth } from "@/_context/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SideBar from "./SideBar";
import Drawer from "./Drawer";

function Header({}) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { user, isLoading } = useAuth();
  return (
    <header
      className={`bg-secondary-0 ${isLoading ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between py-5 px-4 lg:px-8">
        <ButtonIcon
        className="block lg:hidden border-none"
        variant="outline"
        onClick={()=> setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <XMarkIcon /> : <Bars3Icon />}
        </ButtonIcon>
            <span className="text-sm lg:text-lg font-bold text-secondary-700">
              سلام؛ {user?.name}
            </span>
        <div className="flex items-center gap-x-3">
          <Link href="/dashboard">
            <ButtonIcon
              color="outline"
              className={`border-secondary-200 rounded-2xl flex cursor-pointer items-center`}
            >
              <Avatar src={user?.avatarUrl} />
            </ButtonIcon>
          </Link>
        </div>
        <Drawer open={isOpenDrawer} onClose={()=> setIsOpenDrawer(false)}>
          <SideBar onClose={()=> setIsOpenDrawer(false)}/>
        </Drawer>
      </div>
    </header>
  );
}
export default Header;
