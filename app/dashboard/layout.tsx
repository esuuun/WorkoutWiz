import React from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/SideBar";
import MobileNav from "./_components/MobileNav";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

// async function fetchAndCacheData() {
//   const cachedData = localStorage.getItem("cachedData");
//   if (cachedData) {
//     return Promise.resolve(JSON.parse(cachedData));
//   } else {
//     try{
//     const response = await axios.get("/api/workout/get");
//     const data = response.data;

//       localStorage.setItem("cachedData", JSON.stringify(data));
//       return data
//     }
//     catch (error) {
//       console.error('Error fetching data:', error);
//       throw error; 
//     }
//   }
// }

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
