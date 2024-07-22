import React from "react";
import Goal from "../_component/Goal";
import { ProgressBar } from "@/components/ui/slider";
import BackButton from "../_component/BackButton";


function page() {
  return (
    <div className="flex items-center text-center gap-8 flex-col h-screen p-5">
      <BackButton/>
              <ProgressBar value={[0]} />
          <div className="flex flex-col gap-10 ">
              <Goal />
          </div>
    </div>
  );
}

export default page;
