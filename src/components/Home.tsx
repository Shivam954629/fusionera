"use client";
import React from "react";
import Section1 from "@/components/sections/Section1";
import Section3 from "@/components/sections/Section3";
import GalleryCarousel from "@/components/GalleryCarousel";
import VideosSection from "@/components/VideosSection";
import CommentsSection from "@/components/CommentsSection";
import ExhibitorMarquee from "@/components/ExhibitorMarquee";

export default function Home() {
  return (
    <main>
      <Section1 />
      <Section3 />
      <GalleryCarousel />
      <VideosSection />
      <CommentsSection />
      <ExhibitorMarquee />
    </main>
  );
}
