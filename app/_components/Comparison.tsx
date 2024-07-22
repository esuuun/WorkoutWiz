"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import React from "react";

function Comparison() {
  const withoutWorkoutWiz = [
    "Inconsistent Routines",
    "Plateaus and Stagnation",
    "Uncertain Goals",
    "Lack of Personalization",
    "Boring Workouts",
  ];

  const withWorkoutWiz = [
    "Consistent Routines",
    "Continuous Progress",
    "Clear Goals",
    "Customized Workouts",
    "Engaging Routines",
  ];

  return (
    <motion.div
    whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}>
      <div
        className=" mt-36 text-center px-40 flex flex-col items-center"
        id="why"
      >
        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          See the Difference with WorkoutWiz!
        </p>
        <div className="mt-10 flex justify-center gap-x-10">
          <div className="">
            <div className="bg-red-800 rounded-3xl p-8 xl:p-10 ">
              <span className="font-bold text-lg">Life Without WorkoutWiz</span>
              <div className="flex items-baseline justify-between gap-x-4 min-w-"></div>

              <ul
                role="list"
                className="space-y-3 text-sm leading-6 text-gray-300 mt-7"
              >
                {withoutWorkoutWiz.map((name,index) => (
                  <li className="flex gap-x-3" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="">
            <div className="bg-lime-700 ring-4 ring-lime-400 rounded-3xl p-8 xl:p-10">
              <span className="font-bold text-lg">Life With WorkoutWiz</span>
              <div className="flex items-baseline justify-between gap-x-4 min-w-"></div>

              <ul
                role="list"
                className="space-y-3 text-sm leading-6 text-gray-300 mt-7"
              >
                {withWorkoutWiz.map((name,index) => (
                  <li className="flex gap-x-3" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <a href="/form/goal" className="mt-10">
          <Button className="flex gap-4 text-lg font-semibold hover:bg-muted hover:text-foreground ">
            Get Your Workout Now!
            <ArrowRightCircle />
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

export default Comparison;
