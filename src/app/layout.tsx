import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import "./globals.css";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.fusiontheera.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fusion The Era 2026 — India's Premier Houseware & Home Products B2B Trade Show",
    template: "%s | Fusion The Era 2026",
  },
  description:
    "Fusion The Era 2026 — India's leading B2B trade exhibition for houseware, kitchenware, home décor, HORECA ware, stainless steel & lifestyle products. July 4–7, 2026 | Bharat Mandapam, Pragati Maidan, New Delhi.",
  keywords: [
    "houseware exhibition India",
    "home products trade show",
    "B2B exhibition Delhi 2026",
    "kitchenware trade fair",
    "HORECA exhibition",
    "stainless steel trade show",
    "Bharat Mandapam 2026",
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
    siteName: "Fusion The Era 2026",
    title: "Fusion The Era 2026 — India's Premier Houseware & Home Products B2B Trade Show",
    description:
      "India's leading B2B trade exhibition for houseware, kitchenware, home décor, HORECA ware, stainless steel & lifestyle products. July 4–7, 2026 | Bharat Mandapam, New Delhi.",
    images: [
      {
        url: "/images/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Fusion The Era 2026 — B2B Trade Show, Bharat Mandapam, New Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fusion The Era 2026 — India's Premier Houseware & Home Products B2B Trade Show",
    description:
      "India's leading B2B trade exhibition for houseware, kitchenware, home décor, HORECA ware & lifestyle products. July 4–7, 2026 | Bharat Mandapam, New Delhi.",
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
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
