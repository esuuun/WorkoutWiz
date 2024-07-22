"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function VideoPlayer() {
  const [isVideoPoppedUp, setVideoPopUp] = useState(false);
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div id="howItWorks" className="">
        <h1 className="text-center mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Get your workout in the{" "}
          <span className="underline decoration-primary font-bold underline-offset-8">
            blink of eye!
          </span>
        </h1>
        <div className="flex-1 max-w-3xl mx-auto mt-14 xl:mt-0 ">
          <div className="relative mt-10">
            <Image src="img\heroSectionImg.png" className="rounded-lg" alt="" />
            <button
              className="absolute w-16 h-16 rounded-full inset-0 m-auto duration-150 bg-primary hover:bg-muted ring-offset-2 focus:ring "
              onClick={() => setVideoPopUp(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 m-auto"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </div>
        {isVideoPoppedUp ? (
          <div className="z-30 fixed inset-0 w-full h-full flex items-center justify-center">
            <div
              className="absolute inset-0 w-full h-full bg-black/50"
              onClick={() => setVideoPopUp(false)}
            ></div>
            <div className="px-4 relative">
              <button
                className="w-12 h-12 mb-5 rounded-full duration-150 bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => setVideoPopUp(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 m-auto"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
              <video
                className="rounded-lg w-full max-w-2xl"
                controls
                autoPlay={true}
              >
                <source src="video\WorkoutWiz DEMO.mov" type="video/mp4" />
              </video>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
}

export default VideoPlayer;
