"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon, icons } from "lucide-react";
import React, { useState } from "react";
import useFormStore from "@/store/formStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Height() {

  const { formData, setFormData } = useFormStore();
  const [inputValid, setInputValid] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value
    setFormData({ ...formData, height: value });
    setInputValid(value.trim() !== "");
    // console.log({ ...formData });
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-4xl">
        Whats Your Height?
      </h1>
      <span className="mt-10">
        *use cm
      </span>
      <div className="flex mt-3">
        <Input placeholder="170"
          value={formData.height}
          onChange={handleInput}
          className="text-center text-lg" />
        <span className="ml-2 text-lg -translate-x-14 translate-y-1 text-muted-foreground">Cm</span>
      </div>
      <Link href={inputValid ? "/form/weight" : "#"}>
        <Button disabled={!inputValid}  className="mt-4  font-bold text-lg hover:bg-muted accent hover:text-white">Submit</Button>
      </Link>
    </div>
  );
}

export default Height;
