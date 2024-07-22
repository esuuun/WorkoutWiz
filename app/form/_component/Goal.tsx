"use client"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BicepsFlexed, Icon, icons, Salad, Weight } from "lucide-react";
import React from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";

function Goal() {

  const { formData, setFormData } = useFormStore();

  const workoutGoalList = [
    {
      name: "Gain Muscle",
      icon: <BicepsFlexed  size={30}/>,
    },
    {
      name: "Lose Weight",
      icon: <Salad size={30}/>,
    },
    {
      name: "Gain Weight",
      icon: <Weight size={30}/>,
    },
  ];

  const handleClick = (name : string) => {
    setFormData({ ...formData, goal: name }); 
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Choose Your Goal
      </h1>
      <div className="flex gap-3 flex-wrap flex-col md:flex-row ">
        {workoutGoalList.map((goal, index) => (
                <Link href={'/form/gender'} key={index} >
            <button className="mt-4" onClick={()=>handleClick(goal.name)}>
            <Card className="hover:bg-muted">
                <CardHeader className="flex flex-col items-center">
                  {goal.icon}
                    <CardTitle>{goal.name}</CardTitle>
              </CardHeader>
                      </Card>
            </button>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Goal;
