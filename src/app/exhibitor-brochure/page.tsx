import Link from "next/link";

export default function ExhibitorBrochurePage() {
  return (
    <section
      id="exhibitor-brochure"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">Exhibitor Brochure</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <p className="mt-4 text-md leading-7 text-black">
              India&apos;s dedicated B2B trade platform for Houseware, HORECA Ware, Stainless Steel, and Home Appliances.
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Edition", value: "1st Edition" },
                { label: "Dates", value: "July 4–7, 2026" },
                { label: "Venue", value: "Bharat Mandapam, Delhi" },
                { label: "Format", value: "B2B Only" },
              ].map((item) => (
                <div key={item.label} className="text-center py-4 px-3 rounded-xl bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1 text-black">{item.label}</p>
                  <p className="text-sm font-bold text-[#00509d]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 w-fit">
              <h3 className="text-xl font-bold text-[#00509d]">Product Catalogue</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <div className="mt-4 w-full rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
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
                style={{ background: "#00509d" }}
              >
                Download Catalogue PDF
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/exhibitors-registration" className="inline-block rounded px-8 py-3 text-white text-sm font-bold transition hover:opacity-90" style={{ background: "#00509d" }}>
                Register as Exhibitor
              </Link>
              <Link href="/contact" className="inline-block rounded px-8 py-3 text-sm font-semibold transition hover:opacity-80" style={{ color: "#00509d", border: "1px solid rgba(0,80,157,0.3)" }}>
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
