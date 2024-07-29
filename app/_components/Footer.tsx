import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer id="footer" className="bg-background rounded-lg shadow m-4 mt-14">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Workout<span className="text-primary">Wiz</span>
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0">
            <li>
              <Button variant={"outline"}>
                <a
                  href="https://x.com/WorkoutWiz_"
                  className="flex gap-3 items-center"
                >
                  <Phone className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-muted lg:my-8" />
        <span className="block text-sm  sm:text-center">
          © 2024{" "}
          <a href="/" className="hover:underline">
            WorkoutWiz™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
