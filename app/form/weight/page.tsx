import React from "react";
import { ProgressBar } from "@/components/ui/slider";
import Weight from "../_component/Weight";
import BackButton from "../_component/BackButton";


function page() {
  return (
    <div className="flex items-center text-center gap-8 flex-col h-screen p-5">
      <BackButton/>
              <ProgressBar value={[85]} />
          <div className="flex flex-col gap-10 ">
              <Weight/>
          </div>
    </div>
  );
}

export default page;