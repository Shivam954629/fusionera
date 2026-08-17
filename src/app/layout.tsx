import type { Metadata } from "next";
import Script from "next/script";
import ClientWrapper from "./ClientWrapper";
import "./globals.css";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.fusiontheera.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fusion The Era 2027 — India's Premier Houseware & Home Products B2B Trade Show",
    template: "%s | Fusion The Era 2027",
  },
  description:
    "Fusion The Era 2027 — India's leading B2B trade exhibition for houseware, kitchenware, home décor, HORECA ware, stainless steel & lifestyle products. June 19 - 21, 2027 | Bharat Mandapam, Pragati Maidan, New Delhi.",
  keywords: [
    "houseware exhibition India",
    "home products trade show",
    "B2B exhibition Delhi 2027",
    "kitchenware trade fair",
    "HORECA exhibition",
    "stainless steel trade show",
    "Bharat Mandapam 2027",
    "Pragati Maidan exhibition",
    "home decor trade show",
    "Fusion The Era",
    "sourcing exhibition India",
    "lifestyle products fair",
  ],
  authors: [{ name: "V-Tech Innovation Services" }],
  creator: "V-Tech Innovation Services",
  publisher: "V-Tech Innovation Services",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Fusion The Era 2027",
    title: "Fusion The Era 2027 — India's Premier Houseware & Home Products B2B Trade Show",
    description:
      "India's leading B2B trade exhibition for houseware, kitchenware, home décor, HORECA ware, stainless steel & lifestyle products. June 19 - 21, 2027 | Bharat Mandapam, New Delhi.",
    images: [
      {
        url: "/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Fusion The Era 2027 — B2B Trade Show, Bharat Mandapam, New Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fusion The Era 2027 — India's Premier Houseware & Home Products B2B Trade Show",
    description:
      "India's leading B2B trade exhibition for houseware, kitchenware, home décor, HORECA ware & lifestyle products. June 19 - 21, 2027 | Bharat Mandapam, New Delhi.",
    images: ["/images/logo.jpeg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* Google Tag Manager (noscript) — immediately after body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5LLJNZ9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ClientWrapper>{children}</ClientWrapper>
        {/* Google Tag Manager script */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5LLJNZ9');`,
          }}
        />
        {/* LinkedIn Insight Tag */}
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `_linkedin_partner_id = "9473356";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }} alt="" src="https://px.ads.linkedin.com/collect/?pid=9473356&fmt=gif" />
        </noscript>
      </body>
    </html>
  );
}
