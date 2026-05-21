import Link from "next/link";

export default function ExhibitorBrochurePage() {
  return (
    <section
      id="exhibitor-brochure"
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>Exhibitor Brochure</h2>
      <p className="mt-2 text-lg leading-8" style={{ color: "#374151" }}>
        India&apos;s dedicated B2B trade platform for Houseware, HORECA Ware, Stainless Steel, and Home Appliances.
      </p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Edition", value: "1st Edition" },
          { label: "Dates", value: "July 4–7, 2026" },
          { label: "Venue", value: "Bharat Mandapam, Delhi" },
          { label: "Format", value: "B2B Only" },
        ].map((item) => (
          <div key={item.label} className="text-center py-4 px-3 rounded-xl bg-white" style={{ border: "1px solid rgba(12,17,72,0.1)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#374151" }}>{item.label}</p>
            <p className="text-sm font-bold" style={{ color: "#0c1148" }}>{item.value}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-xl font-bold" style={{ color: "#0c1148" }}>Product Catalogue</h3>
      <div className="mt-4 w-full rounded-xl overflow-hidden" style={{ border: "1px solid rgba(12,17,72,0.1)" }}>
        <iframe
          src="/catalogue-1.pdf"
          className="w-full"
          style={{ height: "80vh", minHeight: "600px" }}
          title="Product Catalogue"
        />
      </div>
      <div className="mt-4 text-center">
        <a
          href="/catalogue-1.pdf"
          download
          className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: "#0c1148" }}
        >
          Download Catalogue PDF
        </a>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href="/exhibitors-registration" className="inline-block rounded px-8 py-3 text-white text-sm font-bold transition hover:opacity-90" style={{ background: "#0c1148" }}>
          Register as Exhibitor
        </Link>
        <Link href="/contact" className="inline-block rounded px-8 py-3 text-sm font-semibold transition hover:opacity-80" style={{ color: "#0c1148", border: "1px solid rgba(12,17,72,0.3)" }}>
          Enquire
        </Link>
      </div>
    </section>
  );
}
