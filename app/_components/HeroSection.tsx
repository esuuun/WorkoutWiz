"use client";
import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  useAuth,
  UserProfile,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowBigRightDashIcon,
  ArrowRightCircle,
  Home,
  LogIn,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function HeroSection() {
  const [state, setState] = useState(false);
  const { userId } = useAuth();

  const navigation = [
    { title: "Pricing", path: "#pricing" },
    { title: "How it Works", path: "#howItWorks" },
    { title: "Why WorkoutWiz", path: "#why" },
  ];

  return (
    <>
      <header>
        <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
          <div className="flex justify-between">
            <a href="javascript:void(0)" className="text-2xl font-bold">
              Workout<span className="text-primary">Wiz</span>
            </a>
            <button
              className="text-gray-500 outline-none md:hidden"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <ul
            className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${
              state ? "" : "hidden"
            }`}
          >
            <li className="order-2 pb-5 md:pb-0">
              {!userId ? (
                <Button className="hover:bg-muted hover:text-foreground font-semibold flex gap-2">
                  <LogIn className="h-4 w-4" />
                  <SignInButton />
                </Button>
              ) : (
                <div className="flex">
                  <Link href={"/dashboard"}>
                    <Button className=" hover:bg-muted hover:text-foreground font-semibold flex gap-2">
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <SignOutButton>
                    <button
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary-foreground text-primary`}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </SignOutButton>
                </div>
              )}
            </li>
            <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => (
                <li className=" hover:text-primary" key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </div>
          </ul>
        </nav>
      </header>
      <section className="mt-20 md:mt-40 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8 mb-12 bg-transparent">
        <div className="text-center space-y-4 lg:px-64 md:px-36">
          <h1 className="font-bold text-4xl md:text-5xl">
            Fast-track your fitness with Workout
            <span className="text-primary">Wiz</span>
          </h1>
          <p className="max-w-xl mx-auto leading-relaxed">
            Personalized AI-generated workout plans designed to get you results
            quickly!
          </p>
        </div>
        <div className="flex mt-10 justify-center items-center ">
          <a href="/form/goal">
            <Button className="flex gap-4 text-lg font-semibold hover:bg-muted hover:text-foreground ">
              Get Your Workout Now!
              <ArrowRightCircle />
            </Button>
          </a>
        </div>
      </section>

      <div className="relative flex justify-center mb-24">
        <image
          src="img/heroSectionImg.png"
          alt="Dashboard image"
          className="relative z-10"
        />
        <div className=" z-20 absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </>
  );
}

export default HeroSection;
