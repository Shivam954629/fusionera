"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const exhibitorComments = [
  {
    name: "Rajesh Kumar",
    designation: "Director, HomePro India",
    text: "Fusion The Era gave us direct access to thousands of serious trade buyers in just four days. We finalized new dealerships across 8 cities and received bulk inquiries for our stainless steel cookware range. An unmatched B2B platform.",
  },
  {
    name: "Sunita Agarwal",
    designation: "CEO, Stainless World Exports",
    text: "We exhibited our HORECA and institutional-grade stainless steel products and were overwhelmed with quality footfall. The buyers here are decision-makers — hotel procurement managers, hypermarket buyers, and distributors. Real business happens here.",
  },
  {
    name: "Vikram Singh",
    designation: "MD, KitchenPro Solutions",
    text: "From cooking ranges to kitchen accessories, our full product line got tremendous response. The visitor quality at Fusion The Era is exceptional. We booked confirmed orders during the show itself and expanded our dealer base significantly.",
  },
  {
    name: "Deepak Gupta",
    designation: "Export Head, GlassArts India",
    text: "As a glassware manufacturer targeting both domestic and international markets, this show was the right platform. We met importers, bulk buyers, and modern trade representatives in one place. Our export inquiries doubled compared to last year.",
  },
  {
    name: "Pooja Ahluwalia",
    designation: "Founder, CasaVerde Home",
    text: "We launched our new home décor and gifting line at Fusion The Era and the response exceeded our expectations. The targeted B2B audience meant every conversation was meaningful. We are already booked for next year.",
  },
];

const visitorComments = [
  {
    name: "Priya Mehta",
    designation: "Purchase Manager, Metro Retail Group",
    text: "The best sourcing event for houseware and home appliances in North India. We discovered 12 new suppliers for our glassware and tableware categories and finalized exclusive distribution agreements on the spot.",
  },
  {
    name: "Amit Sharma",
    designation: "Wholesale Distributor, Delhi",
    text: "I have attended this show for three consecutive years and it keeps getting better. This edition we found new brands in brass & silver, baking ware, and plastic storage — all under one roof. Saves months of market scouting.",
  },
  {
    name: "Neha Joshi",
    designation: "Owner, HomeDécor Superstore, Jaipur",
    text: "Fusion The Era is where we plan our buying for the year. The range of home décor, cookware, and gifting products on display is simply unmatched. We always leave with signed deals and strong new supplier relationships.",
  },
  {
    name: "Sandeep Verma",
    designation: "Regional Buyer, HomeFirst Chain",
    text: "Outstanding quality of exhibitors. We sourced RO water purifiers, cooking ranges, and kitchen accessories from brands we had never encountered before. The show saves us months of individual vendor visits.",
  },
  {
    name: "Reena Kapoor",
    designation: "Interior Consultant & Buyer",
    text: "As someone who sources home décor and gifting products regularly, this show is a goldmine. The variety from ceramic tableware to brass artefacts is exceptional. Prices are trade-competitive and exhibitors are genuinely keen to do business.",
  },
];

const AUTO_INTERVAL = 4000;

function CommentCarousel({
  comments,
  title,
  viewAllHref,
}: {
  comments: typeof exhibitorComments;
  title: string;
  viewAllHref: string;
}) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + comments.length) % comments.length);
  const next = () => setIdx((i) => (i + 1) % comments.length);

  useEffect(() => {
    const t = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const c = comments[idx];

  return (
    <div className="flex flex-col items-center text-center px-2 md:px-10">
      {/* Title */}
      <h3 className="text-[15px] font-extrabold uppercase tracking-[0.18em]" style={{ color: "#1a1464" }}>
        {title}
      </h3>
      {/* Simple line */}
      <div className="h-0.5 w-16 mt-3 mb-8 mx-auto" style={{ background: "#f0b429" }} />

      {/* Card area */}
      <div className="relative w-full min-h-[260px] flex flex-col items-center">

        {/* Avatar */}
        {(c as typeof c & { photo_url?: string }).photo_url ? (
          <img
            src={(c as typeof c & { photo_url?: string }).photo_url}
            alt={c.name}
            className="w-16 h-16 rounded-full object-cover mb-4 flex-shrink-0 relative z-10"
            style={{ border: "3px solid #fff", boxShadow: "0 4px 16px rgba(26,20,100,0.2)" }}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-black mb-4 flex-shrink-0 relative z-10"
            style={{ background: "#1a1464", border: "3px solid #fff", boxShadow: "0 4px 16px rgba(26,20,100,0.2)" }}
          >
            {c.name.charAt(0)}
          </div>
        )}

        {/* Name */}
        <p className="text-sm font-bold" style={{ color: "#1a1464" }}>{c.name}</p>
        {/* Designation */}
        <p className="text-xs font-medium mt-1 mb-5" style={{ color: "#1a1464" }}>{c.designation}</p>
        {/* Comment */}
        <p className="text-sm leading-7 font-medium max-w-xs md:max-w-sm" style={{ color: "#1a1464" }}>
          {c.text}
        </p>
      </div>

      {/* Arrow navigation */}
      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border flex items-center justify-center text-lg transition hover:text-white"
          style={{ borderColor: "rgba(26,20,100,0.2)", color: "rgba(26,20,100,0.45)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1a1464"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {comments.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? "16px" : "6px",
                height: "6px",
                background: i === idx ? "#f0b429" : "rgba(26,20,100,0.15)",
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-8 h-8 rounded-full border flex items-center justify-center text-lg transition hover:text-white"
          style={{ borderColor: "rgba(26,20,100,0.2)", color: "rgba(26,20,100,0.45)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#1a1464"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          ›
        </button>
      </div>

      {/* Read More */}
      <div className="mt-8">
        <Link
          href={viewAllHref}
          className="text-sm font-semibold transition hover:underline"
          style={{ color: "#e84030" }}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default function CommentsSection() {
  type LiveComment = { name: string; designation: string; text: string; is_published?: boolean; photo_url?: string };
  const [liveExhibitor, setLiveExhibitor] = useState<LiveComment[]>([]);
  const [liveVisitor, setLiveVisitor] = useState<LiveComment[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const [er, vr] = await Promise.all([
        fetch("/api/admin/comments?type=exhibitor", { cache: "no-store" }),
        fetch("/api/admin/comments?type=visitor", { cache: "no-store" }),
      ]);
      const [ed, vd] = await Promise.all([er.json(), vr.json()]);
      if (ed.data?.length) setLiveExhibitor((ed.data as LiveComment[]).filter((c) => c.is_published));
      if (vd.data?.length) setLiveVisitor((vd.data as LiveComment[]).filter((c) => c.is_published));
    } catch {}
  }, []);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  return (
    <section className="w-full py-14 md:py-18" style={{ background: "#cce8f5", borderTop: "4px solid #f0b429" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#1a1464]/10">
          <CommentCarousel
            comments={liveExhibitor.length ? liveExhibitor : exhibitorComments}
            title="Exhibitors' Comments"
            viewAllHref="/exhibitorcomments"
          />
          <CommentCarousel
            comments={liveVisitor.length ? liveVisitor : visitorComments}
            title="Visitor's Comments"
            viewAllHref="/comments"
          />
        </div>
      </div>
    </section>
  );
}
