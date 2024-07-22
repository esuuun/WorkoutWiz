"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Dumbbell, House, Icon, icons } from "lucide-react";
import React from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";

function Where() {

  const { formData, setFormData } = useFormStore();

  const workoutWhereList = [
    {
      name: "Home",
      icon: <House size={30}/>,
    },
    {
      name: "Gym",
      icon: <Dumbbell size={30} />,
    },
    {
      name: "Outdoor",
      icon: <CloudSun size={30} />,
    },
  ];

  const handleClick = (name) => {
    setFormData({ ...formData, where:name }); 
    // console.log({ ...formData });
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
        Where you usually workout?
      </h1>
      <div className="flex gap-3 flex-wrap flex-col md:flex-row justify-center">
        {workoutWhereList.map((Where, index) => (
                <Link href={'/form/level'} key={index}>
            <button className="mt-4" onClick={()=>handleClick(Where.name)}>
            <Card className="hover:bg-muted">
                <CardHeader className="flex flex-col items-center">
                  {Where.icon}
                    <CardTitle>{Where.name}</CardTitle>
              </CardHeader>
                      </Card>
            </button>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Where;
