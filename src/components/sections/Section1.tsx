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

    updateCountdown();

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
      className="relative isolate w-full overflow-hidden py-8 sm:py-10 md:py-14 lg:py-16"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#090f2d_0%,#0f1a4f_48%,#1a2f7f_100%)]"></div>

      {/* OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/35"></div>

      {/* GLOW EFFECTS */}
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#26d1ff]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[#ffb25a]/10 blur-3xl"></div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-5 px-4 sm:px-6 md:gap-8 lg:grid-cols-2 lg:px-10">
        {/* LEFT SIDE */}
        <div className="flex h-full min-w-0 flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:rounded-[2rem]">
          {/* LOGO */}
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full max-w-[18rem] items-center justify-center rounded-xl border border-white/30 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
              <img
                src="/images/logo.jpeg"
                alt="Fusionera"
                className="h-auto w-full max-w-[14rem] object-contain"
              />
            </div>
          </div>

          {/* TITLE */}
          <h1 className="mt-5 text-center text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Exhibitions
          </h1>

          {/* DATE */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent via-[#ffd64d] to-transparent sm:block"></span>

            <div className="rounded-xl border border-white/20 bg-[#101a43]/50 px-3 py-2 backdrop-blur-xl sm:px-4">
              <p className="text-center text-base font-black text-[#ffd238] sm:text-xl">
                4<sup className="text-[0.5em]">th</sup>, 5
                <sup className="text-[0.5em]">th</sup>, 6
                <sup className="text-[0.5em]">th</sup>, 7
                <sup className="text-[0.5em]">th</sup>
                <span className="mx-2 text-white">JULY</span>
                2026
              </p>
            </div>

            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent via-[#ffd64d] to-transparent sm:block"></span>
          </div>

          {/* LOCATION */}
          <div className="mt-5 flex items-start justify-center gap-3 text-center text-white">
            <div className="mt-1">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current text-white"
              >
                <path d="M12 2.25a7.6 7.6 0 0 0-7.6 7.6c0 5.73 7.6 12.1 7.6 12.1s7.6-6.37 7.6-12.1A7.6 7.6 0 0 0 12 2.25Zm0 10.5a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Z" />
              </svg>
            </div>

            <h4 className="text-[clamp(1rem,1.6vw,1.3rem)] font-semibold leading-snug">
              Bharat Mandapam, Pragati Maidan,
              <br />
              New Delhi, India
            </h4>
          </div>

          {/* COUNTDOWN */}
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.08] p-3 shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-4">
            <p className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-[#8cecff]">
              SHOW STARTS IN
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-[#111832]/60 px-2 py-3 text-center"
                >
                  <p className="text-[clamp(1.2rem,2vw,1.8rem)] font-black text-white">
                    {String(item.value).padStart(2, "0")}
                  </p>

                  <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-wide text-white/80">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <a
              href="/visitor-registration"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] px-5 py-3 text-[clamp(0.95rem,1.5vw,1.2rem)] font-extrabold text-white shadow-[0_10px_30px_rgba(96,165,250,0.32)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_14px_35px_rgba(96,165,250,0.35)]"
            >
              Register Now
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex h-full min-w-0">
          <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4 lg:rounded-[2rem]">
            <div className="relative h-[320px] overflow-hidden rounded-[1.35rem] sm:h-[420px] lg:h-full lg:min-h-[500px] lg:rounded-[1.7rem]">
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
                    className="h-full w-full object-cover object-top"
                  />
                  </div>

             
              ))}

              {/* PREV BUTTON */}
              <button
                onClick={goToPrevTextileSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
              >
                ‹
              </button>

              {/* NEXT BUTTON */}
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
