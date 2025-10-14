import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mainFont = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mainFont", // optional for CSS variables
});

export const metadata = {
  title: "U&I Naturals ",
  description: "Being developed by The Pixelated Café",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
