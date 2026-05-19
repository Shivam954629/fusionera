import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fusion The Era",
  description: "Fusion The Era — The Perfect Business Platform. India's Premier Houseware & Home Products Exhibition.",
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
