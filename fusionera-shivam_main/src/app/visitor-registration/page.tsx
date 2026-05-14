"use client";
import { useState, useEffect } from "react";

type Stage = "otp-phone" | "otp-verify" | "form" | "complete";

const STEPS = [
  "Basic Details",
  "Address Details",
  "Business Profile",
  "Product Interests",
  "Visit Purpose",
  "Annual Buying",
  "Additional Information",
  "Brands & Products",
  "Final Submission",
];

const PRODUCT_OPTIONS = [
  "House Ware",
  "Horeca",
  "Stainless Steel",
  "Home Appliances",
  "Cookware",
  "Tableware",
  "Kitchen Accessories",
  "Storage Solutions",
  "Cleaning Products",
  "Bathroom Accessories",
  "Furniture",
  "Lighting",
  "Textiles",
  "Gifts & Handicrafts",
  "Other",
];
const BUSINESS_TYPES = [
  "Retailer",
  "Wholesaler",
  "Distributor",
  "Manufacturer",
  "Importer/Exporter",
  "E-commerce Seller",
  "Hotel/Restaurant",
  "Supermarket",
  "Startup Brand",
  "Buying Agent",
  "Other",
];
const DESIGNATIONS = [
  "Owner/Proprietor",
  "Director",
  "Manager",
  "Purchase Manager",
  "Marketing Manager",
  "Sales Executive",
  "Other",
];
const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const ANNUAL_BUYING = [
  "Less than ₹10 Lakh",
  "₹10–50 Lakh",
  "₹50 Lakh–1 Crore",
  "₹1–5 Crore",
  "More than ₹5 Crore",
];
const HOW_HEARD = [
  "Social Media",
  "Email",
  "Friend/Colleague",
  "Online Search",
  "Magazine/Newspaper",
  "Previous Year",
  "Other",
];

export default function VisitorRegistrationPage() {
  const [stage, setStage] = useState<Stage>("otp-phone");
  const [visitorType, setVisitorType] = useState<"indian" | "international">(
    "indian",
  );
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [visitorId, setVisitorId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [regNo, setRegNo] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    photo_url: "",
    invited_by: "",
    title: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    designation: "",
    company: "",
    email: "",
    country: "India",
    business_card_front: "",
    business_card_back: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    business_type: "",
    nature_of_business: "",
    annual_turnover: "",
    product_interests: [] as string[],
    visit_purpose: [] as string[],
    annual_buying: "",
    how_did_you_hear: "",
    additional_notes: "",
    brands_interested: "",
  });

  // OTP timer
  useEffect(() => {
    if (otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer((p) => p - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpTimer]);

  const sendOTP = async () => {
    if (!phone) {
      setError("Please enter mobile number.");
      return;
    }
    if (!agreed) {
      setError("Please agree to receive updates.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, visitorType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess("OTP sent successfully.");
      setStage("otp-verify");
      setOtpTimer(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setVisitorId(data.visitorId);
      setStage("form");
      setSuccess("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const saveStep = async (step: number) => {
    setLoading(true);
    setError("");
    try {
      await fetch("/api/registration/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          step,
          data: {
            ...formData,
            product_interests: JSON.stringify(formData.product_interests),
            visit_purpose: JSON.stringify(formData.visit_purpose),
          },
        }),
      });
      if (step < 8) {
        setCurrentStep(step + 1);
      } else {
        // Final submit
        const res = await fetch("/api/registration/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setRegNo(data.regNo);
        setQrCode(data.qrCode);
        setStage("complete");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const inputStyle = {
    background: "var(--app-panel-soft)",
    border: "1px solid var(--app-border)",
    color: "var(--app-text)",
  };
  const labelCls = "block text-sm font-semibold mb-1.5";
  const labelStyle = { color: "var(--app-text)" };

  return (
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--app-text)" }}
          >
            Visitor Registration
          </h1>
          {stage === "otp-phone" && (
            <p className="text-sm" style={{ color: "var(--app-muted)" }}>
              Choose how you want to receive your OTP to continue
            </p>
          )}
        </div>

        {/* ── OTP PHONE STAGE ── */}
        {stage === "otp-phone" && (
          <div className="max-w-md mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              {/* Tabs */}
              <div
                className="flex border-b"
                style={{ borderColor: "var(--app-border)" }}
              >
                {(["indian", "international"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setVisitorType(t)}
                    className={`flex-1 py-3.5 text-sm font-semibold transition ${visitorType === t ? "bg-white text-blue-700 border-b-2 border-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
                    style={
                      visitorType !== t
                        ? { background: "var(--app-panel-soft)" }
                        : {}
                    }
                  >
                    {t === "indian"
                      ? "Indian Visitor"
                      : "International Visitor"}
                  </button>
                ))}
              </div>

              <div className="px-8 py-8 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg,#b8860b,#d4a017)",
                  }}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ color: "var(--app-text)" }}
                >
                  Verify Mobile
                </h2>

                <div className="flex mb-4">
                  <div
                    className="px-4 py-2.5 rounded-l-xl text-sm font-medium border-r-0 flex-shrink-0"
                    style={{
                      background: "var(--app-panel-soft)",
                      border: "1px solid var(--app-border)",
                      color: "var(--app-text)",
                    }}
                  >
                    + {visitorType === "indian" ? "91" : "Intl"}
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="Mobile Number"
                    maxLength={10}
                    className="flex-1 px-4 py-2.5 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={{
                      background: "var(--app-panel-soft)",
                      border: "1px solid var(--app-border)",
                      borderLeft: "none",
                      color: "var(--app-text)",
                    }}
                  />
                </div>

                <label className="flex items-start gap-2 text-left mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--app-muted)" }}
                  >
                    I agree to receive updates via WhatsApp, RCS, SMS &amp;
                    Email
                  </span>
                </label>

                {error && (
                  <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {error}
                  </div>
                )}

                <button
                  onClick={sendOTP}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg,#b8860b,#d4a017)",
                  }}
                >
                  {loading ? "Sending..." : "Generate OTP"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── OTP VERIFY STAGE ── */}
        {stage === "otp-verify" && (
          <div className="max-w-md mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div className="px-8 py-8">
                {success && (
                  <div className="mb-4 rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">
                    {success}
                  </div>
                )}

                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => {
                      setStage("otp-phone");
                      setError("");
                      setSuccess("");
                    }}
                    className="text-sm font-medium"
                    style={{ color: "var(--app-text)" }}
                  >
                    ← Use a different number
                  </button>
                  <button
                    onClick={() => {
                      setStage("otp-phone");
                      setError("");
                      setSuccess("");
                    }}
                    className="text-sm"
                    style={{ color: "var(--app-muted)" }}
                  >
                    Start over
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: "linear-gradient(135deg,#b8860b,#d4a017)",
                    }}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <h2
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--app-text)" }}
                  >
                    Enter OTP
                  </h2>
                  <p className="text-sm" style={{ color: "var(--app-muted)" }}>
                    Sent to <strong>{phone}</strong>
                  </p>
                </div>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter OTP"
                  maxLength={6}
                  className={`${inputCls} text-center text-xl tracking-widest font-bold mb-4`}
                  style={inputStyle}
                />

                {error && (
                  <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {error}
                  </div>
                )}

                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 disabled:opacity-60 mb-4"
                  style={{
                    background: "linear-gradient(135deg,#b8860b,#d4a017)",
                  }}
                >
                  {loading ? "Verifying..." : "Verify and continue"}
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "var(--app-muted)" }}
                >
                  {otpTimer > 0 ? (
                    `Didn't get the OTP? You can resend after ${String(Math.floor(otpTimer / 60)).padStart(2, "0")}:${String(otpTimer % 60).padStart(2, "0")} (1 min wait)`
                  ) : (
                    <button
                      onClick={() => {
                        sendOTP();
                      }}
                      className="text-blue-600 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── MULTI-STEP FORM ── */}
        {stage === "form" && (
          <div>
            {/* Step Progress Bar */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex items-center min-w-max px-2">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          i + 1 < currentStep
                            ? "text-white"
                            : i + 1 === currentStep
                              ? "text-white"
                              : "text-gray-400"
                        }`}
                        style={{
                          background:
                            i + 1 < currentStep
                              ? "#10b981"
                              : i + 1 === currentStep
                                ? "linear-gradient(135deg,#b8860b,#d4a017)"
                                : "var(--app-panel-soft)",
                          border:
                            i + 1 > currentStep
                              ? "2px solid var(--app-border)"
                              : "none",
                        }}
                      >
                        {i + 1 < currentStep ? "✓" : i + 1}
                      </div>
                      <span
                        className="text-xs mt-1 whitespace-nowrap"
                        style={{
                          color:
                            i + 1 === currentStep
                              ? "#b8860b"
                              : "var(--app-muted)",
                          fontWeight: i + 1 === currentStep ? 700 : 400,
                        }}
                      >
                        {step}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className="w-8 h-0.5 mx-1 mb-4"
                        style={{
                          background:
                            i + 1 < currentStep
                              ? "#10b981"
                              : "var(--app-border)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div
                className="px-6 py-5 border-b"
                style={{
                  borderColor: "var(--app-border)",
                  background: "var(--app-panel-soft)",
                }}
              >
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--app-muted)" }}
                >
                  Step {currentStep} of 9
                </p>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--app-text)" }}
                >
                  {currentStep === 1 && "Personal Details"}
                  {currentStep === 2 && "Address Details"}
                  {currentStep === 3 && "Business Profile"}
                  {currentStep === 4 && "Product Interests"}
                  {currentStep === 5 && "Visit Purpose"}
                  {currentStep === 6 && "Annual Buying"}
                  {currentStep === 7 && "Additional Information"}
                  {currentStep === 8 && "Brands & Products"}
                  {currentStep === 9 && "Final Submission"}
                </h2>
              </div>

              <div className="px-6 py-6">
                {error && (
                  <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {error}
                  </div>
                )}

                {/* STEP 1 - Basic Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Invited By
                        </label>
                        <input
                          value={formData.invited_by}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              invited_by: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="Invited by"
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Title <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              title: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          {TITLES.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              first_name: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Middle Name
                        </label>
                        <input
                          value={formData.middle_name}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              middle_name: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="Middle name"
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              last_name: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.designation}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              designation: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          {DESIGNATIONS.map((d) => (
                            <option key={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Company <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={formData.company}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              company: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="Company name"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Mobile
                        </label>
                        <input
                          value={phone}
                          disabled
                          className={inputCls}
                          style={{ ...inputStyle, opacity: 0.7 }}
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Email ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Passport Photo <span className="text-red-500">*</span>
                        </label>
                        <div
                          className="rounded-xl p-4 text-center"
                          style={{
                            background: "var(--app-panel-soft)",
                            border: "2px dashed var(--app-border)",
                          }}
                        >
                          {formData.photo_url ? (
                            <div>
                              <img
                                src={formData.photo_url}
                                alt="Photo"
                                className="w-24 h-32 object-cover mx-auto rounded-lg mb-2"
                              />
                              <button
                                onClick={() =>
                                  setFormData((p) => ({ ...p, photo_url: "" }))
                                }
                                className="text-xs text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="w-20 h-24 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <svg
                                  className="w-10 h-10 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                </svg>
                              </div>
                              <label
                                className="cursor-pointer px-4 py-2 rounded-lg text-white text-sm font-medium"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#b8860b,#d4a017)",
                                }}
                              >
                                Upload photo
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) =>
                                        setFormData((p) => ({
                                          ...p,
                                          photo_url: ev.target
                                            ?.result as string,
                                        }));
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              <p className="text-xs mt-2 text-red-500">
                                Passport size photo (no sunglasses/cap). Max
                                10MB.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Business Card (Front){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div
                          className="rounded-xl p-4 text-center"
                          style={{
                            background: "var(--app-panel-soft)",
                            border: "2px dashed var(--app-border)",
                          }}
                        >
                          {formData.business_card_front ? (
                            <div>
                              <img
                                src={formData.business_card_front}
                                alt="Card"
                                className="w-full h-20 object-cover rounded mb-1"
                              />
                              <button
                                onClick={() =>
                                  setFormData((p) => ({
                                    ...p,
                                    business_card_front: "",
                                  }))
                                }
                                className="text-xs text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="w-8 h-8 mx-auto mb-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  x="2"
                                  y="5"
                                  width="20"
                                  height="14"
                                  rx="2"
                                  strokeWidth={2}
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeWidth={2}
                                  d="M2 10h20"
                                />
                              </svg>
                              <label
                                className="cursor-pointer text-sm font-medium"
                                style={{ color: "var(--app-text)" }}
                              >
                                Upload front side
                                <input
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) =>
                                        setFormData((p) => ({
                                          ...p,
                                          business_card_front: ev.target
                                            ?.result as string,
                                        }));
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 - Address */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={formData.address1}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            address1: e.target.value,
                          }))
                        }
                        className={inputCls}
                        style={inputStyle}
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Address Line 2
                      </label>
                      <input
                        value={formData.address2}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            address2: e.target.value,
                          }))
                        }
                        className={inputCls}
                        style={inputStyle}
                        placeholder="Apartment, suite, etc."
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={formData.city}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, city: e.target.value }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={formData.state}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              state: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          PIN Code
                        </label>
                        <input
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              pincode: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="PIN code"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 - Business Profile */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.business_type}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            business_type: e.target.value,
                          }))
                        }
                        className={inputCls}
                        style={inputStyle}
                      >
                        <option value="">Select</option>
                        {BUSINESS_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Nature of Business
                      </label>
                      <input
                        value={formData.nature_of_business}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            nature_of_business: e.target.value,
                          }))
                        }
                        className={inputCls}
                        style={inputStyle}
                        placeholder="Describe your business"
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Annual Turnover
                      </label>
                      <select
                        value={formData.annual_turnover}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            annual_turnover: e.target.value,
                          }))
                        }
                        className={inputCls}
                        style={inputStyle}
                      >
                        <option value="">Select</option>
                        {ANNUAL_BUYING.map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 4 - Product Interests */}
                {currentStep === 4 && (
                  <div>
                    <p
                      className="text-sm mb-4"
                      style={{ color: "var(--app-muted)" }}
                    >
                      Select all product categories you are interested in:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {PRODUCT_OPTIONS.map((p) => (
                        <label
                          key={p}
                          className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition"
                          style={{
                            background: formData.product_interests.includes(p)
                              ? "#eff6ff"
                              : "var(--app-panel-soft)",
                            border: `1px solid ${formData.product_interests.includes(p) ? "#3b82f6" : "var(--app-border)"}`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.product_interests.includes(p)}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                product_interests: toggleArray(
                                  prev.product_interests,
                                  p,
                                ),
                              }))
                            }
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span
                            className="text-sm"
                            style={{ color: "var(--app-text)" }}
                          >
                            {p}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5 - Visit Purpose */}
                {currentStep === 5 && (
                  <div>
                    <p
                      className="text-sm mb-4"
                      style={{ color: "var(--app-muted)" }}
                    >
                      What is the purpose of your visit?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Sourcing new products",
                        "Meeting existing suppliers",
                        "Exploring new suppliers",
                        "Market research",
                        "Networking",
                        "Attending seminars",
                        "General interest",
                        "Business expansion",
                      ].map((p) => (
                        <label
                          key={p}
                          className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition"
                          style={{
                            background: formData.visit_purpose.includes(p)
                              ? "#eff6ff"
                              : "var(--app-panel-soft)",
                            border: `1px solid ${formData.visit_purpose.includes(p) ? "#3b82f6" : "var(--app-border)"}`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.visit_purpose.includes(p)}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                visit_purpose: toggleArray(
                                  prev.visit_purpose,
                                  p,
                                ),
                              }))
                            }
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span
                            className="text-sm"
                            style={{ color: "var(--app-text)" }}
                          >
                            {p}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6 - Annual Buying */}
                {currentStep === 6 && (
                  <div>
                    <label className={labelCls} style={labelStyle}>
                      Annual Buying Budget{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3 mt-2">
                      {ANNUAL_BUYING.map((a) => (
                        <label
                          key={a}
                          className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition"
                          style={{
                            background:
                              formData.annual_buying === a
                                ? "#eff6ff"
                                : "var(--app-panel-soft)",
                            border: `1px solid ${formData.annual_buying === a ? "#3b82f6" : "var(--app-border)"}`,
                          }}
                        >
                          <input
                            type="radio"
                            checked={formData.annual_buying === a}
                            onChange={() =>
                              setFormData((p) => ({ ...p, annual_buying: a }))
                            }
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span
                            className="text-sm"
                            style={{ color: "var(--app-text)" }}
                          >
                            {a}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 7 - Additional Info */}
                {currentStep === 7 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        How did you hear about us?
                      </label>
                      <select
                        value={formData.how_did_you_hear}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            how_did_you_hear: e.target.value,
                          }))
                        }
                        className={inputCls}
                        style={inputStyle}
                      >
                        <option value="">Select</option>
                        {HOW_HEARD.map((h) => (
                          <option key={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Additional Notes
                      </label>
                      <textarea
                        value={formData.additional_notes}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            additional_notes: e.target.value,
                          }))
                        }
                        rows={4}
                        placeholder="Any additional information..."
                        className={`${inputCls} resize-none`}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 8 - Brands */}
                {currentStep === 8 && (
                  <div>
                    <label className={labelCls} style={labelStyle}>
                      Brands & Products you are interested in
                    </label>
                    <textarea
                      value={formData.brands_interested}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          brands_interested: e.target.value,
                        }))
                      }
                      rows={5}
                      placeholder="List the brands and products you want to explore at the show..."
                      className={`${inputCls} resize-none`}
                      style={inputStyle}
                    />
                  </div>
                )}

                {/* STEP 9 - Final Submission */}
                {currentStep === 9 && (
                  <div className="space-y-4">
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "#fff8e1",
                        border: "1px solid #f59e0b",
                      }}
                    >
                      <p className="text-sm font-semibold text-amber-800 mb-2">
                        📋 Notes
                      </p>
                      <ul className="text-sm text-amber-700 space-y-1.5 list-disc list-inside">
                        <li>
                          You will receive your Visitor Registration No. and QR
                          code via e-mail.
                        </li>
                        <li>
                          Carry your registration no. or QR code on your mobile
                          or in print to the show.
                        </li>
                        <li>
                          Present your QR code at the pre-registered visitors
                          desk to print your badge.
                        </li>
                        <li>
                          Please note that once you submit, your phone number
                          cannot be changed.
                        </li>
                      </ul>
                    </div>
                    {/* Summary */}
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "var(--app-panel-soft)",
                        border: "1px solid var(--app-border)",
                      }}
                    >
                      <p
                        className="text-sm font-bold mb-3"
                        style={{ color: "var(--app-text)" }}
                      >
                        Registration Summary
                      </p>
                      <table className="w-full text-sm">
                        <tbody>
                          {[
                            [
                              "Name",
                              `${formData.title} ${formData.first_name} ${formData.middle_name} ${formData.last_name}`.trim(),
                            ],
                            ["Company", formData.company],
                            ["Mobile", phone],
                            ["Email", formData.email],
                            ["City", formData.city],
                            ["Business Type", formData.business_type],
                          ].map(
                            ([k, v]) =>
                              v && (
                                <tr
                                  key={k}
                                  className="border-b"
                                  style={{ borderColor: "var(--app-border)" }}
                                >
                                  <td
                                    className="py-1.5 pr-4 font-medium"
                                    style={{ color: "var(--app-muted)" }}
                                  >
                                    {k}
                                  </td>
                                  <td
                                    className="py-1.5"
                                    style={{ color: "var(--app-text)" }}
                                  >
                                    {v}
                                  </td>
                                </tr>
                              ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div
                  className="flex gap-3 mt-6 pt-4"
                  style={{ borderTop: "1px solid var(--app-border)" }}
                >
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep((p) => p - 1)}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition hover:opacity-80"
                      style={{
                        color: "var(--app-text)",
                        borderColor: "var(--app-border)",
                        background: "var(--app-panel-soft)",
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={() => saveStep(currentStep)}
                    disabled={loading}
                    className="ml-auto px-8 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg,#b8860b,#d4a017)",
                    }}
                  >
                    {loading
                      ? "Saving..."
                      : currentStep === 9
                        ? "Submit Registration"
                        : "Save and continue →"}
                  </button>
                </div>
              </div>
            </div>

            {/* Need Assistance */}
            <div className="mt-10">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "var(--app-text)" }}
              >
                Need Assistance?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: "👤",
                    title: "VISITOR SERVICES TEAM",
                    sub: "Fusionera Events",
                  },
                  {
                    icon: "📞",
                    title: "PHONE",
                    sub: "+91 99 676 00286\n+91 99 301 72973",
                  },
                  {
                    icon: "📧",
                    title: "EMAIL",
                    sub: "visitors@fusionera.in",
                    link: true,
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl p-5 text-center"
                    style={{
                      background: "var(--app-panel)",
                      border: "1px solid var(--app-border)",
                    }}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: "#b8860b" }}
                    >
                      {card.title}
                    </p>
                    {card.link ? (
                      <a
                        href={`mailto:${card.sub}`}
                        className="text-sm text-blue-600"
                      >
                        {card.sub}
                      </a>
                    ) : (
                      <p
                        className="text-sm whitespace-pre-line"
                        style={{ color: "var(--app-text)" }}
                      >
                        {card.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COMPLETE STAGE ── */}
        {stage === "complete" && (
          <div className="max-w-lg mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div className="px-8 py-10 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg,#00c9a7,#00b4d8)",
                  }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--app-text)" }}
                >
                  Registration Complete!
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--app-muted)" }}
                >
                  Your entry pass and QR code have been sent to your email.
                </p>

                {/* Reg No */}
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{
                    background: "linear-gradient(135deg,#110c41,#1a1560)",
                  }}
                >
                  <p className="text-xs text-blue-300 uppercase tracking-widest mb-1">
                    Registration Number
                  </p>
                  <p className="text-2xl font-bold text-white tracking-widest">
                    {regNo}
                  </p>
                </div>

                {/* QR Code */}
                {qrCode && (
                  <div className="mb-6">
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: "var(--app-text)" }}
                    >
                      🔳 Your Entry QR Code
                    </p>
                    <div
                      className="inline-block p-4 rounded-2xl"
                      style={{
                        background: "white",
                        border: "2px solid var(--app-border)",
                      }}
                    >
                      <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                    </div>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "var(--app-muted)" }}
                    >
                      Present this at the venue entrance
                    </p>
                    <a
                      href={qrCode}
                      download={`fusionera-pass-${regNo}.png`}
                      className="inline-block mt-3 px-5 py-2 rounded-xl text-white text-sm font-medium"
                      style={{
                        background: "linear-gradient(135deg,#10b981,#059669)",
                      }}
                    >
                      📥 Download QR Pass
                    </a>
                  </div>
                )}

                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--app-panel-soft)",
                    border: "1px solid var(--app-border)",
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--app-text)" }}
                  >
                    📅 July 4–6, 2026 · 📍 Bharat Mandapam, Pragati Maidan, New
                    Delhi
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
