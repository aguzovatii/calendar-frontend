"use client";
import { Button } from "@/components/ui/button";
import React, { Component } from "react";
import Image from "next/image";
import img1 from "./sport.svg";
import img2 from "./calendar.svg";
import img3 from "./coding.svg";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      <div className="grid grid-rows-3 basis-1/2 h-full">
        <div></div>
        <div className="grid grid-rows-4 items-center justify-items-center">
          <div>
            <p className="font-medium text-6xl text-[#77AD86] blur-[1.5px]">
              Welcome
            </p>
          </div>
          <div>
            <p className="font-medium text-3xl text-black ml-15 mt-2">
              This is a calendar for your habits
            </p>
          </div>
          <div>
            <a
              href="https://calendar-team.github.io/calendar-docs/"
              className="font-medium text-2xl text-black ml-20"
            >
              Feel free to learn more about this app
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              className="bg-gradient-to-r from-[#1D93C6] to-[#77AD86]"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started
            </Button>
            <Button
              className="bg-gradient-to-r from-[#1D93C6] to-[#77AD86]"
              onClick={() => router.push("/auth/signin")}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-1 grid-cols-8 basis-1/2 h-full relative">
        <div className="col-start-4 col-span-4 row-start-1 top-[5%] absolute">
          <Image src={img1} alt="" priority={false} width="2048" height="2048"/>
        </div>
        <div className="col-start-1 col-span-4 row-start-1 top-[25%] absolute">
          <Image src={img2} alt="" priority={false} width="2048" height="2048"/>
        </div>
        <div className="2xl:col-start-4 col-span-4 row-start-1 top-[45%] absolute">
          <Image src={img3} alt="" priority={false} width="2048" height="2048"/>
        </div>
      </div>
    </div>
  );
}
