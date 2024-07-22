"use client";

import {
  Bell,
  CreditCard,
  Home,
  LineChart,
  Loader2Icon,
  LogOut,
  Package,
  Package2,
  PhoneCall,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import axios from "axios";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);

  const router = useRouter()


  const billingPage = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      // console.log(response.data)
      const { url } = response.data;
      router.push(url)

    } catch (error) {
      console.log("BILLING ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const MenuList = [
    {
      name: "Dashboard",
      Icon: Home,
      path: "/dashboard",
    },
  ];

  const pathName = usePathname();
  useEffect(() => {
    // console.log(pathName)
  }, []);

  if (loading) {
    return (<div className="z-10 absolute inset-0 flex items-center justify-center bg-background bg-opacity-70">
      <Loader2Icon className="animate-spin" size={50} />
    </div>); 
  }

  return (
    <aside className="hidden border-r bg-muted/40 md:block w-96">
      <div className="flex h-screen max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">
              Workout<span className="text-primary">Wiz</span>
            </span>
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {MenuList.map((menu, index) => (
              <Link
                key={index}
                href={menu.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathName == menu.path && "bg-muted text-primary"
                }`}
              >
                <menu.Icon className="h-4 w-4" />
                <span>{menu.name}</span>
              </Link>
            ))}

            <button
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary `} 
              onClick={billingPage}
            > <CreditCard className="h-4 w-4"/>
              <span>Billing</span>
            </button>

            <SignOutButton>
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary `}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </SignOutButton>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Encountering Issues?</CardTitle>
              <CardDescription>
              If you&apos;re experiencing any problems, please contact us for assistance. We&apos;re here to help!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full flex gap-4">
               <PhoneCall className="h-4 w-4"/> Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  );
}
