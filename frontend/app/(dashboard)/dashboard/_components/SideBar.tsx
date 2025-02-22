"use client";

import { useAuth } from "@/_context/AuthContext";
import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarNavs from "./SidebarNavs";
import ButtonIcon from "@/_components/_ui/ButtonIcon";

import { MouseEventHandler } from "react";

function SideBar({ onClose }: { onClose?: MouseEventHandler<HTMLButtonElement> }) {
  const { logOut } = useAuth();

  const logoutHandler = async () => {
    await logOut();
  };

  return (
    <div className="overflow-y-auto flex flex-col p-5 h-screen pt-10 lg:pt-8">
      {/* Drawer header */}
      <div className="flex justify-between">
        <div>
        <Link
        href="/"
        className="flex items-center gap-x-4 justify-center text-secondary-700 border-b  border-b-secondary-200 
        pb-2 mb-6"
      >
        <HomeIcon className="size-6 -mt-1" />
        <span>خانه</span>
      </Link>
        </div>
        <div>
        <ButtonIcon
      onClick={onClose}
      className="block lg:hidden border-none"
      variant="outline">
        <XMarkIcon />
      </ButtonIcon>
        </div>
      </div>
     
      {/* Drawer content */}
      <div className="overflow-y-auto flex-auto">
        <div className="w-full border-b border-b-secondary-200 my-2"></div>
        <SidebarNavs />
        <div className="w-full border-b border-b-secondary-200 my-2"></div>
        <div
          onClick={logoutHandler}
          className="flex items-center gap-x-2 rounded-2xl font-medium transition-all duration-200 text-secondary-700 py-3 px-4 hover:text-red-400 cursor-pointer"
        >
          <ArrowLeftStartOnRectangleIcon className="ml-4 h-5 w-5" />
          <span>خروج</span>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
