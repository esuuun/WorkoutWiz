import React from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/SideBar";
import MobileNav from "./_components/MobileNav";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";


function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="block w-full">
          <Header />
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default layout;
