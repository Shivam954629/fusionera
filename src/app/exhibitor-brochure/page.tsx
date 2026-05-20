import Link from "next/link";

export default function ExhibitorBrochurePage() {
  return (
    <main>
      {/* Hero */}
      <section className="w-full py-14 md:py-20" style={{ background: "#1a1464" }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-2">
            1st Edition · July 4–7, 2026 · Bharat Mandapam, Delhi
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Exhibitor Brochure
          </h1>
          <div className="h-px w-20 bg-white/20 mx-auto my-4" />
          <p className="text-sm text-white/70 max-w-xl mx-auto mt-3">
            India&apos;s dedicated B2B trade platform for Houseware, HORECA Ware, Stainless Steel, and Home Appliances.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              href="/exhibitors-registration"
              className="inline-block rounded px-8 py-3 text-sm font-semibold text-white transition"
              style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.4)" }}
            >
              Register as Exhibitor
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded px-8 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Key Show Info */}
      <section className="w-full py-10 bg-white border-b border-[#1a1464]/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Edition", value: "1st Edition" },
              { label: "Dates", value: "July 4–7, 2026" },
              { label: "Venue", value: "Bharat Mandapam, Delhi" },
              { label: "Format", value: "B2B Only" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center py-6 px-4 rounded-xl"
                style={{ background: "#f0f4f8", border: "1px solid rgba(26,20,100,0.07)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#1a1464]/50 mb-1">{item.label}</p>
                <p className="text-base font-bold text-[#1a1464]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalogue PDF */}
      <section className="w-full py-12 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e84030] mb-1">Our Range</p>
            <h2 className="text-xl md:text-2xl font-bold text-[#1a1464]">Product Catalogue</h2>
            <div className="h-px w-20 bg-[#1a1464]/20 mt-3" />
          </div>

          {/* PDF viewer */}
          <div className="w-full rounded-lg overflow-hidden" style={{ border: "1px solid rgba(26,20,100,0.1)" }}>
            <iframe
              src="/catalogue-1.pdf"
              className="w-full"
              style={{ height: "80vh", minHeight: "600px" }}
              title="Product Catalogue"
            />
          </div>

          {/* Download fallback */}
          <div className="mt-4 text-center">
            <a
              href="/catalogue-1.pdf"
              download
              className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "#1a1464" }}
            >
              Download Catalogue PDF
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-14" style={{ background: "#1a1464" }}>
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Secure Your Stall — 1st Edition
          </h2>
          <p className="text-sm text-white/60 mb-8">
            Join India&apos;s premier B2B houseware trade show. Limited stalls available for July 4–7, 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/exhibitors-registration"
              className="inline-block rounded px-8 py-3 text-sm font-semibold text-white transition"
              style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.4)" }}
            >
              Register Now
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded px-8 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition"
            >
              Enquire
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
