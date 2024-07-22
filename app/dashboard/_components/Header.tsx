import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import MobileNav from "./MobileNav";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";

function Header() {
  return (
    <div className="flex md:justify-end justify-between mx-10 items-center h-fit pt-5">
      <MobileNav/>
      
      <UserButton appearance={{
        elements: {
          userButtonAvatarBox: "w-10 h-10",
        },
      }} />
    </div>
  );
}

export default Header;
