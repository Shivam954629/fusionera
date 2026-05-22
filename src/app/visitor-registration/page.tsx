"use client";
import { useState, useEffect } from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

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
const INVITED_BY_OPTIONS = [
  "Organiser",
  "Exhibitor",
  "Reference from other visitors",
  "Associations",
  "Others",
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
const VISIT_PURPOSES = [
  "Sourcing new products",
  "Meeting existing suppliers",
  "Exploring new suppliers",
  "Market research",
  "Networking",
  "Attending seminars",
  "General interest",
  "Business expansion",
];
const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
const COUNTRY_CODES = [
  { code: "+91", label: "+91 (India)" },
  { code: "+1", label: "+1 (USA/Canada)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+61", label: "+61 (Australia)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+966", label: "+966 (Saudi Arabia)" },
  { code: "+65", label: "+65 (Singapore)" },
  { code: "+60", label: "+60 (Malaysia)" },
  { code: "+86", label: "+86 (China)" },
  { code: "+81", label: "+81 (Japan)" },
  { code: "+82", label: "+82 (South Korea)" },
  { code: "+49", label: "+49 (Germany)" },
  { code: "+33", label: "+33 (France)" },
  { code: "+39", label: "+39 (Italy)" },
  { code: "+34", label: "+34 (Spain)" },
  { code: "+7", label: "+7 (Russia)" },
  { code: "+55", label: "+55 (Brazil)" },
  { code: "+27", label: "+27 (South Africa)" },
  { code: "+234", label: "+234 (Nigeria)" },
  { code: "+20", label: "+20 (Egypt)" },
  { code: "+92", label: "+92 (Pakistan)" },
  { code: "+880", label: "+880 (Bangladesh)" },
  { code: "+94", label: "+94 (Sri Lanka)" },
  { code: "+977", label: "+977 (Nepal)" },
  { code: "+66", label: "+66 (Thailand)" },
  { code: "+62", label: "+62 (Indonesia)" },
  { code: "+63", label: "+63 (Philippines)" },
  { code: "+84", label: "+84 (Vietnam)" },
  { code: "+98", label: "+98 (Iran)" },
  { code: "+90", label: "+90 (Turkey)" },
  { code: "+31", label: "+31 (Netherlands)" },
  { code: "+46", label: "+46 (Sweden)" },
  { code: "+47", label: "+47 (Norway)" },
  { code: "+45", label: "+45 (Denmark)" },
  { code: "+41", label: "+41 (Switzerland)" },
  { code: "+48", label: "+48 (Poland)" },
  { code: "+32", label: "+32 (Belgium)" },
  { code: "+64", label: "+64 (New Zealand)" },
  { code: "+52", label: "+52 (Mexico)" },
  { code: "+54", label: "+54 (Argentina)" },
];

export default function VisitorRegistrationPage() {
  const siteSettings = useSiteSettings();
  const [stage, setStage] = useState<Stage>("otp-phone");
  const [visitorType, setVisitorType] = useState<"indian" | "international">(
    "indian",
  );
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [intlEmail, setIntlEmail] = useState("");
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
    email2: "",
    phone2: "",
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

  useEffect(() => {
    setPhone("");
    setIntlEmail("");
    setError("");
    if (visitorType === "indian") setCountryCode("+91");
    else setCountryCode("+1");
  }, [visitorType]);

  useEffect(() => {
    if (otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer((p) => p - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpTimer]);

  const fullPhone = visitorType === "indian" ? phone : `${countryCode}${phone}`;

  const validateStep = (step: number): string | null => {
    switch (step) {
      case 1:
        if (!formData.invited_by) return "Please select 'Invited By'.";
        if (!formData.title) return "Please select Title.";
        if (!formData.first_name.trim()) return "First Name is required.";
        if (!formData.last_name.trim()) return "Last Name is required.";
        if (!formData.designation) return "Please select Designation.";
        if (!formData.company.trim()) return "Company name is required.";
        if (!formData.email.trim()) return "Email ID is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          return "Please enter a valid Email ID.";
        if (
          formData.email2 &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email2)
        )
          return "Please enter a valid Email ID 2.";
        if (!formData.photo_url)
          return "Please upload your passport size photo.";
        if (!formData.business_card_front)
          return "Please upload business card front side.";
        return null;
      case 2:
        if (!formData.address1.trim()) return "Address Line 1 is required.";
        if (!formData.city.trim()) return "City is required.";
        if (visitorType === "indian") {
          if (!formData.state) return "Please select State.";
          if (!formData.pincode.trim()) return "PIN Code is required.";
          if (!/^\d{6}$/.test(formData.pincode))
            return "PIN Code must be 6 digits.";
        }
        return null;
      case 3:
        if (!formData.business_type) return "Please select Business Type.";
        if (!formData.nature_of_business.trim())
          return "Nature of Business is required.";
        return null;
      case 4:
        if (formData.product_interests.length === 0)
          return "Please select at least one Product Interest.";
        return null;
      case 5:
        if (formData.visit_purpose.length === 0)
          return "Please select at least one Visit Purpose.";
        return null;
      case 6:
        if (!formData.annual_buying)
          return "Please select Annual Buying Budget.";
        return null;
      case 7:
        if (!formData.how_did_you_hear)
          return "Please select how you heard about us.";
        return null;
      case 8:
        if (!formData.brands_interested.trim())
          return "Please mention brands & products you are interested in.";
        return null;
      default:
        return null;
    }
  };

  const sendOTP = async () => {
    if (visitorType === "international") {
      if (!intlEmail) { setError("Please enter email address."); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intlEmail)) { setError("Please enter a valid email address."); return; }
    } else {
      if (!phone) { setError("Please enter mobile number."); return; }
      if (phone.length !== 10) { setError("Enter a valid 10-digit mobile number."); return; }
    }
    if (!agreed) { setError("Please agree to receive updates."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: visitorType === "indian" ? fullPhone : undefined,
          email: visitorType === "international" ? intlEmail : undefined,
          visitorType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // ── INDIAN: no OTP — go directly based on server response ──
      if (visitorType === "indian") {
        if (data.alreadyRegistered) {
          // Already registered — show their existing pass
          setRegNo(data.regNo || "");
          setQrCode(data.qrCode || "");
          setSuccess("You are already registered!");
          setStage("complete");
        } else {
          // New or resuming — skip OTP, go straight to form
          setVisitorId(data.visitorId);
          setStage("form");
        }
        return;
      }

      // ── INTERNATIONAL: OTP sent — go to verify stage ──
      setSuccess("OTP sent successfully.");
      setStage("otp-verify");
      setOtpTimer(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed. Please try again.");
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
        body: JSON.stringify({
          phone: visitorType === "indian" ? fullPhone : undefined,
          email: visitorType === "international" ? intlEmail : undefined,
          otp,
          visitorType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setVisitorId(data.visitorId);
      if (visitorType === "international") {
        setFormData((p) => ({ ...p, email: intlEmail }));
      }
      setStage("form");
      setSuccess("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const saveStep = async (step: number) => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
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

  const handleFileUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      setFormData((p) => ({ ...p, [field]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1464] transition";
  const inputStyle = {
    background: "#f4f6ff",
    border: "1px solid #dde6ff",
    color: "#1a1a2e",
  };
  const labelCls = "block text-sm font-semibold mb-1.5";
  const labelStyle = { color: "#1a1a2e" };
  const reqStar = <span className="text-red-500">*</span>;

  const ClearSelect = ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
  }) => (
    <div className="flex gap-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} flex-1`}
        style={inputStyle}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="px-3 rounded-xl text-sm font-bold text-gray-500 hover:text-red-500 flex-shrink-0"
          style={{
            background: "#f4f6ff",
            border: "1px solid #dde6ff",
          }}
        >
          ×
        </button>
      )}
    </div>
  );

  const FileUploadBox = ({
    field,
    label,
    value,
    accept = "image/*",
  }: {
    field: string;
    label: string;
    value: string;
    accept?: string;
  }) => (
    <div
      className="rounded-xl p-4 text-center"
      style={{
        background: "#f4f6ff",
        border: "2px dashed #dde6ff",
      }}
    >
      {value ? (
        <div>
          <img
            src={value}
            alt={label}
            className="w-full h-24 object-cover rounded-lg mb-2"
          />
          <button
            type="button"
            onClick={() => setFormData((p) => ({ ...p, [field]: "" }))}
            className="text-xs text-red-500 font-medium"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M2 10h20" />
          </svg>
          <span
            className="text-sm font-medium"
            style={{ color: "#1a1a2e" }}
          >
            {label}
          </span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(field, f);
            }}
          />
        </label>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#5B9BD5] px-4 py-6 sm:px-6 md:py-8 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
            <h1
            className="text-3xl font-bold mb-2 text-white"
          >
            Visitor Registration
          </h1>
          {stage === "otp-phone" && (
            <p className="text-sm" style={{ color: "#6b7280" }}>
              {visitorType === "indian"
                ? "Enter your mobile number to register"
                : "Enter your email to receive an OTP"}
            </p>
          )}
        </div>

        {/* OTP PHONE */}
        {stage === "otp-phone" && (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "#ffffff",
                border: "1px solid #dde6ff",
              }}
            >
              <div
                className="flex border-b"
                style={{ borderColor: "#dde6ff" }}
              >
                {(["indian", "international"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setVisitorType(t)}
                    className={`flex-1 py-3.5 text-sm font-semibold transition ${visitorType === t ? "border-b-2 border-[#1a1464]" : "hover:bg-gray-50"}`}
                    style={{
                      background: visitorType === t ? "#ffffff" : "#f4f6ff",
                      color: visitorType === t ? "#1a1464" : "#6b7280",
                    }}
                  >
                    {t === "indian"
                      ? "Indian Visitor"
                      : "International Visitor"}
                  </button>
                ))}
              </div>
              <div className="px-5 md:px-8 py-6 md:py-8 text-center">
                {visitorType === "indian" && (
                  <>
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: "#1a1464",
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
                      style={{ color: "#1a1a2e" }}
                    >
                      Verify Mobile
                    </h2>
                  </>
                )}

                {visitorType === "indian" ? (
                  <div className="flex mb-4">
                    <div
                      className="px-4 py-2.5 rounded-l-xl text-sm font-semibold flex-shrink-0 flex items-center"
                      style={{
                        background: "#f4f6ff",
                        border: "1px solid #dde6ff",
                        borderRight: "none",
                        color: "#1a1a2e",
                      }}
                    >
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="Mobile Number"
                      className="flex-1 px-4 py-2.5 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1464] transition"
                      style={{
                        background: "#f4f6ff",
                        border: "1px solid #dde6ff",
                        borderLeft: "none",
                        color: "#1a1a2e",
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-4 text-left">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{
                        background: "#1a1464",
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2
                      className="text-xl font-bold mb-4 text-center"
                      style={{ color: "#1a1a2e" }}
                    >
                      Verify Email
                    </h2>
                    <input
                      type="email"
                      value={intlEmail}
                      onChange={(e) => setIntlEmail(e.target.value)}
                      placeholder="Provide Email Address"
                      className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1464] transition"
                      style={{
                        background: "#f4f6ff",
                        border: "1px solid #dde6ff",
                        color: "#1a1a2e",
                      }}
                    />
                  </div>
                )}

                <label className="flex items-start gap-2 text-left mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#1a1464] flex-shrink-0"
                  />
                  <span
                    className="text-xs"
                    style={{ color: "#6b7280" }}
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
                    background: "#1a1464",
                  }}
                >
                  {loading
                    ? "Please wait..."
                    : visitorType === "indian"
                    ? "Continue →"
                    : "Send OTP"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OTP VERIFY */}
        {stage === "otp-verify" && (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "#ffffff",
                border: "1px solid #dde6ff",
              }}
            >
              <div className="px-5 md:px-8 py-6 md:py-8">
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
                    style={{ color: "#1a1a2e" }}
                  >
                    ← Use a different {visitorType === "international" ? "email" : "number"}
                  </button>
                  <button
                    onClick={() => {
                      setStage("otp-phone");
                      setError("");
                      setSuccess("");
                    }}
                    className="text-sm"
                    style={{ color: "#6b7280" }}
                  >
                    Start over
                  </button>
                </div>
                <div className="text-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: "#1a1464",
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
                    style={{ color: "#1a1a2e" }}
                  >
                    Enter OTP
                  </h2>
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    Sent to{" "}
                    <strong>
                      {visitorType === "international"
                        ? intlEmail
                        : `+91 ${phone}`}
                    </strong>
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
                    background: "#1a1464",
                  }}
                >
                  {loading ? "Verifying..." : "Verify and continue"}
                </button>
                <p
                  className="text-center text-xs"
                  style={{ color: "#6b7280" }}
                >
                  {otpTimer > 0 ? (
                    `Didn't get the OTP? You can resend after ${String(Math.floor(otpTimer / 60)).padStart(2, "0")}:${String(otpTimer % 60).padStart(2, "0")} (1 min wait)`
                  ) : (
                    <button
                      onClick={sendOTP}
                      className="text-[#1a1464] font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        {stage === "form" && (
          <div>
            {/* Step Progress Bar */}
            <div className="mb-6 md:mb-8 overflow-x-auto">
              <div className="flex items-center min-w-max px-1 md:px-2">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all ${i + 1 <= currentStep ? "text-white" : "text-gray-400"}`}
                        style={{
                          background:
                            i + 1 < currentStep
                              ? "#10b981"
                              : i + 1 === currentStep
                                ? "#1a1464"
                                : "#f4f6ff",
                          border:
                            i + 1 > currentStep
                              ? "2px solid #dde6ff"
                              : "none",
                        }}
                      >
                        {i + 1 < currentStep ? "✓" : i + 1}
                      </div>
                      <span
                        className="text-xs mt-1 whitespace-nowrap hidden md:block"
                        style={{
                          color:
                            i + 1 === currentStep
                              ? "#1a1464"
                              : "#6b7280",
                          fontWeight: i + 1 === currentStep ? 700 : 400,
                        }}
                      >
                        {step}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className="w-5 md:w-8 h-0.5 mx-0.5 md:mx-1 mb-0 md:mb-4"
                        style={{
                          background:
                            i + 1 < currentStep
                              ? "#10b981"
                              : "#dde6ff",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              {/* Mobile step label */}
              <p
                className="text-center text-xs font-semibold mt-2 md:hidden"
                style={{ color: "#1a1464" }}
              >
                {STEPS[currentStep - 1]}
              </p>
            </div>

            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "#ffffff",
                border: "1px solid #dde6ff",
              }}
            >
              <div
                className="px-4 md:px-6 py-4 md:py-5 border-b"
                style={{
                  borderColor: "#dde6ff",
                  background: "#f4f6ff",
                }}
              >
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "#6b7280" }}
                >
                  Step {currentStep} of 9
                </p>
                <h2
                  className="text-lg md:text-xl font-bold"
                  style={{ color: "#1a1a2e" }}
                >
                  {STEPS[currentStep - 1]}
                </h2>
              </div>

              <div className="px-4 md:px-6 py-4 md:py-6">
                {error && (
                  <div className="mb-4 md:mb-5 rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {error}
                  </div>
                )}

                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="space-y-4 md:space-y-5">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Passport Size Colour Photo {reqStar}
                      </label>
                      <p className="text-xs mb-2 text-red-500">
                        Passport size photo (no sunglasses/cap). Max 10MB.
                        Supported: png, jpg, jpeg
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          {formData.photo_url ? (
                            <div
                              className="rounded-xl overflow-hidden"
                              style={{ border: "1px solid #dde6ff" }}
                            >
                              <img
                                src={formData.photo_url}
                                alt="Photo"
                                className="w-full h-40 object-cover"
                              />
                              <div className="p-2 text-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFormData((p) => ({
                                      ...p,
                                      photo_url: "",
                                    }))
                                  }
                                  className="text-xs text-red-500 font-medium"
                                >
                                  Remove photo
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label
                              className="cursor-pointer block rounded-xl p-6 text-center"
                              style={{
                                background: "#f4f6ff",
                                border: "2px dashed #dde6ff",
                              }}
                            >
                              <div className="mx-auto mb-3 flex h-24 w-20 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                                <svg
                                  className="w-10 h-10 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                </svg>
                              </div>
                              <span
                                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                                style={{
                                  background:
                                    "#1a1464",
                                }}
                              >
                                Upload photo
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) handleFileUpload("photo_url", f);
                                }}
                              />
                            </label>
                          )}
                        </div>
                        <div
                          className="rounded-xl overflow-hidden"
                          style={{
                            background: "#fef9e7",
                            border: "1px solid #f59e0b",
                          }}
                        >
                          <div
                            className="px-3 py-2 text-center text-xs font-bold text-amber-800 uppercase tracking-wide"
                            style={{ background: "#f59e0b" }}
                          >
                            Passport Photo Guidelines
                          </div>
                          <div className="p-3 space-y-1">
                            {[
                              "Size: 35mm x 45mm",
                              "Face: 70-80% of height, centered",
                              "Background: White / Light Color",
                              "Expression: Neutral",
                              "Attire: No Caps, No Sunglasses",
                            ].map((g) => (
                              <p
                                key={g}
                                className="text-xs text-amber-900 flex items-start gap-1"
                              >
                                <span className="text-amber-600 mt-0.5">•</span>
                                {g}
                              </p>
                            ))}
                            <div className="mt-2 pt-2 border-t border-amber-200">
                              <p className="text-xs font-semibold text-red-600 text-center">
                                ❌ No selfies, filters, busy backgrounds, or
                                full body shots
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Invited By {reqStar}
                        </label>
                        <ClearSelect
                          value={formData.invited_by}
                          onChange={(v) =>
                            setFormData((p) => ({ ...p, invited_by: v }))
                          }
                          options={INVITED_BY_OPTIONS}
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Title {reqStar}
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
                          First Name {reqStar}
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
                          Last Name {reqStar}
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
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Designation {reqStar}
                        </label>
                        <ClearSelect
                          value={formData.designation}
                          onChange={(v) =>
                            setFormData((p) => ({ ...p, designation: v }))
                          }
                          options={DESIGNATIONS}
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Company {reqStar}
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
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Country Code {reqStar}
                        </label>
                        {visitorType === "international" ? (
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className={inputCls}
                            style={inputStyle}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>{c.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            value="+91"
                            disabled
                            className={inputCls}
                            style={{ ...inputStyle, opacity: 0.7 }}
                          />
                        )}
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Mobile No. 1{visitorType === "indian" ? <> {reqStar}</> : " (optional)"}
                        </label>
                        {visitorType === "international" ? (
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) =>
                              setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))
                            }
                            className={inputCls}
                            style={inputStyle}
                            placeholder="Mobile number"
                          />
                        ) : (
                          <input
                            value={phone}
                            disabled
                            className={inputCls}
                            style={{ ...inputStyle, opacity: 0.7 }}
                          />
                        )}
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Email ID 1 {reqStar}
                        </label>
                        {visitorType === "international" ? (
                          <input
                            type="email"
                            value={formData.email}
                            disabled
                            className={inputCls}
                            style={{ ...inputStyle, opacity: 0.85 }}
                            title="Verified email address"
                          />
                        ) : (
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
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Mobile No. 2
                        </label>
                        <input
                          type="tel"
                          value={formData.phone2}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              phone2: e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 15),
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Email ID 2
                        </label>
                        <input
                          type="email"
                          value={formData.email2}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email2: e.target.value,
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          Country
                        </label>
                        <span
                          className="inline-block px-3 py-2.5 rounded-xl text-sm font-medium"
                          style={{
                            background: "#f4f6ff",
                            border: "1px solid #dde6ff",
                            color: "#1a1a2e",
                          }}
                        >
                          {visitorType === "indian"
                            ? "🇮🇳 India"
                            : `🌍 International (${countryCode})`}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Upload your business card {reqStar}
                        <span
                          className="font-normal text-xs ml-1"
                          style={{ color: "#6b7280" }}
                        >
                          (front required; back optional. Max 10MB)
                        </span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold mb-2 text-red-600">
                            Front side {reqStar}
                          </p>
                          <FileUploadBox
                            field="business_card_front"
                            label="Upload front side"
                            value={formData.business_card_front}
                            accept="image/*,.pdf"
                          />
                        </div>
                        <div>
                          <p
                            className="text-xs font-semibold mb-2"
                            style={{ color: "#6b7280" }}
                          >
                            Back Side
                          </p>
                          <FileUploadBox
                            field="business_card_back"
                            label="Upload back side"
                            value={formData.business_card_back}
                            accept="image/*,.pdf"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Address Line 1 {reqStar}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          City {reqStar}
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
                          State{visitorType === "indian" ? <> {reqStar}</> : ""}
                        </label>
                        {visitorType === "indian" ? (
                          <select
                            value={formData.state}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, state: e.target.value }))
                            }
                            className={inputCls}
                            style={inputStyle}
                          >
                            <option value="">Select State</option>
                            {INDIA_STATES.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            value={formData.state}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, state: e.target.value }))
                            }
                            className={inputCls}
                            style={inputStyle}
                            placeholder="State / Province / Region"
                          />
                        )}
                      </div>
                      <div>
                        <label className={labelCls} style={labelStyle}>
                          {visitorType === "indian" ? <>PIN Code {reqStar}</> : "Postal Code"}
                        </label>
                        <input
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              pincode: visitorType === "indian"
                                ? e.target.value.replace(/\D/g, "").slice(0, 6)
                                : e.target.value.slice(0, 10),
                            }))
                          }
                          className={inputCls}
                          style={inputStyle}
                          placeholder={visitorType === "indian" ? "6-digit PIN" : "Postal code"}
                          maxLength={visitorType === "indian" ? 6 : 10}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Business Type {reqStar}
                      </label>
                      <ClearSelect
                        value={formData.business_type}
                        onChange={(v) =>
                          setFormData((p) => ({ ...p, business_type: v }))
                        }
                        options={BUSINESS_TYPES}
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        Nature of Business {reqStar}
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

                {/* STEP 4 */}
                {currentStep === 4 && (
                  <div>
                    <p
                      className="text-sm mb-4"
                      style={{ color: "#6b7280" }}
                    >
                      Select all product categories you are interested in{" "}
                      {reqStar}:
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3">
                      {PRODUCT_OPTIONS.map((p) => (
                        <label
                          key={p}
                          className="flex items-center gap-2 p-2.5 md:p-3 rounded-xl cursor-pointer transition"
                          style={{
                            background: formData.product_interests.includes(p)
                              ? "#fff5f5"
                              : "#f4f6ff",
                            border: `1px solid ${formData.product_interests.includes(p) ? "#1a1464" : "#dde6ff"}`,
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
                            className="w-4 h-4 accent-[#1a1464] flex-shrink-0"
                          />
                          <span
                            className="text-xs md:text-sm"
                            style={{ color: "#1a1a2e" }}
                          >
                            {p}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5 */}
                {currentStep === 5 && (
                  <div>
                    <p
                      className="text-sm mb-4"
                      style={{ color: "#6b7280" }}
                    >
                      What is the purpose of your visit? {reqStar}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {VISIT_PURPOSES.map((p) => (
                        <label
                          key={p}
                          className="flex items-center gap-2 p-2.5 md:p-3 rounded-xl cursor-pointer transition"
                          style={{
                            background: formData.visit_purpose.includes(p)
                              ? "#fff5f5"
                              : "#f4f6ff",
                            border: `1px solid ${formData.visit_purpose.includes(p) ? "#1a1464" : "#dde6ff"}`,
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
                            className="w-4 h-4 accent-[#1a1464] flex-shrink-0"
                          />
                          <span
                            className="text-xs md:text-sm"
                            style={{ color: "#1a1a2e" }}
                          >
                            {p}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6 */}
                {currentStep === 6 && (
                  <div>
                    <label className={labelCls} style={labelStyle}>
                      Annual Buying Budget {reqStar}
                    </label>
                    <div className="space-y-2 md:space-y-3 mt-2">
                      {ANNUAL_BUYING.map((a) => (
                        <label
                          key={a}
                          className="flex items-center gap-3 p-3 md:p-3.5 rounded-xl cursor-pointer transition"
                          style={{
                            background:
                              formData.annual_buying === a
                                ? "#fff5f5"
                                : "#f4f6ff",
                            border: `1px solid ${formData.annual_buying === a ? "#1a1464" : "#dde6ff"}`,
                          }}
                        >
                          <input
                            type="radio"
                            checked={formData.annual_buying === a}
                            onChange={() =>
                              setFormData((p) => ({ ...p, annual_buying: a }))
                            }
                            className="w-4 h-4 accent-[#1a1464] flex-shrink-0"
                          />
                          <span
                            className="text-sm"
                            style={{ color: "#1a1a2e" }}
                          >
                            {a}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 7 */}
                {currentStep === 7 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls} style={labelStyle}>
                        How did you hear about us? {reqStar}
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

                {/* STEP 8 */}
                {currentStep === 8 && (
                  <div>
                    <label className={labelCls} style={labelStyle}>
                      Brands & Products you are interested in {reqStar}
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

                {/* STEP 9 */}
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
                      <ul className="text-xs md:text-sm text-amber-700 space-y-1.5 list-disc list-inside">
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
                          Once you submit, your phone number cannot be changed.
                        </li>
                      </ul>
                    </div>
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "#f4f6ff",
                        border: "1px solid #dde6ff",
                      }}
                    >
                      <p
                        className="text-sm font-bold mb-3"
                        style={{ color: "#1a1a2e" }}
                      >
                        Registration Summary
                      </p>
                      <table className="w-full text-xs md:text-sm">
                        <tbody>
                          {[
                            [
                              "Name",
                              `${formData.title} ${formData.first_name} ${formData.middle_name} ${formData.last_name}`.trim(),
                            ],
                            ["Company", formData.company],
                            ["Designation", formData.designation],
                            [
                              "Mobile",
                              visitorType === "indian"
                                ? `+91 ${phone}`
                                : `${countryCode} ${phone}`,
                            ],
                            ["Email", formData.email],
                            ["City", formData.city],
                            ["State", formData.state],
                            ["Business Type", formData.business_type],
                            ["Annual Buying", formData.annual_buying],
                          ].map(
                            ([k, v]) =>
                              v && (
                                <tr
                                  key={k}
                                  className="border-b"
                                  style={{ borderColor: "#dde6ff" }}
                                >
                                  <td
                                    className="py-1.5 pr-4 font-medium w-28 md:w-32"
                                    style={{ color: "#6b7280" }}
                                  >
                                    {k}
                                  </td>
                                  <td
                                    className="py-1.5"
                                    style={{ color: "#1a1a2e" }}
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
                  className="mt-5 flex flex-col gap-3 pt-4 sm:flex-row md:mt-6"
                  style={{ borderTop: "1px solid #dde6ff" }}
                >
                  {currentStep > 1 && (
                    <button
                      onClick={() => {
                        setCurrentStep((p) => p - 1);
                        setError("");
                      }}
                      className="w-full rounded-xl border px-5 py-2.5 text-sm font-semibold transition hover:opacity-80 sm:w-auto md:px-6"
                      style={{
                        color: "#1a1a2e",
                        borderColor: "#dde6ff",
                        background: "#f4f6ff",
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={() => saveStep(currentStep)}
                    disabled={loading}
                    className="w-full rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 sm:ml-auto sm:w-auto md:px-8"
                    style={{
                      background: "#1a1464",
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
            <div className="mt-8 md:mt-10">
              <h3
                className="text-base md:text-lg font-bold mb-4"
                style={{ color: "#1a1a2e" }}
              >
                Need Assistance?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {[
                  { icon: "👤", title: "VISITOR SERVICES TEAM", sub: "Fusion The Era Events" },
                  { icon: "📞", title: "PHONE", sub: `${siteSettings.contact_delhi_mobile}\n${siteSettings.contact_mumbai_mobile}` },
                  { icon: "📧", title: "EMAIL", sub: siteSettings.contact_delhi_email, link: true },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl p-4 md:p-5 text-center"
                    style={{ background: "#ffffff", border: "1px solid #dde6ff" }}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <p className="text-xs font-bold mb-1" style={{ color: "#1a1464" }}>
                      {card.title}
                    </p>
                    {card.link ? (
                      <a href={`mailto:${card.sub}`} className="text-sm text-[#1a1464] break-all">
                        {card.sub}
                      </a>
                    ) : (
                      <p className="text-sm whitespace-pre-line" style={{ color: "#1a1a2e" }}>
                        {card.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COMPLETE */}
        {stage === "complete" && (
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "#ffffff",
                border: "1px solid #dde6ff",
              }}
            >
              <div className="px-5 md:px-8 py-8 md:py-10 text-center">
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
                  className="text-xl md:text-2xl font-bold mb-2"
                  style={{ color: "#1a1a2e" }}
                >
                  Registration Complete!
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: "#6b7280" }}
                >
                  Your entry pass and QR code have been sent to your email.
                </p>
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{
                    background: "#1a1464",
                  }}
                >
                  <p className="text-xs text-white/70 uppercase tracking-widest mb-1">
                    Registration Number
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-widest">
                    {regNo}
                  </p>
                </div>
                {qrCode && (
                  <div className="mb-6">
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color: "#1a1a2e" }}
                    >
                      🔳 Your Entry QR Code
                    </p>
                    <div
                      className="inline-block p-4 rounded-2xl"
                      style={{
                        background: "white",
                        border: "2px solid #dde6ff",
                      }}
                    >
                      <img
                        src={qrCode}
                        alt="QR Code"
                        className="w-40 h-40 md:w-48 md:h-48"
                      />
                    </div>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "#6b7280" }}
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
                    background: "#f4f6ff",
                    border: "1px solid #dde6ff",
                  }}
                >
                  <p
                    className="text-xs md:text-sm font-medium"
                    style={{ color: "#1a1a2e" }}
                  >
                    📅 July 4–7, 2026 · 📍 Bharat Mandapam, Pragati Maidan, New
                    Delhi
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

