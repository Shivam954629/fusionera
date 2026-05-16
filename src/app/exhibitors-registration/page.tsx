"use client";
import { useState } from "react";

type Stage = "intro" | "selection" | "login" | "form" | "submitted";

export default function ExhibitorRegistrationPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [exhibitorType, setExhibitorType] = useState<
    "regular" | "firsttime" | null
  >(null);
  const [loginData, setLoginData] = useState({
    name: "",
    id: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  const handleSelect = (type: "regular" | "firsttime") => {
    setExhibitorType(type);
    if (type === "regular") setStage("login");
    else setStage("form");
  };

  const handleLogin = async () => {
    if (!loginData.name.trim()) {
      setLoginError("Please enter Exhibitor Name.");
      return;
    }
    if (!loginData.id.trim()) {
      setLoginError("Please enter Exhibitor ID.");
      return;
    }
    if (!loginData.password.trim()) {
      setLoginError("Please enter Password.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/exhibitor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid credentials.");
      setStage("form");
    } catch (e: any) {
      setLoginError(e.message || "Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleResend = async (type: "id" | "password") => {
    if (!loginData.name.trim()) {
      setLoginError("Please enter your Exhibitor Name first.");
      return;
    }
    setResendMsg(
      `${type === "id" ? "Exhibitor ID" : "Password"} resend request sent. Please check your email or contact support.`,
    );
    setTimeout(() => setResendMsg(""), 4000);
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const inputStyle = {
    background: "var(--app-panel-soft)",
    border: "1px solid var(--app-border)",
    color: "var(--app-text)",
  };
  const blueBg = { background: "linear-gradient(135deg,#1d4ed8,#2563eb)" };

  return (
    <section
      className="min-h-screen px-4 py-12"
      style={{ background: "var(--app-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--app-text)" }}
          >
            Exhibitors Registration
          </h1>
          <p className="text-sm" style={{ color: "var(--app-muted)" }}>
            JULY 4 – JULY 7, 2026 · Bharat Mandapam, Pragati Maidan, New Delhi, India
          </p>
        </div>

        {/* INTRO */}
        {stage === "intro" && (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div className="px-8 py-12 text-center space-y-6">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "var(--app-muted)" }}
                  >
                    EXHIBITOR REGISTRATION
                  </p>
                  <h2
                    className="text-3xl font-black mb-2"
                    style={{ color: "#1d4ed8" }}
                  >
                    JULY 4 – JULY 7, 2026
                  </h2>
                  <p
                    className="text-base font-medium"
                    style={{ color: "var(--app-muted)" }}
                  >
                    Bharat Mandapam, Pragati Maidan
                  </p>
                  <p
                    className="text-base font-bold"
                    style={{ color: "var(--app-text)" }}
                  >
                    New Delhi, India
                  </p>
                </div>
                <button
                  onClick={() => setStage("selection")}
                  className="px-10 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90"
                  style={blueBg}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SELECTION */}
        {stage === "selection" && (
          <div className="max-w-md mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div className="px-8 py-10 text-center space-y-6">
                <div>
                  <h2
                    className="text-2xl font-black mb-1"
                    style={{ color: "var(--app-text)" }}
                  >
                    JULY 4 – JULY 7, 2026
                  </h2>
                  <p className="text-sm" style={{ color: "var(--app-muted)" }}>
                    Bharat Mandapam, Pragati Maidan
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--app-text)" }}
                  >
                    New Delhi, India
                  </p>
                </div>
                <div className="space-y-4">
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--app-panel-soft)",
                      border: "1px solid var(--app-border)",
                    }}
                  >
                    <p
                      className="text-sm mb-4"
                      style={{ color: "var(--app-muted)" }}
                    >
                      If you have exhibited at FusionEra previously, please
                      click below
                    </p>
                    <button
                      onClick={() => handleSelect("regular")}
                      className="px-8 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 w-full"
                      style={blueBg}
                    >
                      REGULAR EXHIBITOR
                    </button>
                  </div>
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "var(--app-panel-soft)",
                      border: "1px solid var(--app-border)",
                    }}
                  >
                    <p
                      className="text-sm mb-4"
                      style={{ color: "var(--app-muted)" }}
                    >
                      If you are exhibiting at FusionEra for the first time,
                      please click below
                    </p>
                    <button
                      onClick={() => handleSelect("firsttime")}
                      className="px-8 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 w-full"
                      style={blueBg}
                    >
                      FIRST TIME EXHIBITOR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGULAR EXHIBITOR LOGIN */}
        {stage === "login" && (
          <div className="max-w-lg mx-auto">
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
                <button
                  onClick={() => setStage("selection")}
                  className="text-sm mb-2 flex items-center gap-1 hover:opacity-70 transition"
                  style={{ color: "var(--app-muted)" }}
                >
                  ← Back
                </button>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--app-text)" }}
                >
                  Regular Exhibitor Login
                </h2>
              </div>
              <div className="px-6 py-6">
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--app-muted)" }}
                >
                  To book your Exhibition space for FusionEra 2026, please login
                  below by using the same Exhibitor ID and Password which has
                  been shared with you by FusionEra Team.
                </p>

                {loginError && (
                  <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {loginError}
                  </div>
                )}
                {resendMsg && (
                  <div className="mb-4 rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">
                    {resendMsg}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--app-text)" }}
                    >
                      Exhibitor Name:
                    </label>
                    <input
                      value={loginData.name}
                      onChange={(e) =>
                        setLoginData((p) => ({ ...p, name: e.target.value }))
                      }
                      className={inputCls}
                      style={inputStyle}
                      placeholder="Enter your exhibitor name"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--app-text)" }}
                    >
                      Exhibitor ID:
                    </label>
                    <input
                      value={loginData.id}
                      onChange={(e) =>
                        setLoginData((p) => ({ ...p, id: e.target.value }))
                      }
                      className={inputCls}
                      style={inputStyle}
                      placeholder="Enter your exhibitor ID"
                    />
                    <div className="text-right mt-1">
                      <button
                        onClick={() => handleResend("id")}
                        className="text-xs font-medium hover:underline"
                        style={{ color: "#2563eb" }}
                      >
                        Resend Exhibitor ID
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--app-text)" }}
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((p) => ({
                          ...p,
                          password: e.target.value,
                        }))
                      }
                      className={inputCls}
                      style={inputStyle}
                      placeholder="Enter your password"
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                    <div className="text-right mt-1">
                      <button
                        onClick={() => handleResend("password")}
                        className="text-xs font-medium hover:underline"
                        style={{ color: "#2563eb" }}
                      >
                        Resend Password
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleLogin}
                      disabled={loginLoading}
                      className="px-8 py-2.5 rounded-xl text-white font-bold text-sm transition hover:opacity-90 disabled:opacity-60"
                      style={blueBg}
                    >
                      {loginLoading ? "Logging in..." : "Login"}
                    </button>
                    <button
                      onClick={() => {
                        setLoginData({ name: "", id: "", password: "" });
                        setLoginError("");
                      }}
                      className="px-8 py-2.5 rounded-xl text-sm font-bold transition hover:opacity-80"
                      style={{
                        background: "var(--app-panel-soft)",
                        border: "1px solid var(--app-border)",
                        color: "var(--app-text)",
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid var(--app-border)" }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: "var(--app-muted)" }}
                    >
                      If you don't have Exhibitor ID and Password, please
                      contact:
                    </p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        {
                          city: "Delhi",
                          name: "Mr. Lakshay Sharma",
                          mobile: "+91 99 676 00257",
                          email: "lakshay.sharma@fusionera.in",
                        },
                        {
                          city: "Mumbai",
                          name: "Ms. Ananya Singh",
                          mobile: "+91 99 301 66099",
                          email: "ananya.singh@fusionera.in",
                        },
                      ].map((c) => (
                        <div
                          key={c.city}
                          className="rounded-xl p-3"
                          style={{
                            background: "var(--app-panel-soft)",
                            border: "1px solid var(--app-border)",
                          }}
                        >
                          <p
                            className="text-xs font-bold"
                            style={{ color: "#1d4ed8" }}
                          >
                            {c.city}:
                          </p>
                          <p
                            className="text-xs font-semibold mt-0.5"
                            style={{ color: "var(--app-text)" }}
                          >
                            {c.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--app-muted)" }}
                          >
                            {c.mobile}
                          </p>
                          <a
                            href={`mailto:${c.email}`}
                            className="text-xs text-blue-500 hover:underline"
                          >
                            {c.email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        {stage === "form" && (
          <ExhibitorRequestForm
            exhibitorType={exhibitorType!}
            onBack={() =>
              setStage(exhibitorType === "regular" ? "login" : "selection")
            }
            onSubmitted={() => setStage("submitted")}
          />
        )}

        {/* SUBMITTED */}
        {stage === "submitted" && (
          <div className="max-w-lg mx-auto">
            <div
              className="rounded-2xl overflow-hidden shadow-xl text-center"
              style={{
                background: "var(--app-panel)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div className="px-8 py-12">
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
                  Request Submitted!
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: "var(--app-muted)" }}
                >
                  Thank you for your interest in exhibiting at FusionEra 2026.
                  <br />
                  Our team will contact you shortly.
                </p>
                <div
                  className="rounded-xl p-4 text-left"
                  style={{ background: "#fff8e1", border: "1px solid #f59e0b" }}
                >
                  <p className="text-sm font-semibold text-amber-800 mb-2">
                    📋 Important Note
                  </p>
                  <p className="text-xs text-amber-700">
                    This is an Exhibitor Request Form, not an Exhibitor Contract
                    Form. You become an Exhibitor only after your Exhibitor
                    Contract Form, along with payment, is accepted by us.
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

// ── CONSTANTS ──
const COUNTRIES = [
  "India",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bahrain",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Hong Kong",
  "Hungary",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "UAE",
  "UK",
  "Ukraine",
  "USA",
  "Vietnam",
  "Zimbabwe",
];
const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const PARTICIPATION_MODES = [
  "Sustainability Pavilion",
  "Direct (Applying directly to organizer)",
  "Through (Group participation through association/agent)",
  "Design Hub (Default: 2x3 sq. mtrs. built-up booth)",
];
const BOOTH_TYPES = [
  {
    value: "buildup",
    label: "Built-up Booth (Min. 9 sq. mtrs.) — Ready Booth",
  },
  { value: "rawspace", label: "Raw Space (Min. 18 sq. mtrs.)" },
];
const OPENING_OPTIONS = [
  "One Side",
  "Two Side (Min. 36 sq. mtrs.)",
  "Three Side (Min. 54 sq. mtrs.)",
  "Island position (Min. 150 sq. mtrs.) — Prices on case-to-case basis",
];
const PRODUCT_CATEGORIES = [
  "Houseware",
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
  "Plastic Ware",
  "Brass & Silver",
  "Glassware",
  "Baking & Aluminium",
  "Cooking Range & Chimney",
  "RO Water & Aerated Water",
  "Home Décor",
  "Other",
];
const COUNTRY_CODES = [
  "+91",
  "+1",
  "+44",
  "+61",
  "+971",
  "+966",
  "+65",
  "+60",
  "+86",
  "+81",
  "+82",
  "+49",
  "+33",
  "+39",
  "+34",
  "+7",
  "+55",
  "+27",
  "+234",
  "+20",
  "+92",
  "+880",
  "+94",
  "+977",
  "+95",
  "+66",
  "+62",
  "+63",
  "+84",
  "+98",
  "+90",
  "+31",
  "+46",
  "+47",
  "+45",
  "+41",
  "+48",
  "+32",
  "+64",
  "+52",
  "+54",
];
interface Brand {
  name: string;
  products: string;
  country: string;
}

function ExhibitorRequestForm({
  exhibitorType,
  onBack,
  onSubmitted,
}: {
  exhibitorType: "regular" | "firsttime";
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [participationType, setParticipationType] = useState<
    "domestic" | "international"
  >("domestic");
  const [participationMode, setParticipationMode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [boothArea, setBoothArea] = useState("");
  const [boothType, setBoothType] = useState("");
  const [opening, setOpening] = useState("");
  const [brands, setBrands] = useState<Brand[]>([
    { name: "", products: "", country: "" },
    { name: "", products: "", country: "" },
    { name: "", products: "", country: "" },
  ]);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [orgTitle, setOrgTitle] = useState("");
  const [orgFirstName, setOrgFirstName] = useState("");
  const [orgLastName, setOrgLastName] = useState("");
  const [orgDesignation, setOrgDesignation] = useState("");
  const [orgCountryCode, setOrgCountryCode] = useState("+91");
  const [orgMobile, setOrgMobile] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [cpTitle, setCpTitle] = useState("");
  const [cpFirstName, setCpFirstName] = useState("");
  const [cpLastName, setCpLastName] = useState("");
  const [cpDesignation, setCpDesignation] = useState("");
  const [cpCountryCode, setCpCountryCode] = useState("+91");
  const [cpMobile, setCpMobile] = useState("");
  const [cpWhatsapp, setCpWhatsapp] = useState("");
  const [cpEmail, setCpEmail] = useState("");
  const [cpCountry, setCpCountry] = useState("India");
  const [cpAddress1, setCpAddress1] = useState("");
  const [cpAddress2, setCpAddress2] = useState("");
  const [cpAddress3, setCpAddress3] = useState("");
  const [cpPincode, setCpPincode] = useState("");
  const [cpCity, setCpCity] = useState("");
  const [cpState, setCpState] = useState("");
  const [cpTelCountry, setCpTelCountry] = useState("");
  const [cpTelStd, setCpTelStd] = useState("");
  const [cpTel, setCpTel] = useState("");
  const [cpFaxCountry, setCpFaxCountry] = useState("");
  const [cpFaxStd, setCpFaxStd] = useState("");
  const [cpFax, setCpFax] = useState("");
  const [website, setWebsite] = useState("https://");
  const [parentGroup, setParentGroup] = useState("");

  const addBrand = () =>
    setBrands([...brands, { name: "", products: "", country: "" }]);
  const removeBrand = (i: number) =>
    setBrands(brands.filter((_, idx) => idx !== i));
  const updateBrand = (i: number, field: keyof Brand, value: string) => {
    const updated = [...brands];
    updated[i][field] = value;
    setBrands(updated);
  };
  const toggleCategory = (cat: string) =>
    setProductCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const validate = () => {
    if (!participationMode) return "Please select Mode of Participation.";
    if (!companyName.trim()) return "Company Name is required.";
    if (!boothArea.trim()) return "Approximate booth area is required.";
    if (!boothType) return "Please select Type of Booth.";
    if (!opening) return "Please select Opening.";
    if (brands.filter((b) => b.name.trim()).length === 0)
      return "Please add at least one Brand.";
    if (!orgTitle || !orgFirstName.trim() || !orgLastName.trim())
      return "Organization Head details are required.";
    if (!orgDesignation.trim())
      return "Organization Head Designation is required.";
    if (!orgMobile.trim()) return "Organization Head Mobile is required.";
    if (!orgEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orgEmail))
      return "Valid Organization Head Email is required.";
    if (!cpTitle || !cpFirstName.trim() || !cpLastName.trim())
      return "Contact Person details are required.";
    if (!cpDesignation.trim()) return "Contact Person Designation is required.";
    if (!cpMobile.trim()) return "Contact Person Mobile is required.";
    if (!cpEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cpEmail))
      return "Valid Contact Person Email is required.";
    if (!cpCountry) return "Please select Country.";
    if (!cpAddress1.trim()) return "Address Line 1 is required.";
    if (!cpPincode.trim()) return "Pincode is required.";
    if (!cpCity.trim()) return "City is required.";
    if (!cpState.trim()) return "State is required.";
    if (!cpTel.trim()) return "Telephone Number is required.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/exhibitor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exhibitorType,
          participationType,
          participationMode,
          companyName,
          boothArea,
          boothType,
          opening,
          brands: brands.filter((b) => b.name.trim()),
          productCategories,
          orgHead: {
            title: orgTitle,
            firstName: orgFirstName,
            lastName: orgLastName,
            designation: orgDesignation,
            countryCode: orgCountryCode,
            mobile: orgMobile,
            email: orgEmail,
          },
          contactPerson: {
            title: cpTitle,
            firstName: cpFirstName,
            lastName: cpLastName,
            designation: cpDesignation,
            countryCode: cpCountryCode,
            mobile: cpMobile,
            whatsapp: cpWhatsapp,
            email: cpEmail,
            country: cpCountry,
            address1: cpAddress1,
            address2: cpAddress2,
            address3: cpAddress3,
            pincode: cpPincode,
            city: cpCity,
            state: cpState,
            telCountry: cpTelCountry,
            telStd: cpTelStd,
            tel: cpTel,
            faxCountry: cpFaxCountry,
            faxStd: cpFaxStd,
            fax: cpFax,
            website,
            parentGroup,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSubmitted();
    } catch (e: any) {
      setError(e.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const inputStyle = {
    background: "var(--app-panel-soft)",
    border: "1px solid var(--app-border)",
    color: "var(--app-text)",
  };
  const labelCls = "block text-sm font-semibold mb-1.5";
  const ls = { color: "var(--app-text)" };
  const req = <span className="text-red-500">*</span>;
  const blueBg = { background: "linear-gradient(135deg,#1d4ed8,#2563eb)" };

  return (
    <div className="space-y-6">
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
          <button
            onClick={onBack}
            className="text-sm mb-2 flex items-center gap-1 hover:opacity-70 transition"
            style={{ color: "var(--app-muted)" }}
          >
            ← Back
          </button>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--app-text)" }}
          >
            Exhibitor Request Form
            <span
              className="ml-2 text-xs font-normal px-2 py-1 rounded-full"
              style={{
                background: "var(--app-border)",
                color: "var(--app-muted)",
              }}
            >
              {exhibitorType === "regular"
                ? "Regular Exhibitor"
                : "First Time Exhibitor"}
            </span>
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--app-muted)" }}>
            We are interested in exhibiting at FusionEra 2026 scheduled for July
            4–7, 2026 at Bharat Mandapam, Pragati Maidan, New Delhi.
          </p>
        </div>

        <div className="px-6 py-6 space-y-6">
          {error && (
            <div className="rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          {/* Domestic / International */}
          <div className="flex gap-6">
            {(["domestic", "international"] as const).map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={participationType === t}
                  onChange={() => setParticipationType(t)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--app-text)" }}
                >
                  {t === "domestic" ? "Domestic" : "International"}
                </span>
              </label>
            ))}
          </div>

          {/* Mode of Participation */}
          <div>
            <label className={labelCls} style={ls}>
              Mode of Participation {req}
            </label>
            <div className="space-y-2 mt-1">
              {PARTICIPATION_MODES.map((mode) => (
                <label
                  key={mode}
                  className="flex items-start gap-2 cursor-pointer p-3 rounded-xl transition"
                  style={{
                    background:
                      participationMode === mode
                        ? "#eff6ff"
                        : "var(--app-panel-soft)",
                    border: `1px solid ${participationMode === mode ? "#3b82f6" : "var(--app-border)"}`,
                  }}
                >
                  <input
                    type="radio"
                    checked={participationMode === mode}
                    onChange={() => setParticipationMode(mode)}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--app-text)" }}
                  >
                    {mode}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Company + Booth Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={ls}>
                Company Name {req}
              </label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={inputCls}
                style={inputStyle}
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className={labelCls} style={ls}>
                Approximate Booth Area Required {req}
              </label>
              <div className="flex items-center gap-2">
                <input
                  value={boothArea}
                  onChange={(e) =>
                    setBoothArea(e.target.value.replace(/\D/g, ""))
                  }
                  className={inputCls}
                  style={inputStyle}
                  placeholder="e.g. 18"
                />
                <span
                  className="text-sm whitespace-nowrap"
                  style={{ color: "var(--app-muted)" }}
                >
                  sq. mtrs.
                </span>
              </div>
            </div>
          </div>

          {/* Booth Type + Opening */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl p-4"
            style={{
              background: "var(--app-panel-soft)",
              border: "1px solid var(--app-border)",
            }}
          >
            <div>
              <label className={labelCls} style={ls}>
                Type of Booth Required {req}
              </label>
              {BOOTH_TYPES.map((b) => (
                <label
                  key={b.value}
                  className="flex items-start gap-2 cursor-pointer mb-2 p-2 rounded-lg transition"
                  style={{
                    background:
                      boothType === b.value ? "#eff6ff" : "transparent",
                    border: `1px solid ${boothType === b.value ? "#3b82f6" : "transparent"}`,
                  }}
                >
                  <input
                    type="radio"
                    checked={boothType === b.value}
                    onChange={() => setBoothType(b.value)}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--app-text)" }}
                  >
                    {b.label}
                  </span>
                </label>
              ))}
            </div>
            <div>
              <label className={labelCls} style={ls}>
                Opening {req}
              </label>
              {OPENING_OPTIONS.map((o) => (
                <label
                  key={o}
                  className="flex items-start gap-2 cursor-pointer mb-2 p-2 rounded-lg transition"
                  style={{
                    background: opening === o ? "#eff6ff" : "transparent",
                    border: `1px solid ${opening === o ? "#3b82f6" : "transparent"}`,
                  }}
                >
                  <input
                    type="radio"
                    checked={opening === o}
                    onChange={() => setOpening(o)}
                    className="mt-0.5 w-4 h-4 accent-blue-600"
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--app-text)" }}
                  >
                    {o}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className={labelCls} style={ls}>
              Brand/s {req}
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 mb-1 px-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--app-muted)" }}
                >
                  Brand Name
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--app-muted)" }}
                >
                  Products {req}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--app-muted)" }}
                >
                  Country of Brand Origin {req}
                </span>
              </div>
              {brands.map((b, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 items-center">
                  <input
                    value={b.name}
                    onChange={(e) => updateBrand(i, "name", e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Brand name"
                  />
                  <input
                    value={b.products}
                    onChange={(e) => updateBrand(i, "products", e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Products"
                  />
                  <div className="flex gap-1">
                    <input
                      value={b.country}
                      onChange={(e) =>
                        updateBrand(i, "country", e.target.value)
                      }
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      placeholder="Country"
                    />
                    {i > 0 && (
                      <button
                        onClick={() => removeBrand(i)}
                        className="px-2 py-1 rounded-lg text-white text-xs font-bold flex-shrink-0"
                        style={blueBg}
                      >
                        −
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={addBrand}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                style={blueBg}
              >
                + Add more
              </button>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <label className={labelCls} style={ls}>
              Product Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition text-sm"
                  style={{
                    background: productCategories.includes(cat)
                      ? "#eff6ff"
                      : "var(--app-panel-soft)",
                    border: `1px solid ${productCategories.includes(cat) ? "#3b82f6" : "var(--app-border)"}`,
                    color: "var(--app-text)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={productCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="h-px" style={{ background: "var(--app-border)" }} />

          {/* Organization Head */}
          <div>
            <h3
              className="text-base font-bold mb-4 pb-2"
              style={{
                color: "var(--app-text)",
                borderBottom: "2px solid #3b82f6",
              }}
            >
              Organization Head
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Title {req}
                  </label>
                  <select
                    value={orgTitle}
                    onChange={(e) => setOrgTitle(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="">Select</option>
                    {TITLES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    First Name {req}
                  </label>
                  <input
                    value={orgFirstName}
                    onChange={(e) => setOrgFirstName(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Last Name {req}
                  </label>
                  <input
                    value={orgLastName}
                    onChange={(e) => setOrgLastName(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Designation {req}
                  </label>
                  <input
                    value={orgDesignation}
                    onChange={(e) => setOrgDesignation(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Designation"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Mobile No. (with Country Code) {req}
                  </label>
                  <div className="flex gap-1">
                    <select
                      value={orgCountryCode}
                      onChange={(e) => setOrgCountryCode(e.target.value)}
                      className="px-2 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ ...inputStyle, minWidth: "75px" }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      value={orgMobile}
                      onChange={(e) =>
                        setOrgMobile(e.target.value.replace(/\D/g, ""))
                      }
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Email ID {req}
                  </label>
                  <input
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px" style={{ background: "var(--app-border)" }} />

          {/* Contact Person */}
          <div>
            <h3
              className="text-base font-bold mb-4 pb-2"
              style={{
                color: "var(--app-text)",
                borderBottom: "2px solid #3b82f6",
              }}
            >
              Contact Person
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Title {req}
                  </label>
                  <select
                    value={cpTitle}
                    onChange={(e) => setCpTitle(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="">Select</option>
                    {TITLES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    First Name {req}
                  </label>
                  <input
                    value={cpFirstName}
                    onChange={(e) => setCpFirstName(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Last Name {req}
                  </label>
                  <input
                    value={cpLastName}
                    onChange={(e) => setCpLastName(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Designation {req}
                  </label>
                  <input
                    value={cpDesignation}
                    onChange={(e) => setCpDesignation(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Designation"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Mobile No. (with Country Code) {req}
                  </label>
                  <div className="flex gap-1">
                    <select
                      value={cpCountryCode}
                      onChange={(e) => setCpCountryCode(e.target.value)}
                      className="px-2 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ ...inputStyle, minWidth: "75px" }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      value={cpMobile}
                      onChange={(e) =>
                        setCpMobile(e.target.value.replace(/\D/g, ""))
                      }
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    WhatsApp No.
                  </label>
                  <input
                    value={cpWhatsapp}
                    onChange={(e) =>
                      setCpWhatsapp(e.target.value.replace(/\D/g, ""))
                    }
                    className={inputCls}
                    style={inputStyle}
                    placeholder="WhatsApp number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Email ID {req}
                  </label>
                  <input
                    type="email"
                    value={cpEmail}
                    onChange={(e) => setCpEmail(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Country {req}
                  </label>
                  <select
                    value={cpCountry}
                    onChange={(e) => setCpCountry(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Address Line 1 {req}
                  </label>
                  <input
                    value={cpAddress1}
                    onChange={(e) => setCpAddress1(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Address Line 2
                  </label>
                  <input
                    value={cpAddress2}
                    onChange={(e) => setCpAddress2(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Line 2"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Address Line 3
                  </label>
                  <input
                    value={cpAddress3}
                    onChange={(e) => setCpAddress3(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Line 3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Pincode {req}
                  </label>
                  <input
                    value={cpPincode}
                    onChange={(e) => setCpPincode(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Pincode"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    City {req}
                  </label>
                  <input
                    value={cpCity}
                    onChange={(e) => setCpCity(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    State {req}
                  </label>
                  <input
                    value={cpState}
                    onChange={(e) => setCpState(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Tel. No. (with Country & STD Code) {req}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      value={cpTelCountry}
                      onChange={(e) => setCpTelCountry(e.target.value)}
                      className={inputCls}
                      style={{ ...inputStyle, width: "65px" }}
                      placeholder="+91"
                    />
                    <span style={{ color: "var(--app-muted)" }}>-</span>
                    <input
                      value={cpTelStd}
                      onChange={(e) => setCpTelStd(e.target.value)}
                      className={inputCls}
                      style={{ ...inputStyle, width: "75px" }}
                      placeholder="STD"
                    />
                    <span style={{ color: "var(--app-muted)" }}>-</span>
                    <input
                      value={cpTel}
                      onChange={(e) => setCpTel(e.target.value)}
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      placeholder="Number"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Fax No. (with Country & STD Code)
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      value={cpFaxCountry}
                      onChange={(e) => setCpFaxCountry(e.target.value)}
                      className={inputCls}
                      style={{ ...inputStyle, width: "65px" }}
                      placeholder="+91"
                    />
                    <span style={{ color: "var(--app-muted)" }}>-</span>
                    <input
                      value={cpFaxStd}
                      onChange={(e) => setCpFaxStd(e.target.value)}
                      className={inputCls}
                      style={{ ...inputStyle, width: "75px" }}
                      placeholder="STD"
                    />
                    <span style={{ color: "var(--app-muted)" }}>-</span>
                    <input
                      value={cpFax}
                      onChange={(e) => setCpFax(e.target.value)}
                      className={`${inputCls} flex-1`}
                      style={inputStyle}
                      placeholder="Number"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={ls}>
                    Website
                  </label>
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className={labelCls} style={ls}>
                    Parent Group Name (If any)
                  </label>
                  <input
                    value={parentGroup}
                    onChange={(e) => setParentGroup(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    placeholder="Parent group name"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div
            className="rounded-xl p-4 space-y-2"
            style={{
              background: "var(--app-panel-soft)",
              border: "1px solid var(--app-border)",
            }}
          >
            <p
              className="text-sm font-bold"
              style={{ color: "var(--app-text)" }}
            >
              Please accept our request and allocate space accordingly.
            </p>
            <p className="text-sm font-bold text-red-500">Important Note:</p>
            <p className="text-xs" style={{ color: "var(--app-muted)" }}>
              <span className="text-red-500">*</span> These fields are
              compulsory to fill.
            </p>
            <p className="text-xs" style={{ color: "var(--app-muted)" }}>
              † This is only an Exhibitor Request Form and not Exhibitor
              Contract Form. Our team will contact you immediately with further
              details once you fill in this request form.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                city: "Delhi",
                name: "Mr. Lakshay Sharma",
                mobile: "+91 99 676 00257",
                tel: "+91 (11) 2571 4111",
                email: "lakshay.sharma@fusionera.in",
              },
              {
                city: "Mumbai",
                name: "Ms. Ananya Singh",
                mobile: "+91 99 301 66099",
                tel: "+91 (22) 6997 1122",
                email: "ananya.singh@fusionera.in",
              },
            ].map((c) => (
              <div
                key={c.city}
                className="rounded-xl p-4"
                style={{
                  background: "var(--app-panel-soft)",
                  border: "1px solid var(--app-border)",
                }}
              >
                <p
                  className="font-bold text-sm mb-1"
                  style={{ color: "#1d4ed8" }}
                >
                  {c.city}:
                </p>
                <p
                  className="font-bold text-sm"
                  style={{ color: "var(--app-text)" }}
                >
                  {c.name}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--app-muted)" }}
                >
                  Mobile: {c.mobile}
                </p>
                <p className="text-xs" style={{ color: "var(--app-muted)" }}>
                  Tel: {c.tel}
                </p>
                <a
                  href={`mailto:${c.email}`}
                  className="text-xs text-blue-500 hover:underline"
                >
                  {c.email}
                </a>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)" }}
          >
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
}
