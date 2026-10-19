import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-romantic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-clean",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Little Letter for Bhumika 💌",
  description: "A little corner of my Laptop, made with love for Bhumika.",
  applicationName: "A Little Letter for Bhumika",
  openGraph: {
    title: "A Little Letter for Bhumika 💌",
    description: "Someone has something special to tell you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff5f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
