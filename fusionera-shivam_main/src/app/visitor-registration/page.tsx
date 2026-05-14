"use client";
import { useState } from "react";

type View = "register" | "login" | "change-password";

export default function VisitorRegistrationPage() {
  const [view, setView] = useState<View>("register");

  // Register
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Login
  const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
  const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [loginErr, setLoginErr] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Change Password
  const [cpForm, setCpForm] = useState({
    identifier: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [cpStatus, setCpStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [cpErr, setCpErr] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginStatus("loading");
    setLoginErr("");
    try {
      const res = await fetch("/api/visitor-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/visitor-dashboard";
    } catch (err: unknown) {
      setLoginStatus("error");
      setLoginErr(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cpForm.newPassword !== cpForm.confirmPassword) {
      setCpErr("New passwords do not match.");
      setCpStatus("error");
      return;
    }
    if (cpForm.newPassword.length < 6) {
      setCpErr("New password must be at least 6 characters.");
      setCpStatus("error");
      return;
    }
    setCpStatus("loading");
    setCpErr("");
    try {
      const res = await fetch("/api/visitor-change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: cpForm.identifier,
          oldPassword: cpForm.oldPassword,
          newPassword: cpForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change password");
      setCpStatus("success");
    } catch (err: unknown) {
      setCpStatus("error");
      setCpErr(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const inputStyle = {
    background: "var(--app-panel-soft)",
    border: "1px solid var(--app-border)",
    color: "var(--app-text)",
  };

  const EyeBtn = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 transition"
      style={{ color: "var(--app-muted)" }}
    >
      {show ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* ── REGISTER VIEW ── */}
        {view === "register" && (
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{
              background: "var(--app-panel)",
              border: "1px solid var(--app-border)",
            }}
          >
            <div className="px-8 pt-8 pb-2">
              <h1
                className="text-2xl font-bold mb-1"
                style={{ color: "var(--app-text)" }}
              >
                Register as Visitor
              </h1>
              <p className="text-sm mb-6" style={{ color: "var(--app-muted)" }}>
                Fields marked * are required.
              </p>
            </div>

            {status === "success" ? (
              <div className="px-8 py-12 text-center">
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
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--app-text)" }}
                >
                  Registration Successful!
                </h2>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--app-muted)" }}
                >
                  Thank you, <strong>{form.fullName}</strong>!
                </p>
                <p
                  className="text-sm mb-8"
                  style={{ color: "var(--app-muted)" }}
                >
                  Your Registration No &amp; Password have been sent to your
                  email.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ fullName: "", phoneNumber: "", email: "" });
                    }}
                    className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg,#110c41,#1a1560)",
                    }}
                  >
                    Register Another
                  </button>
                  <button
                    onClick={() => {
                      setView("login");
                      setStatus("idle");
                    }}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold border"
                    style={{
                      color: "var(--app-text)",
                      borderColor: "var(--app-border)",
                      background: "var(--app-panel-soft)",
                    }}
                  >
                    Login Now →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="px-8 pb-8 space-y-5">
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={inputStyle}
                  />
                </div>
                {status === "error" && (
                  <div className="rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {errorMsg}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg,#00b4d8,#0096c7)",
                  }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Register Now →"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold border transition hover:opacity-80"
                  style={{
                    color: "var(--app-text)",
                    borderColor: "var(--app-border)",
                    background: "var(--app-panel-soft)",
                  }}
                >
                  Already registered? Login here
                </button>
                <p
                  className="text-center text-xs"
                  style={{ color: "var(--app-muted)" }}
                >
                  By registering you agree to be contacted by the FUSION THE ERA
                  team. Your data is safe.
                </p>
              </form>
            )}
          </div>
        )}

        {/* ── LOGIN VIEW ── */}
        {view === "login" && (
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{
              background: "var(--app-panel)",
              border: "1px solid var(--app-border)",
            }}
          >
            <div className="px-8 pt-8 pb-2">
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--app-text)" }}
              >
                Visitor login
              </h1>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--app-muted)", lineHeight: "1.6" }}
              >
                Login with your registration number, email ID, or mobile number,
                plus the password received during visitor registration.
              </p>
            </div>
            <form onSubmit={handleLogin} className="px-8 pb-8 space-y-5">
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--app-text)" }}
                >
                  Registration no / Email / Mobile
                </label>
                <input
                  type="text"
                  value={loginForm.identifier}
                  onChange={(e) =>
                    setLoginForm((p) => ({ ...p, identifier: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  style={inputStyle}
                />
              </div>
              {/* Password with show/hide */}
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--app-text)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPass ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((p) => ({ ...p, password: e.target.value }))
                    }
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={inputStyle}
                  />
                  <EyeBtn
                    show={showLoginPass}
                    toggle={() => setShowLoginPass((p) => !p)}
                  />
                </div>
              </div>
              {loginStatus === "error" && (
                <div className="rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                  {loginErr}
                </div>
              )}
              <button
                type="submit"
                disabled={loginStatus === "loading"}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition hover:opacity-90 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg,#00b4d8,#0096c7)",
                }}
              >
                {loginStatus === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setView("register");
                  setLoginStatus("idle");
                  setLoginErr("");
                }}
                className="w-full py-3.5 rounded-xl text-sm font-bold border transition hover:opacity-80"
                style={{
                  color: "var(--app-text)",
                  borderColor: "var(--app-border)",
                  background: "var(--app-panel-soft)",
                }}
              >
                Back to registration
              </button>
              {/* Change Password link */}
              <button
                type="button"
                onClick={() => {
                  setView("change-password");
                  setLoginStatus("idle");
                  setLoginErr("");
                }}
                className="w-full text-center text-sm font-medium transition hover:opacity-70"
                style={{ color: "var(--app-text)" }}
              >
                🔑 Change Password
              </button>
              <p
                className="text-center text-xs leading-relaxed"
                style={{ color: "var(--app-muted)" }}
              >
                If you already registered but do not remember your password,
                check the registration confirmation email sent to your
                registered email address.
              </p>
            </form>
          </div>
        )}

        {/* ── CHANGE PASSWORD VIEW ── */}
        {view === "change-password" && (
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{
              background: "var(--app-panel)",
              border: "1px solid var(--app-border)",
            }}
          >
            <div className="px-8 pt-8 pb-2">
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--app-text)" }}
              >
                Change Password
              </h1>
              <p className="text-sm mb-6" style={{ color: "var(--app-muted)" }}>
                Enter your registration details and set a new password.
              </p>
            </div>

            {cpStatus === "success" ? (
              <div className="px-8 py-12 text-center">
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
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--app-text)" }}
                >
                  Password Changed!
                </h2>
                <p
                  className="text-sm mb-8"
                  style={{ color: "var(--app-muted)" }}
                >
                  Your password has been updated successfully.
                </p>
                <button
                  onClick={() => {
                    setCpStatus("idle");
                    setCpForm({
                      identifier: "",
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setView("login");
                  }}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg,#00b4d8,#0096c7)",
                  }}
                >
                  Login Now →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleChangePassword}
                className="px-8 pb-8 space-y-5"
              >
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    Registration no / Email / Mobile{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cpForm.identifier}
                    onChange={(e) =>
                      setCpForm((p) => ({ ...p, identifier: e.target.value }))
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    style={inputStyle}
                  />
                </div>
                {/* Old Password */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      value={cpForm.oldPassword}
                      onChange={(e) =>
                        setCpForm((p) => ({
                          ...p,
                          oldPassword: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={inputStyle}
                    />
                    <EyeBtn
                      show={showOld}
                      toggle={() => setShowOld((p) => !p)}
                    />
                  </div>
                </div>
                {/* New Password */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={cpForm.newPassword}
                      onChange={(e) =>
                        setCpForm((p) => ({
                          ...p,
                          newPassword: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={inputStyle}
                    />
                    <EyeBtn
                      show={showNew}
                      toggle={() => setShowNew((p) => !p)}
                    />
                  </div>
                </div>
                {/* Confirm Password */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--app-text)" }}
                  >
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={cpForm.confirmPassword}
                      onChange={(e) =>
                        setCpForm((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      style={inputStyle}
                    />
                    <EyeBtn
                      show={showConfirm}
                      toggle={() => setShowConfirm((p) => !p)}
                    />
                  </div>
                </div>

                {cpStatus === "error" && (
                  <div className="rounded-xl px-4 py-3 text-sm text-red-600 bg-red-50 border border-red-200">
                    {cpErr}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={cpStatus === "loading"}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition hover:opacity-90 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg,#00b4d8,#0096c7)",
                  }}
                >
                  {cpStatus === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView("login");
                    setCpStatus("idle");
                    setCpErr("");
                  }}
                  className="w-full py-3.5 rounded-xl text-sm font-bold border transition hover:opacity-80"
                  style={{
                    color: "var(--app-text)",
                    borderColor: "var(--app-border)",
                    background: "var(--app-panel-soft)",
                  }}
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
