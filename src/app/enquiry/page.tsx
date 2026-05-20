"use client";
import { useState } from "react";

const Divider = () => <div className="h-px w-20 bg-[#1a1464]/20 my-4" />;

const inputCls = "w-full px-3 py-2 border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#1a1464] transition";

type FormState = {
  title: string; first_name: string; last_name: string;
  company: string; designation: string; email: string;
  phone: string; address: string; pin_code: string;
  city: string; state: string; country: string;
  message: string; consent: boolean;
};

const EMPTY: FormState = {
  title: "", first_name: "", last_name: "", company: "", designation: "",
  email: "", phone: "", address: "", pin_code: "", city: "", state: "",
  country: "India", message: "", consent: false,
};

export default function EnquiryPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>

      {/* Hero */}
      <section className="w-full py-12 md:py-16" style={{ background: "#1a1464" }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-2">Fusion The Era 2026</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Enquiry Form</h1>
          <div className="h-px w-20 bg-white/20 mx-auto mt-4" />
        </div>
      </section>

      {/* Form */}
      <section className="w-full py-12 md:py-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10">

          <h2 className="text-lg font-black uppercase tracking-[0.12em] text-[#1a1464]">Enquiry Form</h2>
          <Divider />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-6">
            Please fill the below form with your query
          </p>

          {sent ? (
            <div className="rounded-xl p-10 text-center bg-white" style={{ border: "1px solid rgba(26,20,100,0.1)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4" style={{ background: "#e84030" }}>✓</div>
              <h3 className="font-bold text-[#1a1464] text-lg">Enquiry Submitted!</h3>
              <p className="text-sm text-gray-500 mt-2">Our team will get back to you within 24 hours.</p>
              <button
                onClick={() => { setSent(false); setForm(EMPTY); }}
                className="mt-5 inline-block rounded px-7 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "#e84030" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8" style={{ border: "1px solid #d1d5db" }}>

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company Name <span className="text-[#e84030]">*</span></label>
                  <input required value={form.company} onChange={e => set("company", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Designation <span className="text-[#e84030]">*</span></label>
                  <input required value={form.designation} onChange={e => set("designation", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title <span className="text-[#e84030]">*</span></label>
                  <select required value={form.title} onChange={e => set("title", e.target.value)} className={inputCls}>
                    <option value="">Select</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                    <option>Dr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">First Name <span className="text-[#e84030]">*</span></label>
                  <input required value={form.first_name} onChange={e => set("first_name", e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name <span className="text-[#e84030]">*</span></label>
                  <input required value={form.last_name} onChange={e => set("last_name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email <span className="text-[#e84030]">*</span></label>
                  <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Address <span className="text-[#e84030]">*</span></label>
                  <input required value={form.address} onChange={e => set("address", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pin Code <span className="text-[#e84030]">*</span></label>
                  <input required value={form.pin_code} onChange={e => set("pin_code", e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City <span className="text-[#e84030]">*</span></label>
                  <input required value={form.city} onChange={e => set("city", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State <span className="text-[#e84030]">*</span></label>
                  <input required value={form.state} onChange={e => set("state", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Country <span className="text-[#e84030]">*</span></label>
                  <input required value={form.country} onChange={e => set("country", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Telephone <span className="text-[#e84030]">*</span></label>
                  <input required value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Query <span className="text-[#e84030]">*</span></label>
                  <input required value={form.message} onChange={e => set("message", e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* Consent + Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="flex items-start gap-2 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={e => set("consent", e.target.checked)}
                    className="mt-0.5 accent-[#1a1464] shrink-0"
                  />
                  <span className="text-xs text-gray-600 leading-5">
                    I agree to receive updates via WhatsApp, RCS, SMS &amp; Email
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 px-10 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#f0b429" }}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          )}
        </div>
      </section>
    </div>
  );
}
