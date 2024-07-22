"use client"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon, icons } from "lucide-react";
import React from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";

function Gender() {

  const { formData, setFormData } = useFormStore();

  const workoutGenderList = [
    {
      name: "Male",
      icon: "",
    },
    {
      name: "Female",
      icon: "",
    },
  ];

  const handleClick = (name : string) => {
    setFormData({ ...formData, gender: name }); 
    // console.log({ ...formData });
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
        Choose Your Gender
      </h1>
      <div className="flex gap-3 justify-center">
        {workoutGenderList.map((gender, index) => (
                <Link href={'/form/where'} key={index} >
            <button className="mt-4" onClick={()=>handleClick(gender.name)}>
            <Card key={index} className="hover:bg-muted">
                <CardHeader>
                    <CardTitle>{gender.name}</CardTitle>
              </CardHeader>
                      </Card>
            </button>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Gender;
