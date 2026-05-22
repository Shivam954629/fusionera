import Link from "next/link";

const steps = [
  { no: "01", title: "Stall Booking", desc: "Contact our team to book your stall. Choose from various stall sizes and configurations. Pay the stall advance to confirm your booking." },
  { no: "02", title: "Exhibitor Registration", desc: "Complete your online exhibitor registration with your company details, product categories, and key contact information." },
  { no: "03", title: "Stall Allotment", desc: "Stall allotment is done on a first-come, first-served basis after payment confirmation. You will receive your stall number and hall map." },
  { no: "04", title: "Stall Setup", desc: "Setup begins one day before the show opens. Bare stalls and shell scheme stalls are both available. Bring your branding, products, and display materials." },
  { no: "05", title: "Show Days", desc: "The show runs for 4 days (July 4–7, 2026). Exhibitors get free passes for their team. Entry is strictly B2B — no retail visitors." },
  { no: "06", title: "Post-Show", desc: "Dismantling begins on the last day after closing time. Our team will share visitor enquiry data and post-show analytics within 7 working days." },
];

const faqs = [
  { q: "What is the stall size available?", a: "Stall sizes start from 9 sq. mt. (3×3) and go up to custom large formats. Both shell scheme and bare space are available." },
  { q: "What is included in the shell scheme stall?", a: "Shell scheme includes: panel walls, fascia board with your company name, carpet flooring, 1 table, 2 chairs, and basic lighting." },
  { q: "Can I bring my own stall design?", a: "Yes. Bare space exhibitors can bring their own custom fabricated stall. All designs must comply with venue safety guidelines." },
  { q: "How many exhibitor passes do I get?", a: "You receive exhibitor passes based on your stall size. Additional passes can be requested from our team." },
  { q: "Who can visit the show?", a: "Fusion The Era is strictly a B2B event. Only trade visitors — dealers, distributors, retailers, buyers, and industry professionals — are allowed." },
  { q: "When does the setup begin?", a: "Setup begins the day before the show opens. You will receive the exact setup schedule after stall allotment." },
];

export default function ExhibitorManualPage() {
  return (
    <section
      id="exhibitor-manual"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">Exhibitor Manual</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <p className="mt-4 text-md leading-7 text-black">
              Everything you need to know to exhibit at Fusion The Era — from booking to post-show.
            </p>

            <div className="mt-8 w-fit">
              <h3 className="text-xl font-bold text-[#00509d]">Step-by-Step Guide</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((s) => (
                <div key={s.no} className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-black mb-3" style={{ background: "#00509d" }}>{s.no}</div>
                  <h4 className="font-bold text-sm mb-1 text-[#00509d]">{s.title}</h4>
                  <p className="text-xs leading-6 text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 w-fit">
              <h3 className="text-xl font-bold text-[#00509d]">Key Show Information</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Venue", value: "Bharat Mandapam, New Delhi" },
                { label: "Dates", value: "July 4–7, 2026" },
                { label: "Edition", value: "1st Edition" },
                { label: "Format", value: "B2B Only" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 text-center bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-bold text-sm text-[#00509d]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 w-fit">
              <h3 className="text-xl font-bold text-[#00509d]">Frequently Asked Questions</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                  <p className="font-semibold text-sm text-[#00509d]">{f.q}</p>
                  <p className="text-sm text-gray-500 leading-6 mt-1.5">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="/exhibitors-registration" className="inline-block rounded px-8 py-3 text-white text-sm font-bold transition hover:opacity-90" style={{ background: "#00509d" }}>
                Register as Exhibitor
              </Link>
              <Link href="/contact" className="inline-block rounded px-8 py-3 text-sm font-semibold transition hover:opacity-80" style={{ color: "#00509d", border: "1px solid rgba(0,80,157,0.3)" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
