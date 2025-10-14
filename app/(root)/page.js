import React from 'react'
import CosmeticsLaunchCountdown from '../_components/CosmeticsLaunchCountdown'

export const metadata = {
  title:
    "U&I Naturals | Handmade Organic Skincare & Cosmetics",
  description:
    "Experience the luxury of handmade, organic skincare crafted with love. U&I Naturals launches on November 27, 2025 — bringing pure, chemical-free cosmetics made from nature’s finest ingredients. Sign up to get exclusive lifetime offers and early access to our launch!",
  keywords: [
    "U&I Naturals",
    "handmade cosmetics",
    "organic skincare brand",
    "natural beauty products",
    "pure skincare launch",
    "organic cosmetics India",
    "chemical-free skincare",
    "eco-friendly beauty products",
    "natural cosmetics launch",
    "U&I Naturals launch 2025",
    "sustainable skincare brand",
    "vegan and cruelty-free beauty",
    "upcoming organic cosmetics brand",
    "handcrafted skincare products",
    "U&I Naturals lifetime offers"
  ],
  alternates: {
    canonical: "https://www.uandinaturals.com",
  },
  openGraph: {
    title:
      "U&I Naturals | Handmade Organic Skincare & Cosmetics",
    description:
      "Discover U&I Naturals, the upcoming organic skincare and cosmetics brand that blends purity, sustainability, and love. Launching November 27, 2025, with lifetime member offers and exclusive early access.",
    url: "https://www.uandinaturals.com",
    type: "website",
    images: [
      {
        url: "https://www.uandinaturals.com/uinaturals-launch-banner.jpg",
        width: 1200,
        height: 630,
        alt: "U&I Naturals Handmade Organic Skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "U&I Naturals — Pure Handmade Organic Skincare Launching Soon",
    description:
      "Join the U&I Naturals family and be part of our launch this November! Sign up for exclusive lifetime offers and early access to our handmade, eco-friendly skincare range.",
    images: ["https://www.uandinaturals.com/uinaturals-launch-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


const page = () => {
  return (
    <div>
      <CosmeticsLaunchCountdown />
    </div>
  )
}

export default page