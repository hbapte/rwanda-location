import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rwanda Location Selector",
  description: "Select your location in Rwanda from province to village level",
  authors: [{ name: "Ishimwe Jean Baptiste", url: "https://www.hbapte.me/" }],
  creator: "Ishimwe Jean Baptiste",
  keywords: ["Rwanda", "Location", "Provinces", "Districts", "Sectors", "Cells", "Villages"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rwanda-location.vercel.app/",
    title: "Rwanda Location Selector",
    description: "Select your location in Rwanda from province to village level",
    siteName: "Rwanda Location Selector",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rwanda Location Selector",
    description: "Select your location in Rwanda from province to village level",
    creator: "@hbaptee",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster  />
           
        {children}
      </body>
    </html>
  );
}
