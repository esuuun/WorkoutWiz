"use client"
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Home,
  LineChart,
  Loader2Icon,
  LogOut,
  Menu,
  Package,
  Package2,
  PhoneCall,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { SignOutButton } from "@clerk/nextjs";

export default function MobileNav() {

  const [loading, setLoading] = useState(false);

  const router = useRouter()


  const billingPage = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/lemonSqueezy/customerPortal");
      // console.log(response.data)
      const { customerPortal } = response.data;
      router.push(customerPortal)

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
    return (<div className="absolute inset-0 flex items-center justify-center bg-background bg-opacity-30">
      <Loader2Icon className="animate-spin" size={50} />
    </div>); 
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">
              Workout<span className="text-primary">Wiz</span>
            </span>
          </Link>
          {MenuList.map((menu, index) => (
            <Link
              key={index}
          href={menu.path}
          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathName == menu.path && "bg-muted text-primary"}`}
        >
          <menu.Icon className="h-5 w-5" />
          {menu.name}
        </Link>
          ))}
           <button
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground  `} 
              onClick={billingPage}
            > <CreditCard className="h-5 w-5"/>
              <span>Billing</span>
          </button>
          <SignOutButton>
              <button
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground  `}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </SignOutButton>
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Encountering Issues?</CardTitle>
              <CardDescription>
                If you&apos;re experiencing any problems, please contact us for assistance. We&apos;re here to help!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full flex gap-4">
              <PhoneCall className="h-5 w-5"/> Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}