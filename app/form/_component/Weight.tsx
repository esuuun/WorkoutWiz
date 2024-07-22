"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon, icons } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Weight() {

  const { formData, setFormData } = useFormStore();
  const [inputValid, setInputValid] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFormData({ ...formData, weight: value });
    setInputValid(value.trim() !== "");
    // console.log({ ...formData });
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
        Whats Your Weight?
      </h1>
      <span className="mt-10">* Use Kg</span>
      <div className="flex mt-3">
        <Input placeholder="60"
          value={formData.weight}
          onChange={handleInput} className="text-center text-lg" />
        <span className="ml-2 text-lg -translate-x-14 translate-y-1 text-muted-foreground">Kg</span>
      </div>
      <Link href={inputValid ? "/form/problems" : "#"}>
        <Button disabled={!inputValid} className="mt-4  font-bold text-lg hover:bg-muted accent hover:text-white">Submit</Button>
      </Link>
    </div>
  );
}

export default Weight;
