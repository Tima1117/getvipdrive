import type { Metadata } from "next";
import { Playfair_Display, Manrope, Noto_Serif_Georgian, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });
const geoSerif = Noto_Serif_Georgian({ subsets: ["georgian"], weight: ["400", "600", "700"], variable: "--font-geo-serif", display: "swap" });
const geoSans = Noto_Sans_Georgian({ subsets: ["georgian"], weight: ["400", "600", "800"], variable: "--font-geo-sans", display: "swap" });

export const metadata: Metadata = {
  title: "GET VIP DRIVE TOURS — Day tours from Batumi, Georgia",
  description: "Private and group day tours from Batumi: Adjara waterfalls, Martvili canyon, Prometheus cave, Kutaisi, highland Adjara, Mtirala. Hotel pickup, English-speaking driver-guide, 511 five-star reviews on Google.",
  openGraph: {
    title: "GET VIP DRIVE TOURS — Day tours from Batumi",
    description: "Waterfalls, canyons, caves and mountain villages above the clouds. Private & group tours from Batumi with hotel pickup. Rated 5.0 by 511 guests on Google.",
    url: "https://getvipdrive.vercel.app",
    siteName: "GET VIP DRIVE TOURS",
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${geoSerif.variable} ${geoSans.variable}`}>{children}</body>
    </html>
  );
}
