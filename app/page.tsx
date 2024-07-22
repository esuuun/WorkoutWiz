import Image from "next/image";
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";
import HeroSection from "./_components/HeroSection";
import VideoPlayer from "./_components/VideoPlayer";
import Pricing from "./_components/Pricing";
import Comparison from "./_components/Comparison";
import Footer from "./_components/Footer";

export default function Home() {
  

  return (
    <div>
     <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
      <HeroSection />
      <VideoPlayer />
      <Comparison/>
      <Pricing />
      <Footer/>
    </div>
  );
}
