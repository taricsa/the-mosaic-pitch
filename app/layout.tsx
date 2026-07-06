import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themosaicpitch.vercel.app"),
  title: {
    default: "The Mosaic Pitch — One Maple Leaf, Infinite Journeys",
    template: "%s | The Mosaic Pitch",
  },
  description:
    "A community hub celebrating Canada's national football teams: Olympic gold, a historic home-soil World Cup run, and the diverse heritage behind every jersey.",
  keywords: [
    "Canada Soccer",
    "Les Rouges",
    "Canadian Premier League",
    "CPL",
    "MLS Canada",
    "Alphonso Davies",
    "Christine Sinclair",
    "Canadian Football",
    "True North Mosaic",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Mosaic Pitch — Canadian Football Mosaic",
    description:
      "30 Journeys. Multiple Heritages. One Maple Leaf. Discover the stories behind Canada's national squads.",
    url: "https://themosaicpitch.vercel.app",
    siteName: "The Mosaic Pitch",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mosaic Pitch — One Maple Leaf, Infinite Journeys",
    description:
      "From coast to coast, a golden generation turned a nation of hockey towns into football believers.",
  },
  other: {
    "geo.region": "CA",
    "geo.placename": "Canada",
    position: "56.130366;-106.346771",
    ICBM: "56.130366, -106.346771",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-50">
        <LanguageProvider>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
