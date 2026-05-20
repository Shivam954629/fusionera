export const dynamic = "force-dynamic";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "900", color: "#e84030", margin: 0 }}>404</h1>
        <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1a1464", marginTop: "0.5rem" }}>Page not found</p>
        <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>The page you are looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          style={{ display: "inline-block", marginTop: "1.5rem", padding: "0.75rem 2rem", background: "#e84030", color: "#fff", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "bold", boxShadow: "0 4px 14px rgba(232,64,48,0.35)" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
