import React from "react";
import { ProgressBar } from "@/components/ui/slider";
import HowOften from "../_component/HowOften";
import BackButton from "../_component/BackButton";


function page() {
  return (
    <div className="flex items-center text-center gap-8 flex-col h-screen p-5">
      <BackButton/>
              <ProgressBar value={[100]} />
          <div className="flex flex-col gap-10 ">
              <HowOften/>
          </div>
    </div>
  );
}

export default page;
