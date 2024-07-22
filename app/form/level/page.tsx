import React from "react";
import { ProgressBar } from "@/components/ui/slider";
import FitnesLevel from "../_component/FitnessLevel";
import BackButton from "../_component/BackButton";


function page() {
  return (
    <div className="flex items-center text-center gap-8 flex-col h-screen p-5">
      <BackButton/>
              <ProgressBar value={[50]} />
          <div className="flex flex-col gap-10 ">
              <FitnesLevel/>
          </div>
    </div>
  );
}

export default page;
