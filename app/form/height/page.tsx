import React from "react";
import { ProgressBar } from "@/components/ui/slider";
import Height from "../_component/Height";
import BackButton from "../_component/BackButton";


function page() {

  return (
    <div className="flex items-center text-center gap-8 flex-col h-screen p-5">
      <BackButton/>
              <ProgressBar value={[70]} />
          <div className="flex flex-col gap-10 ">
              <Height/>
          </div>
    </div>
  );
}

export default page;
