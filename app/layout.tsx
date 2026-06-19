import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FDFBF6",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Called To His Kingdom",
    template: "%s · Called To His Kingdom",
  },
  description:
    "A Christian workout community — prayer, daily scripture, and volunteer personal training offered in love.",
  openGraph: {
    title: "Called To His Kingdom",
    description:
      "A Christian workout community — prayer, daily scripture, and volunteer personal training offered in love.",
    siteName: "Called To His Kingdom",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Called To His Kingdom",
    description:
      "A Christian workout community — prayer, daily scripture, and volunteer personal training offered in love.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
