"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const exhibitorComments = [
  {
    name: "Arvind Malhotra",
    designation: "Director, SteelCraft Industries, Ludhiana",
    text: "We are going to exhibit in Fusion The Era show to connect directly with serious trade buyers across India. This B2B platform is the perfect opportunity to showcase our stainless steel cookware range and expand our dealership network to new cities.",
  },
  {
    name: "Meena Sharma",
    designation: "CEO, Royal Kitchenware Pvt. Ltd., Mumbai",
    text: "We are going to exhibit in Fusion The Era show with our complete HORECA and institutional-grade product line. We are confident the buyer quality here — hotel procurement managers, hypermarket chains, and distributors — will lead to real and lasting business.",
  },
  {
    name: "Harpreet Walia",
    designation: "MD, HomeEssentials Co., Amritsar",
    text: "We are going to exhibit in Fusion The Era show with our full range of cooking appliances and kitchen accessories. We are looking forward to meeting confirmed buyers, expanding our dealer base, and exploring new markets under one roof.",
  },
  {
    name: "Suresh Bajaj",
    designation: "Export Head, ClearGlass Exports, Firozabad",
    text: "We are going to exhibit in Fusion The Era show as a glassware manufacturer targeting both domestic and international buyers. The chance to meet importers, bulk buyers, and modern trade representatives in a single event is a massive opportunity for us.",
  },
  {
    name: "Anita Choudhary",
    designation: "Founder, DecorNest India, Jaipur",
    text: "We are going to exhibit in Fusion The Era show to launch our new home décor and gifting collection before a targeted B2B audience. Every conversation at this show is meaningful, and we are excited to build strong new buyer relationships.",
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
      <h3 className="text-[15px] font-extrabold uppercase tracking-[0.18em]" style={{ color: "#0B0F2B" }}>
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
            style={{ background: "#f0b429", border: "3px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 16px rgba(26,20,100,0.2)" }}
          >
            {c.name.charAt(0)}
          </div>
        )}

        {/* Name */}
        <p className="text-sm font-bold" style={{ color: "#0B0F2B" }}>{c.name}</p>
        {/* Designation */}
        <p className="text-xs font-medium mt-1 mb-5" style={{ color: "rgba(11,15,43,0.65)" }}>{c.designation}</p>
        {/* Comment */}
        <p className="text-sm leading-7 font-medium max-w-xs md:max-w-sm" style={{ color: "rgba(11,15,43,0.85)" }}>
          {c.text}
        </p>
      </div>

      {/* Arrow navigation */}
      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border flex items-center justify-center text-lg transition hover:text-white"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
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
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
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
          style={{ color: "#f0b429" }}
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
    <section className="w-full py-14 md:py-18" style={{ background: "#5B9BD5", borderTop: "4px solid #f0b429" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-white/10">
          {/* Exhibitor comments — fully visible */}
          <CommentCarousel
            comments={liveExhibitor.length ? liveExhibitor : exhibitorComments}
            title="Exhibitors' Comments"
            viewAllHref="/exhibitorcomments"
          />
          {/* Visitor comments — blurred, coming soon */}
          <div className="relative">
            <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }}>
              <CommentCarousel
                comments={visitorComments}
                title="Visitor's Comments"
                viewAllHref="/comments"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
