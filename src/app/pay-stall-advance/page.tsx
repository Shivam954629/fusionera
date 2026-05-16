export default function PayStallAdvancePage() {
  return (
    <section
      className="min-h-screen px-4 py-12"
      style={{ background: "var(--app-bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-lg font-black uppercase tracking-wide mb-2"
          style={{ color: "var(--app-text)" }}
        >
          PAY STALL ADVANCE
        </h2>
        <div className="mb-8 border-b-2" style={{ borderColor: "#1d4ed8" }} />

        <div className="space-y-5" style={{ color: "var(--app-text)" }}>
          <p
            className="text-base leading-7"
            style={{ color: "var(--app-text)" }}
          >
            Confirm your participation at Fusion The Era by completing the stall
            advance payment process. Early booking allows exhibitors to secure
            preferred exhibition space and plan their participation smoothly
            within a professionally managed B2B trade environment.
          </p>
          <p
            className="text-base leading-7"
            style={{ color: "var(--app-text)" }}
          >
            Fusion The Era offers businesses a valuable opportunity to connect
            with trade buyers, distributors, retailers, and industry
            professionals from across India&apos;s growing home and hospitality
            market.
          </p>
          <p
            className="text-base leading-7"
            style={{ color: "var(--app-text)" }}
          >
            For stall booking details, payment assistance, and exhibition
            support, exhibitors may connect with the official Fusion The Era
            team.
          </p>

          <div
            className="h-px mt-6"
            style={{ background: "var(--app-border)" }}
          />

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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
                className="rounded-xl p-5"
                style={{
                  background: "var(--app-panel)",
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
        </div>
      </div>
    </section>
  );
}
