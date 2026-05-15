import React, { useEffect, useState } from "react";
import { textileSlides } from "@/components/util";

export default function Section1() {
  const [activeTextileSlide, setActiveTextileSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown
  useEffect(() => {
    const showDate = new Date("2026-07-04T10:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(showDate.getTime() - now.getTime(), 0);

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown(); // IMPORTANT FIX → refresh pe blank nahi dikhega

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // Slider
  useEffect(() => {
    if (!textileSlides?.length) return;

    const timer = setInterval(() => {
      setActiveTextileSlide((prev) => (prev + 1) % textileSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const goToPrevTextileSlide = () => {
    setActiveTextileSlide(
      (prev) => (prev - 1 + textileSlides.length) % textileSlides.length,
    );
  };

  const goToNextTextileSlide = () => {
    setActiveTextileSlide((prev) => (prev + 1) % textileSlides.length);
  };

  return (
    <section
      id="featured"
      className="relative isolate w-full overflow-hidden py-16 md:py-20"
    >
      {/* DARK BACKGROUND LIKE FOOTER */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#090f2d_0%,#0f1a4f_48%,#1a2f7f_100%)]"></div>

      {/* OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/35"></div>

      {/* GLOW EFFECTS */}
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#26d1ff]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[#ffb25a]/10 blur-3xl"></div>

      <div className="mx-auto grid w-[92%] max-w-7xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT */}
        <div className="px-4 md:px-8">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            Our Exhibitions
          </h1>

          <div className="mt-5">
            <h3 className="text-2xl font-semibold text-[#ffe3a6]">
              04–07 July 2026
            </h3>

            <h4 className="mt-2 text-xl leading-relaxed text-[#d9e7ff]">
              Bharat Mandapam, Pragati Maidan,
              <br />
              New Delhi, India
            </h4>
          </div>

          {/* COUNTDOWN */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8cecff]">
              Show Starts In
            </p>

            <div className="mt-4 grid grid-cols-4 gap-3 text-center">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <p className="text-2xl font-bold text-white">{item.value}</p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#d9e7ff]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#2f66ff] to-[#5b8cff] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Register as Visitor
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="px-4 md:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="relative h-80 overflow-hidden rounded-[1.7rem] md:h-[32rem]">
              {textileSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-all duration-700 ${
                    activeTextileSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#7de9ff]">
                      Textile Fest Highlight
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">
                      {slide.title}
                    </h3>

                    <p className="mt-1 text-white/85">{slide.subtitle}</p>
                  </div>
                </div>
              ))}

              {/* PREV */}
              <button
                onClick={goToPrevTextileSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
              >
                ‹
              </button>

              {/* NEXT */}
              <button
                onClick={goToNextTextileSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
              >
                ›
              </button>

              {/* DOTS */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {textileSlides.map((slide, index) => (
                  <button
                    key={slide.alt}
                    onClick={() => setActiveTextileSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeTextileSlide === index
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
