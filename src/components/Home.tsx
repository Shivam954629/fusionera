"use client";
import React from "react";
import Section1 from "@/components/sections/Section1";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import VideosSection from "@/components/VideosSection";
import Feedback from "@/components/Feedback";

export default function Home() {
  return (
    <main>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <VideosSection />
      <Feedback />
    </main>
  );
}
