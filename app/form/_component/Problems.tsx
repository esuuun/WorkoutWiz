"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon, icons } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Problems() {

  const { formData, setFormData } = useFormStore();

  const handleInput = (event:ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setFormData({ ...formData, additionalProblem: value });
    // console.log({ ...formData });
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
      Additional Workout Concerns?
      </h1>
      <div className="flex mt-3">
        <Textarea placeholder="I have a knee injury, I only have dumbbells at home..."
          value={formData.additionalProblem}
          onChange={handleInput} className="text-lg h-44 resize-none" />
      </div>
      <Link href="/form/howoften">
        <Button className="mt-4  font-bold text-lg hover:bg-muted accent hover:text-white">Submit</Button>
      </Link>
    </div>
  );
}

export default Problems;
