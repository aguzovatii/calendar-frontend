import React from "react";
import Image from "next/image";
import img1 from "./sport.svg";
import img2 from "./calendar.svg";
import img3 from "./coding.svg";
import Link from "next/link";

export default function WelcomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="flex flex-col xl:flex-row h-full">
      <div className="flex flex-col md:basis-1/2 xl:basis-full">
        <div className="basis:0 md:grow"></div>
        <div className="grid grid-rows-4 items-center justify-items-center">
          <div>
            <p className="font-medium md:text-3xl lg:text-5xl xl:text-6xl text-[#77AD86]">
              Welcome
            </p>
          </div>
          <div>
            <p className="font-medium md:text-1xl lg:text-2xl xl:text-3xl">
              This is a calendar for your habits
            </p>
          </div>
          <div>
            <Link
              href="https://calendar-team.github.io/calendar-docs/"
              className="font-medium md:text-sm lg:text-1xl xl:text-2xl text-black hover:underline"
            >
              Feel free to learn more about this app
            </Link>
          </div>
          <div className="flex justify-center space-x-4 relative">
            <Link
              className="bg-[#134e4a] hover:bg-[#0f766e] focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg md:text-xs lg:text-xs xl:text-sm px-3 lg:px-5 py-1 lg:py-1.5 xl:py-2.5 text-white"
              href={
                searchParams.callbackUrl
                  ? "/auth/signup?callbackUrl=" +
                    encodeURIComponent(searchParams.callbackUrl)
                  : "/auth/signup"
              }
            >
              Get Started
            </Link>
            <Link
              className="bg-[#134e4a] hover:bg-[#0f766e] focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg md:text-xs lg:text-xs xl:text-sm px-3 lg:px-5 py-1 lg:py-1.5 xl:py-2.5 text-white"
              href={
                searchParams.callbackUrl
                  ? "/auth/signin?callbackUrl=" +
                    encodeURIComponent(searchParams.callbackUrl)
                  : "/auth/signin"
              }
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="basis-0 md:grow"></div>
      </div>

      <div className="grid grid-rows-1 md:grid-cols-3 xl:grid-cols-8 basis-1/2 xl:basis-full relative">
        <div className="invisible md:visible md:col-start-1 md:col-span-1 xl:col-start-4 xl:col-span-4 xl:row-start-1 xl:top-[5%] absolute">
          <Image src={img1} alt="" priority={true} width="2048" height="2048" />
        </div>
        <div className="md:col-start-2 md:col-span-1 xl:col-start-1 xl:col-span-4 xl:row-start-1 xl:top-[25%] absolute">
          <Image src={img2} alt="" priority={true} width="2048" height="2048" />
        </div>
        <div className="invisible md:visible md:col-start-3 md:col-span-1 xl:col-start-4 xl:col-span-4 xl:row-start-1 xl:top-[45%] absolute">
          <Image src={img3} alt="" priority={true} width="2048" height="2048" />
        </div>
      </div>
    </div>
  );
}
