"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Icon, icons, Rabbit, Snail, Turtle } from "lucide-react";
import React from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";

function FitnesLevel() {

  const { formData, setFormData } = useFormStore();

  const workoutFitnesLevelList = [
    {
      name: "Beginner",
      icon: <Snail size={30}/>,
    },
    {
      name: "Intermediate",
      icon: <Turtle size={30}/>,
    },
    {
      name: "Advanced",
      icon: <Rabbit size={30}/>,
    },
  ];

  const handleClick = (name) => {
    setFormData({ ...formData, level:name }); 
    // console.log({ ...formData });
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
        Choose Your Workout Level
      </h1>
      <div className="flex gap-3 flex-wrap flex-col md:flex-row ">
        {workoutFitnesLevelList.map((fitnesLevel, index) => (
                <Link href={'/form/height'} key={index}>
            <button className="mt-4" onClick={()=>handleClick(fitnesLevel.name)}>
            <Card className="hover:bg-muted">
                <CardHeader className="flex flex-col items-center"> 
                  {fitnesLevel.icon}
                    <CardTitle>{fitnesLevel.name}</CardTitle>
              </CardHeader>
                      </Card>
            </button>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default FitnesLevel;
