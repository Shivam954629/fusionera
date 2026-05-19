"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#090f2d" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
          <div>
            <h2 style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "1.5rem" }}>Something went wrong.</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>An unexpected error occurred. Please try again.</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button onClick={reset} style={{ padding: "0.75rem 2rem", background: "#3B82F6", color: "#fff", borderRadius: "0.75rem", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                Try again
              </button>
              <a href="/" style={{ padding: "0.75rem 2rem", background: "transparent", color: "#fff", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.2)", textDecoration: "none", fontWeight: "bold", display: "inline-block" }}>
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
