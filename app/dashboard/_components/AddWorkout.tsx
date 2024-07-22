"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus, SquarePlus } from "lucide-react";
import React from "react";
import axios from 'axios';
import Link from "next/link";

function AddWorkout() {

  return (
    <div className="mt-10 md:mt-0 flex justify-center w-full md:w-fit">
    <Link href={"/form/goal"}>
    <button>
    <Card className="flex flex-col w-fit p-5 outline-dashed cursor-pointer justify-center items-center hover:ring-4 ring-ring hover:outline-none">
      <CirclePlus className="w-10 h-10" />
      <CardDescription>Add a new workout</CardDescription>
      </Card>
      </button>
      </Link>
      </div>
  );
}

export default AddWorkout;
