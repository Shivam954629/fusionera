"use client";
import { useState } from "react";

const ACCENT = "#f0b429";

const exhibitorComments = [
  {
    name: "Rajesh Kumar",
    designation: "Director, HomePro India",
    text: "Fusion The Era provided an excellent platform to showcase our products and interact directly with serious business buyers. The overall visitor quality and professional environment made the experience highly productive.",
  },
  {
    name: "Sunita Agarwal",
    designation: "CEO, Stainless World",
    text: "A well-organised show with a focused B2B audience. We were able to expand our dealer network significantly and received quality leads from 12+ new cities. Definitely a must-attend for brands targeting India.",
  },
  {
    name: "Vikram Singh",
    designation: "MD, HORECA Solutions",
    text: "The show gave us direct access to hotel chains, hypermarkets and institutional buyers under one roof. The quality of footfall was exceptional and the stall fabrication support made it seamless for us.",
  },
];

const visitorComments = [
  {
    name: "Priya Mehta",
    designation: "Purchase Manager, RetailMart",
    text: "A well-organized trade platform with a strong mix of brands, products, and industry professionals. The exhibition created meaningful business interactions and offered great exposure to new trends and innovations.",
  },
  {
    name: "Amit Sharma",
    designation: "Distributor, Delhi",
    text: "Fusion The Era is our go-to event for sourcing new houseware products. We found 5 new suppliers this edition alone. The range of products and the quality of exhibitors is consistently excellent.",
  },
  {
    name: "Neha Joshi",
    designation: "Owner, HomeDécor Store",
    text: "Best B2B show for houseware in North India. The products on display were diverse, innovative, and competitively priced. We always return with new business connections and better product knowledge.",
  },
];

function CommentCarousel({
  comments,
  title,
}: {
  comments: typeof exhibitorComments;
  title: string;
}) {
  const [idx, setIdx] = useState(0);
  const c = comments[idx];

  return (
    <div className="flex flex-col items-center text-center px-2 md:px-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[#1a1464] mb-1">
        {title}
      </h3>
      <div className="h-px w-16 bg-[#1a1464]/20 mb-6 mx-auto" />

      <div className="relative w-full min-h-[240px] flex flex-col items-center justify-center py-2">
        <div
          className="text-6xl font-serif leading-none select-none mb-2"
          style={{ color: ACCENT, opacity: 0.3 }}
        >
          "
        </div>

        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3"
          style={{ background: "#1a1464" }}
        >
          {c.name.charAt(0)}
        </div>

        <p className="font-bold text-[#1a1464] text-sm">{c.name}</p>
        <p className="text-xs text-gray-400 mb-4">{c.designation}</p>
        <p className="text-sm leading-7 text-gray-500 max-w-xs md:max-w-sm">{c.text}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setIdx((i) => (i - 1 + comments.length) % comments.length)}
          className="w-8 h-8 rounded-full border border-[#1a1464]/15 flex items-center justify-center text-[#1a1464]/50 hover:text-[#1a1464] transition text-base"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {comments.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? "16px" : "6px",
                height: "6px",
                background: i === idx ? ACCENT : "rgba(26,20,100,0.15)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx((i) => (i + 1) % comments.length)}
          className="w-8 h-8 rounded-full border border-[#1a1464]/15 flex items-center justify-center text-[#1a1464]/50 hover:text-[#1a1464] transition text-base"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function CommentsSection() {
  return (
    <section className="w-full py-12 md:py-16" style={{ background: "#f0f4f8" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#1a1464]/10">
          <CommentCarousel comments={exhibitorComments} title="Exhibitors' Comments" />
          <CommentCarousel comments={visitorComments} title="Visitor's Comments" />
        </div>
      </div>
    </section>
  );
}
