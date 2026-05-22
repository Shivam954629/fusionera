import Link from "next/link";

export default function ContactPage() {
  return (
    <section id="contact" className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]" data-reveal-delay="50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">Contact Us</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00509d]">Head Office — Delhi</p>
                <p className="font-bold text-sm text-[#00509d]">Mr. Pawan Singh</p>
                <p className="text-sm text-gray-500 mt-0.5">V-Tech Innovation Services</p>
                <p className="text-sm text-gray-500 leading-6">Ghaziabad, U.P. 201014</p>
                <a href="tel:+919315700590" className="block text-sm mt-3 transition hover:underline text-[#00509d]">📞 +91 93157 00590</a>
                <a href="mailto:pawan@fusiontheera.com" className="block text-sm mt-1 transition hover:underline text-[#00509d]">✉️ pawan@fusiontheera.com</a>
              </div>

              <div className="p-5 rounded-xl bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00509d]">Mumbai Office</p>
                <p className="font-bold text-sm text-[#00509d]">Mr. Jasvinder Singh Chaudhary</p>
                <p className="text-sm text-gray-500 mt-0.5">Mumbai, Maharashtra</p>
                <a href="tel:+918588892885" className="block text-sm mt-3 transition hover:underline text-[#00509d]">📞 +91 85888 92885</a>
                <a href="mailto:jasvinder@fusiontheera.com" className="block text-sm mt-1 transition hover:underline text-[#00509d]">✉️ jasvinder@fusiontheera.com</a>
              </div>

              <div className="p-5 rounded-xl bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00509d]">General Enquiries</p>
                <p className="font-bold text-sm text-[#00509d]">Fusion The Era</p>
                <p className="text-sm text-gray-500 mt-0.5">V-Tech Innovation Services</p>
                <a href="mailto:info@fusiontheera.com" className="block text-sm mt-3 transition hover:underline text-[#00509d]">✉️ info@fusiontheera.com</a>
              </div>

              <div className="p-5 rounded-xl bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00509d]">Venue</p>
                <p className="font-semibold text-sm text-[#00509d]">Bharat Mandapam</p>
                <p className="text-sm text-gray-500 mt-1 leading-6">Pragati Maidan, New Delhi — 110001</p>
                <p className="text-sm font-medium mt-2 text-[#00509d]">July 4–7, 2026</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00509d]">Follow Us</p>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/fusiontheera" target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-85"
                    style={{ background: "#e84030" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/share/1EiPZcSKdq/" target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-85"
                    style={{ background: "#00509d" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
              <Link
                href="/enquiry"
                className="inline-block rounded px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "#00509d" }}
              >
                Send Enquiry →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
