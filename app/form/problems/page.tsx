import React from "react";
import { ProgressBar } from "@/components/ui/slider";
import BackButton from "../_component/BackButton";
import Problems from "../_component/Problems";


function page() {
  return (
    <div className="flex items-center text-center gap-8 flex-col h-screen p-5">
      <BackButton/>
              <ProgressBar value={[95]} />
          <div className="flex flex-col gap-10 ">
              <Problems/>
          </div>
    </div>
  );
}

export default page;
