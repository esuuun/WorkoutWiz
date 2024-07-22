"use client"
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Check } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function Pricing() {

  const features = [
    'Personalized workout plans',
    'Unlimited workout plans',
    'Progress tracking',
    'Perfect Workout based of your goals and circumstances',
  ]

  return (
    <motion.div
    whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}>
    <div className="mt-52" id="pricing">
      <div className="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          No matter your fitness journey, we have the perfect plan for you.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Find the plan that guarantees results.
        </p>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 place-items-center">
          <div className="bg-white/5 ring-2 ring-ring rounded-3xl p-8 xl:p-10">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  $14.99 <span className="text-base font-normal">/ month</span>
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-300"></span>
              </p>
              <p className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                Most popular
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-300">
            Join our most popular plan and unlock your full fitness potential.
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-base leading-6  xl:mt-10"
            >
              {features.map((feature, index) => (
                <li className="flex gap-x-3" key={index}>
                <Check/>
                <span>{feature}</span>
              </li>
              ))}
            </ul>
            <a href="/form/goal" className="flex mt-10 justify-center ">
              <Button className="w-full flex gap-4 text-lg font-semibold hover:bg-muted hover:text-foreground ">
                Get Your Workout Now!
                <ArrowRightCircle />
              </Button>
            </a>
          </div>
        </div>
      </div>
      </div>
      </motion.div>
  );
}

export default Pricing;
