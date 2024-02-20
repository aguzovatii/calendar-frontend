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
    <div className="grid md:grid-cols-1 md:grid-rows-2 lg:gap-4 xl:grid-rows-1 xl:grid-cols-2 xl:gap-2 h-full xl:h-[45rem] 2xl:h-full">
      <div className="grid md:grid-rows-3 xl:grid-rows-3 xl:basis-1/2 xl:gap-2 2xl:gap-5 lg:h-full h-full">
        <div className="grid md:row-start-2 md:row-span-1 md:rows-4 md:gap-2 lg:gap-3 xl:row-start-2 xl:row-span-1 xl:grid-rows-4 items-center justify-items-center">
          <div>
            <p className="font-medium md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-9xl text-[#77AD86]">
              Welcome
            </p>
          </div>
          <div>
            <p className="font-medium md:text-1xl lg:text-2xl xl:text-3xl 2xl:text-6xl text-black xl:ml-15 xl:mt-2">
              This is a calendar for your habits
            </p>
          </div>
          <div>
            <Link
              href="https://calendar-team.github.io/calendar-docs/"
              className="font-medium md:text-sm lg:text-1xl xl:text-2xl 2xl:text-5xl text-black xl:ml-20 hover:underline"
            >
              Feel free to learn more about this app
            </Link>
          </div>
          <div className="flex justify-center space-x-4 relative">
            <Link
              className="bg-[#134e4a] hover:bg-[#0f766e] focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg md:text-xs lg:text-xs xl:text-sm 2xl:text-3xl md:px-3 lg:px-5 md:py-1 lg:py-1.5 xl:py-2.5 2xl:py-5 text-white"
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
              className="bg-[#134e4a] hover:bg-[#0f766e] focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg md:text-xs lg:text-xs xl:text-sm 2xl:text-3xl md:px-3 lg:px-5 md:py-1 lg:py-1.5 xl:py-2.5 2xl:py-5 text-white"
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
      </div>

      <div className="grid grid-rows-1 lg:grid-cols-3 xl:grid-cols-8 xl:basis-1/2 xl:h-full relative">
        <div className="invisible lg:visible lg:col-start-1 lg:col-span-1 xl:col-start-4 xl:col-span-4 xl:row-start-1 xl:top-[5%] absolute">
          <Image src={img1} alt="" priority={true} width="2048" height="2048" />
        </div>
        <div className="lg:col-start-2 lg:col-span-1 xl:col-start-1 xl:col-span-4 xl:row-start-1 xl:top-[25%] absolute">
          <Image src={img2} alt="" priority={true} width="2048" height="2048" />
        </div>
        <div className="invisible lg:visible lg:col-start-3 lg:col-span-1 xl:col-start-4 xl:col-span-4 xl:row-start-1 xl:top-[45%] absolute">
          <Image src={img3} alt="" priority={true} width="2048" height="2048" />
        </div>
      </div>
    </div>
  );
}
