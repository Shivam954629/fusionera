import React, { useEffect, useState } from 'react'
import { textileSlides } from '@/components/util';

export default function Section1() {
  const [activeTextileSlide, setActiveTextileSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const showDate = new Date('2026-07-04T10:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(showDate.getTime() - now.getTime(), 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTextileSlide((prev) => (prev + 1) % textileSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [textileSlides.length]);

  const goToPrevTextileSlide = () => {
    setActiveTextileSlide((prev) => (prev - 1 + textileSlides.length) % textileSlides.length);
  };

  const goToNextTextileSlide = () => {
    setActiveTextileSlide((prev) => (prev + 1) % textileSlides.length);
  };

  return (
    <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
      <video
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="./images/slider/houseware.png"
        aria-hidden="true"
      >
        <source src="/videos/video-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(27,102,255,0.38),transparent_50%),radial-gradient(circle_at_82%_16%,rgba(19,220,255,0.24),transparent_38%),linear-gradient(112deg,rgba(9,15,44,0.94)_5%,rgba(9,15,44,0.78)_44%,rgba(6,12,38,0.86)_100%)]" aria-hidden="true"></div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#060d29]/85 via-transparent to-[#0a1747]/55" aria-hidden="true"></div>
      <div className="mx-auto grid w-[92%] max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal-on-scroll reveal-left px-4 md:px-8" data-reveal-delay="0">
          {/* <p
            className="mb-4 inline-flex rounded-md border border-[#7ef0ff]/70 bg-[#0c1b56]/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#b6f8ff] shadow-[0_0_24px_rgba(70,201,255,0.2)] backdrop-blur-sm">
            Houseware • Home Decor • Textile • Furniture
          </p> */}
          <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.6)] md:text-5xl">
            <span className="text-white">Our Exhibitions</span>
          </h1><br />
          <h3 className="text-2xl leading-tight text-[#d9e7ff] drop-shadow-[0_5px_20px_rgba(0,0,0,0.65)] md:text-2xl">
            <span className="text-[#d9e7ff]">04–07 July 2026</span><br />
          </h3>
          <h4 className="text-2xl leading-tight text-[#c8dcff] drop-shadow-[0_5px_20px_rgba(0,0,0,0.65)] md:text-2xl">
            <span className="text-[#c8dcff]">Bharat Mandapam, Pragati Maidan, New Delhi, India</span>
          </h4>
          <br />
          <div className="rounded-xl border border-white/30 bg-[linear-gradient(120deg,rgba(255,255,255,0.93),rgba(240,247,255,0.85),rgba(255,247,236,0.84))] p-4 shadow-[0_14px_35px_rgba(7,18,56,0.32)] backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4464ac]">Show Starts In</p>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <div className="rounded-lg bg-white/85 p-2">
                <p className="text-xl font-bold text-[#1b2a52]">{countdown.days}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5f6f97]">Days</p>
              </div>
              <div className="rounded-lg bg-white/85 p-2">
                <p className="text-xl font-bold text-[#1b2a52]">{countdown.hours}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5f6f97]">Hours</p>
              </div>
              <div className="rounded-lg bg-white/85 p-2">
                <p className="text-xl font-bold text-[#1b2a52]">{countdown.minutes}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5f6f97]">Minutes</p>
              </div>
              <div className="rounded-lg bg-white/85 p-2">
                <p className="text-xl font-bold text-[#1b2a52]">{countdown.seconds}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5f6f97]">Seconds</p>
              </div>
            </div>
            <a
              href="#contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#264cc9] to-[#3c7af3] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Register as Visitor
            </a>
          </div>
        </div>

        <div className="grid gap-4 px-4 md:px-8 reveal-on-scroll reveal-right" data-reveal-delay="100">
          <div className="surface rounded-md border border-white/30 bg-white/10 p-6 shadow-[0_20px_38px_rgba(6,14,44,0.4)] backdrop-blur-md">
            <div id="hot-deal-slider" className="relative mb-4 h-80 overflow-hidden rounded-lg md:h-[28rem]">
              {textileSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`hot-deal-slide absolute inset-0 transition-all duration-700 ease-out ${activeTextileSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1736]/75 via-[#0f1736]/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#7de9ff]">Textile Fest Highlight</p>
                    <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">{slide.title}</h3>
                    <p className="mt-1 text-sm text-white/85 md:text-base">{slide.subtitle}</p>
                  </div>
                </div>
              ))}
              <button id="hot-deal-prev" onClick={goToPrevTextileSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/50"
                aria-label="Previous slide">
                ‹
              </button>
              <button id="hot-deal-next" onClick={goToNextTextileSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/50"
                aria-label="Next slide">
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {textileSlides.map((slide, index) => (
                  <button
                    key={slide.alt}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setActiveTextileSlide(index)}
                    className={`hot-deal-dot h-2 w-2 rounded-full transition-all ${activeTextileSlide === index ? 'w-7 bg-white/95' : 'bg-white/45'
                      }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
